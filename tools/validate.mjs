import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const modelPath = path.join(root, "collective.muif.json");
const examplePath = path.join(root, "examples/matrix-organization.example.json");
const reportPath = path.join(root, "validation-report.json");
const nonSemantic = new Set(["displayName", "description", "documentation", "comment", "label", "labels", "ui", "assertedAt", "assertionTime", "generatedAt", "lastModified", "fingerprint", "examples", "$schema", "$comment"]);
const csnPattern = /^[a-z][a-zA-Z0-9]*(\.[a-z][a-zA-Z0-9]*)*$/;

function semantic(value) {
  if (value === null || value === undefined) return undefined;
  if (typeof value === "string") return value.normalize("NFC");
  if (typeof value !== "object") return value;
  if (Array.isArray(value)) {
    const items = value.map(semantic).filter(v => v !== undefined && !(Array.isArray(v) && v.length === 0) && !(v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0));
    return items.sort((a, b) => {
      const left = JSON.stringify(a);
      const right = JSON.stringify(b);
      return left < right ? -1 : left > right ? 1 : 0;
    });
  }
  const result = {};
  for (const key of Object.keys(value).sort()) {
    if (nonSemantic.has(key) || key.startsWith("x-ui") || key.startsWith("_")) continue;
    const child = semantic(value[key]);
    if (child === undefined || (Array.isArray(child) && child.length === 0) || (child && typeof child === "object" && !Array.isArray(child) && Object.keys(child).length === 0)) continue;
    result[key.normalize("NFC")] = child;
  }
  return result;
}

function fingerprint(document) {
  const canonical = JSON.stringify(semantic(document));
  return `sha256:${crypto.createHash("sha256").update(canonical, "utf8").digest("hex")}`;
}

const checks = [];
const add = (id, ok, message, severity = "error") => checks.push({ checkId: id, status: ok ? "pass" : "fail", severity, message });
let model;
let example;
try { model = JSON.parse(fs.readFileSync(modelPath, "utf8")); add("V0-01", true, "MUIF JSON parses."); }
catch (error) { add("V0-01", false, error.message); }
try { example = JSON.parse(fs.readFileSync(examplePath, "utf8")); add("CMM-EX-01", true, "Matrix example JSON parses."); }
catch (error) { add("CMM-EX-01", false, error.message); }

if (model) {
  add("V0-02", model.muif?.version === "1.0", "muif.version is 1.0.");
  const collections = ["objects", "relationships", "events", "contracts", "projections"];
  const primitives = collections.flatMap(name => model[name] ?? []);
  const required = {
    Object: ["muifType", "id", "csn", "kind", "provenance"], Relationship: ["muifType", "id", "kind", "source", "target"],
    Event: ["muifType", "id", "type", "subject", "occurrenceTime", "provenance"], Contract: ["muifType", "id", "kind", "purpose", "parties"],
    Projection: ["muifType", "id", "subject", "context", "purpose"]
  };
  add("V1-02", primitives.every(p => required[p.muifType]?.every(key => Object.hasOwn(p, key))), "All MUIF primitives declare required fields.");
  add("V1-03", model.bundles?.length > 0 && model.objects?.length > 0, "Composition hierarchy contains bundles and objects.", "warning");
  const ids = primitives.map(p => p.id);
  add("V2-01", ids.length === new Set(ids).size, "Primitive identifiers are unique.");
  const csns = [model.metaModel?.csn, ...(model.namespaces ?? []), ...(model.bundles ?? []).flatMap(b => [b.csn, ...(b.layers ?? [])]), ...(model.objects ?? []).flatMap(o => [o.csn, ...(o.properties ?? []).map(p => p.name)]), ...(model.relationships ?? []).flatMap(r => [r.csn, r.kind]), ...(model.projections ?? []).map(p => p.profile)].filter(Boolean);
  add("V2-03", csns.every(c => csnPattern.test(c) && (c === "collective" || c.startsWith("collective."))), "All CSNs are canonical and use a declared namespace.");
  const targets = new Set(ids);
  const refs = [
    ...(model.relationships ?? []).flatMap(r => [r.source, r.target]),
    ...(model.events ?? []).map(e => e.subject),
    ...(model.projections ?? []).flatMap(p => [p.subject, p.contract].filter(Boolean))
  ];
  add("V2-02", refs.every(ref => targets.has(ref)), "Internal primitive references resolve.");
  const computed = fingerprint(model);
  add("V2-05", !model.metaModel.fingerprint || model.metaModel.fingerprint === computed, `Semantic fingerprint is ${computed}.`);
}

if (example) {
  add("CMM-EX-02", example.schemaVersion === "0.1.0" && example.context && Array.isArray(example.parties) && Array.isArray(example.collectives), "Example has required root fields.");
  const records = ["parties", "collectives", "dimensions", "scopes", "memberships", "roleDefinitions", "positions", "assignments", "authorityGrants", "accountabilities", "allocations", "relationships"].flatMap(k => example[k] ?? []);
  const recordIds = records.map(r => r.id);
  add("CMM-EX-03", recordIds.length === new Set(recordIds).size, "Example record identifiers are unique.");
  add("CMM-EX-04", records.every(r => r.provenance?.owner && r.provenance?.source), "Example records carry owner and provenance.");
}

const errors = checks.filter(c => c.status === "fail" && c.severity === "error").length;
const warnings = checks.filter(c => c.status === "fail" && c.severity === "warning").length;
const report = {
  reportId: "urn:vercy:validation:collective:0.1.0",
  target: { id: "urn:vercy:metamodel:collective", version: "0.1.0", ...(model ? { fingerprint: fingerprint(model) } : {}) },
  validator: { id: "urn:vercy:collective:validator", version: "0.1.0" },
  validatedAt: new Date().toISOString(),
  highestLevelAchieved: errors ? "none" : "V2",
  levels: [
    { level: "V0", status: checks.filter(c => c.checkId.startsWith("V0-")).every(c => c.status === "pass") ? "pass" : "fail", checks: checks.filter(c => c.checkId.startsWith("V0-")) },
    { level: "V1", status: checks.filter(c => c.checkId.startsWith("V1-")).every(c => c.status === "pass") ? "pass" : "fail", checks: checks.filter(c => c.checkId.startsWith("V1-")) },
    { level: "V2", status: checks.filter(c => c.checkId.startsWith("V2-")).every(c => c.status === "pass") ? "pass" : "fail", checks: checks.filter(c => c.checkId.startsWith("V2-")) },
    { level: "V3", status: "skipped", checks: [] },
    { level: "V4", status: "skipped", checks: [] }
  ],
  summary: { errors, warnings, info: 0 }
};
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ ok: errors === 0, fingerprint: report.target.fingerprint, errors, warnings, report: path.relative(root, reportPath) }));
process.exitCode = errors ? 1 : 0;

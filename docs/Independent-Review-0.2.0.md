# Independent review record for 0.2.0

**Review date:** 2026-08-08

**Reviewers:** Grok 4.5 and Claude (Claude Code, claude.ai Max subscription), with final adjudication by Codex.

## Scope and method

Both reviewers were asked for independent, read-only, adversarial standards reviews covering MUC/MMAS/MUIF claims, matrix-organization semantics, cross-artifact consistency, temporal and provenance semantics, privacy, federation, examples, validation, and versioning. No reviewer was permitted to edit the repository or use web search.

## Grok review of 0.1.0

Grok judged the graph-separation thesis and single-Collective abstraction to be strong, while finding that 0.1.0 was not yet an implementable Core interchange standard. Its principal requirement was a coherence pass across normative prose, MUIF, instance schema, example, contracts, validator, and conformance claims.

Accepted findings implemented in 0.2.0 include:

- complete Core/profile coverage in the public instance schema;
- first-class Mandate and DecisionDomain collections and references;
- typed polymorphic endpoints, multi-role Positions, explicit Resource records, and resolved example references;
- open-ended half-open intervals, the complete event catalogue, Lineage and Conflict;
- purpose-specific projection contracts with lifecycle, retention, onward-disclosure, and termination terms;
- pinned standard/source revisions and stronger automated cross-artifact checks;
- explicit ReportingLine and Dependency entities for polymorphic matrix relations;
- a fuller matrix example with functional and product reporting, parallel assignments, product/project WorkSubjects, and allocations.

Grok's proposed `matrixPlacement`/matrix-cell concept was classified as an optional ideological alternative, not a defect. CMM retains graph superposition plus typed Scope and Context rather than making matrix cells mandatory.

## Claude review of 0.2.0

Claude's first read-only run exhausted its bounded turn limit without an answer. A second, narrower read-only pass reviewed the 0.2.0 candidate and initially returned `DO NOT SHIP` for three major consistency/honesty gaps: missing instance `contextRef` coverage, projection contracts that did not authorize their projection fields, and overstatement of what the local validator checks. It also identified typed jurisdiction, owner/provenance ambiguity, projection field coverage, temporal enforcement, and self-declaration wording as minor issues.

The release candidate was then corrected before publication:

- optional instance `contextRef` fields now support explicit context while root context inheritance remains valid;
- every standard projection has a purpose-specific contract and validator permission check;
- Validation.md distinguishes local checks from CI AJV validation and does not claim repository-walk automation;
- `jurisdictionRef` is typed, `masterRef` is distinct from `provenance.owner`, organization-chart fields include composition/position data, and finite interval ordering/date parsing are checked.

Claude then repeated the scoped read-only verification against the corrected candidate and returned `SHIP as 0.2.0 Working Draft`. All eight findings were resolved. Claude explicitly confirmed that the permission check is projection-level rather than field-by-field and that temporal checks are example-level rather than schema-enforced; both limits are disclosed in the validation documentation.

Claude classified a mandatory matrix-cell abstraction, multiple contexts per instance, full edge reification, and alternative owner serialization as ideological or design alternatives rather than blockers. No alternative required changing the single-Collective thesis.

## Maintainer adjudication

The central ideology remains unchanged: organizational units, product teams, project teams, governance bodies, communities, and task forces are kinds of one persistent `collective.collective` abstraction. Structure, participation, roles, reporting, authority, accountability, work, allocation, funding, performance, and disclosure remain independent graphs over shared identities.

The release does not claim MUFP conformance, MMAS A4, or independent MUC certification.

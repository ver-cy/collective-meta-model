# Validation and Conformance

**Document Class:** Normative  
**Version:** 0.2.0
**Status:** Working Draft

## Declared position

| Axis | Claim | Evidence |
|---|---|---|
| MUC | 2.0 self-assessed alignment; not certified | Specification invariants and V3 assessment |
| MMAS | A3 Extensible (self-declared) | package topology, imports, mappings, schemas, manifests, source register |
| MUIF | 1.0 | `collective.muif.json` validates against the Vercy schemas |
| Validation | V2 | V0-V2 automated; V3 documented self-assessment is not claimed as a passed ATP level |
| MUFP | not claimed | federation projections are designed but no transport implementation is certified |

The repository SHALL NOT claim A4 until a validation report demonstrates every applicable V0-V4 ATP and an independent reviewer confirms the constitutional and federation checks.

## Automated checks

Run:

```text
node tools/validate.mjs
```

The command checks JSON syntax, required MUIF fields, CSN grammar, namespace declaration, identifier uniqueness, internal reference resolution, semantic fingerprint, example reference integrity and temporal ordering, and schema/example collection coverage. Full MUIF and instance JSON Schema validation runs in CI with AJV; repository walk coverage is provided by the package manifest and remains a future validator enhancement.

## Constitutional assessment

- V3-01: every modeled Object type has a persistent identity property.
- V3-02: every assertion family includes owner and provenance requirements.
- V3-03: Projection profiles retain the canonical subject identifier.
- V3-04: externally exposed Projection profiles require a Contract and purpose.
- V3-05: context is mandatory or inherited for all significant assertions.
- V3-06: sources, mappings, version, event history, and lineage make origin and evolution determinable.

This is self-assessment evidence, not independent certification.

## Compatibility

`0.2.0` is a pre-1.0 consistency release. Its breaking field migrations are documented in `docs/Migration-0.1-to-0.2.md`; unchanged CSNs and stable identifiers retain their meaning.

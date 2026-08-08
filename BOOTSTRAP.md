# Bootstrap

This repository is the System of Record for the Collective Meta-Model.

## Canonical walk

1. Read `manifest.yaml` for identity, bundle order, layers, and file classification.
2. Read `sources.yaml` before relying on any assertion.
3. Read `docs/Collective-Meta-Model.md` for normative semantics and invariants.
4. Walk bundle manifests in the order declared by `manifest.yaml`; dependencies always precede consumers.
5. Read `collective.muif.json` for the MUIF v1 semantic core.
6. Read `schemas/collective-instance.schema.json`, then the examples and mappings.
7. Run `node tools/validate.mjs` before proposing a change.

## Authoring rules

- English is the canonical normative language.
- Public concepts use immutable `collective.*` Canonical Semantic Names.
- A Collective is not inferred to be a legal entity, employer, cost center, or access-control group.
- Composition, coordination, membership, reporting, authority, accountability, allocation, and funding remain separate relation families.
- `RoleDefinition`, `Position`, `Assignment`, and `Mandate` remain distinct.
- Every temporal association uses half-open intervals `[validFrom, validTo)`; an absent `validTo` means open-ended.
- Never edit generated validation evidence by hand. Re-run the validator.
- Any semantic change requires a version decision, changelog entry, compatibility statement, and new Semantic Fingerprint.

## Publication

Published versions are immutable Git tags. Registry metadata lives in `ver-cy/meta-universe`; catalogue descriptions may live in `ver-cy/world-models`. Neither copy replaces this repository as master.

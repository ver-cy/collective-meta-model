# Collective Meta-Model

The Collective Meta-Model (CMM) is a vendor-neutral semantic model for organizational units, product teams, project teams, communities, governance bodies, and other coordinated groups. It is designed for matrix organizations in which composition, membership, reporting, authority, accountability, funding, and work allocation form independent graphs.

CMM is an implementation of the [Vercy Meta-Universe](https://github.com/ver-cy/meta-universe) Meta-Model Architecture Standard (MMAS). The canonical namespace is `collective`; the current release is `0.2.0`.

## Scope

CMM provides stable semantics for:

- collective identity, kind, lifecycle, and contextual presentation;
- nested organizational composition and non-hierarchical coordination;
- temporal membership, role definitions, positions, assignments, and mandates;
- reporting, decision authority, accountability, policy, and constraints;
- work commitments, dependencies, resource capacity, allocation, and finance;
- objectives, metrics, measurements, events, provenance, contracts, and projections.

It deliberately does not define people, legal entities, products, projects, accounting ledgers, HR records, or identity-provider accounts. Those are sovereign external objects referenced through `Party`, `WorkSubject`, `Resource`, and `CostObject` integration boundaries.

## Registry and composition

This model is registered in the [Vercy unified registry](https://github.com/ver-cy/registry) as the Meta-Model Dependency Graph (MMDG) node `vercy.collective`. Through the registry it composes into the wider Vercy meta-model family by typed edges, not by copying:

- The [Product Landscape Meta-Model (PLMM)](https://github.com/ver-cy/plmm) references `vercy.collective` on the `collective` kind, so a product resolves to the team that builds it through the graph.
- This model references the [Org-Unit Meta-Model (OUMM)](https://github.com/ver-cy/org-unit) on the `org-unit` kind for the parent unit and member seats, rather than re-defining organizational structure.

Data mastership is bidirectional: inbound masters are declared in [sources.yaml](sources.yaml); outbound publication to data marts, directories and dependent systems is declared in [sinks.yaml](sinks.yaml).

## Start here

1. Read [BOOTSTRAP.md](BOOTSTRAP.md).
2. Inspect [manifest.yaml](manifest.yaml) and [sources.yaml](sources.yaml).
3. Read the normative [Collective Meta-Model Specification](docs/Collective-Meta-Model.md).
4. Inspect the machine-readable [MUIF model](collective.muif.json) and [instance schema](schemas/collective-instance.schema.json).
5. Run the checks described in [Validation](docs/Validation.md).
6. Review the [0.2.0 independent review record](docs/Independent-Review-0.2.0.md) and [0.1→0.2 migration guide](docs/Migration-0.1-to-0.2.md).

## Status

Version `0.2.0` is a Working Draft. It self-assesses alignment with MUC 2.0 and declares MMAS A3 maturity; independent certification is not claimed. V0-V2 machine checks and a documented V3 constitutional assessment are included; A4 is not claimed until the reference validation suite certifies every applicable ATP level.

## License

Apache License 2.0. See [LICENSE](LICENSE).

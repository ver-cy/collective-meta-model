# Architecture Decisions

## ADR-001: One Collective abstraction

Organizational units, product teams, project teams, communities, governance bodies, partner groups, and task forces share persistent group identity and lifecycle. They use one `Collective` object plus a governed kind classifier. Kind does not determine authority or hierarchy.

## ADR-002: Independent matrix graphs

Composition, coordination, membership, role assignment, reporting, authority, accountability, work, allocation, and funding are independent semantic graphs. No edge type is inferred from another without an explicit policy-backed rule.

## ADR-003: Reified temporal associations

Membership, Assignment, Mandate, AuthorityGrant, Accountability, Allocation, Commitment, and FundingAllocation are Objects because they have identity, lifecycle, time, provenance, scope, and may themselves be referenced or disputed.

## ADR-004: Relationship primitives remain lightweight

`composedOf`, `coordinatesWith`, `reportsTo`, `dependsOn`, `succeeds`, and classification links are Relationships. When a relation needs its own lifecycle, grant chain, acceptance, quantity, or contractual status, it is reified as an Object.

## ADR-005: External sovereignty

Party, WorkSubject, Resource, CostObject, currency, units, calendar, place, project, and product semantics are integration boundaries or imports. CMM does not become their System of Record.

## ADR-006: Typed polymorphic references and comparable scopes

References with one known target type use a stable identifier property. References that may target different Object types use `TypedReference` so identity and type remain explicit. Governance-relevant boundaries use the reusable `Scope` value object; free-text scope is informative only.

## ADR-007: Matrix placement is derived, not mandatory

CMM does not require a separate matrix-cell or `matrixPlacement` object. A placement is a projection derived from explicit composition, membership, assignment, reporting, authority, accountability, work, and allocation graphs within a Context. Implementations may materialize that projection as an extension, but it must not replace or silently infer the underlying governed relations.

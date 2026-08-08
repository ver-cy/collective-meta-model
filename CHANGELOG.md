# Changelog

All notable changes are documented here. The project follows Semantic Versioning.

## 0.2.0 - 2026-08-08

Consistency and completeness release following independent Claude and Grok reviews:

- expands the public instance schema from a partial subset to every declared Core and optional-profile object family;
- adds first-class Mandate and DecisionDomain instance collections and makes AuthorityGrant reference them explicitly;
- replaces ambiguous polymorphic bare identifiers with TypedReference values;
- changes Position from singular `roleDefinitionRef` to plural `roleDefinitionRefs` with non-empty set semantics;
- makes open-ended half-open intervals consistent by allowing `validTo` to be absent;
- adds the complete normative event catalogue, explicit MUIF imports, pinned source revisions, contract lifecycle/termination evidence, and stronger validation;
- preserves the central one-Collective abstraction for organizational units, project teams, product teams, and other coordinated groups.

Compatibility: breaking pre-1.0 field corrections. See `docs/Migration-0.1-to-0.2.md`.

## 0.1.0 - 2026-08-08

Initial Working Draft:

- defines the `collective` namespace and dependency-first MMAS topology;
- covers organizational units and cross-functional product/project teams through one Collective abstraction;
- separates membership, role, position, assignment, mandate, reporting, authority, and accountability;
- defines matrix contexts, work, resources, finance, performance, history, and federation semantics;
- publishes a MUIF v1 model, instance JSON Schema, mappings, examples, and validation evidence.

Compatibility: first public version; no predecessor. Future compatible additions target `0.x` MINOR versions. Breaking changes before `1.0.0` require explicit migration notes.

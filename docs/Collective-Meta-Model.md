# Collective Meta-Model Specification

**Document ID:** CMM-001  
**Document Class:** Normative  
**Version:** 0.2.0
**Status:** Working Draft  
**Published:** 2026-08-08  
**Owner:** ver-cy  
**License:** Apache-2.0  
**Normative references:** MUC 2.0 Working Draft, MMAS 2.0 Working Draft, MUIF 1.0

## 1. Purpose

The Collective Meta-Model (CMM) defines a shared semantic model for any group that coordinates parties toward a purpose. It supports stable organizational units and temporary or persistent project, product, governance, practice, partner, and task-force teams in the same matrix without forcing them into a single hierarchy.

The key design rule is graph separation. A line hierarchy answers neither who participates, who decides, who is accountable, where capacity is allocated, nor who funds the work. Each question has its own explicit, temporal, contextual relation.

## 2. Scope and non-goals

CMM SHALL describe collective structure, participation, governance, work coordination, allocation, funding, performance, evolution, and disclosure.

CMM SHALL NOT redefine sovereign models for Person, Organization, Legal Entity, Product, Project, Ledger Account, Currency, Place, or Digital Identity. It SHALL reference those objects by canonical identity and SHALL preserve their owner and provenance.

CMM SHALL NOT assume that:

- every Collective is a legal entity, employer, department, cost center, security group, or reporting unit;
- every participant is a natural person;
- membership implies employment, access, reporting, authority, accountability, capacity, or funding;
- composition implies control;
- a leader is a manager or an accountable owner;
- an organizational chart is the organization.

## 3. Conformance vocabulary

The key words SHALL, SHALL NOT, SHOULD, SHOULD NOT, and MAY are to be interpreted as described by RFC 2119 and RFC 8174 when, and only when, they appear in all capitals.

An implementation conforms to CMM Core when it implements Sections 4 through 12, all Core invariants in Section 14, and the public instance schema. Optional Finance, Performance, History, and Federation profiles are defined in Section 13.

## 4. Foundational semantics

### 4.1 Party

`collective.party` is an abstract integration boundary for an independently identified agent that may participate in or govern a Collective. A Party MAY resolve to a person, organization, autonomous agent, or another sovereign entity. CMM owns only the reference, not the Party's master data.

Required semantics: `partyId`, `partyType`, `masterRef`, and `provenance`. `masterRef` identifies the sovereign master of the Party identity; `provenance.owner` identifies the owner of the local assertion. They MAY coincide but SHALL NOT be conflated.

### 4.2 Collective

`collective.collective` is a persistent semantic object representing a group coordinated toward a declared purpose. Its identity survives name changes, reorganizations, and changes in participants.

Required properties:

- `collective.collectiveId`: persistent canonical identity;
- `collective.kind`: one controlled value from `organizationalUnit`, `projectTeam`, `productTeam`, `communityOfPractice`, `governanceBody`, `externalPartnerGroup`, `temporaryTaskForce`, or an explicitly namespaced extension;
- `collective.purpose`: the declared reason for existence;
- `collective.lifecycleState`: Draft, Active, Suspended, Deprecated, Retired, or Terminated;
- `collective.masterRef`: Party that masters the Collective identity;
- `collective.validFrom` and optional `collective.validTo`.

A change of kind that changes the social identity of the group SHOULD create a successor Collective rather than silently mutate the original.

### 4.3 Structure dimension

`collective.structureDimension` classifies an independent structural axis, such as function, geography, product, program, customer, legal, or community. Dimensions allow an n-dimensional matrix. A Collective MAY participate in multiple dimensions in different contexts.

### 4.4 Context

Every significant assertion SHALL carry or inherit a context. A context identifies at least the Universe, namespace, and purpose within which the assertion is valid, and MAY further identify organization, effective time, and scenario. A context SHALL NOT replace the identity of the referenced object.

### 4.5 Typed reference and scope

`collective.typedReference` identifies a sovereign target by `targetId`, `targetType`, and optional `targetCsn`. It SHALL be used when a property may refer to more than one Object type. A bare string SHALL NOT be used for a polymorphic reference.

`collective.scope` is a comparable, reusable value object defining the semantic boundary of a grant, mandate, policy, accountability, role, or commitment. It SHALL state a scope kind and one or more typed subjects, and MAY state jurisdiction, context, inclusion, and exclusion expressions. Free-text descriptions MAY accompany a Scope but SHALL NOT replace it where scope affects authorization or conformance.

## 5. Structural relationships

Structural relationships are directed, typed, temporal, and independently versioned.

- `collective.composedOf`: structural containment. It SHALL be acyclic within one composition context.
- `collective.coordinatesWith`: non-hierarchical coordination. It SHALL NOT imply containment or authority.
- `collective.participatesInDimension`: associates a Collective with a structural dimension.
- `collective.succeeds`: links a successor Collective to a predecessor while preserving both identities.

An implementation SHALL NOT derive membership, reporting, authority, accountability, funding, or access from `composedOf` alone.

## 6. Participation

### 6.1 Membership

`collective.membership` is a first-class temporal association between a Party and a Collective. It represents recognized participation, not employment or authorization.

Required properties: `membershipId`, `partyRef`, `collectiveRef`, `membershipKind`, `status`, `validFrom`, optional `validTo`, `context`, `owner`, and `provenance`.

A Party MAY have multiple simultaneous memberships in the same or different Collectives. Overlap is valid unless a declared constraint prohibits it.

### 6.2 Role definition

`collective.roleDefinition` describes reusable expected behavior, contribution, or service. It is independent of a person, a vacancy, a concrete assignment, and a job title.

### 6.3 Position

`collective.position` is a structurally recognized slot within one Collective. A Position MAY exist without an incumbent and MAY allow one or more concurrent incumbents when its cardinality permits. It references one or more RoleDefinitions.

### 6.4 Assignment

`collective.assignment` binds a Party to a RoleDefinition and optionally a Position, Membership, Collective, or WorkSubject for a temporal scope. Assignment SHALL NOT create membership implicitly. When membership is required, the assignment SHALL reference an active Membership.

Allocation percentage belongs to Allocation, not Assignment. Decision authority belongs to AuthorityGrant. Accountability belongs to Accountability. Keeping these separate permits one assignment to carry different authority, accountability, and capacity scopes.

### 6.5 Mandate

`collective.mandate` is a time-bounded authorization for a Party or Collective to perform a defined leadership or representative function. A Mandate SHALL declare its issuer, recipient, scope, valid interval, revocation rule, and provenance. A leadership label without a Mandate SHALL NOT be interpreted as authority. A Mandate MAY justify an AuthorityGrant, but it SHALL NOT itself imply a right to decide, approve, veto, delegate, or allocate; those rights require an explicit AuthorityGrant.

## 7. Governance

### 7.1 Authority grant

`collective.authorityGrant` is the explicit right of a grantee to make or approve a class of decisions within a scope. It SHALL declare grantor, grantee, decision domain, right kind, scope, constraints, valid interval, and revocation status. When a Mandate is its authority source, the grant SHOULD reference that Mandate.

Right kinds SHOULD use `propose`, `decide`, `approve`, `veto`, `delegate`, `allocate`, or a namespaced extension. Delegation SHALL preserve a chain to the original grant and SHALL NOT exceed the delegator's scope.

### 7.2 Accountability

`collective.accountability` states that an accountable Party or Collective is answerable for an outcome, obligation, policy, resource, or WorkSubject. It SHALL identify the accountable subject, accountable-for target, scope, acceptance, valid interval, and provenance.

Authority and accountability are independent. An implementation SHALL NOT infer one from the other. A governance policy MAY require exactly one accepted accountable subject for a defined outcome and context.

`collective.supportsAccountability` MAY explicitly relate an AuthorityGrant to an Accountability when the granted decision right enables the accountable subject to influence the target. Absence of this relation SHALL NOT invalidate either assertion unless a Policy requires the pairing.

### 7.3 Reporting

`collective.reportingLine` is a first-class, temporal informational association whose typed endpoints MAY identify Parties or Positions. `collective.reportsTo` is its Party-to-Party MUIF relationship specialization. Reporting SHALL NOT imply composition, authority, employment, or accountability unless a separate explicit assertion states it.

### 7.4 Policy and constraint

`collective.policy` is a governed rule with an owner, applicability scope, lifecycle, precedence, and enforcement mode. `collective.constraint` is a machine-evaluable restriction derived from a policy or contract. Conflicting policies SHALL be preserved and resolved by explicit precedence, jurisdiction, or decision, never overwritten silently.

## 8. Work coordination

### 8.1 Work subject

`collective.workSubject` is an integration boundary for a project, product, service, objective, initiative, or other independently governed subject of coordinated work.

### 8.2 Work item

`collective.workItem` represents a bounded unit of intended or performed work. It SHALL declare identity, purpose, state, owner, context, and temporal scope. Detailed project-management workflow is outside CMM.

### 8.3 Commitment

`collective.commitment` is a promise by a Party or Collective to provide an outcome, contribution, or service to a beneficiary under stated acceptance conditions. A Commitment is not an Assignment and does not by itself grant authority.

### 8.4 Dependency

`collective.dependency` is the first-class polymorphic association relating one WorkItem, Commitment, Objective, Collective, or resource need to another through typed references. `collective.dependsOn` is its WorkItem-to-WorkItem MUIF relationship specialization. Dependency type, direction, condition, lag, criticality, and validity SHALL be explicit. Cycles MAY be valid but SHOULD be surfaced for governance review.

## 9. Resources and finance

### 9.1 Resource and capacity

`collective.resource` is an independently identified capability, asset, service, facility, or party capacity that may be allocated. `collective.capacity` is a quantity available for a Resource over an interval, using an externally governed unit and calendar.

### 9.2 Allocation

`collective.allocation` assigns a bounded quantity of Resource capacity to a recipient, Collective, WorkSubject, or WorkItem for an interval and purpose. It SHALL declare source, recipient, quantity, unit, interval, priority, owner, and provenance.

Over-allocation is not structurally invalid; it is a detectable conflict that SHALL be preserved and surfaced. Allocation SHALL NOT be stored on Membership or Assignment.

### 9.3 Budget, cost object, and funding allocation

`collective.budget` is an approved spending envelope with currency, period, owner, and constraints. `collective.costObject` is a reference boundary to a sovereign accounting classification. `collective.fundingAllocation` assigns an amount from a Budget to a Collective, WorkSubject, WorkItem, or CostObject.

CMM SHALL reference, not redefine, currency and ledger semantics. Funding SHALL NOT imply composition, authority, or accountability.

## 10. Performance

`collective.objective` states a desired outcome with owner, context, horizon, and status. `collective.metric` defines a measurement method, scale, unit, direction, and data authority. `collective.measurement` is an observed value for a Metric, target, interval, context, and provenance.

A Metric definition and a Measurement SHALL remain separate. Targets SHALL be distinguishable from observations. A Collective's purpose SHALL NOT be inferred solely from its metrics.

## 11. Events, temporal semantics, and lineage

Significant changes SHALL be representable as immutable Events. Event occurrence time and assertion time SHALL remain distinct. Corrections SHALL append a correcting event or new assertion and SHALL NOT erase the prior assertion.

Core event classes:

- CollectiveCreated, CollectiveKindChanged, CollectiveSuspended, CollectiveRetired;
- MembershipStarted, MembershipChanged, MembershipEnded;
- AssignmentStarted, AssignmentChanged, AssignmentEnded;
- MandateIssued, MandateRevoked;
- AuthorityGranted, AuthorityDelegated, AuthorityRevoked;
- AccountabilityAccepted, AccountabilityTransferred, AccountabilityEnded;
- AllocationCommitted, AllocationChanged, AllocationReleased;
- PolicyActivated, PolicySuperseded;
- ProjectionDisclosed, ConflictDetected, ConflictResolved.

Every assertion SHALL expose owner and provenance. Derived assertions SHALL identify their inputs and transformation. A consumer SHALL be able to determine origin, authority, time, context, and evolution without inspecting private data.

`collective.lineage` records the typed subject of a derived assertion, its one or more typed inputs, the transformation, and provenance. `collective.conflict` preserves the typed subject and at least two conflicting assertion references, conflict type, resolution state, detection time, optional resolution, and provenance. Detecting or resolving a Conflict SHALL append an Event; resolution SHALL NOT delete the conflicting assertions.

## 12. Contracts and projections

A Projection is a purpose-bound, context-specific view of a canonical object. It SHALL retain the subject's canonical identity and SHALL NOT become a second master.

Externally exchanged Projections SHALL be governed by a Semantic Contract. The Contract SHALL declare parties, purpose, permitted fields, prohibited uses, retention, onward disclosure, lifecycle, and termination conditions. Discovery of a schema SHALL NOT grant access to instance data.

Standard projection profiles:

- `collective.organizationChartProjection`: composition and named positions only;
- `collective.teamRosterProjection`: minimal membership and assignment data for an explicit operational purpose;
- `collective.authorityRegisterProjection`: active authority grants and delegation chain;
- `collective.accountabilityMapProjection`: accepted accountabilities for selected outcomes;
- `collective.capacityPlanProjection`: aggregated capacity and allocation, excluding unnecessary personal data;
- `collective.publicCollectiveProjection`: public identity, purpose, lifecycle, and approved contact surface.

## 13. Profiles

### 13.1 Core profile

Required: Party, Collective, StructureDimension, Membership, RoleDefinition, Position, Assignment, Mandate, AuthorityGrant, Accountability, Policy, structural relationships, context, lifecycle, provenance, and Core events.

### 13.2 Work profile

Adds WorkSubject, WorkItem, Commitment, and Dependency.

### 13.3 Resource profile

Adds Resource, Capacity, and Allocation.

### 13.4 Finance profile

Adds Budget, CostObject, and FundingAllocation, with external Currency and Ledger mappings.

### 13.5 Performance profile

Adds Objective, Metric, and Measurement.

### 13.6 Federation profile

Adds Semantic Contracts, Projection Profiles, schema discovery, version negotiation, and semantic mappings. MUFP conformance is separately declared.

## 14. Normative invariants

1. Every Object and association SHALL have a stable identifier.
2. Every public concept SHALL have exactly one immutable CSN.
3. Every significant assertion SHALL declare owner, provenance, context, valid time, and lifecycle where applicable.
4. Canonical identity SHALL survive display-name and Projection changes.
5. A Projection SHALL NOT redefine or own its subject.
6. A Party SHALL NOT be duplicated as local master data.
7. `composedOf` SHALL be acyclic within one composition context.
8. Coordination SHALL NOT imply composition.
9. Membership SHALL NOT imply employment, reporting, access, authority, accountability, allocation, or funding.
10. Assignment SHALL NOT imply membership unless an explicit valid Membership is referenced.
11. RoleDefinition, Position, Assignment, and Mandate SHALL remain distinct.
12. Leadership terminology SHALL NOT imply authority or accountability.
13. Reporting SHALL NOT imply authority or accountability.
14. AuthorityGrant SHALL identify grantor, grantee, decision domain, scope, interval, and provenance.
15. Delegated authority SHALL NOT exceed its parent grant and SHALL retain a traceable delegation chain.
16. Accountability SHALL identify an accountable subject, target, scope, interval, and acceptance state.
17. Authority and accountability SHALL NOT be inferred from each other.
18. Allocation SHALL be independent of Membership and Assignment.
19. Funding SHALL NOT imply authority, accountability, composition, or ownership.
20. Measurements SHALL retain metric, target, context, interval, and provenance.
21. Corrections SHALL preserve superseded assertions and their lineage.
22. Conflicting sovereign assertions SHALL be preserved with provenance until explicitly resolved.
23. Externally disclosed Projections SHALL declare purpose and governing Contract.
24. Schema discovery SHALL NOT disclose instance data or grant data access.
25. Imported concepts SHALL preserve namespace, version, owner, provenance, and fingerprint.
26. Half-open temporal intervals SHALL be used consistently; `validTo` is exclusive.
27. Simultaneous memberships, assignments, authority grants, and accountabilities MAY coexist when their scopes differ.
28. Constraints SHALL be evaluated within their declared context and SHALL NOT become universal by omission.
29. Polymorphic references SHALL preserve target identity and target type through `TypedReference`.
30. Scopes that affect authorization, accountability, policy, or conformance SHALL use comparable `Scope` values, not free text alone.
31. A Mandate SHALL NOT imply decision authority; any decision right requires a separate AuthorityGrant.
32. A link between authority and accountability SHALL be explicit and SHALL NOT be inferred from shared labels or reporting paths.

## 15. Matrix interpretation

The matrix is the superposition of independent graphs over shared identities:

```text
composition graph      Collective -> Collective
participation graph    Party -> Membership -> Collective
role graph             Party -> Assignment -> RoleDefinition/Position
reporting graph        Party/Position -> ReportingLine -> Party/Position
authority graph        Grantor -> AuthorityGrant -> Grantee + DecisionDomain
accountability graph   Accountable -> Accountability -> Outcome/Obligation
work graph             Collective/Party -> Commitment/WorkItem -> WorkSubject
allocation graph       Resource -> Allocation -> Collective/WorkSubject
funding graph          Budget -> FundingAllocation -> recipient
```

No graph is authoritative for another. A user interface MAY overlay graphs, but it SHALL preserve the underlying assertion types and provenance.

## 16. Extension rules

Extensions SHALL use their own namespace, SHALL NOT change the meaning of published `collective.*` CSNs, and SHOULD map to the nearest CMM concept before adding a new one. A new Collective kind MAY be added as a namespaced classifier. New relationship kinds SHALL state whether they imply any existing CMM relation; the default is no implication.

## 17. Versioning and migration

Published versions are immutable. Compatible concepts may be added in a MINOR release. Removing a concept, tightening required cardinality, changing an invariant, or changing a CSN is breaking. Breaking versions SHALL publish mappings and migration guidance. Deprecated concepts SHALL name a replacement and planned removal version.

## 18. Security and privacy

Implementations SHALL minimize disclosed fields by purpose. Sensitive Party, membership, allocation, performance, and authority data SHOULD be protected by explicit policy and contract. Authorization decisions SHALL use authoritative grants and policies, not organizational-chart inference. Audit logs SHOULD record disclosure, delegation, conflict resolution, and provenance changes.

## 19. Open issues for 0.3

- adopt canonical external connectors for Party, Project, Product, Currency, Units, Time, and Provenance;
- formalize SHACL or equivalent cross-record constraints;
- standardize decision-domain and membership-kind controlled vocabularies;
- publish migration and federation negotiation examples;
- seek independent conformance certification beyond the Claude/Grok design reviews recorded for 0.2.0.

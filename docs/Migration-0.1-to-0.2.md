# Migration from 0.1.0 to 0.2.0

Version 0.2.0 corrects contradictions between the normative specification, MUIF model, instance schema, and example. Stable object identifiers and unchanged `collective.*` CSNs preserve their meaning.

## Required instance changes

1. Set root `schemaVersion` to `0.2.0` and add `context.namespace`.
2. Replace Position `roleDefinitionRef: <id>` with `roleDefinitionRefs: [<id>]`.
3. Add first-class records to `mandates` and `decisionDomains` when authority depends on them.
4. In AuthorityGrant, rename free-text `decisionDomain` to `decisionDomainRef`, use TypedReference objects for `grantorRef` and `granteeRef`, and add `revocationState`.
5. Use TypedReference objects for polymorphic accountability subjects and Relationship `source`/`target` values.
6. Reference an explicit Resource from Allocation instead of using a Party identifier as an undeclared resource.
7. Rename Party and Collective semantic `owner` to `masterRef`; keep assertion ownership in `provenance.owner`.

## Temporal interpretation

All valid-time intervals are half-open: `[validFrom, validTo)`. An omitted `validTo` means open-ended. Existing finite end timestamps retain their values and are now interpreted exclusively.

## Compatibility note

This is an intentional breaking correction before 1.0.0. No automatic inference is permitted for Mandate, AuthorityGrant, Accountability, Membership, Assignment, Allocation, or funding during migration.

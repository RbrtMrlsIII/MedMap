# Skill 002 — Firestore Canonical Domain

## Purpose
Implement and verify canonical MedMap domain state.
## Based on
`docs/contracts/DOMAIN_MODEL.md` and Product Law canonical-state rules.
## Do
Define minimal documents, identity ownership, timestamps, indexes, validation boundaries, and durable read-back.
## Do not
Treat client state, MapLibre, Three.js, UI spreadsheets, or browser storage as domain authority.
## Verification
Independent durable read-back and authorization checks appropriate to the changed state.
## Evidence
Document/schema diff, focused test result, and durable read-back.
## Recovery
Roll back the smallest mutation that introduced invalid state; preserve the discrepancy.
## Exit criteria
The changed state has one declared canonical owner and verified persistence.

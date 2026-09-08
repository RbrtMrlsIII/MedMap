# Skill 003 — Authentication and Ownership

## Purpose
Implement Email/Google authentication and Patient/Clinic Owner authorization boundaries.
## Based on
Product Law authentication and owner rules plus `docs/contracts/DOMAIN_MODEL.md`.
## Do
Separate authentication from authorization; bind owner access to authenticated identity and canonical clinic ownership; enforce the booking auth gate.
## Do not
Authorize from hidden buttons, route secrecy, query parameters, client-provided claims, or local storage.
## Verification
Guest denial; patient identity flow; owner access; mutation authorization; booking cannot cross the auth gate.
## Evidence
Browser auth-flow evidence plus backend authorization evidence where implemented.
## Recovery
Remove or disable the smallest incorrect authorization path and re-test both allow and deny cases.
## Exit criteria
Identity and ownership decisions are independently enforced.

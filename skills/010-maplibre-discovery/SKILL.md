# Skill 010 — MapLibre Guest Discovery

## Purpose
Build the embedded geographic search/filter surface for guests inside the Three.js spatial website.
## Based on
`docs/contracts/MAP_SPATIAL.md` and Product Law discovery architecture.
## Do
Use MapLibre for geographic discovery, clinic points, search/filter presentation, selection, and geographic focus; synchronize map/list/selection; enter clinic context from a selected result.
## Do not
Use MapLibre as booking, ownership, subscription, or clinic-truth authority; turn geographic 3D into the authored apartment environment; require authentication merely to search.
## Verification
Guest search, filters, geographic selection, map/list synchronization, clinic entry, renderer degradation fallback.
## Recovery
Disable enhanced geographic presentation while preserving semantic clinic discovery.
## Evidence
Browser discovery interaction evidence and path/contract reconciliation.
## Exit criteria
A guest can discover and select a clinic independently of booking mutation.

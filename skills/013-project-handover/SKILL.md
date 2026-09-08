# Skill 013 — Full Project Handover

## Purpose
Produce the mandatory complete MedMap project ZIP after every project mutation.
## Based on
`POLICY.md` mandatory handover rule and `docs/project-guide/HandOver.md`.
## Do
Verify the changed slice; package the entire project root; confirm the archive opens; inspect the manifest; calculate a hash; record the exact source state and evidence; hand over the full ZIP.
## Do not
Package only changed files; omit docs/config/tests/assets; call a stale archive current; make the handover optional.
## Verification
Archive listing, extraction sanity, key-path presence, hash, and slice evidence.
## Recovery
Rebuild the archive from the current project root whenever the package does not exactly correspond to the accepted working state.
## Evidence
ZIP path, archive manifest summary, hash, verification result, and relevant commit/ref.
## Exit criteria
The full ZIP is available and corresponds to the exact working project state being handed over.

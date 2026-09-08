# Skill 012 — Accessibility and Verification

## Purpose
Verify each slice with evidence matched to the claim, including spatial degradation and accessibility.
## Based on
`docs/verification/PLAYWRIGHT.md`, feature contracts, Product Law, and current implementation evidence.
## Do
Use type/build checks for structure, contract tests for business rules, browser tests for UI, independent durable reads for persistence, representative viewport evidence, keyboard checks, and reduced-motion checks.
## Do not
Treat screenshots, a build, or a single browser engine as proof of backend persistence, authorization, payment, booking correctness, or all-device behavior.
## Verification
Record the exact claim, test path, environment, limitation, and observed result.
## Recovery
Narrow the claim to supported evidence, fix the smallest broken boundary, then re-run the affected verification.
## Evidence
Browser traces/screenshots, test output, durable read-back, or static evidence appropriate to the claim.
## Exit criteria
Evidence covers the slice's actual claims and no stronger claim is made.

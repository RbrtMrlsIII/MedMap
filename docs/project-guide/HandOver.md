# MedMap — Current Handover

## Current gate
`PHASE-002 — SPATIAL RUNTIME FOUNDATION — BASELINE IMPLEMENTATION READY FOR SLICE VERIFICATION`

## State

The baseline now uses Three.js with an explicit WebGL2 runtime for the authored spatial website environment. MapLibre remains an embedded guest geographic discovery/search/filter layer inside that spatial site. Product Law, Masterplan, Contracts, Skills, Policy, implementation, verification, and mandatory full-project handover are wired to the same architecture.

## Present baseline

- Three.js dependency added.
- Hero canvas explicitly requests WebGL2 and uses a Three.js `WebGLRenderer`.
- Three.js renderer is transparent so MapLibre can remain visible beneath the spatial layer.
- Initial coastal-apartment spatial environment with floor, architectural boundaries, glazing, structural elements, entrance frame, trees, and cinematic lights.
- Named presentation camera states for arrival, hall, discovery, clinic, and overview.
- Bounded scroll traversal and interruptible presentation target replacement.
- Active spatial objects with focus, transform, animation, and semantic child-UI reveal.
- Pointer look bounded as secondary presentation input.
- Reduced-motion path suppresses non-essential spatial motion.
- Canonical guest clinic surface remains Profile, Services, Booking, About, Contact.
- Guest discovery remains available without authentication.
- Booking authentication remains a later governed product phase.
- No internal messaging system.
- Approved clinic contact channels are a canonical product concept.
- Spreadsheet-like clinic booking operations and subscription intake allowance are product concepts carried into later backend phases.
- Multi-domain Skills directory established.
- Spatial runtime, camera/motion, site architecture, lighting/material contracts established.

## Explicitly not complete

- Live Firestore domain state.
- Firebase Authentication / Google/email provider integration.
- Canonical ownership enforcement.
- Live clinic registration/approval lifecycle.
- Production MapLibre search/filter data pipeline.
- Real availability calculation.
- Real booking acceptance/concurrency/idempotency.
- Clinic operational register backed by live bookings.
- PayPal subscription/webhook runtime.
- Production 3D asset pipeline, collision system, advanced room network, or final visual acceptance.

## Verification boundary

The repository has not been represented as build-verified in this handover. The available execution environment could not install the dependency tree, so local Next.js/TypeScript/Playwright runtime execution was not available. The implemented source, path wiring, and test expectations were reconciled statically. Fresh GitHub Actions verification is still required before any runtime acceptance claim.

## Mandatory handover

Every project mutation requires a complete project ZIP containing the whole working package, not only changed files.

## Next action

Verify the baseline slice in a dependency-capable environment, then branch the Masterplan context as needed for the next root: architectural camera constraints and room traversal before expanding the asset set.

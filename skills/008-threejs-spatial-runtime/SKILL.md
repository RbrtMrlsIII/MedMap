# Skill 008 — Three.js Spatial Runtime

## Purpose
Establish the real authored 3D website runtime using Three.js and WebGL2 before large environment construction.
## Based on
`docs/contracts/SPATIAL_3D_RUNTIME.md`, `docs/contracts/SPATIAL_SITE_ARCHITECTURE.md`, Product Law spatial architecture, and measured browser evidence.
## Do
Initialize a client-only Three.js renderer with an explicit WebGL2 context; own scene/camera/render lifecycle; cap DPR; resize to the visual container; use reusable geometry/materials; separate spatial presentation from domain data; preserve semantic DOM; expose a deterministic degradation boundary; dispose resources on teardown.
## Do not
Build the full apartment in this root slice; use CSS as the authored 3D environment; store booking/availability/ownership truth in meshes; allocate geometry every frame; make the canvas the only route to critical actions; introduce a second hidden rendering architecture.
## Verification
Renderer boot, WebGL2 capability, transparent compositing over MapLibre, resize, DPR cap, render-loop stability, cleanup, graceful WebGL2 failure, semantic fallback.
## Recovery
Disable spatial rendering and preserve the semantic application shell and guest discovery path.
## Evidence
Browser/runtime evidence plus changed-file/path audit.
## Exit criteria
A clean reusable Three.js WebGL2 runtime seam exists and can support rooms, objects, and camera work without architectural rewrites.

# Contract — Three.js Spatial Runtime

## Purpose
Define the technical seam for the authored 3D environment.

## Based on
- Product Law spatial architecture;
- `SPATIAL_SITE_ARCHITECTURE.md`;
- `SPATIAL_MESH_SYSTEM.md`;
- Three.js renderer/scene/camera lifecycle conventions;
- measured browser/device evidence.

## Required runtime responsibilities
- initialize Three.js only on the client;
- explicitly request and use WebGL2;
- own scene, renderer, camera, and animation lifecycle;
- resize to the visual container;
- cap device pixel ratio;
- keep the spatial canvas transparent when layered over MapLibre;
- render without per-frame scene-graph churn;
- dispose geometry/material/texture resources when replaced;
- handle WebGL2 failure/degradation;
- expose stable instrumentation for tests where practical.

## Runtime split

```text
Three.js
  = authored spatial environment / architecture / objects / lighting

MapLibre
  = guest geographic discovery / filtering / clinic selection

React / HTML / CSS
  = semantic navigation / forms / accessibility / core actions

Firestore / trusted backend
  = canonical product state
```

## Do
- keep domain state outside Three.js;
- use reusable geometry/materials;
- build assets from declared scene roles;
- separate camera state from mesh generation;
- preserve semantic DOM fallback;
- keep WebGL failure non-fatal to guest discovery.

## Do not
- store booking truth in mesh state;
- make object brightness hidden availability state;
- allocate geometry every animation frame;
- make the canvas the only route to a core product action;
- make Three.js opaque when MapLibre is intended to remain visible beneath it;
- add a second undisclosed rendering architecture.

## Exit
Renderer root, lifecycle, responsive resize, transparent compositing, failure handling, cleanup, and semantic fallback are verified before architectural complexity increases.

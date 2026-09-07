# Contract — MapLibre Spatial Surface

## Purpose

Make the map the primary discovery surface without allowing presentation state to become domain authority.

## Canonical technology

MapLibre GL JS is the selected browser mapping engine. It renders interactive vector-tile maps in WebGL; its style document controls appearance. The product does not depend on Google Maps. citeturn183718search12

## Responsibilities

Map layer owns:

- viewport and camera state;
- panning/zooming/3D pitch and bearing;
- clinic marker rendering and clustering;
- selection/highlight state;
- spatial filters and visible-result presentation;
- optional terrain/building/3D visual effects where legally and technically appropriate;
- accessible non-map alternatives for the same discovery results.

Domain layer owns:

- whether a clinic exists;
- clinic status;
- treatment availability;
- booking eligibility;
- prices and price-display state;
- canonical address/coordinates;
- availability and booking outcomes.

## Discovery query

The map receives a bounded set of discovery records appropriate to the active viewport and filters. It should not subscribe to every clinic's full profile or booking state merely because the map is open.

## Map/detail synchronization

Selecting a marker must select the corresponding clinic result. Selecting a list card must focus the marker/camera. Neither action changes canonical clinic or booking state.

## 3D principles

3D is an experience layer, not a requirement for basic usability. The application must remain understandable and usable without tilt/terrain effects, and reduced-motion preferences must be respected.

MedMap's authored spatial Hero additionally uses a dedicated WebGL2 scene for 3D meshes. This mesh scene is a presentation layer separate from MapLibre geography and must not become a hidden source of clinic/domain state.

The runtime must support graceful degradation when WebGL2 is unavailable. Critical labels, actions, and clinic information remain available in semantic HTML outside the canvas.

## Mesh principles

The first authored mesh set should be deliberately small and reusable. Prefer a few low-poly, performance-bounded environment primitives over a large asset catalog.

Meshes may represent clinic architecture, spatial landmarks, discovery beacons, or decorative environment geometry. They must not encode authoritative availability, entitlement, booking, or ownership state through geometry alone.

External mesh-generation workflows, including Meshy or Blender, are optional production paths. Any generated asset must retain provenance, declared dimensions/topology budgets, and a review gate before becoming a runtime asset. Procedural meshes are acceptable for early frontend prototypes.

## Asset direction

The frontend-first asset set is:

1. map style and basemap tiles;
2. clinic marker system;
3. authored WebGL2 mesh environment for the Hero;
4. subtle spatial-glass panels;
5. clinic photo/identity media;
6. richer imported 3D assets only after runtime budgets and spatial usefulness are demonstrated.

Do not allow decorative 3D assets to become prerequisites for booking correctness.

# Contract — MedMap Spatial Mesh System

## Purpose

Define how MedMap will use authored WebGL meshes alongside MapLibre without turning the 3D layer into a second application data model.

## Runtime split

```text
MapLibre GL JS
  = geography, viewport, map camera, clinic points

WebGL mesh scene
  = authored spatial environment, landmark geometry, depth, lighting cues

HTML / React
  = accessible labels, navigation, search, clinic semantics, actions

Firestore later
  = canonical clinic/domain truth
```

## Mesh classes

The first reusable mesh kit is intentionally small:

1. Ground / podium slab
2. Clinic mass
3. Entrance / portal
4. Window / glazing frame
5. Landmark beacon
6. Wayfinding marker housing
7. Decorative skyline mass

Every mesh must have a declared purpose and may be reused across multiple clinics or scene states.

## Hero composition

The default Hero reserves a clear arrival corridor from the primary content plane toward the featured clinic object.

The featured clinic object should read through silhouette, height, entrance, and one restrained identity cue before any detailed text is considered.

Decorative geometry must remain outside the primary interaction reserve and must never occlude search, navigation, clinic entry, or accessible alternatives.

## Asset provenance

Procedural geometry may be used for the first proof-of-concept.

Future authored or generated GLB assets MUST retain provenance metadata and an explicit source/approval state before becoming canonical runtime assets.

Generated meshes are additive presentation assets. They do not define clinic identity, service availability, price, booking state, ownership, or subscription state.

## Performance budget

The initial Hero target is deliberately conservative:

- desktop initial mesh scene: <= 75k triangles;
- mobile initial mesh scene: <= 35k triangles;
- avoid per-frame geometry allocation;
- prefer shared buffers/materials for repeated forms;
- device pixel ratio is capped at 2;
- animation must pause or reduce under `prefers-reduced-motion`;
- a missing or failed WebGL2 context must leave the underlying semantic HTML experience usable.

These are prototype budgets, not final production limits. Raise them only with measured evidence from representative devices.

## Camera and composition

The authored mesh scene uses its own camera transform and is visually coordinated with the MapLibre pitched map layer.

The two cameras are not treated as one shared domain state. Synchronization is presentation-only.

## Accessibility / fallback

All information required to discover or enter a clinic MUST exist outside the canvas in semantic HTML.

The mesh canvas is `aria-hidden` when it is decorative. Any future interactive mesh object must have a semantic HTML control or equivalent accessible representation.

When WebGL2 is unavailable, the application must retain the map, clinic cards, navigation, and clinic route without blocking the user.

## Verification obligations

- TypeScript/build passes.
- Playwright confirms WebGL2 initialization in the supported browser target.
- Playwright confirms the mesh canvas is present without replacing semantic clinic controls.
- Reduced-motion mode prevents continuous scene rotation.
- Responsive screenshots are reviewed for desktop and narrow mobile layouts.
- Mesh budgets are documented before importing larger authored assets.

## Non-goals

This contract does not authorize Firestore writes, real booking acceptance, authentication, subscriptions, payment handling, or clinical decision support.

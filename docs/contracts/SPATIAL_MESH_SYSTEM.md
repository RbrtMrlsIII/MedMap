# Contract — MedMap Spatial Mesh System

## Purpose

Define how MedMap will use authored WebGL meshes alongside MapLibre without turning the 3D layer into a second application data model.

## Runtime split

```text
MapLibre GL JS
  = geography, viewport, map camera, clinic points

WebGL mesh scene
  = authored spatial environment, landmark geometry, depth, lighting cues

Spatial camera rig
  = presentation-only POV, focus transitions, bounded traversal

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

The authored mesh scene uses a dedicated spatial camera rig and is visually coordinated with the MapLibre pitched map layer.

The two cameras are not treated as one shared domain state. Synchronization is presentation-only.

The spatial camera must use named bounded poses rather than arbitrary per-frame transforms. The initial pose set is:

- `arrival`: canonical Hero opening composition;
- `focus`: featured-clinic emphasis composition;
- `overview`: wider discovery composition for traversal.

Each pose declares orientation, distance, and look-at target. A newer requested pose replaces the previous target and the camera damps toward it, so transitions remain interruptible and do not depend on a fixed frame count.

## Traversal

The initial traversal model is scroll-driven and bounded to the Hero section. Scroll position selects a point between the `arrival` and `overview` poses. Pointer position may add a small secondary look offset, but it must not be required to perceive or understand the scene.

Future free-traversal experiments may add bounded orbit, pan, or dolly controls. Such controls must not capture or block semantic page actions.

## Animation

Ambient mesh animation may provide subtle authored life, such as restrained emissive pulsing.

Camera motion is state-driven and damped. Mesh buffers remain static during the frame loop.

When `prefers-reduced-motion: reduce` is active:

- continuous camera parallax is disabled;
- continuous emissive pulsing is disabled;
- CSS transition effects are disabled by the existing Hero contract;
- the scene remains perceivable in a stable pose.

## Accessibility / fallback

All information required to discover or enter a clinic MUST exist outside the canvas in semantic HTML.

The mesh canvas is `aria-hidden` when it is decorative. Any future interactive mesh object must have a semantic HTML control or equivalent accessible representation.

When WebGL2 is unavailable, the application must retain the map, clinic cards, navigation, and clinic route without blocking the user.

## Verification obligations

### Geometry

- TypeScript/build passes.
- Playwright verifies WebGL2 initialization in the supported browser target.
- Playwright verifies declared mesh count and triangle budget.

### Camera POV

- Playwright verifies the initial `arrival` POV.
- Focus of the featured clinic moves the spatial camera into `focus` without replacing the semantic control.
- Camera yaw, pitch, and distance remain inside declared bounds.

### Transition

- A focus transition must visibly change camera state through the published `data-camera-pov`/pose attributes.
- New target state interrupts the previous target rather than queueing unbounded animation work.

### Traversal

- Scroll traversal changes `data-camera-progress` within `[0, 1]`.
- Traversal enters `overview` after the defined threshold.
- Camera distance stays between the declared arrival/focus/overview bounds.

### Motion reduction

- Reduced-motion mode prevents continuous scene rotation and emissive pulsing.
- Semantic HTML controls remain usable independently of the canvas.

### Visual

- Responsive screenshots are reviewed for desktop and narrow mobile layouts.
- Visual review checks silhouette, entrance readability, horizon, focal hierarchy, occlusion, and mobile stacking.

## Non-goals

This contract does not authorize Firestore writes, real booking acceptance, authentication, subscriptions, payment handling, or clinical decision support.

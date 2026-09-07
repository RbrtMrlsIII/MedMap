# Spatial Rendering Benchmark

## Purpose

MedMap's 3D Hero is being developed against established open-source spatial rendering patterns rather than inventing camera, transition, traversal, and validation rules in isolation.

## Reference roots

### MapLibre GL JS

MapLibre owns geography, map viewport state, map pitch/bearing, terrain/projection, and geographic clinic anchors. Its custom-layer model passes the authoritative frame projection into WebGL rendering. MapLibre maintainers and current issues also show that custom 3D layers must treat the per-frame projection/matrix and projection transitions as authoritative; stale camera values can visibly drift from the rendered frame.

Reference: https://github.com/maplibre/maplibre-gl-js

Reference issue: https://github.com/maplibre/maplibre-gl-js/issues/5117

### New York Times `three-story-controls`

The camera is separated into a rig and control schemes. Its roots are explicit camera actions such as pan, tilt, roll, pedestal, truck, and dolly. It also models StoryPoints, PathPoints, scroll-scrubbed camera paths, free movement, and damped input adaptors. Camera helper tooling records points of interest and animation paths as data instead of burying camera motion inside render code.

Reference: https://github.com/nytimes/three-story-controls

### Three.js `OrbitControls`

Three.js treats damping as part of the camera-control layer rather than mesh animation itself. Damping is updated every render tick and can be constrained through target, pan, rotate, and zoom limits.

Reference: https://github.com/mrdoob/three.js/blob/dev/docs/pages/OrbitControls.html.md

### React Three Fiber / Drei `CameraControls`

Drei exposes camera controls as a distinct system with explicit user input mappings and lifecycle events such as wake/rest/sleep. This reinforces the separation between scene content and camera control state.

Reference: https://github.com/pmndrs/drei/blob/master/docs/controls/camera-controls.mdx

## MedMap interpretation

MedMap should retain its current three-layer authority split:

```text
MapLibre
  geography + map viewport + geographic camera

Spatial camera rig
  Hero POV + transitions + traversal + presentation-only focus

WebGL meshes
  environment geometry + lighting + landmarks

HTML / React
  semantic clinic information + navigation + actions
```

The spatial camera is therefore not another source of clinic truth. It is a presentation rig.

## Camera POV model

The initial Hero uses named presentation poses rather than arbitrary per-frame transforms:

- `arrival`: canonical opening view, clinic corridor visible;
- `focus`: featured-clinic emphasis view;
- `overview`: wider discovery view used by scroll traversal.

Each pose defines orientation, distance, and look-at target. Transitions interpolate between poses instead of snapping mesh transforms.

## Transition model

Transitions must be:

1. state-driven;
2. interruptible by a newer target state;
3. eased/damped rather than frame-count-dependent;
4. presentation-only;
5. disabled or reduced under `prefers-reduced-motion`.

## Traversal model

Scroll traversal follows the pattern used by spatial storytelling systems: the page scroll position selects a point along a bounded camera journey while the camera rig smooths toward the resulting pose. Pointer movement may add a very small secondary look offset, but it must never become the only way to perceive the scene.

Future free-traversal experiments may use pan/orbit/dolly controls, but those controls must be bounded and must not capture or block semantic page actions.

## Animation model

Ambient animation is reserved for subtle authored motion such as beacon pulses or low-amplitude scene drift. Geometry must remain static and reusable between frames. Continuous animation is paused or reduced under reduced-motion preferences.

## Validation model

The validation ladder is:

```text
Geometry truth
  -> declared mesh count / triangle budget

Camera truth
  -> valid named POV + bounded pose values

Transition truth
  -> state change reaches target without snap / invalid state

Traversal truth
  -> scroll changes camera state inside declared bounds

Accessibility truth
  -> canvas remains decorative; semantic controls stay independently usable

Fallback truth
  -> WebGL2 failure leaves the HTML/map experience usable

Runtime truth
  -> Playwright/browser verifies actual WebGL2 initialization and representative camera state
```

Visual review remains mandatory for composition, occlusion, horizon placement, focal hierarchy, and mobile stacking. Browser assertions complement visual review and do not replace it.

## Current prototype boundary

This benchmark does not authorize Firestore, Firebase Auth, live availability, booking acceptance, subscriptions, payments, clinical decision support, or clinic identity writes. Those remain outside the spatial frontend gate.

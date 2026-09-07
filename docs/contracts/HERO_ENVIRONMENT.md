# Contract — Spatial 3D Glass Hero Environment

## Purpose

Define the first visual product gate for MedMap: a spatial Hero environment that makes the map, clinic identity, discovery action, and clinic entry feel like one coherent place without pretending that visual state is backend truth.

## Spatial rendering architecture

The final MedMap spatial environment is a **WebGL + mesh composition**.

```text
MAPLIBRE WEBGL GEOGRAPHIC LAYER
            ↓
   spatial camera / map context
            ↓
WEBGL MESH SCENE / CLINIC DIORAMA
            ↓
 glass materials / lighting / depth
            ↓
interactive clinic objects / markers
            ↓
clinical glass navigation + discovery UI
```

Responsibilities are deliberately separated:

- **MapLibre GL JS/WebGL** provides geographic context, camera/navigation primitives, map rendering, and map-space positioning.
- **WebGL mesh rendering** provides the authored spatial environment, clinic-scale objects, architectural forms, treatment/service visualization primitives, lighting, depth, and other non-map 3D scene elements.
- **Clinic/domain data** remains outside both renderers and will later be supplied by canonical application state.
- **HTML/CSS UI** remains responsible for readable controls, semantic navigation, accessible copy, forms, and critical state labels.

The visual implementation MUST NOT reduce the final environment to CSS transforms alone. CSS glass UI remains appropriate for interface surfaces, while persistent spatial objects belong in the WebGL/mesh layer.

## Canonical composition

```text
MAPLIBRE WEBGL SCENE
        ↓
spatial atmosphere / pitched 3D camera
        ↓
WEBGL MESH ENVIRONMENT
        ↓
clinical glass navigation
        ↓
primary discovery Hero
        ↓
interactive clinic object / Hero focus
        ↓
floating clinic Hero card / inspector
        ↓
clinic entry or discovery content
```

## Visual responsibilities

The Hero MUST communicate:

- MedMap identity;
- map-first clinic discovery;
- a primary search/discovery action;
- geographic/spatial context;
- one canonical featured-clinic presentation using the same public clinic concepts as the eventual clinic page;
- enough labeling that visual effects are not mistaken for booking, ownership, entitlement, or availability truth.

The mesh environment SHOULD make the featured clinic feel like a place the user is entering rather than a decorative card floating over a map.

## Mesh and WebGL rules

Meshes MUST have explicit ownership by visual role. Example roles include clinic building shells, interior/service zones, wayfinding elements, terrain/platform geometry, and lightweight ambient geometry.

Mesh geometry MUST remain presentation-only until connected to canonical clinic/domain state.

The first authored mesh set SHOULD be small and reusable. Favor modular geometry, instancing, LOD-friendly forms, and bounded material complexity over a large bespoke scene.

Interactive mesh targets MUST have an explicit mapping back to a stable presentation identifier. A rendered object MUST NOT become a second source of clinic or service truth.

WebGL rendering MUST degrade gracefully when unavailable. Core navigation, clinic identity, critical labels, and discovery actions must remain understandable without the mesh layer.

## Glass-skeuomorphic rules

Use restrained translucency, layered depth, soft physical edges, depth-aware shadows, spatial overlays, and tangible controls.

The visual language should feel like a navigation instrument rather than a conventional dashboard.

Avoid ornamental complexity that hides controls, creates low contrast, overwhelms the map, or turns the spatial layer into background wallpaper.

## Map rules

MapLibre/WebGL is the geographic spatial presentation authority.

It does not own clinic identity, service state, availability, booking, ownership, entitlement, or subscription truth.

The current visual prototype MAY use demo clinic points. Demo points MUST remain clearly identified as prototype data until canonical Firestore integration exists.

Clinic markers may use custom HTML/CSS presentations, popups, camera focus, clustering, mesh-linked focus states, and other MapLibre capabilities as long as those capabilities remain presentation behavior.

## Clinic Hero relationship

The landing-page Hero may feature one clinic as a discovery example. The eventual clinic detail page has exactly one canonical clinic Hero.

Both Hero surfaces MUST derive from the same eventual clinic data concepts. Neither becomes an independent clinic-data source.

## Frontend-first scope

The current approved gate is **visual frontend construction**.

This gate authorizes:

```text
MapLibre scene
WebGL mesh scene and authored mesh primitives
3D camera / pitch / spatial overlays
Hero composition
clinic marker and mesh-object presentation
clinic Hero preview
clinic page guest navigation shell
responsive behavior
reduced-motion behavior
WebGL degradation behavior
```

This gate does NOT authorize:

```text
Firestore writes
clinic ownership mutation
real booking creation
subscription activation
PayPal processing
clinical decision support
```

Those belong to later governed gates.

## Motion and accessibility

The Hero MUST support reduced-motion behavior and remain understandable when pitch, blur, depth, WebGL effects, or other spatial effects are reduced or unavailable.

Interactive controls MUST remain reachable by keyboard and retain understandable focus/state presentation.

Critical information MUST remain available in semantic HTML and MUST NOT exist only inside a canvas texture or mesh label.

## Performance baseline

The spatial scene MUST be treated as a bounded rendering budget.

- Prefer a small number of reusable materials.
- Avoid unnecessary high-poly geometry for decorative objects.
- Keep scene initialization isolated from the core page shell.
- Lazy-load heavyweight mesh assets when appropriate.
- Prefer compressed/optimized mesh assets once real assets are introduced.
- Do not load a large asset library merely to prove the concept of the Hero.

Performance evidence belongs to the visual gate and SHOULD include first-load behavior, interaction responsiveness, and degraded-mode behavior on representative browser/device profiles.

## Verification obligations

- TypeScript/build passes when the repository environment is available.
- Browser verification confirms the Hero loads, the MapLibre canvas renders, the WebGL/mesh scene initializes when supported, primary discovery CTA is reachable, custom clinic markers are visible, and the featured clinic presentation is legible.
- Browser verification confirms the clinic entry route exposes the five guest responsibilities: Profile, Services, Booking, About, Contact.
- Reduced-motion/degraded visual behavior is checked.
- WebGL-unavailable or degraded rendering leaves core clinic discovery and navigation usable.
- No visual artifact is interpreted as backend availability, authorization, entitlement, or booking proof.

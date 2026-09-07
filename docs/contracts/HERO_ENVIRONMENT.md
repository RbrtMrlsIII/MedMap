# Contract — Spatial 3D Glass Hero Environment

## Purpose

Define the first visual product gate for MedMap: a spatial Hero environment that makes the map, clinic identity, discovery action, and clinic entry feel like one coherent place without pretending that visual state is backend truth.

## Canonical composition

```text
MAPLIBRE WEBGL SCENE
        ↓
spatial atmosphere / pitched 3D camera
        ↓
clinical glass navigation
        ↓
primary discovery Hero
        ↓
floating clinic Hero card
        ↓
spatial inspector / status HUD
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

## Glass-skeuomorphic rules

Use restrained translucency, layered depth, soft physical edges, depth-aware shadows, spatial overlays, and tangible controls.

The visual language should feel like a navigation instrument rather than a conventional dashboard.

Avoid ornamental complexity that hides controls, creates low contrast, overwhelms the map, or turns the spatial layer into background wallpaper.

## Map rules

MapLibre/WebGL is the spatial presentation authority.

It does not own clinic identity, service state, availability, booking, ownership, entitlement, or subscription truth.

The current visual prototype MAY use demo clinic points. Demo points MUST remain clearly identified as prototype data until canonical Firestore integration exists.

Clinic markers may use custom HTML/CSS presentations, popups, camera focus, clustering, and other MapLibre capabilities as long as those capabilities remain presentation behavior.

## Clinic Hero relationship

The landing-page Hero may feature one clinic as a discovery example. The eventual clinic detail page has exactly one canonical clinic Hero.

Both Hero surfaces MUST derive from the same eventual clinic data concepts. Neither becomes an independent clinic-data source.

## Frontend-first scope

The current approved gate is **visual frontend construction**.

This gate authorizes:

```text
MapLibre scene
3D camera / pitch / spatial overlays
Hero composition
clinic marker presentation
clinic Hero preview
clinic page guest navigation shell
responsive behavior
reduced-motion behavior
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

The Hero MUST support reduced-motion behavior and remain understandable when pitch, blur, depth, or other spatial effects are reduced or unavailable.

Interactive controls MUST remain reachable by keyboard and retain understandable focus/state presentation.

## Verification obligations

- TypeScript/build passes when the repository environment is available.
- Browser verification confirms the Hero loads, the MapLibre canvas renders, primary discovery CTA is reachable, custom clinic markers are visible, and the featured clinic card is legible.
- Browser verification confirms the clinic entry route exposes the five guest responsibilities: Profile, Services, Booking, About, Contact.
- Reduced-motion/degraded visual behavior is checked.
- No visual artifact is interpreted as backend availability, authorization, entitlement, or booking proof.

# Contract — Spatial 3D Glass Hero Environment

## Purpose

Define the first visual product gate for MedMap: a spatial Hero environment that makes the map, clinic identity, and discovery action feel like one coherent place without pretending that visual state is backend truth.

## Canonical composition

```text
MAPLIBRE WEBGL SCENE
        ↓
spatial atmosphere / 3D camera
        ↓
transparent glass navigation
        ↓
primary discovery Hero
        ↓
floating clinic Hero card
        ↓
spatial status HUD
        ↓
transition into discovery content
```

## Visual responsibilities

The Hero MUST communicate:

- MedMap identity;
- map-first clinic discovery;
- a primary search/discovery action;
- a sense of geographic/spatial context;
- one canonical featured clinic presentation using the same public clinic concepts as the eventual clinic page;
- enough state labeling that visual effects are not mistaken for booking or authorization truth.

## Glass-skeuomorphic rules

Use restrained translucency, layered depth, soft physical edges, depth-aware shadows, and tangible controls.

Avoid ornamental complexity that hides controls, causes low contrast, or turns the map into background wallpaper.

## Map rules

MapLibre/WebGL is presentation authority for the spatial scene. It does not own clinic, availability, booking, or subscription state.

The prototype may use demo clinic points. Demo points MUST be clearly treated as prototype data until Firestore integration is implemented.

## Motion and accessibility

The Hero MUST support reduced-motion behavior and remain understandable when pitch, 3D, blur, or other spatial effects are reduced or unavailable.

## Clinic Hero relationship

The Hero shown on the landing page may feature a clinic as an example. The eventual clinic detail page has exactly one canonical clinic hero. Neither Hero may become an independent clinic-data source.

## Current scope boundary

This contract covers visual/frontend composition only. It does not authorize booking writes, ownership mutations, Firestore integration, payment logic, or clinical decision support.

## Verification obligations

- TypeScript/build passes when environment is available.
- Browser check confirms the Hero loads, map canvas renders, primary CTA is reachable, and the clinic card is legible.
- Reduced-motion/degraded visual behavior is checked.
- No browser visual is interpreted as backend availability or booking proof.

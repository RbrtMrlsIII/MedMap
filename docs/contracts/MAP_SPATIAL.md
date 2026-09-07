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

## Asset direction

The first asset set should be deliberately small:

1. map style and basemap tiles;
2. clinic marker system;
3. subtle spatial-glass panels;
4. clinic photo/identity media;
5. optional 3D decorative scene elements only after the core map and booking flow are stable.

Do not allow decorative 3D assets to become prerequisites for booking correctness.

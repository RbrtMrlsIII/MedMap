# Contract — Spatial Lighting and Materials

## Purpose
Define the cinematic visual system without allowing atmosphere to overwhelm clinical readability.

## Theme
Modern coastal minimalism: light architectural surfaces, warm wood, glass, natural greenery, beach/coastal horizon cues, restrained blue-green medical accents.

## Lighting concerns
Every new material, texture, or light change must consider:

```text
exposure
contrast
roughness
reflection
transparency
shadow softness
color balance
UI readability
```

## Do
- establish a primary readable light direction;
- use fill/bounce to protect shadow detail;
- keep glass readable through controlled contrast rather than maximal transparency;
- reserve stronger accents for interaction/focus states;
- validate lighting and materials on representative narrow and wide layouts.

## Do not
- use glare as a navigation cue;
- use emissive brightness as domain truth;
- let reflective surfaces hide semantic labels;
- tune lighting on a single viewport only.

## Verification
Visual evidence must cover idle/focus states, representative desktop and narrow mobile compositions, reduced motion, and degraded renderer behavior.

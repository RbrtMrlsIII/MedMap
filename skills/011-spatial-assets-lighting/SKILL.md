# Skill 011 — Spatial Assets, Lighting, and Materials

## Purpose
Author and integrate Three.js assets, textures, lighting, glass, and materials for the coastal apartment theme.
## Based on
`docs/contracts/SPATIAL_LIGHTING_MATERIALS.md`, `docs/contracts/SPATIAL_3D_RUNTIME.md`, Product Law theme and information hierarchy.
## Do
Track provenance; declare visual role and topology/texture budget; establish key/fill/rim relationships; tune roughness, reflection, transparency, exposure, and contrast together; test narrow and wide viewports.
## Do not
Import arbitrary assets without provenance; use glare/reflection as navigation; use emissive intensity as domain truth; let glass or lighting hide semantic UI; optimize only for one viewport.
## Verification
Idle/focus/reduced-motion screenshots, material and UI contrast review, asset provenance, representative viewport performance evidence.
## Recovery
Fall back to the nearest approved material/light configuration and remove the smallest problematic asset or effect.
## Evidence
Asset manifest/provenance and visual/performance evidence.
## Exit criteria
Assets and lighting support navigation and meaning without sacrificing clinical readability or runtime performance.

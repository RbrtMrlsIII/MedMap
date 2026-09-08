# MedMap Skill Wiring

This file maps product/contract work to the Skill that explains how the work is performed. It is wiring, not authority.

| Work class | Contract / authority | Skill | Primary evidence |
|---|---|---|---|
| Product/execution governance | `PRODUCT_LAW.md`, `POLICY.md` | `skills/001-product-governance/SKILL.md` | reconciliation + path audit |
| Firestore canonical data | `docs/contracts/DOMAIN_MODEL.md` | `skills/002-firestore-domain/SKILL.md` | durable read-back |
| Auth / ownership | `docs/contracts/DOMAIN_MODEL.md` + Product Law | `skills/003-auth-ownership/SKILL.md` | auth + authorization tests |
| Clinic public/editor surface | `docs/contracts/CLINIC_PROFILE_SURFACE.md` | `skills/004-clinic-surface/SKILL.md` | route/surface/owner tests |
| Availability / booking correctness | `docs/contracts/BOOKING_AVAILABILITY.md` | `skills/005-booking-availability/SKILL.md` | contract + race/idempotency tests |
| Clinic booking operations | Product Law + booking contracts | `skills/006-clinic-operations/SKILL.md` | operational round-trip/read-back |
| Subscription / commerce | `docs/contracts/CLINIC_SUBSCRIPTIONS.md` | `skills/007-subscription-commerce/SKILL.md` | event tests + projection read-back |
| Three.js spatial runtime | `docs/contracts/SPATIAL_3D_RUNTIME.md`, `docs/contracts/SPATIAL_SITE_ARCHITECTURE.md` | `skills/008-threejs-spatial-runtime/SKILL.md` | runtime + renderer evidence |
| Camera / motion / traversal | `docs/contracts/SPATIAL_CAMERA_MOTION.md` | `skills/009-spatial-camera-motion/SKILL.md` | state/interaction/accessibility evidence |
| MapLibre guest discovery | `docs/contracts/MAP_SPATIAL.md` | `skills/010-maplibre-discovery/SKILL.md` | search/filter/map interaction evidence |
| Assets / lighting / materials | `docs/contracts/SPATIAL_LIGHTING_MATERIALS.md` | `skills/011-spatial-assets-lighting/SKILL.md` | visual/performance evidence |
| Accessibility / verification | `docs/verification/PLAYWRIGHT.md` + feature contracts | `skills/012-accessibility-verification/SKILL.md` | browser/device/accessibility evidence |
| Full project handover | `POLICY.md` | `skills/013-project-handover/SKILL.md` | complete ZIP + manifest/hash |

## Skill rule

A Skill defines **how to perform**, **what it is based on**, **what to do**, **what not to do**, **how to verify**, **how to recover**, and **what evidence to leave**. A Skill never grants product permission.

## Numbering rule

Skill numbers identify reusable development roots. The Masterplan determines chronological invocation order. Numbers do not override chronology.

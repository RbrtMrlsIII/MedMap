# MedMap Skill Wiring

This is the navigation map, not a source of product authority. `PRODUCT_LAW.md` remains authoritative.

| Work class | Canonical contract | Skill/domain needed | Verification |
|---|---|---|---|
| Governance change | Product Law / Masterplan | governance skill when established | document read-back + reconciliation |
| Firestore domain state | `DOMAIN_MODEL.md` | Firebase/Firestore data skill | independent read-back |
| Availability | `BOOKING_AVAILABILITY.md` | booking/availability skill | contract tests + race tests |
| MapLibre UI | `MAP_SPATIAL.md` | map/frontend skill | browser visual/interaction check |
| Spatial Hero environment | `HERO_ENVIRONMENT.md` | spatial-hero/frontend skill | browser visual + reduced-motion check |
| Clinic configuration | `CLINIC_PROFILE_SURFACE.md` + `DOMAIN_MODEL.md` | clinic-management skill | configuration round-trip + authorization check |
| Clinic page guest tabs | `CLINIC_PROFILE_SURFACE.md` | clinic-surface/frontend skill | guest tab browser check |
| Owner-only Edit | `CLINIC_PROFILE_SURFACE.md` | ownership/authorization skill | unauthorized route/write test |
| PayPal subscriptions | `CLINIC_SUBSCRIPTIONS.md` | commerce/webhook skill | webhook tests + durable projection read-back |
| Storage/media | Product Law | storage skill | upload/read policy verification |
| Customer booking UX | booking + map + clinic-surface contracts | frontend/booking skill | browser end-to-end flow |

## Execution rule

Every recurring bounded procedure should resolve to a concrete skill before it becomes dependent on repeated ad-hoc instructions. A skill describes how authorized work is performed; it does not grant permission or override Product Law.

## First skills to establish

1. booking availability and race-safety;
2. Firestore canonical-state operations;
3. clinic profile/surface and owner authorization;
4. MapLibre spatial/frontend implementation;
5. spatial Hero environment;
6. PayPal webhook boundary;
7. verification and browser evidence.

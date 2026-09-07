# MedMap Skill Wiring

This is the navigation map, not a source of product authority. `PRODUCT_LAW.md` remains authoritative.

| Work class | Canonical contract | Skill/domain needed | Verification |
|---|---|---|---|
| Governance change | Product Law / Masterplan | governance skill when established | document read-back + reconciliation |
| Firestore domain state | `DOMAIN_MODEL.md` | Firebase/Firestore data skill | independent read-back |
| Availability | `BOOKING_AVAILABILITY.md` | booking/availability skill | contract tests + race tests |
| MapLibre UI | `MAP_SPATIAL.md` | map/frontend skill | browser visual/interaction check |
| Clinic configuration | `BOOKING_AVAILABILITY.md` | clinic-management skill | configuration round-trip |
| PayPal subscriptions | `CLINIC_SUBSCRIPTIONS.md` | commerce/webhook skill | webhook tests + durable projection read-back |
| Storage/media | Product Law | storage skill | upload/read/delete policy verification |
| Customer booking UX | booking + map contracts | frontend/booking skill | browser end-to-end flow |

## Execution rule

Every recurring bounded procedure should resolve to a concrete skill before it becomes dependent on repeated ad-hoc instructions. A skill describes how authorized work is performed; it does not grant permission or override Product Law.

## First skills to establish

1. booking availability and race-safety;
2. Firestore canonical-state operations;
3. MapLibre spatial/frontend implementation;
4. PayPal webhook boundary;
5. verification and browser evidence.

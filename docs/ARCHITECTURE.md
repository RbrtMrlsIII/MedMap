# MedMap Architecture Baseline

## Core rule

Keep the spatial experience, domain truth, trusted integrations, and external payment authority distinct.

## Runtime boundaries

```text
Browser
  │
  ├── Next.js / React presentation
  ├── MapLibre GL JS / WebGL geographic layer
  ├── WebGL2 authored mesh scene
  └── authenticated user interactions
        │
        ▼
Application boundary
  │
  ├── Firebase Auth
  ├── Firestore domain operations
  └── protected server/runtime operations
        │
        ├── Supabase Edge Functions
        │      └── PayPal webhook / protected integration logic
        │
        └── Supabase Storage
               └── clinic media
```

## Spatial rendering responsibilities

The browser spatial layer has two complementary responsibilities:

- **MapLibre GL JS** owns geographic context, viewport/camera interaction, map tiles, markers, and spatial discovery presentation.
- **WebGL2 mesh scene** owns authored 3D environment geometry used by the Hero, such as clinic forms, spatial landmarks, and depth cues.

These layers may visually overlap but do not share domain authority. Mesh geometry is presentation state only.

## Browser responsibilities

- Render map and clinic discovery UI.
- Render the authored WebGL2 mesh Hero where supported.
- Collect filters and booking requests.
- Present server-derived availability.
- Never self-authorize a booking.
- Never self-activate a subscription.
- Never expose service credentials.
- Preserve semantic HTML outside the canvas for critical information and actions.

## WebGL degradation

WebGL2 is an enhancement, not the only carrier of meaning. When unavailable, the application must retain the discovery Hero, clinic identity, controls, and accessible clinic alternatives without requiring the 3D canvas.

## Firestore responsibilities

Canonical documents should cover clinics, treatments, schedules/exceptions, bookings, and subscription projections. The first implementation should prefer simple, queryable structures over premature abstraction.

## Booking boundary

Booking acceptance should be a trusted operation that re-evaluates availability at write time and records an idempotent booking result. A read of availability followed by an unrelated client write is insufficient for the final reservation decision.

## Geospatial strategy

The product needs a deliberate geo-query strategy before scale. Store canonical latitude/longitude in Firestore. Early implementations may use bounded geohash/index-friendly querying or another approved strategy. Do not introduce a second spatial database merely to make the first map demo work.

## Storage strategy

Clinic logos and photographs belong in Supabase Storage. Firestore keeps references/metadata required by the product. The UI must not depend on private storage URLs remaining permanent; use an approved access/delivery strategy.

## Subscription strategy

PayPal is external event authority. Supabase Edge Functions verify and normalize the event. Firestore stores the MedMap projection that drives clinic entitlement. Provider identifiers are used for correlation and replay protection, not exposed as client authorization mechanisms.

## Rendering strategy

The visual direction is spatial glass skeuomorphism: translucent panels, depth, restrained blur, spatial hierarchy, authored 3D meshes, and clinical clarity. Decorative depth must never obscure labels, availability, keyboard interaction, or accessible alternatives.

## Initial application shape

```text
src/
  app/
    page.tsx                 # discovery/map entry
    clinics/[clinicId]/      # clinic detail
    bookings/                # customer booking surfaces
    clinic/                  # clinic operator surfaces
  components/
    hero/                    # authored WebGL2 Hero environment
    map/                     # MapLibre components
    discovery/               # filters/results
    booking/                 # calendar/slot UI
    clinic/                  # clinic configuration
  lib/
    firebase/                # Auth/Firestore clients
    booking/                 # availability/domain functions
    maps/                    # map configuration and adapters
    storage/                 # media access
    subscriptions/           # commerce-facing contracts
```

Exact structure may change during implementation if contract boundaries remain intact.

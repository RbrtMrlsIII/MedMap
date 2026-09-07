# MASTERPLAN — MedMap

`PRODUCT_LAW.md` is the product authority. This plan defines the approved sequence for turning that law into a verified product.

## Product north star

Make clinic discovery spatial, treatment-aware, profile-rich, contactable, and availability-true: a customer should be able to locate a clinic, inspect its identity and services, understand how to contact it, see a real bookable time, and create a booking without the UI inventing availability.

## Governance lineage

MedMap adopts validated patterns from three existing repositories:

```text
TeamAi
  → authority hierarchy, canonical-state boundaries,
    ORUCAVEAM discipline, evidence, handover, endorsement

Universal ToolKit
  → reusable governance skeleton, layer separation,
    minimalism, census/continuity concepts

HomeFinder-Official
  → spatial product discipline, profile-oriented UI concerns,
    staged reconciliation, preserve useful work, verify physical/spatial behavior
```

These sources are upstream patterns only. `PRODUCT_LAW.md` remains the MedMap authority.

## Authority map

```text
Human/product authority
        ↓
PRODUCT_LAW.md
        ↓
MASTERPLAN.md / POLICY.md
        ↓
Contracts + skills
        ↓
Implementation
        ↓
Verification + evidence
        ↓
Handover / endorsement
```

## Runtime architecture direction

```text
Next.js / React
   ├── MapLibre GL JS / WebGL spatial surface
   ├── Discovery + clinic pages
   ├── Customer booking
   └── Clinic owner editor
          │
          ▼
Trusted application boundary
          │
          ├── Firebase Auth
          ├── Firestore canonical domain state
          ├── Supabase Edge Functions
          │       └── PayPal / protected integrations
          ├── Supabase Storage
          │       └── clinic media
          └── PayPal external subscription events
```

## Phase 001 — Foundation / governance / contracts

1. [x] Establish `PRODUCT_LAW.md`.
2. [x] Establish governance and execution baseline.
3. [x] Define booking/availability contract.
4. [x] Define domain model and Firestore boundaries.
5. [x] Define map/spatial contract.
6. [x] Define subscription/webhook contract.
7. [x] Establish Next.js + MapLibre shell.
8. [x] Add repository CI validation path.
9. [x] Reconcile clinic-page tab/visibility law.
10. [x] Add clinic-page surface contract and navigation ownership model.

## Phase 002 — Clinic identity and supply

1. Clinic registration and authenticated ownership.
2. Clinic publication/active state.
3. Clinic hero and profile identity.
4. Profile tab: logo, background, name, basic information, links, service summary.
5. Services tab: enabled public services/treatments, duration, price-state, bookability.
6. About tab: public clinic bio and approved descriptive content.
7. Contact tab: one-or-more validated contact channels.
8. Owner-only Edit surface for all allowed clinic profile/content settings.
9. Owner authorization tests: guest cannot access or mutate Edit.
10. Media references and Supabase Storage integration.

## Phase 003 — Clinic scheduling engine

1. Weekly open/closed schedule.
2. Multiple opening intervals per day.
3. Closed dates and special-hours exceptions.
4. Clinic timezone.
5. Treatment duration.
6. Booking interval/slot granularity.
7. Exclusive capacity.
8. Concurrent capacity.
9. Optional treatment-specific capacity.
10. Availability calculation contract implementation.
11. Owner edits invalidate stale availability assumptions.

## Phase 004 — Customer discovery

1. Map-first landing experience.
2. MapLibre 3D camera and clinic markers.
3. Search by service/treatment and location.
4. Map/list synchronization.
5. Clinic hero and tabbed detail surface.
6. Services filtering and public-state rules.
7. Contact and About presentation.
8. Availability-aware Booking tab.
9. Responsive mobile spatial navigation.

## Phase 005 — Booking correctness

1. Trusted booking-creation operation.
2. Authoritative re-check of clinic, service, schedule, exception, duration, interval, and capacity.
3. Concurrency-safe last-capacity behavior.
4. Idempotency for customer retries.
5. Booking lifecycle and confirmation.
6. Failure-path UX for a slot lost during submission.
7. Independent Firestore verification of durable booking state.

## Phase 006 — Clinic operations

1. Owner booking management.
2. Calendar occupancy view.
3. Closed-date and special-hours editor.
4. Capacity editor.
5. Service availability controls.
6. Profile/About/Contact editor.
7. Publication preview from owner perspective.
8. Audit/reconciliation for material scheduling changes.

## Phase 007 — Clinic subscriptions

1. Clinic plan model.
2. Server-owned PayPal subscription correlation.
3. Supabase Edge webhook authenticity verification.
4. Idempotent commerce-event recording.
5. Firestore entitlement projection.
6. Feature gating from authoritative subscription state.
7. Live PayPal evidence when credentials/environment permit.

## Phase 008 — Spatial experience and polish

1. Base style and camera system.
2. 3D building/terrain enhancement where useful.
3. Cluster behavior.
4. Spatial clinic focus transitions.
5. Glass-skeuomorphic visual system.
6. Reduced-motion and degraded-map behavior.
7. Keyboard/accessibility verification.
8. Mobile map/list transition.

## Phase 009 — Verification and release

1. TypeScript/build checks.
2. Contract tests.
3. Browser verification of guest clinic tabs.
4. Browser verification of owner-only Edit visibility and authorization.
5. Booking concurrency/idempotency tests.
6. Independent durable Firestore checks.
7. Subscription webhook verification.
8. Handover / endorsement.

## Completion rule

A phase is not complete because the screens exist. Completion requires the governing law/contract, implementation, verification evidence, and recorded acceptance to agree.

For any feature involving clinic ownership or booking, UI visibility is never the authorization proof and a successful browser render is never proof of durable backend correctness.

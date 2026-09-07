# MASTERPLAN — MedMap

`PRODUCT_LAW.md` is the product authority. This plan defines the approved sequence for turning that law into a verified product.

## Product north star

Make clinic discovery spatial, treatment-aware, and availability-true: a customer should be able to locate a clinic, understand what service is available, see a real bookable time, and create a booking without the UI inventing availability.

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

## Architecture direction

```text
Next.js web app
   ├── MapLibre GL JS / WebGL spatial surface
   ├── Customer discovery + booking UI
   └── Clinic management UI
          │
          ▼
Trusted application boundary
          │
          ├── Firebase Auth
          ├── Firestore canonical domain state
          ├── Supabase Edge Functions for protected integrations
          ├── Supabase Storage for media
          └── PayPal external payment events
```

MapLibre is the spatial presentation authority. Firestore is the canonical MedMap domain-state authority. Supabase Storage is media storage, not clinic-state authority. PayPal is the external authority for subscription events.

## Phase 001 — Foundation

1. [x] Establish `PRODUCT_LAW.md`.
2. [ ] Establish project governance and execution policy.
3. [ ] Define booking/availability contract.
4. [ ] Define domain model and Firestore collection boundaries.
5. [ ] Define map/spatial contract.
6. [ ] Define subscription/webhook contract.
7. [ ] Establish Next.js application baseline.
8. [ ] Add deterministic validation and browser-verification path.

## Phase 002 — Clinic supply

1. Clinic registration and identity ownership.
2. Clinic profile and location.
3. Treatment/service catalog.
4. Weekly availability rules.
5. Closed-date and special-hours exceptions.
6. Capacity and concurrent-booking configuration.
7. Clinic booking-management view.

## Phase 003 — Customer discovery

1. Map-first landing experience.
2. Search by treatment/service and location.
3. Clinic map/list synchronization.
4. Clinic detail surface.
5. Treatment eligibility and service visibility.
6. Availability-aware date/time selection.

## Phase 004 — Booking correctness

1. Server-owned booking creation.
2. Atomic/idempotent reservation behavior.
3. Conflict detection against clinic rules and existing bookings.
4. Booking confirmation and status lifecycle.
5. Cancellation/reschedule policy where approved.
6. Verification of race/conflict cases.

## Phase 005 — Clinic subscriptions

1. Clinic plan model.
2. PayPal subscription correlation.
3. Supabase Edge webhook authenticity verification.
4. Idempotent commerce-event recording.
5. Firestore entitlement projection.
6. Feature gating based on authoritative subscription state.

## Phase 006 — Spatial experience

1. MapLibre base style and camera system.
2. Clinic markers and clustering.
3. 3D treatment/discovery presentation where it improves comprehension.
4. Spatial glass-skeuomorphic shell.
5. Mobile map/list transition.
6. Accessibility and reduced-motion behavior.

## Phase 007 — Verification and release

1. TypeScript/build checks.
2. Contract tests for availability and booking.
3. Browser verification of customer and clinic journeys.
4. Independent checks of durable Firestore outcomes.
5. PayPal live-runtime evidence when credentials/environment allow.
6. Handover and endorsement.

## Completion rule

A phase is not complete because its screens exist. Completion requires the governing law/contract, implementation, verification evidence, and recorded acceptance to agree.

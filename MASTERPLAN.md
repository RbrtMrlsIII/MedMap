# MASTERPLAN — MedMap

`PRODUCT_LAW.md` defines what MedMap is. `MASTERPLAN.md` defines the chronological execution checklist that turns the law into a verified product.

The Masterplan may branch into smaller content/context slices whenever a phase becomes complex. A branch is a planning branch, not a source-control/file branch. Every child slice remains attached to its parent phase and must declare its return/merge criterion.

## Execution chain

```text
PRODUCT_LAW
  ↓
MASTERPLAN phase / slice
  ↓
CONTRACT
  ↓
SKILL
  ↓
IMPLEMENTATION
  ↓
VERIFICATION
  ↓
ACCEPTANCE
  ↓
FULL PROJECT ZIP HANDOVER
```

## Mandatory slice record
Every slice in this plan should identify:

`ID | Parent | Objective | Dependencies | Contract | Skill | Verification | Exit | Handover ZIP`

## Phase 001 — Product / execution foundation

- [x] Reconcile Product Law as highest product authority.
- [x] Separate Product Law, Masterplan, Contracts, Skills, Policy, implementation, verification, and handover responsibilities.
- [x] Remove GitHub as product/source authority from product execution doctrine.
- [x] Define mandatory full-project ZIP handover.
- [x] Define spatial site architecture at Product Law level.
- [x] Census initial rooms/pages/guest versus authenticated surfaces.
- [x] Define patient / clinic-owner authentication entry concept.
- [x] Define no-internal-messaging boundary and approved clinic contact record.
- [x] Define booking register/spreadsheet-like clinic operations concept.
- [x] Define subscription offer and five-tier intent while leaving unapproved tier numbers open.
- [x] Establish skill registry and numbered development roots.
- [ ] Accept the sweep and freeze the execution wiring before spatial implementation.

### 001.S1 — Document authority reconciliation
- Contract: `docs/SKILL_WIRING.md` + canonical document paths.
- Skill: `skills/001-product-governance/SKILL.md`.
- Exit: all authority statements point to current documents and no document silently owns another layer's responsibilities.

### 001.S2 — Site census and spatial question registry
- Contract: `docs/contracts/SPATIAL_SITE_ARCHITECTURE.md`.
- Skill: `skills/008-threejs-spatial-runtime/SKILL.md` + `skills/009-spatial-camera-motion/SKILL.md`.
- Exit: initial room/section census and camera/traversal/occlusion questions exist before major scene construction.

## Phase 002 — Spatial runtime foundations

### 002.S1 — Three.js runtime root
- Contract: `HERO_ENVIRONMENT.md` + `SPATIAL_3D_RUNTIME.md`.
- Skill: `skills/008-threejs-spatial-runtime/SKILL.md`.
- Exit: renderer lifecycle, resize, DPR, context-loss/degradation boundary, scene root, render loop, cleanup.

### 002.S2 — Spatial motion root
- Contract: `SPATIAL_CAMERA_MOTION.md`.
- Skill: `skills/009-spatial-camera-motion/SKILL.md`.
- Exit: named presentation state transitions, interruption/replacement, bounded motion, reduced-motion behavior.

### 002.S3 — Architectural room root
- Contract: `SPATIAL_SITE_ARCHITECTURE.md`.
- Skill: `skills/008-threejs-spatial-runtime/SKILL.md`.
- Exit: main hall, arrival corridor, wall/floor/ceiling boundaries, no normal camera-through-wall route.

### 002.S4 — Object interaction root
- Contract: `SPATIAL_3D_RUNTIME.md`.
- Skill: `skills/009-spatial-camera-motion/SKILL.md`.
- Exit: at least one object can focus, transform, animate, reveal semantic child UI, and recover to stable state.

### 002.S5 — Cinematic lighting/material root
- Contract: `SPATIAL_LIGHTING_MATERIALS.md`.
- Skill: `skills/011-spatial-assets-lighting/SKILL.md`.
- Exit: lighting/material system supports contrast, reflection, glass, texture readability, and restrained clinical clarity.

### 002.S6 — Accessibility/degradation root
- Contract: `HERO_ENVIRONMENT.md`.
- Skill: `skills/012-accessibility-verification/SKILL.md`.
- Exit: semantic UI remains usable without Three.js; reduced motion removes non-essential motion; no spatial interaction is required for core meaning.

## Phase 003 — Clinic identity and supply

- [ ] Authenticated registration: Email + Google.
- [ ] Registration roles: Patient / Clinic Owner.
- [ ] Clinic ownership binding.
- [ ] Clinic registration, approval, publication, active/suspended states.
- [ ] Canonical clinic profile and hero identity.
- [ ] Services/treatments public configuration.
- [ ] Approved contact-channel records.
- [ ] Owner-only Edit surface and backend authorization.
- [ ] Supabase Storage media references.

## Phase 004 — Clinic scheduling and availability

- [ ] Clinic timezone.
- [ ] Weekly open/closed schedule.
- [ ] Multiple intervals.
- [ ] Closed dates and special hours.
- [ ] Service duration.
- [ ] Booking interval.
- [ ] Exclusive/concurrent/treatment-specific capacity.
- [ ] Durable availability computation.
- [ ] Availability snapshot semantics and stale-read invalidation.

## Phase 005 — Guest discovery engine

- [ ] MapLibre discovery surface inside the 3D Spatial web architecture.
- [ ] Guest search by clinic/service/treatment/location context.
- [ ] Geographic filters and clinic result synchronization.
- [ ] Clinic selection and clinic room entry.
- [ ] Canonical Profile / Services / Booking / About / Contact surfaces.
- [ ] Explicit price-state rendering.

## Phase 006 — Authentication and booking submission

- [ ] Booking authentication gate after clinic selection.
- [ ] Email login/registration.
- [ ] Google login/registration.
- [ ] Patient booking identity boundary.
- [ ] Trusted booking creation.
- [ ] Server re-check.
- [ ] Concurrency safety.
- [ ] Idempotency.
- [ ] Requested / confirmed / rejected / cancelled lifecycle.
- [ ] Durable booking record.

## Phase 007 — Clinic booking operations

- [ ] Spreadsheet-like booking register.
- [ ] Calendar/occupancy view.
- [ ] Booking approval/management workflow as defined by final contract.
- [ ] Queue visibility and operational reduction tools.
- [ ] Schedule/capacity/service editors.
- [ ] Booking read-back and audit trail.

## Phase 008 — Subscription / entitlement

- [ ] Base introductory PHP99 offer.
- [ ] One-time 2-month free introductory benefit.
- [ ] Regular PHP99 monthly billing thereafter.
- [ ] Up to five tiers.
- [ ] Tier-specific daily incoming booking allowance.
- [ ] PayPal correlation/authenticity/idempotency.
- [ ] Firestore entitlement projection.
- [ ] Suspension/expiry behavior.
- [ ] Existing-booking behavior during entitlement changes.

## Phase 009 — Spatial production expansion

- [ ] Approved reusable 3D asset library.
- [ ] Room-specific scenes.
- [ ] Clinic/service spatial objects.
- [ ] MapLibre geographic 3D enhancements where useful.
- [ ] Clustering and spatial focus.
- [ ] Advanced room traversal.
- [ ] Mobile/touch adaptation.
- [ ] Asset provenance, LOD, performance and visual QA.

## Phase 010 — Release and acceptance

- [ ] Cross-contract consistency sweep.
- [ ] TypeScript/build.
- [ ] Browser verification.
- [ ] Accessibility/reduced motion.
- [ ] Booking races/idempotency.
- [ ] Authorization.
- [ ] Firestore durable read-back.
- [ ] PayPal event verification.
- [ ] Failure-path verification.
- [ ] Full-project ZIP handover and final acceptance record.

## Branching rule
When a slice becomes complex, create content branches such as:

```text
002.S2 Camera Root
  ├── 002.S2.a pose model
  ├── 002.S2.b transition/interruption
  ├── 002.S2.c wall/collision constraints
  └── 002.S2.d reduced-motion mapping
```

These are planning branches. The parent slice remains the chronological owner and cannot be marked complete until all required children return with their verification and handover evidence.

## Completion rule
A phase/slice is complete only when Product Law, contract, skill, implementation, verification evidence, unresolved questions, and full-project ZIP handover agree. Historical evidence can support its original scope but does not automatically accept later changes.

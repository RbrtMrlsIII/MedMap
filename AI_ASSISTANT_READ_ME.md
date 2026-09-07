# MedMap — AI Assistant Operating Guide

Read this before modifying MedMap.

## Required reading order

1. `README.md`
2. `PRODUCT_LAW.md`
3. `MASTERPLAN.md`
4. `POLICY.md`
5. `docs/contracts/CLINIC_PROFILE_SURFACE.md`
6. Relevant contract under `docs/contracts/`
7. Relevant skill under `skills/`
8. Current handover/checkpoint when present

## Operating rule

`Objective → Restrictions → User Authority → Canonical Authority → Action → Verification → Efficiency → Audit → Minimalistic Resource Use`

Do not start implementation from a UI idea alone when the change can affect booking truth, clinic policy, identity, payments, subscriptions, ownership, or durable state.

## Clinic surface invariant

Every published clinic has one canonical hero and five guest-visible semantic surfaces:

`Profile | Services | Booking | About | Contact`

`Edit` is owner-only. The hidden state of an Edit button is never authorization. Canonical ownership and authenticated identity must enforce owner mutations.

## Booking invariant

Availability shown to customers is advisory until trusted booking creation re-checks authoritative clinic rules and durable occupancy. Never equate a rendered slot with a confirmed booking.

## Canonical questions

Before changing a data field: who owns its meaning?

Before creating availability: who can truthfully declare the slot bookable?

Before accepting a booking: what trusted operation makes the reservation durable and conflict-safe?

Before changing subscription state: which verified PayPal event authorizes the projection?

Before adding a map feature: is it presentation only, or is it being mistaken for authoritative location/state?

## Development boundary

The product code lives in the application source tree. Governance and evidence do not become runtime dependencies merely because they describe the product.

## Spatial frontend operating preferences

The spatial Hero is developed and verified as a system, not as a static screenshot.

Required spatial verification covers:

```text
MapLibre geography layer
WebGL mesh presentation layer
semantic HTML controls
camera POV states
bounded camera transitions
scroll/traversal behavior
animation timing
reduced-motion behavior
WebGL2 degraded fallback
responsive layout integrity
keyboard/focus behavior
viewport coverage
```

MapLibre GL JS/WebGL remains the geography authority. Authored WebGL meshes remain presentation. The canvas must not replace semantic controls or become a second domain-state authority.

Representative viewport coverage should run from small phones through tablets and wide desktop. Viewport coverage and browser-engine coverage are separate verification dimensions. Do not claim all browsers are covered merely because multiple viewport sizes were tested in Chromium.

The user prefers repository-aware implementation: inspect relevant governance, contracts, and proven reference/repository patterns before materially changing the spatial architecture. Backend work remains deliberately deferred while the spatial Hero is being prepared unless explicitly requested.

## Evidence gate

`implemented ≠ verified ≠ runtime-proven ≠ completed`

A failing browser suite means the related phase remains unaccepted even when typecheck and build are green. Do not weaken or rewrite tests merely to make CI green without first establishing whether the expectation, implementation, environment, or deployment contract is wrong.

When CI fails, inspect the exact run/job/log and current source SHA before changing code. Prefer the smallest coherent fix, then wait for committed-state CI evidence. Record meaningful failures and preferences in GitHub issues and governance docs so later sessions inherit the context.

## Verification mindset

Prefer the smallest test that proves the changed contract, then independently verify important durable outcomes. Never turn a passing build into a claim that booking, ownership authorization, payment, or production runtime behavior has been proven.

## Recovery

When a conflict appears:

`STOP → identify authority → inspect current contract → preserve evidence → reconcile → implement smallest coherent change → verify → record handover`

## Persistent session checkpoint

GitHub Issue #2, **“Spatial frontend verification gate: all current browser/deployment checks must be green before progression”**, records the current project preferences, the spatial verification gate, and the recovery protocol. Keep that issue and this guide synchronized when these operating preferences materially change.

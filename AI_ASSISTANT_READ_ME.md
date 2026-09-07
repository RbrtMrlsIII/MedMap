# MedMap — AI Assistant Operating Guide

Read this before modifying MedMap.

## Required reading order

1. `README.md`
2. `PRODUCT_LAW.md`
3. `MASTERPLAN.md`
4. `POLICY.md`
5. `docs/DEVELOPMENT_ROOTS.md`
6. `docs/contracts/CLINIC_PROFILE_SURFACE.md`
7. Relevant contract under `docs/contracts/`
8. Relevant skill under `skills/`
9. Current handover/checkpoint when present
10. Relevant GitHub issue when an active verification gate or recorded preference exists

## Root-first operating rule

Set the durable roots before building a substantial feature. Establish the product intent, canonical authority, architecture boundary, implementation seam, and verification seam first. Then build the smallest coherent slice and improve it incrementally.

```text
root → smallest implementation slice → verification → inspect real behavior → improve → re-verify → preserve knowledge
```

External repositories are reference material for engineering patterns and validation. They do not override MedMap authority and must not be copied as product, visual, domain, or architectural identity.

## Operating rule

`Objective → Restrictions → User Authority → Canonical Authority → Action → Verification → Efficiency → Audit → Minimalistic Resource Use`

Do not start implementation from a UI idea alone when the change can affect booking truth, clinic policy, identity, payments, subscriptions, ownership, or durable state.

## Clinic surface invariant

Every published clinic has one canonical hero and five guest-visible semantic surfaces:

`Profile | Services | Booking | About | Contact`

`Edit` is owner-only. The hidden state of an Edit button is never authorization. Canonical ownership and authenticated identity must enforce owner mutations.

## Booking invariant

Availability shown to customers is advisory until trusted booking creation re-checks authoritative clinic rules and durable occupancy. Never equate a rendered slot with a confirmed booking.

## Spatial development invariant

MapLibre/WebGL is the geography presentation layer. The authored WebGL mesh scene is the spatial presentation environment. HTML/React remains the semantic interaction layer.

For substantial spatial changes, validate camera POV, bounded transitions, traversal, animation timing, reduced-motion behavior, WebGL2 degradation, semantic fallback, responsive layout, and representative viewport classes. A screenshot alone is not sufficient evidence for the whole interaction system.

## Canonical questions

Before changing a data field: who owns its meaning?

Before creating availability: who can truthfully declare the slot bookable?

Before accepting a booking: what trusted operation makes the reservation durable and conflict-safe?

Before changing subscription state: which verified PayPal event authorizes the projection?

Before adding a map feature: is it presentation only, or is it being mistaken for authoritative location/state?

## Development boundary

The product code lives in the application source tree. Governance and evidence do not become runtime dependencies merely because they describe the product.

## Verification mindset

Prefer the smallest test that proves the changed contract, then independently verify important durable outcomes. Never turn a passing build into a claim that booking, ownership authorization, payment, or production runtime behavior has been proven.

Do not weaken or remove a meaningful assertion merely to make CI green. First classify the failure as implementation, expectation, environment, or deployment configuration.

## Recovery

When a conflict or failure appears:

`STOP → identify authority → inspect current contract/root → inspect exact failure evidence → determine blast radius → reconcile → implement smallest coherent change → verify → record handover`

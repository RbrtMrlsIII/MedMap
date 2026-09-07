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

## Recovery

When a conflict appears:

`STOP → identify authority → inspect current contract → preserve evidence → reconcile → implement smallest coherent change → verify → record handover`

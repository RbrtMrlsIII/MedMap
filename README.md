# MedMap

Map-first clinic discovery and booking platform.

## Authority

Read `PRODUCT_LAW.md` first. Then `MASTERPLAN.md`, `POLICY.md`, and `AI_ASSISTANT_READ_ME.md` before implementation decisions.

## Product

MedMap helps customers find clinics that offer a selected clinical service and book times that the clinic can actually accept under its configured availability, capacity, treatment, and booking rules.

Every published clinic has one clinic hero and five guest-visible surfaces:

`Profile | Services | Booking | About | Contact`

Clinic owners receive an additional authenticated `Edit` management surface. Edit is never a guest capability, and hiding a control is not authorization.

MedMap is not a diagnosing clinician, treatment recommender, emergency-response service, or substitute for professional medical care.

## Current foundation

- Product Law established and reconciled with clinic page/tab ownership rules.
- Governance baseline adapted from the user's TeamAi and Universal ToolKit patterns.
- HomeFinder spatial/profile lessons were inspected and adapted without importing its domain authority.
- Booking and availability are product-critical correctness boundaries.
- MapLibre GL JS/WebGL is the canonical map surface; Google Maps is not required by the product law.

## Canonical stack direction

- Next.js + TypeScript for the web application.
- MapLibre GL JS for interactive WebGL mapping and 3D spatial presentation.
- Firebase/Cloud Firestore for canonical clinic, treatment, schedule, booking, and subscription-projection data.
- Supabase Storage for clinic media/assets.
- Supabase Edge Functions for trusted server-side integration boundaries where required.
- PayPal as external payment-event authority for clinic subscriptions.

## Execution

`PRODUCT_LAW.md → MASTERPLAN.md → POLICY.md → applicable contracts/skills → implementation → verification/evidence → handover → endorsement`

Implementation status is never inferred from documentation or deployment alone.

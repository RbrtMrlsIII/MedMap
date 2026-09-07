# MedMap — Current Handover

## Current gate
`PHASE-002 — SPATIAL FRONTEND PROTOTYPE`

## State

The MedMap frontend is being built before backend implementation, by deliberate product decision. The current branch contains the governance foundation plus a visual MapLibre/WebGL clinic-discovery Hero and a clinic-page prototype.

## What is present

- Map-first landing Hero.
- MapLibre GL JS / WebGL spatial surface with pitched camera.
- Spatial glass-skeuomorphic UI language.
- Lightweight CSS diorama layer for spatial depth and clinic-like vertical anchors.
- Featured clinic Hero card.
- Clinic route: `/clinics/[clinicId]`.
- Guest clinic surfaces: Profile, Services, Booking, About, Contact.
- Owner-only Edit boundary documented but not yet implemented as backend authorization.
- Demo clinic/service data only.

## What is explicitly NOT complete

- Firestore integration.
- Firebase Authentication / clinic ownership enforcement.
- Real availability calculation.
- Real booking creation.
- Booking concurrency/idempotency.
- Supabase Storage integration.
- PayPal subscriptions/webhooks.
- Live clinic data.
- Browser/runtime verification evidence.

## Protected product meaning

`Product Law → plan/contract → implementation → verification` remains the canonical path. The visual Hero is presentation only and must not become clinic, availability, booking, ownership, or subscription authority.

## Visual continuity

Preserve the spatial-glass direction while improving:

1. spatial depth and hierarchy;
2. clinic focus transitions;
3. mobile composition;
4. accessible/reduced-motion behavior;
5. realistic MapLibre styling and 3D map data when a suitable style/source is approved.

## Verification boundary

The latest branch has repository-native CI configured, but no current passing CI status is claimed from the connected GitHub surface. Vercel has no MedMap project connected in the available account/team, so no hosted preview claim is made.

## Next action

Continue frontend-only work until the Hero + clinic public surface is visually coherent enough to freeze as the frontend baseline. Then proceed to Firestore/Auth/ownership and availability implementation under the existing contracts.

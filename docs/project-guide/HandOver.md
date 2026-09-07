# MedMap — Current Handover

## Current gate
`PHASE-002 — SPATIAL FRONTEND PROTOTYPE`

## State

The MedMap frontend is being built before backend implementation, by deliberate product decision. The current branch contains the governance foundation plus a visual MapLibre/WebGL clinic-discovery Hero and a clinic-page prototype.

## What is present

- Map-first landing Hero.
- MapLibre GL JS / WebGL spatial surface with pitched camera.
- Dedicated authored WebGL2 Hero mesh scene with bounded prototype geometry.
- Spatial glass-skeuomorphic UI language.
- Lightweight CSS atmosphere/depth layer for spatial hierarchy.
- Featured clinic Hero card.
- Featured-clinic spatial focus transition with keyboard/focus coverage.
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
- Final visual frontend baseline freeze.

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

The current frontend baseline has a verified sequence of successful GitHub Actions runs:

- **Run #73** on commit `399ea5374b782ba9b620c8b0878f8d74b723f1a2`: `typecheck-build` and `browser-verify` successful.
- **Run #74** on commit `ac835a3e0cc69f2fe9614596c3437709789d5c7b`: successful, including explicit WebGL2-unavailable fallback coverage.
- **Run #75**: successful documentation reconciliation.
- **Run #76**: successful masterplan reconciliation.
- **Run #77**: successful handover reconciliation.
- **Run #80** on commit `152f324ed73248a7b26ea675867db6db45e0bdd2`: `typecheck-build` and `browser-verify` successful, including the computed clinic-focus depth regression check. The browser suite reports 7 passing tests on this baseline.

The browser suite exercises the landing Hero, authored mesh contract, semantic degraded-WebGL2 fallback, featured-clinic focus transition, clinic public navigation, reduced-motion contract, and mobile shell.

Vercel has no MedMap project connected in the available account/team, so no hosted preview claim is made.

## Next action

Freeze the visual frontend baseline after the next fresh post-reconciliation browser evidence. After Phase 002 is formally accepted, proceed to Firestore/Auth/ownership and availability implementation under the existing contracts.

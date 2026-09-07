# MedMap — Current Handover

## Current gate
`PHASE-002 — SPATIAL FRONTEND PROTOTYPE — READY FOR ACCEPTANCE`

## State

The MedMap frontend was intentionally built before backend implementation. The current branch contains the governance foundation plus a verified visual MapLibre/WebGL clinic-discovery Hero and clinic-page prototype. The visual frontend baseline is now frozen after fresh browser evidence.

## What is present

- Map-first landing Hero.
- MapLibre GL JS / WebGL spatial surface with pitched camera.
- Dedicated authored WebGL2 Hero mesh scene with bounded prototype geometry.
- Spatial glass-skeuomorphic UI language.
- Lightweight CSS atmosphere/depth layer for spatial hierarchy.
- Featured clinic Hero card.
- Featured-clinic spatial focus transition with keyboard/focus coverage.
- Responsive mobile Hero composition with explicit stacking protection.
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
- Formal Phase 002 acceptance/endorsement.

## Protected product meaning

`Product Law → plan/contract → implementation → verification` remains the canonical path. The visual Hero is presentation only and must not become clinic, availability, booking, ownership, or subscription authority.

## Frozen visual baseline

The frozen frontend baseline preserves:

1. spatial depth and hierarchy;
2. featured-clinic focus transitions;
3. responsive mobile composition;
4. accessible/reduced-motion behavior;
5. semantic controls and clinic alternatives when WebGL2 is unavailable.

The baseline deliberately does not promote decorative 3D into domain authority, real availability, booking acceptance, ownership, or subscription state.

## Verification boundary

Fresh GitHub Actions evidence for the frozen baseline:

- **Run #80** on commit `152f324ed73248a7b26ea675867db6db45e0bdd2`: `typecheck-build` and `browser-verify` successful, including the computed clinic-focus depth regression check.
- **Run #81** on commit `f093cffdd8173e42c3b0ce26fcdf06ced7440783`: `typecheck-build` and `browser-verify` successful after documentation reconciliation.
- **Run #84** on commit `412d227556dfb53a3736af641c10089f1b0c990e`: `typecheck-build` and `browser-verify` successful after the mobile Hero stacking correction and regression coverage.

Run #84 retained a Playwright report artifact (`playwright-report`) for the verified suite.

The browser suite exercises the landing Hero, authored mesh contract, semantic degraded-WebGL2 fallback, featured-clinic focus transition, clinic public navigation, reduced-motion contract, and mobile shell/stacking behavior.

Vercel has no MedMap project connected in the available account/team, so no hosted preview claim is made.

## Next action

Obtain formal Phase 002 acceptance/endorsement. After that acceptance, proceed to Phase 003 clinic identity and supply, starting with Firebase Authentication / canonical clinic ownership and the governed clinic profile/service data model. Scheduling and booking correctness remain subsequent governed phases.

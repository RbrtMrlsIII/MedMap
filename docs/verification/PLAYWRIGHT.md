# Playwright Browser Verification

## Purpose

Playwright is the browser-level evidence gate for MedMap's frontend spatial prototype. It verifies observable product behavior without treating visual rendering as proof of backend authority.

## Current scope

The current pre-implementation gate covers:

- spatial Hero shell renders at `/`
- MapLibre canvas mounts as the spatial surface
- featured clinic entry points to the canonical Northstar clinic route
- clinic guest surface exposes Profile, Services, Booking, About, and Contact
- guest clinic navigation does not expose owner-only Edit
- reduced-motion CSS is present in the loaded frontend styles

## Explicit non-claims

These checks do not prove live clinic data, Firestore state, authenticated ownership, booking acceptance, payment/subscription entitlement, or availability correctness.

Those claims require their respective trusted-domain verification gates later in the implementation sequence.

## Evidence policy

A green Playwright run means the tested browser-visible contract passed for the tested environment. It does not promote demo data into canonical product truth.

When a browser check fails, preserve the failure evidence and diagnose the smallest bounded cause before changing unrelated product behavior.

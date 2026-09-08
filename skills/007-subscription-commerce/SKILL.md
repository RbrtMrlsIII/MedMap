# Skill 007 — Subscription Commerce

## Purpose
Implement trusted PayPal subscription projection and Clinic Owner entitlement.
## Based on
`docs/contracts/CLINIC_SUBSCRIPTIONS.md` and Product Law subscription questions.
## Do
Keep PayPal events external-authoritative; verify authenticity; correlate; deduplicate; project to Firestore; apply server-side entitlement; distinguish daily incoming-request allowance from durable booking history.
## Do not
Activate from browser return; trust client entitlement; use a visual subscription state as proof; invalidate accepted bookings because intake allowance changes.
## Verification
Event authenticity, idempotency, projection read-back, tier allowance, suspension/expiry, existing-booking behavior.
## Evidence
Webhook/event tests and durable projection read-back.
## Recovery
Preserve external event evidence and reconcile the smallest incorrect projection.
## Exit criteria
Entitlement is derived from trusted durable state and queue allowance behavior is contract-consistent.

# Skill 005 — Booking and Availability

## Purpose
Build clinic-owned scheduling and race-safe booking acceptance.
## Based on
`docs/contracts/BOOKING_AVAILABILITY.md`, `docs/contracts/DOMAIN_MODEL.md`, Product Law.
## Do
Calculate availability from schedule, exceptions, service duration, booking interval, capacity, active bookings, and final eligibility; re-check at commit; use idempotency.
## Do not
Let client UI create availability truth, reserve on selection, or double-confirm a last-capacity race.
## Verification
Open slot; closed date; duration conflict; capacity exhaustion; concurrent race; retry/idempotency; durable booking state.
## Evidence
Contract tests, race tests, and independent durable read-back.
## Recovery
Reject or compensate invalid acceptance, preserve the race/invalid-state evidence, then re-run the narrow verification.
## Exit criteria
Every accepted booking is authoritative and durable.

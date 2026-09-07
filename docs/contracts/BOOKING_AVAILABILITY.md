# Contract — Booking & Availability

## Purpose

Define the canonical rules for determining whether a customer may create a booking for a clinic treatment at a requested time.

## Inputs

- clinicId
- treatmentId
- requested start timestamp
- customer identity
- clinic schedule
- clinic exceptions/closed dates
- treatment availability/duration
- booking interval
- capacity policy
- existing active bookings
- clinic/product eligibility

## Canonical decision

```text
eligible =
  clinic exists and is bookable
  AND treatment is offered and bookable
  AND requested time is inside applicable clinic/treatment hours
  AND requested time is not inside a closed/blocked exception
  AND requested time aligns with the clinic booking interval
  AND requested treatment duration fits the allowed window
  AND active booking occupancy remains below capacity
```

The exact time-zone used for clinic scheduling must be explicit and stored with the clinic configuration. Customer-local display timezone must not silently change the authoritative slot.

## Capacity modes

1. `exclusive`: maximum occupancy is 1.
2. `concurrent`: maximum occupancy is an integer greater than 1.
3. `treatment-specific`: a treatment may override clinic default capacity.

Occupancy is evaluated over the treatment's active time range, not merely by matching start timestamps.

## Exceptions

Closed dates and special hours override the normal weekly schedule. More specific treatment-level restrictions override clinic defaults where the schema allows them.

## Pricing

Price may be explicit, absent, or represented as a clinic-controlled no-price display state. Missing price is not permission to infer a zero price.

## Reservation correctness

The final booking write must be performed by a trusted backend boundary and must re-check the authoritative rules at commit time. Two simultaneous requests must not both consume the same last capacity.

The implementation must define an idempotency strategy so customer retries do not unintentionally create duplicate bookings.

## State lifecycle

`requested → confirmed | rejected | cancelled`

Additional states may be introduced only with a product-law/contract reconciliation.

## Non-goals

This contract does not diagnose a clinical matter, decide medical suitability, or replace clinic professional judgment.

## Verification obligations

At minimum, tests must cover:

- normal open slot;
- closed date;
- outside-hours request;
- invalid interval;
- treatment not offered;
- capacity available;
- capacity exhausted;
- overlapping duration conflict;
- concurrent booking race;
- retry/idempotency behavior.

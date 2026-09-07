# POLICY — MedMap

This is the execution constitution beneath `PRODUCT_LAW.md`. It defines how authorized work is performed without becoming a second product law.

## Authority order

1. `PRODUCT_LAW.md`
2. `POLICY.md`
3. `MASTERPLAN.md` and approved contracts
4. Endorsed `PRODUCT-KNOWLEDGE.md`
5. Current checkpoint/handover
6. Skills and implementation detail

When sources conflict, stop, identify the authority boundary, reconcile the conflict, and re-verify. Never resolve a product conflict through recency or convenience alone.

## ORUCAVEAM

Every non-trivial execution step answers:

- **O — Objective:** exact bounded outcome.
- **R — Restrictions:** what must not be changed, bypassed, guessed, or exposed.
- **U — User Authority:** why the action is authorized.
- **C — Canonical Authority:** which source owns the meaning or state.
- **A — Action:** smallest coherent operation.
- **V — Verification:** evidence that proves the claimed result.
- **E — Efficiency:** avoid unnecessary work without weakening correctness.
- **A — Audit:** preserve traceable paths, decisions, and evidence.
- **M — Minimalistic Resource Use:** use the minimum sufficient authoritative reads, writes, tests, builds, external calls, and context needed to complete and prove the task.

M never means skipping required correctness or security checks.

## Product-critical rules

### Availability is backend truth
The client may display a calendar, but it may not create the truth of availability. Server logic must evaluate clinic schedule, exceptions, treatment rules, capacity, existing bookings, and subscription/product eligibility before accepting a booking.

### Booking is a reservation, not a UI selection
Selecting a time in the browser does not reserve it. A successful booking requires a trusted write and a durable state transition.

### No double-booking by race
Booking acceptance must be designed for concurrent requests. A correct result must remain correct when two customers attempt the same capacity at nearly the same time.

### Clinic configuration is clinic-owned policy
Clinic operators can configure availability, closed dates, treatment availability, pricing visibility, interval, and concurrency within the product's supported constraints. Customer UI cannot silently override clinic policy.

### Clinical safety boundary
MedMap may categorize and search services, but it must not diagnose, prescribe, claim clinical suitability, or present platform logic as professional medical advice.

## Service authority

| Surface | MedMap role |
|---|---|
| Firebase Auth | Customer/clinic identity and UID |
| Firestore | Canonical clinic, treatment, schedule, booking, and subscription-projection state |
| Supabase Storage | Clinic media/assets only |
| Supabase Edge Functions | Trusted server boundary for protected integrations/operations |
| PayPal | External subscription/payment-event authority |
| MapLibre GL JS | Spatial rendering/presentation authority |
| GitHub | Source/change authority |

A technical service may not silently become the authority for another domain.

## Governance/product separation

Governance documents, findings, evidence, and skills stay outside the product source tree. Product business logic stays in the application source tree. Do not create new top-level structures casually.

## Verification boundary

Use static/type/build checks for structural correctness, contract tests for business rules, independent Firestore reads for durable outcomes, and browser verification for actual UI flows. A screenshot does not prove backend persistence, authorization, payment success, or booking correctness.

## Evidence lifecycle

`planned ≠ implemented ≠ verified ≠ runtime-proven ≠ completed ≠ generalized`

Validated reusable lessons may be distilled into `PRODUCT-KNOWLEDGE.md`; project-specific observations should remain project-specific.

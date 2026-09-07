# Contract — MedMap Domain Model

## Canonical state

Cloud Firestore is the authoritative durable state store for MedMap domain data.

Recommended top-level collections for the first implementation:

```text
clinics/{clinicId}
treatments/{treatmentId}
bookings/{bookingId}
subscriptions/{subscriptionId}
```

Clinics should retain the clinic-owned configuration needed for discovery and booking, including:

```text
profile
location
status
treatments
generalSchedule
exceptions
bookingPolicy
subscriptionProjection
```

Treatment records should identify:

```text
clinicId
name
clinicalMatterCategories
durationMinutes
bookingEnabled
priceMode
priceAmount
capacityOverride
```

Bookings should retain only data required for fulfillment, customer ownership, conflict detection, clinic management, and audit. Do not store clinical histories or medical records merely to enable marketplace booking.

## Identity

Customer and clinic operator ownership must be bound to authenticated identity. Client-provided ownership IDs are not sufficient authorization evidence.

## Location

Persist canonical latitude/longitude plus a human-readable address representation supplied by the clinic or verified through an approved location workflow. Map rendering may transform this data, but must not rewrite domain truth.

## Subscription projection

The Firestore subscription document is a projection of verified PayPal events, correlated to a MedMap-owned subscription/clinic relationship. The browser cannot mark a clinic paid or active.

## Read strategy

Customer map queries should use bounded geospatial/index-compatible representations and fetch only discovery fields needed for the current viewport/filter set. Full clinic profiles and booking configuration should be loaded only when needed.

## Privacy

Keep booking data minimal. A marketplace booking is not a clinical-record system. Sensitive medical details should not be required in ordinary discovery, booking, or map records.

# Contract — Clinic Subscriptions

## Purpose

Define how clinic subscription status is established and projected without allowing browser-controlled commerce state.

## Authority chain

```text
Clinic operator
   ↓
trusted MedMap subscription intent
   ↓
PayPal subscription/payment event
   ↓
Supabase Edge Function
   ↓
authenticity + correlation + idempotency checks
   ↓
Firestore subscription projection
   ↓
feature eligibility
```

PayPal is the external authority for its own payment/subscription events. Firestore is MedMap's durable projection, not a replacement for the PayPal event itself.

## Required fields

At minimum the projection should retain:

```text
clinicId
provider
paypalSubscriptionId
planId
status
currentPeriodEnd
lastProviderEventId
updatedAt
```

Do not store provider secrets in Firestore clinic documents.

## Event rules

- Verify webhook authenticity before business processing.
- Correlate the event to an existing MedMap subscription intent/clinic relationship.
- Make processing idempotent by provider event identity and appropriate business correlation.
- Ignore duplicate events after the authoritative event has already been durably processed.
- Never activate entitlement because the browser returned successfully from a checkout UI.

## Entitlement boundary

Subscription status can gate MedMap product capabilities for a clinic. It does not determine clinical quality, medical legitimacy, or whether a treatment is medically appropriate.

## Verification

Required evidence includes source-contract validation, idempotency tests, authenticated event processing tests, projection read-back, and live PayPal runtime evidence before claiming live payment completion.

## Current Supabase considerations

Supabase has changed Data API exposure defaults for new tables in 2026; MedMap should not assume a new public-schema table is automatically exposed, and any exposed Supabase table must have an intentional grant and RLS model. The current design avoids putting MedMap domain truth in Supabase Postgres, keeping Supabase focused on Storage and Edge execution. citeturn183718search0turn183718search6

Supabase client libraries also have a Node.js 22+ support boundary from 2026-06-30, so implementation should target a supported current runtime rather than Node 20. citeturn183718search3

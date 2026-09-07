# PRODUCT LAW — MedMap

**Status:** Initial product authority / clinic-surface reconciliation

`PRODUCT_LAW.md` is the highest product authority for MedMap. Code, UI, database choices, providers, deployment surfaces, skills, tools, and documentation MUST NOT silently override it.

This law adapts validated governance patterns from TeamAi, Universal ToolKit, and HomeFinder-Official: explicit authority boundaries, governance/development separation, evidence-backed completion, spatial responsibility, profile ownership, minimal resource use, and recoverable handover. Those repositories provide reusable engineering discipline, not authority over MedMap's product meaning.

## 0. Product in one sentence

**MedMap is a map-first clinic discovery and booking platform that helps customers find clinics offering selected clinical services and book only appointments that the clinic's configured availability, capacity, treatment rules, and booking policy can actually accept.**

MedMap is a service-discovery and booking intermediary. It is not a diagnosing clinician, treatment recommender, emergency-response service, or substitute for professional medical care.

## 1. Product Invariants

### 1.1 Service discovery precedes booking

A booking is valid only when:

```text
customer need / clinical matter
        ↓
selected treatment / service
        ↓
clinic offers that service
        ↓
clinic is published + eligible
        ↓
requested date/time satisfies clinic rules
        ↓
capacity remains available
        ↓
authoritative booking is accepted
```

The UI MUST NOT imply that a slot is bookable merely because a calendar can render it.

### 1.2 Availability is clinic-owned business truth

Clinic owners configure recurring hours, closures, exceptions, service duration, slot interval, capacity, and booking constraints. MedMap computes customer-facing availability from those rules plus durable bookings.

Client-side availability is advisory. Final acceptance MUST re-check authoritative state at commit time.

### 1.3 Booking races are correctness failures

When remaining capacity cannot support two simultaneous requests, both MUST NOT be confirmed. The trusted booking operation MUST enforce concurrency safety and idempotency.

### 1.4 Clinical matching is not diagnosis

A clinical matter is a discovery input, not a medical conclusion. Search or matching MUST NOT be presented as diagnosis, definitive treatment recommendation, or clinical suitability determination.

### 1.5 Location is discovery context

MapLibre/WebGL is the spatial presentation authority. Distance may improve discovery and ranking, but it MUST NOT be represented as proof of clinical quality, safety, suitability, or endorsement.

## 2. Map-first and Visual Product Law

### 2.1 Map-first identity

The primary MedMap experience is spatial. MapLibre GL / WebGL is a first-class application surface.

MedMap MAY use 3D buildings, terrain/elevation, clustering, camera transitions, custom clinic markers, spatial highlighting, and layered overlays where they improve comprehension.

Reduced-motion, degraded-map, and non-spatial alternatives MUST preserve the core task.

### 2.2 Spatial glass-skeuomorphic language

The visual language uses restrained translucent surfaces, depth, layered hierarchy, tangible controls, clear state changes, and clinical readability.

Visual depth MUST NOT obscure:

```text
availability
price state
booking state
ownership state
accessibility
clinical disclaimers
```

## 3. Clinic Page Law

Every published clinic has one canonical clinic page with a stable navigation model.

### 3.1 Public/guest clinic surface

Guests see these five semantic tabs:

```text
PROFILE | SERVICES | BOOKING | ABOUT | CONTACT
```

The implementation may render these as tabs, nested routes, segmented navigation, responsive panels, or equivalent navigation, but the five responsibilities MUST remain distinct.

### 3.2 Clinic hero

Every clinic has exactly one canonical **clinic hero**, the primary high-salience presentation shown when a user enters that clinic page.

The hero should establish:

```text
clinic identity
logo / primary visual
clinic name
basic location/context
primary trust/availability signal
primary next action
```

The hero MUST derive from canonical clinic data and MUST NOT become a second source of truth.

### 3.3 Profile tab

The Profile tab presents:

```text
logo
background / cover
clinic name
basic information
location/context
approved links
service-summary information
```

Only published/approved public data is displayed.

### 3.4 Services tab

The Services tab displays services/treatments explicitly enabled for public display by the clinic.

A service MAY include:

```text
name
description
duration
price state
bookability/availability state
material customer constraints
```

Disabled or unpublished services MUST NOT be presented as currently bookable.

Price state MUST remain explicit, for example:

```text
priced
price not published
contact clinic
```

Missing price MUST NOT become zero.

### 3.5 Booking tab

The Booking tab is the customer booking-submission surface.

The canonical flow is:

```text
choose service
→ choose date
→ choose server-derived available time
→ provide minimum approved booking information
→ submit booking
→ receive authoritative result
```

Selecting a time does not reserve it. Confirmation exists only after the authoritative booking operation succeeds.

### 3.6 About tab

The About tab contains the clinic's public bio and approved descriptive information.

Clinic owners may edit this through Edit. Private operational notes, secrets, or unapproved clinical claims MUST NOT leak into the guest surface.

### 3.7 Contact tab

The Contact tab exposes clinic-provided contact channels.

A clinic MUST provide at least one valid contact method before its public contact configuration is complete.

Supported examples include:

```text
email
phone
website
discord / community URL
social link
other approved external contact URL
```

The platform MUST validate the structure/type appropriate to the channel.

## 4. Owner Edit Law

### 4.1 Edit is owner-only

`Edit` is not a guest tab and MUST NOT appear in guest navigation.

Guest view:

```text
Profile | Services | Booking | About | Contact
```

An authorized clinic owner MAY additionally see:

```text
Edit
```

The Edit surface MAY manage:

```text
profile identity/presentation
services and service state
pricing state
weekly schedule
closed dates / exceptions
capacity
booking interval
booking policy
about content
contact channels
publication state where authorized
```

### 4.2 Authorization boundary

Ownership MUST be established from authenticated identity and canonical clinic ownership state.

None of the following is sufficient authorization:

```text
hidden button
client route secrecy
local storage value
client-provided clinic owner claim
query parameter
```

UI visibility is presentation. Backend authorization is enforcement.

### 4.3 Owner edits and availability

Owner edits to scheduling, service availability, duration, capacity, interval, or other booking-affecting fields MUST be treated as domain mutations that can invalidate customer-facing availability.

The product MUST recheck or invalidate stale availability before booking acceptance.

## 5. Scheduling and Capacity Law

Clinics MAY configure each weekday as closed or open with one or more intervals. Split schedules are supported.

Explicit date exceptions override recurring weekly rules. Special hours override the recurring rule for the affected date.

Slot interval and treatment duration are separate concepts.

Capacity modes include:

```text
exclusive
concurrent
optional treatment-specific override
```

Occupancy is evaluated over the treatment's active time range, not only by matching start timestamps.

Conceptually:

```text
remaining capacity
=
configured capacity
− overlapping accepted occupancy
```

## 6. Clinical Matter and Service Law

MedMap distinguishes:

```text
clinical matter / customer need
        ≠
treatment / service offered
```

The mapping exists for discovery only. Additional clinical metadata, eligibility rules, intake questions, diagnoses, or medical-record concepts require explicit product-law and safety review.

## 7. Data and Infrastructure Authority

MedMap intentionally keeps the initial architecture small.

### Firestore

Firestore is the canonical durable MedMap application-state authority for:

```text
clinics
clinic ownership metadata
treatments/services
schedules/exceptions
bookings
subscription projection/state
```

There MUST be one explicit canonical source of truth for each domain concept.

### Firebase Authentication

Firebase Authentication establishes authenticated identity when enabled. Authenticated identity is used for ownership and customer-account authorization.

### Supabase Storage

Supabase Storage stores clinic media and approved assets. Firestore stores required metadata/references.

Storage does not become the clinic-domain database merely because it stores files.

### Supabase Edge Functions

Supabase Edge Functions provide trusted execution for protected operations explicitly assigned to that boundary, including PayPal webhook handling.

### PayPal

PayPal is external authority for PayPal-originated subscription/payment events. MedMap correlates authenticated events and projects them into Firestore.

The browser MUST NOT self-attest payment success, active subscription, entitlement, or webhook receipt.

### GitHub

GitHub is the engineering/source-control authority.

## 8. Subscription / Entitlement Law

The subscription flow is:

```text
clinic/user identity
      ↓
server-owned subscription intent/correlation
      ↓
PayPal event
      ↓
authenticity verification
      ↓
idempotent durable commerce event
      ↓
Firestore subscription projection
      ↓
entitlement decision
```

Subscription state and booking state are distinct.

## 9. Governance Boundary

MedMap adopts the TeamAi/ToolKit principle that product authority, execution discipline, skills, implementation, and evidence are different layers.

```text
Human product decisions
        ↓
PRODUCT_LAW.md
        ↓
approved plans/contracts
        ↓
policy + skills
        ↓
implementation
        ↓
verification evidence
        ↓
handover / endorsement / knowledge
```

Skills describe bounded procedures. They do not grant authority.

Governance artifacts MUST remain outside product business logic. Product business logic MUST NOT be hidden in governance documents.

## 10. ORUCAVEAM

MedMap adopts the reusable TeamAi execution discipline:

```text
O Objective
R Restrictions
U User Authority
C Canonical Authority
A Action
V Verification
E Efficiency
A Audit
M Minimalistic Efficiency / Resource Use
```

Before an implementation action, the agent must understand what is being changed, what must not be crossed, why the user authorized it, which system owns the state, the smallest safe action, how it will be verified, how unnecessary work is avoided, what evidence survives, and the minimum sufficient resource/tool use.

ORUCAVEAM is not a second product law.

## 11. Verification Law

```text
implemented ≠ verified ≠ runtime-proven ≠ completed
```

Evidence must match the claim:

```text
build → compilation evidence
contract test → exercised contract evidence
browser test → exercised UI-flow evidence
Firestore read-back → observed durable-state evidence
PayPal live test → tested external commerce-path evidence
```

A browser screenshot or green build MUST NOT be inflated into proof of unrelated backend, authorization, payment, or concurrency behavior.

## 12. Privacy and Safety

MedMap MUST minimize sensitive customer-data collection and retention.

The platform MUST NOT:

- diagnose users;
- falsely claim medical suitability;
- fabricate clinic or treatment availability;
- conceal material booking constraints;
- turn unknown price into zero;
- confirm a booking before authoritative acceptance;
- expose private customer/clinic information without authorization;
- present itself as emergency care without an explicitly approved capability.

Clinical narratives and free-text health information SHOULD NOT become a general-purpose data lake.

## 13. State Semantics

These states remain distinct:

```text
clinic registered
clinic published
clinic active
service enabled
service bookable
clinic open
slot available
booking requested
booking confirmed
booking cancelled
subscription active
subscription suspended/expired
```

Examples:

```text
subscription active ≠ clinic open
clinic open ≠ treatment available
treatment available ≠ selected time available
slot available ≠ booking confirmed
```

## 14. Change and Conflict Rule

When a proposed implementation or document conflicts with this law or another canonical contract:

```text
STOP
  ↓
identify authority
  ↓
preserve discrepancy
  ↓
determine blast radius
  ↓
reconcile the product decision
  ↓
make the smallest coherent change
  ↓
re-verify
```

Recency, convenience, green tests, or deployment success do not override canonical authority.

## 15. Product Completion

A meaningful MedMap feature is complete only when:

```text
Product Law
  → plan / contract
  → applicable skill/procedure
  → implementation
  → verification evidence
  → integration/reconciliation
  → handover / endorsement
```

Clinic ownership and booking-critical work must include the relevant authorization, visibility, availability, concurrency, idempotency, and failure-path evidence.

## 16. Initial North Star

> **Make it easier to find a real clinic that offers the service you need, see what it actually offers, understand how to contact it, and book a time the clinic can genuinely accept.**

The map, clinic hero, Profile, Services, Booking, About, Contact, and owner-only Edit experiences all serve that promise.

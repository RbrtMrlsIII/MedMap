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

Every published clinic has a canonical clinic page with a stable navigation model.

### 3.1 Public/guest clinic surface

For guests, the clinic page exposes exactly these product concepts:

```text
PROFILE
SERVICES
BOOKING
ABOUT
CONTACT
```

The visual implementation may render these as tabs, segmented navigation, routes, panels, or responsive equivalents, but the semantic surfaces MUST remain distinct.

### 3.2 Clinic hero

Every clinic has one canonical **clinic hero**: the first high-salience presentation encountered when a user visits the clinic page.

The hero should establish:

```text
clinic identity
logo / primary visual
clinic name
basic location/context
primary trust/availability signal
primary next action
```

The hero is presentation, not a second profile database. It MUST derive from the clinic's canonical profile data.

### 3.3 Profile tab

The Profile tab contains the clinic's primary public identity and presentation information:

```text
logo
background / cover visual
clinic name
basic clinic information
location/context
approved links where applicable
service-summary information
```

Profile content is clinic-owned data, subject to platform validation and publication state.

### 3.4 Services tab

The Services tab displays the services/treatments currently enabled for that clinic and allowed to be public.

Each service MAY expose:

```text
name
customer-facing description
duration
price state
booking availability state
booking constraints where material
```

A service that is disabled, unpublished, or otherwise not eligible for booking MUST NOT be presented as currently bookable.

Unknown or intentionally unpublished price MUST remain a distinct state such as `Contact clinic` or `Price not published`; it MUST NOT become zero by inference.

### 3.5 Booking tab

The Booking tab is the customer submission surface for selecting a service, date, and valid time and providing the minimum information required by the clinic's approved booking flow.

The Booking tab MUST derive availability from clinic rules and durable booking state. It MUST NOT create a confirmed booking through client-only state.

### 3.6 About tab

The About tab contains the clinic's public bio and approved descriptive information.

Clinic owners may edit this information through the owner-only Edit surface. The About tab MUST NOT silently contain private operational notes, internal policy, secrets, or unapproved clinical claims.

### 3.7 Contact tab

The Contact tab exposes clinic-provided contact channels.

A clinic MUST provide at least one valid contact method before its public contact surface is considered complete.

Supported contact channels MAY include:

```text
email
phone
website
messaging/community link
social link
other approved external contact URL
```

The platform MUST validate the structure/type of a supplied link or contact value appropriate to the channel. Contact information is public only when the clinic chooses to publish it.

## 4. Clinic Owner Edit Law

### 4.1 Edit is owner-only

`EDIT` is an authenticated clinic-management surface and MUST NOT appear in guest navigation.

Guest view:

```text
Profile | Services | Booking | About | Contact
```

Authorized clinic owner view MAY additionally expose:

```text
Edit
```

The owner surface may manage:

```text
profile identity/presentation
services
service pricing state
weekly schedule
closed dates / exceptions
capacity
booking interval
booking policy
about text
contact channels
publication state where authorized
```

### 4.2 Authorization boundary

Ownership MUST be established from authenticated identity and canonical clinic ownership state. A client-provided clinic ID, hidden UI control, route secrecy, or local state MUST NOT be treated as proof of ownership.

Hiding Edit is presentation. Authorization is enforcement.

### 4.3 Edit writes are canonical domain mutations

Owner edits change Firestore-owned clinic domain state through an authorized mutation boundary. The UI MAY optimistically preview changes, but the authoritative state is the accepted durable write.

Material owner changes that affect availability MUST invalidate or recompute relevant availability views before customers are allowed to book from stale assumptions.

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

Occupancy is evaluated across the treatment's active time range, not only by matching start timestamps.

Conceptually:

```text
remaining capacity
=
configured capacity
− overlapping accepted occupancy
```

The final booking decision MUST occur against authoritative durable state.

## 6. Clinical Matter and Service Law

MedMap distinguishes:

```text
clinical matter / customer need
        ≠
treatment / service offered
```

The mapping between them exists for discovery only. Additional clinical metadata, eligibility rules, intake questions, or medical-record concepts require explicit product-law and safety review.

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

Supabase Storage stores clinic media and related approved assets. Firestore stores the metadata/references needed by the product.

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

Subscription state and booking state are distinct. An active subscription does not mean that a clinic is open or that a treatment/time is available.

## 9. Governance Boundary

MedMap adopts the TeamAi/ToolKit governance principle that product authority, execution discipline, skills, implementation, and evidence are different layers.

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

ORUCAVEAM is not a second product constitution.

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

A screenshot or green build MUST NOT be inflated into proof of unrelated backend, authorization, payment, or concurrency behavior.

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

Booking-critical work must include relevant availability, authorization, concurrency, idempotency, and failure-path evidence.

## 16. Initial North Star

> **Make it easier to find a real clinic that offers the service you need, see what it actually offers, understand how to contact it, and book a time the clinic can genuinely accept.**

The map, clinic page, profile, services, booking, about, contact, and owner-edit experiences all serve that promise.

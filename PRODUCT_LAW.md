# PRODUCT LAW — MedMap

**Status:** Initial product authority / implementation baseline

`PRODUCT_LAW.md` is the highest product authority for MedMap. It defines what MedMap is, what must remain true, which responsibilities are distinct, and which boundaries cannot be silently crossed. Code, UI, database choices, provider integrations, deployment surfaces, skills, tools, or documentation MUST NOT override this document without an explicit product-law reconciliation.

This law is deliberately adapted from the user's established TeamAi / Universal ToolKit governance patterns, while removing TeamAi-specific orchestration assumptions that do not belong to MedMap. TeamAi established the authority-stack, canonical-state, evidence, handover, and minimal-resource principles; ToolKit established the reusable project-governance structure and separation between governance and product-development layers. Those are patterns, not a substitute for MedMap's own product meaning.

## 0. Product in one sentence

**MedMap is a map-first clinic discovery and booking platform that helps customers find clinics capable of providing selected clinical services and book only appointments that the clinic's configured availability, capacity, treatment rules, and booking policy can actually accept.**

MedMap is a service-discovery and booking platform. It is not a diagnosing clinician, treatment recommender, medical authority, emergency-response service, or substitute for professional medical care.

## 1. Core Product Invariants

### 1.1 Clinical service discovery before booking

A booking is valid only when all of the following are true:

```text
customer request / clinical matter
        ↓
selected treatment or service
        ↓
clinic offers that treatment/service
        ↓
clinic is active and eligible on MedMap
        ↓
requested date/time satisfies clinic rules
        ↓
capacity remains available
        ↓
booking is accepted
```

The UI MUST NOT present a time as bookable merely because it can be rendered by a calendar component.

### 1.2 Availability is clinic-owned business truth

Clinic owners define their own bookable rules within the platform's permitted schema. MedMap computes customer-facing availability from those rules and durable booking state.

The canonical availability calculation is conceptually:

```text
BOOKABLE SLOT
=
weekly opening rules
− closed dates / exceptions
− existing reservations consuming capacity
− treatment duration constraints
− clinic booking-policy constraints
+ explicitly configured multi-capacity allowance
```

Any client-side preview of availability is advisory until the server/trusted runtime confirms the slot during booking creation.

### 1.3 No double-booking through races

Two customers attempting the same limited-capacity slot MUST NOT both be accepted when the clinic's remaining capacity cannot support both bookings.

Availability display and booking commit are different operations. The final booking decision MUST be made against authoritative durable state with a concurrency-safe rule.

### 1.4 Clinical language must not become diagnosis

Customers may describe a clinical matter or choose a service category to improve discovery. MedMap MUST NOT present its matching or search behavior as a medical diagnosis, definitive treatment recommendation, or clinical determination.

A clinic may provide its own professional description, contraindication/eligibility notes, or intake requirements subject to applicable platform policy, but MedMap itself remains a discovery and booking intermediary.

### 1.5 Location is a discovery primitive, not medical authority

MapLibre / WebGL provides the spatial interface. Geographic proximity can improve discovery and ranking, but distance MUST NOT be represented as evidence of treatment quality, clinical suitability, medical safety, or endorsement.

## 2. Product Experience Law

### 2.1 Map-first identity

The primary MedMap experience is spatial. MapLibre GL / WebGL is the map technology and the map is a first-class application surface, not an embedded afterthought.

The product MAY use 3D buildings, terrain/elevation where useful, custom clinic symbols, clustering, camera transitions, spatial highlighting, and layered overlays.

The map MUST remain understandable and usable when spatial effects are unavailable or reduced.

### 2.2 Spatial glass-skeuomorphic language

The visual system should use a restrained spatial glass-skeuomorphic approach:

- translucent surfaces and layered depth;
- strong spatial hierarchy between map, clinic cards, filters, and booking controls;
- subtle physical affordances without decorative clutter;
- legible typography and obvious state changes;
- responsive behavior that preserves task clarity over visual spectacle.

The aesthetic MUST NOT obscure availability state, price state, booking state, accessibility, or clinically relevant disclaimers.

### 2.3 The customer journey

The canonical customer journey is:

```text
Discover
  → search / map / filter
  → clinic
  → treatment / service
  → date
  → available time
  → booking details
  → booking confirmation
```

The interface MAY compress or reorder presentation details, but MUST preserve this semantic contract.

### 2.4 The clinic journey

The canonical clinic journey is:

```text
Register
  → create profile
  → add location
  → define treatments/services
  → configure weekly schedule
  → configure closures/exceptions
  → configure capacity / booking policy
  → review availability
  → manage bookings
```

## 3. Clinic Profile Law

A clinic profile is an operational identity on MedMap. At minimum it may contain:

```text
identity
├── legal/display clinic name
├── description
├── contact details
├── location / coordinates
├── profile and gallery media references
└── published / active state

treatments
├── treatment identity
├── customer-facing description
├── duration
├── price state
└── booking eligibility

schedule
├── weekly open/closed rules
├── opening intervals
├── closed dates
├── special hours
└── exceptions

capacity / booking policy
├── default capacity
├── treatment-specific capacity where supported
├── slot interval
├── duration rules
├── simultaneous-booking policy
└── customer-facing booking constraints
```

A clinic may state a treatment price or intentionally omit a public price. An omitted price MUST be represented as a distinct state such as `contact clinic` or `price not published`, not silently converted to zero.

## 4. Scheduling and Capacity Law

### 4.1 Weekly schedule

Clinics may configure each weekday as:

```text
closed
or
open → one or more opening intervals
```

Split schedules MUST be representable where clinically/operationally useful, such as `09:00–12:00` and `13:00–17:00`.

### 4.2 Closed dates and exceptions

Explicit closed dates override recurring availability.

Special hours override the recurring weekly rule for the affected date.

The precedence order is:

```text
explicit date exception
        ↓
weekly schedule
        ↓
platform safety / booking constraints
```

### 4.3 Customer interval / slot granularity

A clinic may define a slot interval such as 15, 30, or 60 minutes. Slot interval is not necessarily equal to treatment duration.

The booking engine MUST derive valid start times using the clinic's interval and the selected treatment's duration.

### 4.4 Exclusive capacity

For capacity `1`, a conflicting accepted booking consumes the slot for the relevant treatment duration and MUST prevent an overlapping booking when the clinic has configured exclusive handling.

### 4.5 Concurrent capacity

Clinics may configure multiple simultaneous bookings. Capacity is consumed numerically rather than as a binary free/busy flag.

Conceptually:

```text
remaining capacity
=
configured capacity
− overlapping accepted bookings consuming that capacity
```

The system MAY support treatment-specific capacity rules, subject to a stable schema and explicit product-contract validation.

### 4.6 Booking intervals are authoritative at commit time

A customer selecting a time in the UI does not reserve it merely by selecting it. Reservation/booking state is created only by a successful authoritative write.

The UI MUST communicate when a slot is no longer available because another booking won the race.

## 5. Clinical Matter and Treatment Law

MedMap distinguishes:

```text
clinical matter / customer need
        ≠
treatment / service offered by a clinic
```

A customer may search using a matter such as `tooth pain`, while a clinic may publish services such as `dental consultation`, `examination`, or another service category.

The mapping layer is for discovery and service matching. It MUST NOT claim that MedMap has diagnosed the user.

Treatments MUST have a stable identity, customer-facing name, and booking configuration. Additional clinical metadata MUST only be introduced when there is a clear product purpose, a defined data authority, and appropriate safety review.

## 6. Data Authority and Infrastructure Law

MedMap intentionally prefers a small architecture for the initial product.

### 6.1 Firestore

Cloud Firestore is the canonical durable application data store for:

```text
clinics
clinic treatments/services
clinic schedules
clinic exceptions
bookings
customer-facing booking state
subscription projection/state
```

The exact collection structure may evolve, but there MUST be one explicit canonical source of truth for each domain concept.

### 6.2 Firebase Authentication

Firebase Authentication, if enabled for the product, owns authenticated identity and user identity establishment. The authenticated user identifier MUST be used to establish ownership for clinic-management and customer-account operations.

### 6.3 Supabase Storage

Supabase Storage is the preferred initial asset store for clinic media such as:

```text
logos
cover images
clinic gallery images
approved treatment/service media
```

Firestore SHOULD store metadata/references to these assets rather than large binary payloads.

Supabase Storage does not become the canonical clinic-domain database merely because it stores clinic assets.

### 6.4 Supabase Edge Functions

Supabase Edge Functions are trusted server-side execution boundaries for protected operations that should not be entrusted to the browser, including PayPal webhook processing and any future server-owned operation explicitly assigned to that boundary.

An Edge Function is an execution mechanism, not automatically a source of domain truth.

### 6.5 PayPal

PayPal is authoritative for external subscription/payment events that originate in PayPal.

MedMap owns the correlation and projection of those events into its own subscription state.

The browser MUST NOT self-attest:

```text
payment succeeded
subscription active
clinic entitled
webhook received
```

Those states come from trusted server-side handling of authenticated provider events.

### 6.6 GitHub

GitHub is the engineering/source-control authority for MedMap. Repository history, canonical source, review, and engineering evidence belong there.

### 6.7 Deployment surfaces

A deployment provider is a delivery surface, not automatically a product or data authority. Deployment success MUST NOT be treated as proof that booking, authorization, payment, or durable-state behavior is correct.

## 7. Subscription / Entitlement Law

Clinic subscription status affects platform access and/or commercial entitlements, but subscription state MUST remain derived from trusted payment events and platform policy.

The conceptual flow is:

```text
clinic/user identity
      ↓
server-owned subscription intent/correlation
      ↓
PayPal event
      ↓
webhook authenticity verification
      ↓
idempotent durable commerce event
      ↓
Firestore subscription projection
      ↓
entitlement decision
```

Webhook handlers MUST be idempotent. Replayed events MUST NOT create duplicate commercial effects.

Subscription state and booking state are distinct concepts. An active subscription does not imply that a specific clinic's treatment is clinically appropriate, available at every time, or guaranteed to remain open.

## 8. Authority Stack

MedMap uses the following product-development authority order:

```text
Human product decisions
        ↓
PRODUCT_LAW.md
        ↓
approved plans / contracts
        ↓
engineering policy / execution discipline
        ↓
skills / procedures
        ↓
implementation
        ↓
verification evidence
        ↓
handover / endorsement / distilled knowledge
```

Skills explain how to perform bounded work. They do not grant authority.

Code implements product law. Code does not rewrite product law through convenience.

## 9. Governance and Development Layer Separation

MedMap adopts the ToolKit separation pattern:

### Governance / canonical layer

Examples include:

```text
PRODUCT_LAW.md
MASTERPLAN.md
POLICY.md
PRODUCT-KNOWLEDGE.md
ENDORSEMENT.md
AI_ASSISTANT_READ_ME.md
.agent/
docs/
skills/
scripts/
validation/
```

### Product-development layer

The actual application code, assets, tests, and product configuration live in the repository's development structure, with exact top-level layout to be established by the approved implementation plan.

Business logic MUST NOT be hidden inside governance documents. Governance findings, logs, and canonical rules MUST NOT be embedded inside application source merely for convenience.

New root-level governance or product directories SHOULD be introduced only when their responsibility is clear and documented.

## 10. Execution Discipline: ORUCAVEAM

MedMap adopts the reusable ORUCAVEAM discipline from the established TeamAi governance model:

- **O — Objective:** What exact product outcome is being pursued?
- **R — Restrictions:** What must not be changed, bypassed, inferred, exposed, or allowed?
- **U — User Authority:** What user instruction/approval authorizes this action?
- **C — Canonical Authority:** Which document, service, datastore, or external provider owns the meaning/state?
- **A — Action:** What is the smallest canonical operation that advances the objective?
- **V — Verification:** What evidence proves the claim?
- **E — Efficiency:** What avoids unnecessary work while preserving correctness?
- **A — Audit:** What trace, decision, scope, and evidence must survive for review/recovery?
- **M — Minimalistic Efficiency / Resource Use:** What is the minimum sufficient set of reads, writes, builds, browser runs, deployments, provider calls, and context transfers required to complete and prove the action?

ORUCAVEAM is an execution discipline, not a second product law.

## 11. Verification Law

The statement:

```text
implemented ≠ verified ≠ runtime-proven ≠ completed
```

is mandatory.

Verification must match the claim being made.

Examples:

```text
TypeScript build
    proves compilation only

unit/contract test
    proves exercised contract behavior only

browser test
    proves exercised browser flow only

Firestore read-back
    proves observed persisted state only

live PayPal webhook test
    proves the tested external commerce path only
```

No single artifact may be inflated into proof of unrelated behavior.

## 12. Minimal Resource Use

MedMap SHOULD prefer:

- targeted repository reads instead of broad duplicate inspection;
- one coherent implementation over scattered speculative patches;
- deterministic local/CI checks before expensive hosted checks where appropriate;
- idempotent writes and safe retries;
- authoritative read-back after important writes;
- bounded browser verification focused on the affected flow;
- asset storage by reference rather than large repeated database payloads;
- reuse of valid prior evidence when it still covers the same pinned scope.

Minimalism MUST NOT be used to skip required safety, concurrency, authorization, privacy, or verification work.

## 13. Product Safety Boundary

MedMap operates around clinical services and therefore has a higher safety sensitivity than a generic appointment scheduler.

The platform MUST NOT:

- diagnose users;
- claim that a clinic, treatment, or provider is medically suitable solely from map/search matching;
- fabricate clinic availability or treatment availability;
- conceal material booking constraints;
- silently convert unknown price into zero price;
- treat a booking request as a confirmed booking before authoritative acceptance;
- expose private clinic/customer information outside the authorized product flow;
- present the platform as emergency care unless a separately approved emergency-service capability exists.

User-facing copy SHOULD make the platform's role clear where ambiguity could cause harm.

## 14. Privacy / Data Minimization Boundary

The initial MedMap product SHOULD minimize collection and retention of sensitive customer information.

The booking system SHOULD store only information necessary to identify the booking, satisfy the clinic's approved intake requirements, communicate the appointment, enforce booking rules, and support lawful operational/audit needs.

Clinical narratives or free-text descriptions SHOULD NOT become a general-purpose data lake. Any expansion into richer clinical records, clinical documents, diagnoses, or medical histories requires explicit product-law and safety review.

## 15. State and Naming Semantics

The following states MUST remain semantically distinct where relevant:

```text
clinic registered
clinic published
clinic active
clinic treatment available
clinic currently open
slot available
booking pending
booking confirmed
booking cancelled
booking completed
subscription active
subscription expired / suspended
```

One state MUST NOT be inferred as another merely because it often co-occurs with it.

For example:

```text
subscription active ≠ clinic open
clinic open ≠ selected treatment available
selected treatment available ≠ selected time available
slot available ≠ booking confirmed
```

## 16. Change / Conflict Rule

When a proposed change conflicts with this document or another canonical contract:

```text
STOP
  ↓
identify the conflicting authority
  ↓
record the discrepancy
  ↓
determine blast radius
  ↓
reconcile the product decision
  ↓
make the smallest coherent change
  ↓
re-verify affected behavior
```

Do not resolve canonical conflicts by recency, convenience, green tests, or deployment success alone.

## 17. Product Knowledge and Handover

Validated lessons should be distilled rather than accumulated as permanent noise.

The preferred lifecycle is:

```text
observation
  ↓
evidence
  ↓
handover note
  ↓
endorsement / acceptance where required
  ↓
appropriate skill, knowledge, or canonical update
```

A discovered technique is not automatically product law.

A MedMap-specific lesson MUST remain MedMap-specific unless evidence supports generalization. Generalized reusable lessons may later be considered for upstream ToolKit contribution, but ToolKit MUST NOT override MedMap authority.

## 18. Definition of Product Completion

A meaningful MedMap feature is not complete merely because code exists.

Completion requires a traceable chain:

```text
Product Law
  → approved plan / contract
  → applicable procedure / skill
  → implementation
  → verification evidence
  → integration / reconciliation
  → handover / endorsement state
```

For booking-critical changes, the evidence SHOULD include the relevant concurrency, authorization, availability, and failure-path behavior, not just the happy path.

## 19. Initial Product Scope

The initial product should prioritize this narrow, testable capability:

```text
CUSTOMER
MapLibre map
  → find clinics
  → inspect clinic
  → choose treatment/service
  → inspect real availability
  → make booking
  → receive confirmation

CLINIC
Register
  → configure profile
  → configure treatments/services
  → configure weekly availability
  → configure closed dates / exceptions
  → configure capacity / booking interval
  → manage bookings

PLATFORM
Clinic subscription
  → PayPal
  → trusted webhook boundary
  → Firestore entitlement projection
```

Search ranking, reviews, messaging, advanced patient records, AI clinical guidance, multi-location enterprise tooling, and other capabilities are future scope unless explicitly added through product-law reconciliation.

## 20. Non-Negotiable North Star

> **MedMap should make it easier to find a real clinic that offers the service you need and book a time that the clinic can genuinely accept.**

Everything else is subordinate to making that proposition trustworthy, understandable, spatially useful, and operationally real.

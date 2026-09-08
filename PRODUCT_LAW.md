# PRODUCT LAW — MedMap

**Status:** Baseline product authority, spatial architecture, clinic, booking, and commerce reconciliation

`PRODUCT_LAW.md` is MedMap's highest product authority. It defines product meaning and invariants. Masterplan defines chronology. Contracts define detailed requirements. Skills define how work is performed. Policy defines ORUCAVEAM and wiring. Implementation and evidence may not silently redefine this law.

## 0. Product in one sentence

**MedMap is a map-first clinic discovery and booking intermediary that helps guests find real clinics offering published services, inspect one canonical clinic surface, contact the clinic through owner-provided contact channels, and book only appointments that the clinic's configured rules and authoritative acceptance can support.**

MedMap is not a diagnosing clinician, emergency service, treatment recommender, or medical-record system.

## 1. Product Invariants

### 1.1 Discovery precedes booking

```text
need / clinical matter
→ treatment or service discovery
→ eligible published clinic
→ clinic surface
→ booking preparation
→ authentication
→ authoritative booking submission
→ accepted / rejected result
```

A rendered calendar slot is not a booking guarantee.

### 1.2 Clinic truth owns availability

Clinic owners define recurring hours, closures, exceptions, service duration, booking interval, capacity, and booking policy. Customer-facing availability is derived from those rules and durable booking state.

Client-rendered availability is advisory. Final acceptance must re-check authoritative state.

### 1.3 Concurrency and idempotency are product correctness

Two simultaneous requests must not both consume capacity that only one can support. Duplicate submissions must be idempotent.

### 1.4 Clinical matching is not diagnosis

Search terms and clinical-matter inputs are discovery context. They must never be rendered as diagnosis, clinical certainty, or a definitive medical suitability decision.

### 1.5 Contact, not messaging

MedMap has **no internal messaging system**.

A clinic publishes approved contact channels. Those channels are stored as approved clinic contact records in canonical application state and exposed through the clinic Contact surface. Communication happens through those external clinic channels.

## 2. MedMap 3D Spatial Product and Web Architecture

### 2.1 MedMap 3D Spatial is the website architecture

The product is intentionally a spatial website rather than a conventional stack of flat pages with decorative 3D added afterward.

```text
THREE.JS SPATIAL SITE
  ├─ cinematic Hero environment
  ├─ rooms / architectural boundaries
  ├─ objects / section anchors
  ├─ animation / transforms
  ├─ lighting / materials / reflections
  └─ presentation camera choreography

REACT + HTML + CSS
  ├─ Header / navigation
  ├─ semantic controls
  ├─ search
  ├─ clinic surfaces
  ├─ authentication
  ├─ booking
  └─ accessibility fallback

MAPLIBRE GL JS
  └─ guest geographic discovery / filtering / search

CANONICAL APPLICATION DATA
  └─ Firestore + trusted server boundaries
```

Three.js owns the authored spatial environment. MapLibre is **inside** MedMap 3D Spatial as its geographic discovery engine. Neither visual renderer becomes canonical domain authority.

### 2.2 Initial theme root

The first authored environment is a minimalist modern coastal apartment / studio beside a beach, with surrounding trees and a calm clinical atmosphere.

The desired visual combination is:

```text
modern coastal architecture
+ light stone / concrete
+ warm wood
+ architectural glass
+ restrained metal
+ beach / coastal horizon
+ surrounding greenery
+ soft natural daylight
+ controlled clinical blue-green accents
+ restrained glass-skeuomorphic UI
```

The theme must feel cinematic without becoming theatrical clutter. Clinical clarity is the counterweight to visual atmosphere.

### 2.3 Arrival concept

The opening Hero is a spatial arrival:

```text
arrive from afar
→ approach the building
→ cross a valid architectural opening
→ enter the Main Hall
→ Header reveals
→ section/object anchors become legible
→ selected object focuses
→ child UI reveals
```

The normal camera path must respect architectural boundaries. Ordinary traversal must not pass through walls or closed structural surfaces.

### 2.4 Rooms represent product contexts

The current baseline census is:

```text
1. Arrival
2. Main Hall / Home
3. Guest Discovery Room
4. Clinic Room
5. Authentication
6. Patient Workspace
7. Clinic Owner Workspace
```

This is a product census, not a commitment to a literal physical building plan. Room, corridor, portal, and camera composition are the spatial expression of each context.

### 2.5 Spatial objects are active interfaces

Objects are not merely static decoration. A product object may:

```text
idle
→ hover / focus
→ transform
→ animate
→ expose or reveal child UI
→ accept semantic action
→ settle / return
```

The object is still a presentation anchor. Its visual state must not become a second source of truth for clinic, booking, ownership, availability, or entitlement.

### 2.6 Cinematic lighting is part of the product theme

Lighting is not only technical decoration. It controls perceived hierarchy, material legibility, reflection, transparency, contrast, depth, and visual focus.

The spatial experience must consider:

```text
key / sun direction
fill balance
rim contribution
window daylight
interior shadow
material roughness
specular intensity
glass transparency
reflection readability
contrast against UI
exposure / tone mapping
fog / atmosphere
```

Lighting must support meaning. Decorative brightness must never imply availability, capacity, popularity, safety, endorsement, or clinical superiority.

### 2.7 Spatial camera questions that must be answered by later contracts/skills

Product law requires these questions to be resolved before corresponding implementation is accepted:

- What are the named camera states for arrival, hall entry, object focus, room entry, return, and overview?
- What minimum and maximum position, distance, yaw, pitch, and any roll are allowed for each state?
- How does a new camera target replace an existing target without creating an unbounded transition queue?
- How is interruption handled while a transition is in progress?
- Which transitions are scroll-driven, pointer-assisted, keyboard-accessible, or explicitly triggered by semantic UI?
- What guarantees keep normal traversal outside solid walls and other forbidden architecture?
- How does the system behave when a room or object is unavailable at a narrow viewport?

### 2.8 Spatial traversal questions

- What is the exact Hero traversal region?
- How is scroll distance normalized into bounded progress?
- What happens on overscroll, touch momentum, keyboard scrolling, and reduced motion?
- Which camera transitions are reversible?
- Can users cancel a transition and move to another target immediately?
- What is the semantic non-spatial equivalent of every spatial action?

### 2.9 Occlusion questions

- Which objects may overlap other objects?
- Which semantic controls are never allowed to be visually occluded?
- How are clinic identity, price, booking state, contact access, and accessibility controls protected from decorative geometry?
- When an HTML panel and 3D object compete for salience, which layer wins?
- Can fog, glass, reflections, bloom, or lighting reduce semantic legibility below the acceptable threshold?

### 2.10 Information hierarchy

Spatial composition must prioritize:

```text
1. semantic action
2. clinic identity
3. service / discovery meaning
4. geographic context
5. spatial guidance
6. decoration
```

### 2.11 Spatial representation is not domain meaning

These mappings are forbidden:

```text
3D building height ≠ clinic quality
object brightness ≠ availability
object size ≠ booking capacity
spatial prominence ≠ endorsement
visual health symbol ≠ diagnosis / suitability
```

### 2.12 Spatial fallback

Three.js is progressive presentation. MapLibre is progressive geographic presentation. The core tasks of discovering a clinic, inspecting its services, contacting the clinic, authenticating, and booking must remain available through semantic application UI when either renderer is unavailable.

## 3. Guest Clinic Surface

Every public clinic uses one canonical semantic model:

```text
PROFILE | SERVICES | BOOKING | ABOUT | CONTACT
```

A route, tabs, panels, or responsive equivalent may change visually, but the five responsibilities remain distinct.

### 3.1 Profile

Identity, approved presentation, basic information, and location/context.

### 3.2 Services

Only enabled/published services are publicly displayed as offerings. Price must have an explicit state such as fixed/starting/range/contact/not-published when those capabilities are enabled. Unknown price is never zero.

### 3.3 Booking

Customer booking submission occurs here and is authenticated before final booking submission.

### 3.4 About

Approved descriptive information only.

### 3.5 Contact

Approved clinic-owned contact channels. No MedMap inbox.

## 4. Authentication and Registration

A guest may discover clinics without authentication.

Authentication becomes required when the guest proceeds into actual booking submission.

Supported initial authentication methods:

```text
Email
Google
```

Registration roles:

```text
Patient
Clinic Owner
```

Identity and role are canonical account state. A URL, hidden button, or UI label never grants clinic-owner authorization.

## 5. Owner Edit and Clinic Supply

`Edit` is never a guest tab.

Clinic Owners may manage the parts of their canonical clinic they are authorized to manage, including profile, services, schedules, availability-affecting rules, approved contacts, about content, and publication state where permitted.

Clinic discovery is based on clinic records that are registered, sufficiently configured, approved/published for the applicable public state, and active under the final lifecycle contract.

Whether a separate explicit **verified** state is required must be answered by the clinic-supply contract before it is introduced into runtime logic.

## 6. Booking and Clinic Operations

### 6.1 Durable booking records

Accepted bookings are durable records. Subscription intake limits do not erase historical or future accepted bookings.

### 6.2 Clinic operational register

Each Clinic Owner needs a spreadsheet-like booking register / calendar view over canonical booking records so the owner can review requests, approve or reject them, manage operational status, and reduce the active intake queue efficiently.

The register is an operational projection, not a second database authority.

### 6.3 Intake allowance

A subscription tier may cap **new incoming booking requests per day**. That is an intake/queue allowance, not a product-wide storage ceiling.

A pending request reaching a terminal queue action such as approval, rejection, cancellation, or another finalized state may free intake capacity according to the final contract.

An already accepted booking is not retroactively invalidated merely because a later daily intake allowance is reached, reduced, or changed.

### 6.4 Capacity

Clinic schedule/service capacity determines whether overlapping treatment demand can be supported.

```text
remaining capacity
=
configured capacity
− relevant overlapping accepted occupancy
```

Exclusive, concurrent, and treatment-specific capacity are supported concepts.

## 7. Subscription / Entitlement

Only Clinic Owners require a clinic subscription to keep their operational clinic page working under the final entitlement definition.

Baseline offer:

```text
first qualifying month: PHP 99.00
following 2 months: free
then regular PHP 99.00 monthly
```

The promotional benefit is intended as a one-time introductory offer. Final eligibility and commerce rules must be settled before live billing.

The product supports up to five subscription tiers. Tier names, prices beyond the base offer, and exact daily incoming-request allowances remain undecided until the commerce contract resolves them.

Subscription state is distinct from:

```text
clinic open state
service availability
slot availability
booking confirmation
```

Questions that must be answered before commerce completion:

- What exactly becomes unavailable when entitlement is inactive?
- Is the clinic hidden from discovery, non-bookable, or fully suspended?
- What happens to already accepted future bookings?
- What happens to pending requests at suspension time?
- When does queue allowance become available again after a request reaches a terminal state?
- How does a tier reduction affect same-day intake allowance?
- Does the introduction offer attach to an account, a Clinic Owner, or a subscription entity?
- What are retry, grace, refund, tax, and cancellation rules?

## 8. Data and Authority

```text
Firestore
  = canonical MedMap domain state

Firebase Authentication
  = authenticated identity

Supabase Storage
  = clinic/media asset storage

Supabase Edge Functions / trusted backend
  = protected server operations and external-event handling

PayPal
  = external authority for PayPal-originated payment/subscription events

GitHub
  = engineering source-control surface, not product authority
```

The current working source is the project package and its repository state. No provider becomes product authority merely because it stores code or data.

## 9. Privacy and Safety

MedMap minimizes customer data and must not become a general medical-history repository.

It must not diagnose, fabricate availability, hide material booking constraints, misrepresent price, expose private information, or confirm a booking before authoritative acceptance.

## 10. State Semantics

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
booking rejected
booking cancelled
subscription active
subscription suspended / expired
```

And:

```text
subscription active ≠ clinic open
clinic open ≠ service available
service available ≠ selected time available
slot available ≠ booking confirmed
```

## 11. Change / Conflict Rule

When implementation or documentation conflicts with a canonical decision:

```text
STOP
→ identify authority
→ preserve discrepancy
→ determine blast radius
→ resolve the product decision
→ update the correct layer
→ verify again
```

A green test, recent commit, or convenient implementation does not override Product Law.

## 12. Product Completion

A slice is not complete merely because code exists.

```text
Product Law
→ Masterplan slice
→ Contract
→ Skill
→ Implementation
→ Verification evidence
→ Reconciliation
→ Full project ZIP handover
```

The full project ZIP handover is mandatory for every edit, fix, addition, code change, documentation change, or other project mutation.

## 13. Initial North Star

> Make it easier to find a real clinic that offers the service you need, understand what it actually offers, contact the clinic through its approved channels, and book only what the clinic can genuinely accept.

# Contract — Clinic Profile Surface

## Purpose

Define the canonical clinic page model, guest-visible tabs, owner-only editing boundary, clinic hero, and public contact/profile behavior.

## Canonical clinic page

Every published clinic has these public semantic surfaces:

```text
PROFILE | SERVICES | BOOKING | ABOUT | CONTACT
```

The implementation may use tabs, nested routes, segmented controls, responsive panels, or another navigation mechanism, but these responsibilities MUST remain distinct.

## Clinic hero

The clinic page has one canonical hero presentation derived from the clinic's profile state.

Minimum hero responsibilities:

- establish clinic identity;
- present logo/primary visual where available;
- display clinic name;
- expose useful location/context;
- provide the primary next action;
- communicate important availability/trust state without inventing facts.

The hero is not a second source of clinic data.

## Profile tab

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

## Services tab

The Services tab displays services/treatments explicitly enabled for public display by the clinic.

Each service may include:

```text
name
description
duration
price state
bookability/availability state
material customer constraints
```

Disabled/unpublished services MUST NOT be shown as currently bookable.

Price states remain explicit:

```text
priced
price not published
contact clinic
```

Missing price MUST NOT become zero.

## Booking tab

The Booking tab is the guest booking entry surface.

It MUST allow a guest to:

```text
choose service
→ choose date
→ choose server-derived available time
→ provide minimum approved booking information
→ submit booking
```

The tab MUST NOT create confirmed state using client-only state.

## About tab

The About tab contains the clinic's public bio and approved descriptive content.

The source is clinic-owned profile state. Private operational notes and secrets MUST NOT be exposed.

## Contact tab

The Contact tab displays clinic-provided contact channels.

A clinic must provide at least one valid contact method before its public contact configuration is complete.

Supported examples:

```text
email
phone
website
discord / community URL
social link
other approved external link
```

A channel must be structurally valid for its type before publication.

## Owner-only Edit surface

`Edit` is not a guest tab.

Guest navigation:

```text
Profile | Services | Booking | About | Contact
```

Authorized clinic owner navigation may add:

```text
Edit
```

Owner editing MAY cover:

```text
profile presentation
services and service state
pricing state
schedule
closed dates / exceptions
capacity
booking interval
booking policy
about content
contact channels
publication state where authorized
```

## Authorization

Ownership must be established from authenticated identity and canonical clinic ownership data.

The following are never sufficient authorization:

```text
hidden button
client route secrecy
local storage value
client-provided clinic owner claim
query parameter
```

UI visibility is presentation. Server/backend authorization is enforcement.

## Availability coupling

Owner edits to any field that can affect booking availability MUST be treated as domain mutations that can invalidate customer-facing availability.

At minimum:

```text
schedule change
closed date change
special-hours change
treatment duration change
service enabled/disabled change
capacity change
booking interval change
```

The product MUST define how stale availability is invalidated or rechecked before booking acceptance.

## Guest visibility matrix

| Surface | Guest | Clinic owner |
|---|---:|---:|
| Hero | Yes | Yes |
| Profile | Yes | Yes |
| Services | Yes | Yes |
| Booking | Yes | Yes |
| About | Yes | Yes |
| Contact | Yes | Yes |
| Edit | No | Yes, when authorized |
| Private owner controls | No | Yes, when authorized |

## Verification obligations

At minimum, verification must prove:

1. Guest can see Profile, Services, Booking, About, Contact.
2. Guest does not receive Edit functionality as an authorized owner surface.
3. Unauthorized users cannot mutate clinic profile data even if they call the owner route directly.
4. Owner can edit permitted profile/services/about/contact fields.
5. Service publication state controls guest visibility.
6. At least one contact method is required for completed public contact configuration.
7. Price-not-published remains distinct from zero price.
8. Availability-affecting edits trigger appropriate stale-state handling.

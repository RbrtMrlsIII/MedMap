# Contract — MedMap Spatial Site Architecture

## Purpose
Define the spatial web architecture that separates the authored Three.js site from the guest MapLibre discovery surface and semantic React UI.

## Layers

```text
Three.js Spatial Shell
  ├── arrival environment
  ├── main hall
  ├── rooms / spatial zones
  ├── architecture boundaries
  ├── interactive objects
  ├── lighting/material presentation
  └── camera choreography

MapLibre Discovery Surface
  ├── geographic map
  ├── clinic points
  ├── search/filter results
  └── geographic focus

React / HTML / CSS
  ├── header/navigation
  ├── forms and controls
  ├── clinic/service semantics
  ├── authentication
  ├── booking
  └── accessibility fallback

Firestore
  └── canonical domain truth
```

## Initial room census

| Root | Audience | Primary responsibility |
|---|---|---|
| Arrival | Guest | cinematic orientation and entry |
| Main Hall | Guest | home/navigation and section anchors |
| Discovery Room | Guest | MapLibre search/filter/discovery |
| Clinic Room | Guest/Auth | clinic identity, services, booking, about, contact |
| Authentication Room/State | Guest | login/register gate for booking |
| Patient Workspace | Patient | authenticated booking/account workflows |
| Clinic Owner Workspace | Owner | clinic configuration, bookings, subscription |

The census may branch when UX proves a room should be split. A split is a content/context decision and must not silently change domain responsibilities.

## Navigation boundary
Guest discovery does not require authentication. Booking submission does. Internal clinic-patient messaging does not exist; Contact exposes approved external clinic channels.

## Architectural traversal
Camera traversal must use available paths through authored environment. Normal navigation must not pass through walls or other blocking architecture.

## Spatial object semantics
Objects may anchor child UI, but semantic HTML remains accessible authority for actions. Objects may trigger focus, reveal, transform, and transition states; they cannot create clinic, booking, availability, ownership, or subscription truth.

## Open product decisions
- final room count;
- exact sections assigned to each room;
- object-to-UI mapping;
- room entry/exit camera rules;
- whether some owner/patient surfaces remain conventional application surfaces rather than spatial rooms.

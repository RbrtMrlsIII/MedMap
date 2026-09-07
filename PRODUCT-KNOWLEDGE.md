# PRODUCT-KNOWLEDGE — MedMap

Validated patterns, anti-patterns, gotchas, and durable implementation lessons. Unvalidated ideas do not belong here.

## Validated Patterns

| Pattern | Evidence | Scope |
|---|---|---|
| Product Law should be MedMap-specific rather than copied wholesale from TeamAi | TeamAi/ToolKit repository review; MedMap law adaptation | Governance |
| Clinic availability must be evaluated server-side | MedMap Product Law + Masterplan | Booking |
| MapLibre is a presentation/spatial layer, not booking authority | MedMap Product Law + current architecture | Spatial |
| PayPal events should project subscription state only after trusted verification | Existing TeamAi commerce governance + MedMap architecture | Commerce |

## Anti-Patterns

| Anti-pattern | Why it is dangerous |
|---|---|
| Treating a selected calendar slot as a reservation | Creates false availability and race-prone booking UX |
| Letting the browser write subscription/entitlement truth | Allows client-controlled commerce state |
| Storing booking truth only in UI/local state | Makes recovery, concurrency, and audit unreliable |
| Using MapLibre marker state as the source of clinic state | Couples presentation state to domain authority |
| Copying TeamAi-specific orchestration law into MedMap | Imports unrelated authority and product concepts |

## Minimalism log

Foundation starts with the smallest governance set needed to make future implementation traceable. Add durable knowledge only after evidence demonstrates it is reusable.

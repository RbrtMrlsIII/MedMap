# PRODUCT-KNOWLEDGE — MedMap

Validated patterns, anti-patterns, gotchas, and durable implementation lessons. Unvalidated ideas do not belong here.

## Validated Patterns

| Pattern | Evidence | Scope |
|---|---|---|
| Product Law should be MedMap-specific rather than copied wholesale from TeamAi | TeamAi/ToolKit repository review; MedMap law adaptation | Governance |
| Clinic availability must be evaluated server-side | MedMap Product Law + Masterplan | Booking |
| MapLibre is a presentation/spatial layer, not booking authority | MedMap Product Law + current architecture | Spatial |
| PayPal events should project subscription state only after trusted verification | Existing TeamAi commerce governance + MedMap architecture | Commerce |
| Guest clinic navigation and owner editing must remain separate semantic surfaces | MedMap clinic-surface contract | Clinic UX + authorization |
| Clinic hero should derive from the same canonical profile state as the Profile surface | MedMap clinic-surface contract | Presentation/data integrity |
| At least one valid public contact channel is required for a complete clinic contact configuration | MedMap clinic-surface contract | Clinic profile |

## Anti-Patterns

| Anti-pattern | Why it is dangerous |
|---|---|
| Treating a selected calendar slot as a reservation | Creates false availability and race-prone booking UX |
| Treating a hidden Edit control as access control | Direct callers can bypass presentation |
| Duplicating clinic data between hero and profile models | Creates competing sources of clinic truth |
| Letting the browser write subscription/entitlement truth | Allows client-controlled commerce state |
| Storing booking truth only in UI/local state | Makes recovery, concurrency, and audit unreliable |
| Using MapLibre marker state as the source of clinic state | Couples presentation state to domain authority |
| Copying TeamAi-specific orchestration law into MedMap | Imports unrelated authority and product concepts |
| Converting an unpublished price to zero | Misrepresents clinic commercial intent |

## Minimalism log

Foundation uses the smallest governance set needed to make future implementation traceable. Add durable knowledge only when evidence demonstrates that it is reusable.

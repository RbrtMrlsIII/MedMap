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
| Spatial reference repositories are most useful for development roots, architecture boundaries, incremental verification, and failure discipline rather than product copying | `docs/reference/REFERENCE_REPOSITORY_METHOD.md`; `docs/DEVELOPMENT_ROOTS.md` | Engineering process |
| Viewport coverage and browser-engine coverage are separate validation dimensions | Responsive Playwright matrix and project configuration review | Verification |
| A Playwright device descriptor can carry a browser engine; combining a WebKit device preset with Chromium channel is an invalid project configuration | Quality run #106 tablet failures; `chromium-tablet` used `devices["iPad Mini"]` with `channel: "chromium"` | Verification |
| Layout-width assertions should compare against the actual document layout viewport when vertical scrollbars are present | Quality run #106 showed a consistent 15px difference between requested viewport width and Hero width without horizontal overflow | Responsive UI testing |
| WebGL-dependent assertions must distinguish active renderer evidence from semantic fallback evidence | Quality run #106 ran successfully through the semantic fallback while WebGL2 was unavailable in the CI runtime | Spatial verification |
| Static GitHub Pages clinic routes need directory-style output for direct navigation | Pages run observed root success but `/clinics/northstar/` HTTP 404; Next static export now uses `trailingSlash: true` | Deployment |

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
| Copying a reference repository's implementation because it solved a superficially similar problem | Can import incompatible assumptions, authority boundaries, or product identity |
| Weakening assertions to recover a green workflow without classifying the failure | Hides implementation, configuration, environment, or deployment defects |
| Calling a viewport narrower than the requested browser window a layout overflow without accounting for scrollbar width | Produces false responsive failures and noisy CI |
| Combining a WebKit device descriptor with a Chromium channel | Prevents the browser project from launching at all, multiplying one configuration error across every test |
| Treating WebGL2-unavailable CI fallback as proof that the authored WebGL scene is visually correct | Fallback proves semantic resilience, not active GPU rendering correctness |

## Minimalism log

Foundation uses the smallest governance set needed to make future implementation traceable. Add durable knowledge only when evidence demonstrates that it is reusable.

## CI crime-scene prevention

When a workflow fails:

```text
cluster repeated failures
  ↓
identify the smallest root cause
  ↓
classify: implementation / expectation / environment / deployment
  ↓
fix at the correct layer
  ↓
re-run the smallest useful verification
  ↓
record the validated lesson
```

One configuration error should not be repaired as if it were fourteen independent test failures. Likewise, a test should not be changed merely because the implementation is wrong.

# POLICY — MedMap

`POLICY.md` is the ORUCAVEAM execution constitution and wiring document. It does not redefine MedMap product meaning; product meaning belongs to `PRODUCT_LAW.md`.

## Authority wiring

```text
PRODUCT_LAW.md
  = product meaning / invariants / product-level questions

MASTERPLAN.md
  = chronological execution order / phases / slices / planning branches

docs/contracts/
  = detailed requirements and interfaces

skills/
  = how to perform the work, basis, do / don't, verification, recovery

src/
  = implementation

tests/ + verification evidence
  = proof of stated claims

Full project ZIP
  = mandatory continuity / handover artifact
```

A lower layer may elaborate a higher-layer decision but may not silently change it.

## ORUCAVEAM

Every non-trivial execution action must be framed as:

### O — Objective

State the exact bounded outcome being attempted.

### R — Restrictions

State what may not be changed, bypassed, guessed, fabricated, exposed, or generalized.

### U — User Authority

State why this action is authorized by the current user request or already-approved project decision.

### C — Canonical Authority

Identify the document, contract, durable state, or external authority that owns the meaning being changed or observed.

### A — Action

Perform the smallest coherent action that can achieve the objective without creating unrelated changes.

### V — Verification

Verify the exact claim using evidence appropriate to that claim. Implementation is not verification. Rendering is not persistence proof. A unit/contract result is not automatically browser proof.

### E — Efficiency

Avoid unnecessary reads, writes, refactors, dependencies, asset generation, tool calls, and context churn. Efficiency never licenses skipping a required correctness, security, accessibility, or recovery step.

### A — Audit

Preserve decision context, paths, identifiers, changed files, verification results, unresolved questions, and recovery information sufficient for the next execution boundary.

### M — Minimalistic Resource Use

Use the minimum sufficient computation, external calls, storage, test scope, and evidence necessary to safely complete and prove the action.

## Skill wiring

Each execution slice resolves its applicable Skill before implementation.

```text
MASTERPLAN slice
  ↓
named Contract(s)
  ↓
named Skill(s)
  ↓
implementation
  ↓
verification
  ↓
acceptance
  ↓
full ZIP handover
```

Skills are operational playbooks, not product authority.

A Skill must state at least:

```text
Purpose
Based on
Scope
Preconditions
Inputs
Do
Do not
Verification
Failure handling
Evidence produced
Rollback / recovery
Exit criteria
```

## Spatial wiring

The product-level spatial architecture comes from `PRODUCT_LAW.md`.

The detailed spatial implementation is wired through:

```text
Three.js / WebGL2 Skill
Spatial camera / motion Skill
Spatial asset / lighting Skill
MapLibre discovery Skill
Accessibility / verification Skill
```

MapLibre remains a guest discovery/search/filter engine inside the larger Three.js spatial website architecture.

## Domain wiring

```text
Authentication / ownership
        ↓
Firestore canonical domain state
        ↓
trusted backend operations
        ↓
booking / clinic operations / entitlement
```

External commerce events must be authenticated and projected through the defined trusted boundary before becoming MedMap entitlement state.

## Evidence wiring

Use evidence appropriate to the layer:

```text
document change → path/content reconciliation
contract → focused contract verification
implementation → type/build/static checks
UI → browser evidence
backend persistence → independent durable read-back
payment → verified external event path
```

Do not promote evidence beyond what it actually proves.

## Conflict wiring

When a discrepancy appears:

```text
STOP
→ identify authority
→ record discrepancy
→ determine blast radius
→ resolve at the correct layer
→ make smallest coherent change
→ re-verify
```

Recency, convenience, prior assumptions, a green test, or a deployment result do not silently override canonical authority.

## Mandatory project handover

Every project mutation requires a full project ZIP handover.

This includes:

```text
edit
fix
addition
removal
refactor
document update
contract update
skill update
code update
test update
configuration update
asset update
```

The handover is the **complete project package**, not only changed files.

A slice cannot be reported as fully handed over until the complete ZIP is produced and its archive contents are inspected enough to establish continuity.

## Planning branches

Masterplan branches are content/context branches only:

```text
002.S2 Camera Root
  ├─ 002.S2.a pose model
  ├─ 002.S2.b transitions
  ├─ 002.S2.c architectural traversal constraints
  └─ 002.S2.d reduced motion
```

They do not require a source-control branch and do not create a second authority tree.

## Final discipline

```text
follow the law
→ follow the chronological slice
→ follow the contract
→ execute through the Skill
→ verify the exact claim
→ preserve unresolved questions
→ reconcile the project
→ hand over the full ZIP
```

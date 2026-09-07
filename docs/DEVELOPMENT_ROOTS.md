# MedMap Development Roots

This document records how MedMap should be developed before and during implementation.

## Principle

**Set the roots first, then build upward. Improve the implementation continuously without replacing the project's identity with another repository's design.**

External repositories are references for engineering patterns, validation methods, failure handling, and proven development sequencing. They are not sources of MedMap product meaning, UI identity, domain rules, or architectural authority.

## Root-first sequence

Before adding a substantial feature, establish the smallest durable root needed for that feature:

```text
product intent
  ↓
canonical authority / contract
  ↓
architecture boundary
  ↓
implementation seam
  ↓
verification seam
  ↓
incremental improvement
```

For MedMap, the roots usually include:

1. Product meaning: `PRODUCT_LAW.md`
2. Execution constitution: `POLICY.md`
3. Approved sequence: `MASTERPLAN.md`
4. AI/session operating guidance: `AI_ASSISTANT_READ_ME.md`
5. Feature contract: the relevant file under `docs/contracts/`
6. Bounded procedure: the relevant skill under `skills/`
7. Implementation: application source under `src/`
8. Verification: tests/workflows under `tests/` and `.github/workflows/`
9. Evidence/continuity: `PRODUCT-KNOWLEDGE.md`, handover/checkpoint, and linked GitHub issues when useful

## Build-and-improve loop

Once a root exists, development proceeds as a controlled loop:

```text
establish root
  → implement smallest coherent slice
  → verify the slice
  → inspect real behavior
  → improve/refine
  → re-verify
  → preserve validated knowledge
```

An improvement should strengthen an existing MedMap root rather than silently inventing a competing root.

## Reference repository rule

When studying another repository, extract only the engineering lesson that is relevant to the current MedMap problem. Record the lesson, its applicability, and any important differences before implementation when the pattern could affect architecture or verification.

Do not copy another repository's product surface, naming, domain model, visual identity, or implementation merely because it appears polished.

## Spatial-specific root order

For spatial work, establish these roots before increasing visual complexity:

```text
spatial product intent
  ↓
MapLibre geography boundary
  ↓
authored WebGL scene boundary
  ↓
camera / traversal contract
  ↓
responsive + accessibility contract
  ↓
mesh implementation
  ↓
browser + viewport verification
  ↓
refinement / performance tuning
```

MapLibre owns geography and map camera concerns. The authored WebGL scene owns presentation geometry and its bounded camera rig. HTML/React remains the semantic interaction layer.

## Failure discipline

A failing build, test, deployment check, or runtime probe is evidence that the current implementation state is not yet accepted. Do not weaken assertions simply to recover green status. First determine whether the failure is in implementation, expectation, environment, or deployment configuration.

## Completion discipline

```text
planned
  ≠ implemented
  ≠ verified
  ≠ runtime-proven
  ≠ completed
```

Historical green evidence does not automatically validate later changes.

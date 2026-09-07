# Reference Repository Method

MedMap uses external repositories as **engineering references**, not as templates to copy.

## What we inspect

When a new area is about to be built, inspect mature repositories for:

- how they establish repository roots, contracts, and contributor/agent guidance;
- how architecture boundaries are written down before implementation grows;
- how changes are introduced in small increments;
- how failures are classified before tests are changed;
- how verification expands alongside implementation;
- how validated lessons are recorded for future contributors and sessions.

## What we do not copy

Do not copy another repository's:

- product purpose or business rules;
- domain model merely because it is convenient;
- visual identity or UX surface;
- proprietary or repository-specific implementation;
- naming that conflicts with MedMap's own vocabulary;
- assumptions that are not validated for MedMap.

## MedMap adaptation rule

A reference becomes useful only after answering:

```text
What problem did the reference solve?
What engineering principle made it work?
Does that principle fit MedMap's Product Law?
What is the smallest MedMap-native version of that principle?
How will we verify it here?
```

## Observed pattern

The strongest reference pattern is not a particular framework or visual style. It is the development sequence:

```text
establish repository/project root
→ establish rules and architecture boundaries
→ implement a narrow vertical slice
→ verify the slice
→ learn from real behavior
→ improve the existing root
→ expand scope only after evidence
```

TeamAI, for example, treats shared skills/rules/docs as durable repository-managed resources, uses an explicit project-root model, and distributes changes through review and merge rather than allowing undocumented local conventions to become authoritative. citeturn490572search0turn490572search2

MedMap adopts the **principle of durable roots and reviewed evolution**, while keeping all product meaning and implementation MedMap-native.

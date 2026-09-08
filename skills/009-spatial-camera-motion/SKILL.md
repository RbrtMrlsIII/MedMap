# Skill 009 — Spatial Camera and Motion

## Purpose
Implement presentation camera traversal, object focus, interruption, bounded navigation, and reduced-motion behavior.
## Based on
`docs/contracts/SPATIAL_CAMERA_MOTION.md`, `docs/contracts/SPATIAL_SITE_ARCHITECTURE.md`, Product Law spatial questions, and measured interaction evidence.
## Do
Use named presentation states; interpolate/damp toward bounded targets; replace pending targets; support interruption and reversal; keep normal paths within architectural boundaries; separate ambient, interaction, and transition motion.
## Do not
Queue unbounded transitions; depend on fixed frame counts; force scrolling to reveal required content; penetrate walls as normal navigation; make camera state domain truth.
## Verification
State changes, interruption, reverse path, position/distance bounds, architectural traversal, pointer/touch bounds, keyboard-equivalent semantic access, reduced motion.
## Recovery
Return to the nearest valid stable pose and preserve the failed transition context for the next correction.
## Evidence
Camera instrumentation, browser interaction results, viewport evidence, reduced-motion evidence.
## Exit criteria
Motion is stable enough to support rooms and interactive objects without an architectural rewrite.

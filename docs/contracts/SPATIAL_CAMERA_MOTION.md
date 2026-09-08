# Contract — Spatial Camera and Motion

## Purpose
Define presentation camera behavior for arrivals, section focus, room traversal, interruption, and reduced motion.

## Required state categories
The implementation may use any internal model, but product-visible intent must support:

```text
arrival
hall-reveal
section-focus
room-entry
room-focus
return
```

These are presentation states, not domain states.

## Camera rules
- camera paths are bounded;
- architectural collision/occlusion rules are respected;
- a new camera target replaces the prior pending target;
- transitions are interruptible;
- reverse traversal is possible where the navigation model allows it;
- no fixed frame-count dependency controls completion;
- camera motion does not silently submit booking/auth actions.

## Traversal
- traversal is bounded to a known room/scene region;
- scroll/touch/pointer input may control traversal where appropriate;
- keyboard/focus navigation must retain equivalent semantic access;
- overscroll must not expose invalid room geometry or trap focus.

## Occlusion
Critical semantic UI must remain accessible even when 3D objects approach focus. The HTML/UI layer wins when spatial geometry and semantic affordances compete.

## Reduced motion
Reduced-motion mode removes non-essential continuous parallax, pulsing, rapid camera sweeps, and traversal requirements that depend on animation. Content remains reachable by semantic controls.

## Verification
Verify named state changes, bounded camera positions, interruptibility, reverse behavior, wall-avoidance, reduced-motion behavior, and semantic keyboard access.

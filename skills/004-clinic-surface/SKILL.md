# Skill 004 — Clinic Surface

## Purpose
Build the canonical clinic guest and owner surfaces.
## Based on
`docs/contracts/CLINIC_PROFILE_SURFACE.md` and Product Law Clinic Page Law.
## Do
Preserve Profile, Services, Booking, About, Contact; keep Edit owner-only; store approved contact channels canonically; keep clinic hero single-source from clinic data.
## Do not
Add internal messaging/chat; expose private contact data; merge distinct tab responsibilities; make 3D decoration the semantic authority.
## Verification
Guest route, five surfaces, approved-contact visibility, owner authorization, booking entry boundary.
## Evidence
Browser surface evidence + authorization/read-back evidence where applicable.
## Recovery
Restore the smallest coherent surface if a change crosses guest/owner boundaries.
## Exit criteria
Canonical clinic surface is coherent and unauthorized edit access fails.

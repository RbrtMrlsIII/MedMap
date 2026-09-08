# Skill 006 — Clinic Operations

## Purpose
Build the Clinic Owner's spreadsheet-like booking register, calendar, queue controls, and clinic configuration tools.
## Based on
Product Law clinic operations plus booking/domain contracts.
## Do
Use a spreadsheet-like operational view over canonical booking records; make request review/approval efficient; preserve canonical writes; distinguish intake allowance from durable booking history.
## Do not
Create a second spreadsheet/database as booking truth; delete accepted history to reduce queue; let queue UI bypass authorization.
## Verification
Round-trip edits, occupancy/queue accuracy, approval/rejection behavior, authorization, durable read-back.
## Evidence
Browser operations evidence and durable database read-back.
## Recovery
Revert only the incorrect operational mutation and preserve the canonical booking record.
## Exit criteria
Owner can manage the operational queue without duplicating domain authority.

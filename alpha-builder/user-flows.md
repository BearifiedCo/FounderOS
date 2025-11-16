# AlphaBuilder User Flows (Initial Blueprint)

High-level path for estimators adopting the MVP. Step 4 will deepen this into full UX specs.

## Flow 1 — New Project

1. Estimator logs in via FounderOS SSO.
2. Clicks "New Project", imports Excel baseline data (optional).
3. Defines trades and assigns owners.
4. Saves draft; triggers Slack notification for reviewers.

## Flow 2 — Trade Input & Calculation

1. Select Trade → open table of line items.
2. Input quantities, units, and production rates.
3. System auto-calculates labor/material, showing variance vs template.
4. Reviewer can comment inline; accepted changes sync to Linear tasks if needed.

## Flow 3 — Export & Share

1. Generate PDF (matching Bid Template layout).
2. Send to client or internal team via Gmail integration.
3. Archive snapshot in Notion + Observability metrics.

Flows will be extended with edge cases next phase.

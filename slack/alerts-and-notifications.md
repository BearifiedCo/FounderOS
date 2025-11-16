# Slack Alerts & Notifications (Initial Blueprint)

Seed plan for routing system events into Slack. Step 5 will finalize Datadog wiring.

## Alert Sources

- GitHub Actions (lint/test/deploy)
- Datadog monitors (error budgets, latency, infra health)
- Thirdweb + wallet events (AlphaBuilder + BEARO payments)
- Gmail automation worker (VIP inbound)

## Routing Rules

- Critical alerts → #alerts-observability with @channel mention.
- Build failures → respective team engineering channels.
- CRM signals → #founderos-ops for GPT Agent summaries.

## Follow-Up Protocol

1. Codex triages infra alerts.
2. Cursor handles code fixes / redeploys.
3. GPT posts summary + next steps when resolved.

Further specificity will be layered in future steps.

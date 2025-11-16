# Gmail CRM Rules (Initial Blueprint)

Draft automation notes connecting Gmail labels to Notion + Linear. Will sync with Codex agent tasks in later steps.

## Intake Labels

- `Lead/New` — auto-create CRM record, assign GPT Agent for summary.
- `Investor/Inbound` — route to Founder Dashboard "Today’s Focus".
- `Customer/Escalation` — create Linear P1 with agent tag and notify Slack.

## Processing Rules

1. Parse sender domain to auto-tag Product interest.
2. Extract next steps and due dates via GPT summary.
3. Log outcomes back to Gmail label `Closed` or `Follow-Up`.

## Integrations

- Use Gmail API + webhook worker managed by Codex.
- Write data into Notion CRM & Contributors DB.
- Link to Linear issues when engineering action required.

More details will be fleshed out in Step 3.

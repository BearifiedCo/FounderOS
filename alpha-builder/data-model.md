# AlphaBuilder Data Model (Initial Blueprint)

Seed description for the entities that will back the MVP. Detailed ERDs and field lists will follow in Step 4.

## Entities

- **Project** — metadata, owner, bid status, location, contract value.
- **Trade** — category (Framing, Insulation, etc.) with cost templates.
- **LineItem** — scoped work units with quantity+unit.
- **QuantityInput** — captures workbook-style measurement breakdowns.
- **Totals** — aggregate labor/material/markup with PDF references.
- **User** — estimator, reviewer, client account.

## Relationships (Draft)

- Project has many Trades.
- Trade has many LineItems.
- LineItem has many QuantityInputs.
- Project has one Totals snapshot per export run.

This doc will evolve into a full schema in Step 4.

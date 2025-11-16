# AlphaBuilder — MVP Specification

## Summary

Construction estimating tool based on Excel workbook "Bid Template.xlsm".

Goal: Replace the workbook with a database + UI + PDF export system.

## Core MVP Features

1. Project creation
2. Add trades (Framing, Insulation, Drywall, etc.)
3. Line item quantity inputs
4. Auto labor/material calculations
5. Summary totals
6. Export PDF matching current layout

## Data Model

- Project
- Trade
- LineItem
- QuantityInput
- Totals
- User

## Screens

- Project List
- New Project
- Trade Input Screen
- Summary
- Export

## API (Draft)

GET /projects  
POST /projects  
GET /projects/:id  
POST /projects/:id/trades  
POST /projects/:id/export  

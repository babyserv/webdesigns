# Database Schema (MongoDB / Mongoose)

## users
- `name` (String, required)
- `email` (String, unique, required)
- `passwordHash` (String, required)
- `role` (`client|admin`, default `client`)
- `sessionToken` (String)
- timestamps

## projects
- `client` (ObjectId -> users)
- Intake fields:
  - `businessName`, `industry`, `description`, `targetAudience`, `coreOffer`, `usp`
  - `personality[]`, `emotionalGoal`, `colorPreferences`, `competitors[]`
  - `contentProvided`, `features[]`, `budgetTier`
- Delivery fields:
  - `status`
  - `notes[]` (`body`, `by`, `createdAt`)
  - `assets[]` (`originalName`, `path`, `uploadedAt`)
  - `generated.brandSummary`, `generated.sitemap`, `generated.siteFiles`
- timestamps

## payments
- `client` (ObjectId -> users)
- `project` (ObjectId -> projects)
- `amount`, `currency`
- `paymentType` (`one_time|subscription`)
- `squarePaymentId`
- `status`
- timestamps

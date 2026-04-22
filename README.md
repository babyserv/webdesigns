# Architect AI Studio - Website Generator + Client Portal

A scalable, AI-powered delivery system for creative agencies that:
- Accepts structured business/brand intake.
- Generates brand strategy + sitemap + website starter files.
- Supports client authentication, project tracking, notes, file uploads.
- Tracks one-time and subscription payment intents with Square integration hooks.
- Provides admin visibility and project status controls.

## Project Structure

```
/project-root
  /frontend
  /backend
  /assets
  /components
  /styles
  /scripts
```

## Tech Stack
- Frontend: HTML5, CSS3, Vanilla JS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Payments: Square Payments API (Sandbox/Production via env switch)

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` in repo root:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/architect-ai
   SQUARE_ACCESS_TOKEN=your_square_token
   SQUARE_ENV=sandbox
   ```
3. Start server:
   ```bash
   npm run dev
   ```
4. Open:
   - Generator: `http://localhost:3000/`
   - Client Portal: `http://localhost:3000/frontend/portal.html`
   - Admin Panel: `http://localhost:3000/frontend/admin.html`

## API Overview
- `POST /api/generate` - creates brand strategy + sitemap + site files from intake.
- `POST /api/auth/register` - client registration.
- `POST /api/auth/login` - login and session token.
- `GET /api/projects/me` - list authenticated user's projects.
- `POST /api/projects/:id/notes` - attach notes.
- `POST /api/uploads/:projectId` - upload project assets.
- `POST /api/payments/one-time` - Square one-time payment.
- `POST /api/payments/subscription` - subscription intent capture.
- `GET /api/admin/projects` - admin project list.
- `PATCH /api/admin/projects/:id/status` - admin status updates.

## Security Notes
- Passwords hashed using bcrypt.
- Token-based session model via persisted random session token.
- Role-based middleware for admin-only routes.

## Quality Checklist
- Semantic + responsive frontend structure.
- Scroll animation + hover microinteractions.
- Conversion-focused section flow.
- SEO metadata + JSON-LD schema in homepage.

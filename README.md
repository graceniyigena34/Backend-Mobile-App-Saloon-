# Mobile Salon Backend

This project provides backend APIs for the Mobile Salon app.

Quick start (development):

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.

2. Install dependencies:

```bash
npm install
```

3. Run in development:

```bash
npm run dev
```

Endpoints:

- `POST /api/auth/signup` - create a new user. Body: `{ name, email, password, role? }`.
- `POST /api/auth/login` - login. Body: `{ email, password }`.

The signup endpoint returns `{ token, user }`. Use `Authorization: Bearer <token>` for authenticated routes.

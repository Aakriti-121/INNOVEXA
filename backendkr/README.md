# Smart Education Backend

## Run

```bash
cp .env.example .env
npm install
npm test
npm start
```

The API listens on `http://localhost:4000`. SQLite is created at `data/education.sqlite`.

## API

- `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/auth/google` and callback when Google credentials are configured
- `GET/POST /api/subjects`
- `POST /api/assessments`
- `GET /api/analytics/subjects`
- `POST /api/study-plans` with `{ "available_hours": 10, "week_start": "2026-09-07" }`

Authentication uses an HTTP-only, SameSite cookie. In production use HTTPS, a strong `JWT_SECRET`, an explicit `CLIENT_URL`, and configure Google OAuth's callback URL to match `GOOGLE_CALLBACK_URL`.

The current study-plan recommender is an explainable baseline: it weights each subject by its target-score gap and lack of assessment confidence. Its output is intentionally structured so a trained model can later replace `buildPlan` without changing the API contract.

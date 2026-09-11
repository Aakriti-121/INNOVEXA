require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { z } = require("zod");
const db = require("./db");
const { buildPlan } = require("./recommendations");
const { COOKIE_NAME, setSession, requireAuth, hashPassword, verifyPassword, id } = require("./auth");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(passport.initialize());

const signupSchema = z.object({ name: z.string().trim().min(2).max(80), email: z.string().email(), password: z.string().min(8).max(72) });
const assessmentSchema = z.object({ subject_id: z.string().uuid(), score: z.number().min(0).max(100), max_score: z.number().positive().default(100) });
const planSchema = z.object({ available_hours: z.number().positive().max(168), week_start: z.string().date().optional() });

function publicUser(user) { return { id: user.id, name: user.name, email: user.email, created_at: user.created_at }; }
function analyticsFor(userId) {
  return db.prepare(`
    SELECT s.id subject_id, s.name subject, e.target_score,
      COALESCE(ROUND(AVG(a.score * 100.0 / a.max_score), 1), 0) average_score,
      COUNT(a.id) assessment_count
    FROM enrollments e JOIN subjects s ON s.id = e.subject_id
    LEFT JOIN assessments a ON a.subject_id = s.id AND a.user_id = e.user_id
    WHERE e.user_id = ? GROUP BY s.id ORDER BY s.name
  `).all(userId);
}

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.post("/api/auth/signup", async (req, res, next) => {
  try {
    const input = signupSchema.parse(req.body);
    const user = { id: id(), name: input.name, email: input.email.toLowerCase(), password_hash: await hashPassword(input.password) };
    db.prepare("INSERT INTO users (id, name, email, password_hash) VALUES (@id, @name, @email, @password_hash)").run(user);
    setSession(res, user.id);
    res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (error.name === "ZodError") return res.status(400).json({ error: "Invalid signup data", details: error.issues });
    if (String(error.message).includes("UNIQUE")) return res.status(409).json({ error: "An account with that email already exists" });
    next(error);
  }
});

app.post("/api/auth/login", async (req, res, next) => {
  try {
    const input = z.object({ email: z.string().email(), password: z.string().min(1) }).parse(req.body);
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(input.email.toLowerCase());
    if (!user || !user.password_hash || !(await verifyPassword(input.password, user.password_hash))) return res.status(401).json({ error: "Invalid email or password" });
    setSession(res, user.id);
    res.json({ user: publicUser(user) });
  } catch (error) { if (error.name === "ZodError") return res.status(400).json({ error: "Invalid login data" }); next(error); }
});

app.post("/api/auth/logout", (_req, res) => { res.clearCookie(COOKIE_NAME); res.status(204).end(); });
app.get("/api/auth/me", requireAuth(db), (req, res) => res.json({ user: req.user }));

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:4000/api/auth/google/callback",
  }, (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value?.toLowerCase();
      if (!email) return done(new Error("Google account did not provide an email"));
      let user = db.prepare("SELECT * FROM users WHERE google_id = ? OR email = ?").get(profile.id, email);
      if (!user) {
        const created = { id: id(), name: profile.displayName || email, email, google_id: profile.id };
        db.prepare("INSERT INTO users (id, name, email, google_id) VALUES (@id, @name, @email, @google_id)").run(created);
        user = created;
      } else if (!user.google_id) {
        db.prepare("UPDATE users SET google_id = ? WHERE id = ?").run(profile.id, user.id);
      }
      done(null, user);
    } catch (error) { done(error); }
  }));
  app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));
  app.get("/api/auth/google/callback", passport.authenticate("google", { session: false, failureRedirect: `${process.env.CLIENT_URL || "http://localhost:3000"}/login?error=google` }), (req, res) => {
    setSession(res, req.user.id);
    res.redirect(process.env.CLIENT_URL || "http://localhost:3000");
  });
}

app.get("/api/subjects", requireAuth(db), (_req, res) => res.json({ subjects: db.prepare("SELECT * FROM subjects ORDER BY name").all() }));
app.post("/api/subjects", requireAuth(db), (req, res, next) => {
  try {
    const input = z.object({ name: z.string().trim().min(2).max(100), code: z.string().trim().max(20).optional() }).parse(req.body);
    const subject = { id: id(), ...input };
    db.prepare("INSERT INTO subjects (id, name, code) VALUES (@id, @name, @code)").run(subject);
    db.prepare("INSERT OR IGNORE INTO enrollments (user_id, subject_id) VALUES (?, ?)").run(req.user.id, subject.id);
    res.status(201).json({ subject });
  } catch (error) { if (error.name === "ZodError") return res.status(400).json({ error: "Invalid subject data" }); next(error); }
});

app.post("/api/assessments", requireAuth(db), (req, res, next) => {
  try {
    const input = assessmentSchema.parse(req.body);
    if (!db.prepare("SELECT 1 FROM enrollments WHERE user_id = ? AND subject_id = ?").get(req.user.id, input.subject_id)) return res.status(403).json({ error: "Enroll in the subject first" });
    const assessment = { id: id(), user_id: req.user.id, ...input };
    db.prepare("INSERT INTO assessments (id, user_id, subject_id, score, max_score) VALUES (@id, @user_id, @subject_id, @score, @max_score)").run(assessment);
    res.status(201).json({ assessment });
  } catch (error) { if (error.name === "ZodError") return res.status(400).json({ error: "Invalid assessment data", details: error.issues }); next(error); }
});

app.get("/api/analytics/subjects", requireAuth(db), (req, res) => res.json({ subjects: analyticsFor(req.user.id) }));
app.post("/api/study-plans", requireAuth(db), (req, res, next) => {
  try {
    const input = planSchema.parse(req.body);
    const weekStart = input.week_start || new Date().toISOString().slice(0, 10);
    const plan = buildPlan(analyticsFor(req.user.id), input.available_hours);
    const record = { id: id(), user_id: req.user.id, week_start: weekStart, available_hours: input.available_hours, plan_json: JSON.stringify(plan) };
    db.prepare("INSERT INTO study_plans (id, user_id, week_start, available_hours, plan_json) VALUES (@id, @user_id, @week_start, @available_hours, @plan_json) ON CONFLICT(user_id, week_start) DO UPDATE SET available_hours=excluded.available_hours, plan_json=excluded.plan_json").run(record);
    res.status(201).json({ week_start: weekStart, available_hours: input.available_hours, plan });
  } catch (error) { if (error.name === "ZodError") return res.status(400).json({ error: "Invalid study plan data", details: error.issues }); next(error); }
});

app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ error: "Internal server error" }); });
const port = Number(process.env.PORT || 4000);
if (require.main === module) app.listen(port, () => console.log(`Smart education API listening on port ${port}`));
module.exports = app;

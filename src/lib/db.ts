import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
export const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  db = new Database(path.join(DATA_DIR, "site.db"));
  db.pragma("journal_mode = WAL");
  migrate(db);
  return db;
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      service TEXT NOT NULL,
      message TEXT NOT NULL,
      lang TEXT NOT NULL DEFAULT 'nl',
      status TEXT NOT NULL DEFAULT 'nieuw',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT NOT NULL UNIQUE,
      customer_name TEXT NOT NULL,
      customer_email TEXT,
      customer_phone TEXT,
      device TEXT NOT NULL,
      service TEXT NOT NULL,
      price TEXT,
      lang TEXT NOT NULL DEFAULT 'nl',
      status TEXT NOT NULL DEFAULT 'ontvangen',
      review_requested_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS job_updates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
      status TEXT NOT NULL,
      message TEXT,
      photo_file TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author TEXT NOT NULL,
      rating INTEGER NOT NULL,
      text TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'Trustpilot',
      published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS promos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text_nl TEXT NOT NULL,
      text_en TEXT NOT NULL,
      text_fr TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 0,
      total INTEGER,
      used INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slot_start TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      service TEXT NOT NULL,
      message TEXT,
      lang TEXT NOT NULL DEFAULT 'nl',
      status TEXT NOT NULL DEFAULT 'aangevraagd',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      last_login_at TEXT
    );
    CREATE TABLE IF NOT EXISTS login_tokens (
      token TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      used_at TEXT
    );
    CREATE TABLE IF NOT EXISTS hits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day TEXT NOT NULL,
      path TEXT NOT NULL,
      lang TEXT,
      ref TEXT,
      device TEXT,
      visitor TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_hits_day ON hits(day);
    CREATE TABLE IF NOT EXISTS campaigns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL,
      body TEXT NOT NULL,
      lang_filter TEXT NOT NULL DEFAULT 'all',
      sent_to INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      token TEXT NOT NULL,
      lang TEXT NOT NULL DEFAULT 'nl',
      confirmed_at TEXT,
      unsubscribed_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      before_file TEXT NOT NULL,
      after_file TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS rate_limits (
      key TEXT PRIMARY KEY,
      count INTEGER NOT NULL,
      window_start INTEGER NOT NULL
    );
  `);
  try {
    db.exec("ALTER TABLE job_updates ADD COLUMN photo_file TEXT");
  } catch {
    // kolom bestaat al
  }
  const defaults: Record<string, string> = {
    appt_slot_minutes: "60",
    appt_lead_hours: "24",
    appt_horizon_days: "21",
    appt_hours_mon: "18:00-21:00",
    appt_hours_tue: "18:00-21:00",
    appt_hours_wed: "18:00-21:00",
    appt_hours_thu: "18:00-21:00",
    appt_hours_fri: "18:00-21:00",
    appt_hours_sat: "09:00-18:00",
    appt_hours_sun: "",
    appt_blocked: "",
    social_videos: "",
  };
  const insert = db.prepare(
    "INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)"
  );
  for (const [k, v] of Object.entries(defaults)) insert.run(k, v);
  // Launch-actie als eerste actie, eenmalig
  const promoCount = db.prepare("SELECT count(*) c FROM promos").get() as { c: number };
  if (promoCount.c === 0) {
    db.prepare(
      "INSERT INTO promos (text_nl, text_en, text_fr, active, total, used) VALUES (?, ?, ?, 1, 5, 0)"
    ).run(
      "-50% voor mijn eerste 5 klanten, in ruil voor een eerlijke Google-review.",
      "-50% for my first 5 customers, in exchange for one honest Google review.",
      "-50% pour mes 5 premiers clients, en échange d'un avis Google honnête."
    );
  }
}

// ---------- settings ----------
export function getSetting(key: string): string | undefined {
  const row = getDb()
    .prepare("SELECT value FROM settings WHERE key = ?")
    .get(key) as { value: string } | undefined;
  return row?.value;
}

export function setSetting(key: string, value: string) {
  getDb()
    .prepare(
      "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
    )
    .run(key, value);
}

export type Promo = {
  id: number;
  text_nl: string;
  text_en: string;
  text_fr: string;
  active: number;
  total: number | null;
  used: number;
  created_at: string;
};

/** De actie die nu op de site staat (eerste actieve met plekken over). */
export function getActivePromo(): (Promo & { left: number | null }) | null {
  const rows = getDb()
    .prepare("SELECT * FROM promos WHERE active = 1 ORDER BY id ASC")
    .all() as Promo[];
  for (const promo of rows) {
    const left = promo.total == null ? null : Math.max(0, promo.total - promo.used);
    if (left === null || left > 0) return { ...promo, left };
  }
  return null;
}

export function listPromos(): Promo[] {
  return getDb().prepare("SELECT * FROM promos ORDER BY id DESC").all() as Promo[];
}

export function savePromo(promo: {
  id?: number;
  text_nl: string;
  text_en: string;
  text_fr: string;
  active: boolean;
  total: number | null;
  used: number;
}) {
  const d = getDb();
  if (promo.id) {
    d.prepare(
      "UPDATE promos SET text_nl=?, text_en=?, text_fr=?, active=?, total=?, used=? WHERE id=?"
    ).run(promo.text_nl, promo.text_en, promo.text_fr, promo.active ? 1 : 0, promo.total, promo.used, promo.id);
  } else {
    d.prepare(
      "INSERT INTO promos (text_nl, text_en, text_fr, active, total, used) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(promo.text_nl, promo.text_en, promo.text_fr, promo.active ? 1 : 0, promo.total, promo.used);
  }
}

export function deletePromo(id: number) {
  getDb().prepare("DELETE FROM promos WHERE id = ?").run(id);
}

// ---------- contact requests ----------
export type ContactRequest = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  message: string;
  lang: string;
  status: string;
  created_at: string;
};

export function insertRequest(r: {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message: string;
  lang?: string;
}) {
  getDb()
    .prepare(
      "INSERT INTO requests (name, phone, email, service, message, lang) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(r.name, r.phone, r.email || null, r.service, r.message, r.lang || "nl");
}

export function listRequests(): ContactRequest[] {
  return getDb()
    .prepare("SELECT * FROM requests ORDER BY created_at DESC")
    .all() as ContactRequest[];
}

export function setRequestStatus(id: number, status: string) {
  getDb().prepare("UPDATE requests SET status = ? WHERE id = ?").run(status, id);
}

// ---------- jobs (herstellingen) ----------
export type Job = {
  id: number;
  code: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  device: string;
  service: string;
  price: string | null;
  lang: string;
  status: string;
  review_requested_at: string | null;
  created_at: string;
};

export type JobUpdate = {
  id: number;
  job_id: number;
  status: string;
  message: string | null;
  photo_file: string | null;
  created_at: string;
};

export const JOB_STATUSES = [
  "ontvangen",
  "diagnose bezig",
  "wacht op onderdelen",
  "in herstel",
  "klaar voor ophaling",
  "afgerond",
] as const;

function newJobCode(): string {
  // Leesbaar en onmogelijk te raden: RIT-XXXXXXXX (zonder verwarrende tekens)
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  const bytes = crypto.randomBytes(8);
  for (let i = 0; i < 8; i++) code += alphabet[bytes[i] % alphabet.length];
  return `RIT-${code}`;
}

export function createJob(j: {
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  device: string;
  service: string;
  price?: string;
  lang?: string;
}): Job {
  const d = getDb();
  const code = newJobCode();
  const info = d
    .prepare(
      "INSERT INTO jobs (code, customer_name, customer_email, customer_phone, device, service, price, lang) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .run(
      code,
      j.customer_name,
      j.customer_email || null,
      j.customer_phone || null,
      j.device,
      j.service,
      j.price || null,
      j.lang || "nl"
    );
  // Geen vrije tekst bij de eerste stap: het statuslabel wordt per taal vertaald.
  d.prepare(
    "INSERT INTO job_updates (job_id, status) VALUES (?, 'ontvangen')"
  ).run(info.lastInsertRowid);
  return getJobById(Number(info.lastInsertRowid))!;
}

export function getJobById(id: number): Job | undefined {
  return getDb().prepare("SELECT * FROM jobs WHERE id = ?").get(id) as
    | Job
    | undefined;
}

export function getJobByCode(code: string): Job | undefined {
  return getDb()
    .prepare("SELECT * FROM jobs WHERE upper(code) = upper(?)")
    .get(code.trim()) as Job | undefined;
}

export function listJobs(): Job[] {
  return getDb()
    .prepare("SELECT * FROM jobs ORDER BY created_at DESC")
    .all() as Job[];
}

export function listJobUpdates(jobId: number): JobUpdate[] {
  return getDb()
    .prepare("SELECT * FROM job_updates WHERE job_id = ? ORDER BY created_at ASC, id ASC")
    .all(jobId) as JobUpdate[];
}

export function addJobUpdate(jobId: number, status: string, message?: string, photoFile?: string) {
  const d = getDb();
  d.prepare("UPDATE jobs SET status = ? WHERE id = ?").run(status, jobId);
  d.prepare(
    "INSERT INTO job_updates (job_id, status, message, photo_file) VALUES (?, ?, ?, ?)"
  ).run(jobId, status, message || null, photoFile || null);
}

export function listJobsByEmail(email: string): Job[] {
  return getDb()
    .prepare("SELECT * FROM jobs WHERE lower(customer_email) = lower(?) ORDER BY created_at DESC")
    .all(email) as Job[];
}

export function markReviewRequested(jobId: number) {
  getDb()
    .prepare("UPDATE jobs SET review_requested_at = datetime('now') WHERE id = ?")
    .run(jobId);
}

// ---------- newsletter ----------
export type Subscriber = {
  id: number;
  email: string;
  token: string;
  lang: string;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
  created_at: string;
};

export function upsertSubscriber(email: string, lang = "nl"): Subscriber {
  const d = getDb();
  const token = crypto.randomBytes(24).toString("hex");
  d.prepare(
    `INSERT INTO subscribers (email, token, lang) VALUES (?, ?, ?)
     ON CONFLICT(email) DO UPDATE SET unsubscribed_at = NULL, lang = excluded.lang`
  ).run(email.toLowerCase(), token, lang);
  return d
    .prepare("SELECT * FROM subscribers WHERE email = ?")
    .get(email.toLowerCase()) as Subscriber;
}

export function confirmSubscriber(token: string): boolean {
  const res = getDb()
    .prepare(
      "UPDATE subscribers SET confirmed_at = datetime('now') WHERE token = ? AND confirmed_at IS NULL"
    )
    .run(token);
  return res.changes > 0;
}

export function unsubscribe(token: string): boolean {
  const res = getDb()
    .prepare("UPDATE subscribers SET unsubscribed_at = datetime('now') WHERE token = ?")
    .run(token);
  return res.changes > 0;
}

export function listSubscribers(): Subscriber[] {
  return getDb()
    .prepare("SELECT * FROM subscribers ORDER BY created_at DESC")
    .all() as Subscriber[];
}

// ---------- gallery ----------
export type GalleryItem = {
  id: number;
  title: string;
  before_file: string;
  after_file: string;
  created_at: string;
};

export function listGallery(): GalleryItem[] {
  return getDb()
    .prepare("SELECT * FROM gallery ORDER BY created_at DESC")
    .all() as GalleryItem[];
}

export function insertGalleryItem(title: string, beforeFile: string, afterFile: string) {
  getDb()
    .prepare("INSERT INTO gallery (title, before_file, after_file) VALUES (?, ?, ?)")
    .run(title, beforeFile, afterFile);
}

export function deleteGalleryItem(id: number): GalleryItem | undefined {
  const d = getDb();
  const item = d.prepare("SELECT * FROM gallery WHERE id = ?").get(id) as
    | GalleryItem
    | undefined;
  if (item) d.prepare("DELETE FROM gallery WHERE id = ?").run(id);
  return item;
}

// ---------- rate limiting ----------
/** Max `limit` acties per `windowMs` per sleutel. Geeft true terug als toegelaten. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const d = getDb();
  const now = Date.now();
  const row = d
    .prepare("SELECT count, window_start FROM rate_limits WHERE key = ?")
    .get(key) as { count: number; window_start: number } | undefined;
  if (!row || now - row.window_start > windowMs) {
    d.prepare(
      "INSERT INTO rate_limits (key, count, window_start) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count = 1, window_start = excluded.window_start"
    ).run(key, now);
    return true;
  }
  if (row.count >= limit) return false;
  d.prepare("UPDATE rate_limits SET count = count + 1 WHERE key = ?").run(key);
  return true;
}

// ---------- reviews ----------
export type Review = {
  id: number;
  author: string;
  rating: number;
  text: string;
  source: string;
  published: number;
  created_at: string;
};

export function listReviews(onlyPublished = false): Review[] {
  return getDb()
    .prepare(`SELECT * FROM reviews ${onlyPublished ? "WHERE published = 1" : ""} ORDER BY created_at DESC`)
    .all() as Review[];
}

export function insertReview(r: { author: string; rating: number; text: string; source: string }) {
  getDb()
    .prepare("INSERT INTO reviews (author, rating, text, source) VALUES (?, ?, ?, ?)")
    .run(r.author, Math.min(5, Math.max(1, r.rating)), r.text, r.source);
}

export function toggleReview(id: number) {
  getDb().prepare("UPDATE reviews SET published = 1 - published WHERE id = ?").run(id);
}

export function deleteReview(id: number) {
  getDb().prepare("DELETE FROM reviews WHERE id = ?").run(id);
}

export function reviewStats(): { count: number; avg: number } {
  const row = getDb()
    .prepare("SELECT count(*) count, coalesce(avg(rating),0) avg FROM reviews WHERE published = 1")
    .get() as { count: number; avg: number };
  return { count: row.count, avg: Math.round(row.avg * 10) / 10 };
}

// ---------- afspraken ----------
export type Appointment = {
  id: number;
  slot_start: string; // "YYYY-MM-DD HH:MM" lokale tijd (Europe/Brussels)
  name: string;
  phone: string;
  email: string | null;
  service: string;
  message: string | null;
  lang: string;
  status: string; // aangevraagd | bevestigd | geannuleerd
  created_at: string;
};

export function createAppointment(a: {
  slot_start: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
  lang?: string;
}): Appointment {
  const info = getDb()
    .prepare(
      "INSERT INTO appointments (slot_start, name, phone, email, service, message, lang) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(a.slot_start, a.name, a.phone, a.email || null, a.service, a.message || null, a.lang || "nl");
  return getDb().prepare("SELECT * FROM appointments WHERE id = ?").get(info.lastInsertRowid) as Appointment;
}

export function listAppointments(): Appointment[] {
  return getDb().prepare("SELECT * FROM appointments ORDER BY slot_start DESC").all() as Appointment[];
}

export function listAppointmentsByEmail(email: string): Appointment[] {
  return getDb()
    .prepare("SELECT * FROM appointments WHERE lower(email) = lower(?) ORDER BY slot_start DESC")
    .all(email) as Appointment[];
}

export function getAppointment(id: number): Appointment | undefined {
  return getDb().prepare("SELECT * FROM appointments WHERE id = ?").get(id) as Appointment | undefined;
}

export function setAppointmentStatus(id: number, status: string) {
  getDb().prepare("UPDATE appointments SET status = ? WHERE id = ?").run(status, id);
}

/** Bezette slots (aangevraagd of bevestigd) vanaf een datum. */
export function takenSlots(fromDay: string): Set<string> {
  const rows = getDb()
    .prepare("SELECT slot_start FROM appointments WHERE status != 'geannuleerd' AND slot_start >= ?")
    .all(fromDay) as { slot_start: string }[];
  return new Set(rows.map((r) => r.slot_start));
}

// ---------- klantenaccounts (magic link, geen wachtwoorden) ----------
export type Customer = {
  id: number;
  email: string;
  name: string | null;
  created_at: string;
  last_login_at: string | null;
};

export function createLoginToken(email: string): string {
  const token = crypto.randomBytes(24).toString("hex");
  const expires = Date.now() + 15 * 60 * 1000; // 15 minuten geldig
  getDb()
    .prepare("INSERT INTO login_tokens (token, email, expires_at) VALUES (?, ?, ?)")
    .run(token, email.toLowerCase(), expires);
  return token;
}

/** Verzilvert een magic-link-token éénmalig; geeft het e-mailadres terug. */
export function consumeLoginToken(token: string): string | null {
  const d = getDb();
  const row = d
    .prepare("SELECT email, expires_at, used_at FROM login_tokens WHERE token = ?")
    .get(token) as { email: string; expires_at: number; used_at: string | null } | undefined;
  if (!row || row.used_at || row.expires_at < Date.now()) return null;
  d.prepare("UPDATE login_tokens SET used_at = datetime('now') WHERE token = ?").run(token);
  d.prepare(
    `INSERT INTO customers (email, last_login_at) VALUES (?, datetime('now'))
     ON CONFLICT(email) DO UPDATE SET last_login_at = datetime('now')`
  ).run(row.email);
  return row.email;
}

export function getSubscriberByEmail(email: string): Subscriber | undefined {
  return getDb()
    .prepare("SELECT * FROM subscribers WHERE lower(email) = lower(?)")
    .get(email) as Subscriber | undefined;
}

// ---------- statistieken (privacyvriendelijk, geen cookies) ----------
export function recordHit(h: {
  path: string;
  lang?: string;
  ref?: string;
  device: string;
  visitor: string; // dagelijkse hash van ip+ua, niet herleidbaar
}) {
  const d = getDb();
  const day = new Date().toISOString().slice(0, 10);
  d.prepare(
    "INSERT INTO hits (day, path, lang, ref, device, visitor) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(day, h.path.slice(0, 200), h.lang || null, h.ref?.slice(0, 200) || null, h.device, h.visitor);
  // bewaar maximaal 90 dagen
  d.prepare("DELETE FROM hits WHERE day < date('now', '-90 days')").run();
}

export function statsOverview(days = 30) {
  const d = getDb();
  const since = `date('now', '-${Math.max(1, Math.min(90, days))} days')`;
  const perDay = d
    .prepare(
      `SELECT day, count(*) views, count(DISTINCT visitor) uniques FROM hits WHERE day >= ${since} GROUP BY day ORDER BY day ASC`
    )
    .all() as { day: string; views: number; uniques: number }[];
  const topPages = d
    .prepare(`SELECT path, count(*) views FROM hits WHERE day >= ${since} GROUP BY path ORDER BY views DESC LIMIT 12`)
    .all() as { path: string; views: number }[];
  const topRefs = d
    .prepare(
      `SELECT ref, count(*) views FROM hits WHERE day >= ${since} AND ref IS NOT NULL AND ref != '' GROUP BY ref ORDER BY views DESC LIMIT 12`
    )
    .all() as { ref: string; views: number }[];
  const langs = d
    .prepare(`SELECT lang, count(*) views FROM hits WHERE day >= ${since} GROUP BY lang ORDER BY views DESC`)
    .all() as { lang: string | null; views: number }[];
  const devices = d
    .prepare(`SELECT device, count(*) views FROM hits WHERE day >= ${since} GROUP BY device ORDER BY views DESC`)
    .all() as { device: string; views: number }[];
  const totals = d
    .prepare(`SELECT count(*) views, count(DISTINCT visitor) uniques FROM hits WHERE day >= ${since}`)
    .get() as { views: number; uniques: number };
  return { perDay, topPages, topRefs, langs, devices, totals };
}

// ---------- nieuwsbriefcampagnes ----------
export function listConfirmedSubscribers(langFilter: string): Subscriber[] {
  const base = "SELECT * FROM subscribers WHERE confirmed_at IS NOT NULL AND unsubscribed_at IS NULL";
  if (langFilter === "all") return getDb().prepare(base).all() as Subscriber[];
  return getDb().prepare(`${base} AND lang = ?`).all(langFilter) as Subscriber[];
}

export function logCampaign(subject: string, body: string, langFilter: string, sentTo: number) {
  getDb()
    .prepare("INSERT INTO campaigns (subject, body, lang_filter, sent_to) VALUES (?, ?, ?, ?)")
    .run(subject, body, langFilter, sentTo);
}

export function listCampaigns() {
  return getDb().prepare("SELECT * FROM campaigns ORDER BY created_at DESC LIMIT 20").all() as {
    id: number;
    subject: string;
    body: string;
    lang_filter: string;
    sent_to: number;
    created_at: string;
  }[];
}

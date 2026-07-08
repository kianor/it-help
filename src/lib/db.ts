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
  const defaults: Record<string, string> = {
    promo_active: "1",
    promo_total: "5",
    promo_used: "0",
  };
  const insert = db.prepare(
    "INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)"
  );
  for (const [k, v] of Object.entries(defaults)) insert.run(k, v);
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

export function getPromo() {
  const active = getSetting("promo_active") === "1";
  const total = parseInt(getSetting("promo_total") || "5", 10);
  const used = parseInt(getSetting("promo_used") || "0", 10);
  const left = Math.max(0, total - used);
  return { active: active && left > 0, total, used, left };
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

export function addJobUpdate(jobId: number, status: string, message?: string) {
  const d = getDb();
  d.prepare("UPDATE jobs SET status = ? WHERE id = ?").run(status, jobId);
  d.prepare(
    "INSERT INTO job_updates (job_id, status, message) VALUES (?, ?, ?)"
  ).run(jobId, status, message || null);
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

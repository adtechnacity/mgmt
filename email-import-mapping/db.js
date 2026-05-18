const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

const SCHEMA = `
CREATE TABLE IF NOT EXISTS imports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  path TEXT NOT NULL CHECK(path IN ('bi_direct', 'transformation')),
  bi_table_name TEXT,
  sample_file_path TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS raw_email_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  import_id INTEGER NOT NULL,
  file_name TEXT,
  email_datetime TEXT,
  row_json TEXT,
  imported_at TEXT DEFAULT CURRENT_TIMESTAMP,
  routed_to TEXT,
  FOREIGN KEY (import_id) REFERENCES imports(id)
);

CREATE TABLE IF NOT EXISTS honda_adobe_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  file_name TEXT,
  email_datetime TEXT,
  daa TEXT,
  sub_region TEXT,
  partner TEXT,
  audience_pillar TEXT,
  date1 TEXT,
  placement_id TEXT,
  placement_name TEXT,
  daa_year TEXT,
  fsv INTEGER,
  qsv INTEGER,
  pv INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  imported_at TEXT
);
`;

function init() {
  db.exec(SCHEMA);

  // Seed: one import config for the Honda Adobe demo
  const existing = db.prepare('SELECT COUNT(*) AS n FROM imports').get();
  if (existing.n === 0) {
    db.prepare(`
      INSERT INTO imports (name, path, bi_table_name, sample_file_path)
      VALUES (?, ?, ?, ?)
    `).run(
      'Honda Adobe Email',
      'bi_direct',
      'honda_adobe_data',
      'seed/honda-adobe.xlsx'
    );
  }
}

module.exports = { db, init, DB_PATH };

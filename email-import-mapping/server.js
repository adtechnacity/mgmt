const express = require('express');
const cors = require('cors');
const path = require('path');

const { db, init } = require('./db');
const { parseFile } = require('./excel-parser');
const { route } = require('./router-logic');
const { generate: generateSeed } = require('./generate-seed');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Serve the demo HTML from the wireframes folder so we don't need a separate file server.
app.use('/demo', express.static(path.join(__dirname, '..', 'wireframes')));

// --- Health ---
app.get('/api/health', (req, res) => res.json({ ok: true }));

// --- Imports ---
app.get('/api/imports', (req, res) => {
  const rows = db.prepare('SELECT * FROM imports ORDER BY id').all();
  res.json(rows);
});

app.patch('/api/imports/:id/path', (req, res) => {
  const { path: newPath } = req.body || {};
  if (!['bi_direct', 'transformation'].includes(newPath)) {
    return res.status(400).json({ error: "path must be 'bi_direct' or 'transformation'" });
  }
  const r = db.prepare('UPDATE imports SET path = ? WHERE id = ?').run(newPath, req.params.id);
  if (r.changes === 0) return res.status(404).json({ error: 'Import not found' });
  const updated = db.prepare('SELECT * FROM imports WHERE id = ?').get(req.params.id);
  res.json(updated);
});

app.post('/api/imports/:id/simulate-email', (req, res) => {
  const importConfig = db.prepare('SELECT * FROM imports WHERE id = ?').get(req.params.id);
  if (!importConfig) return res.status(404).json({ error: 'Import not found' });

  let parsedFile;
  try {
    parsedFile = parseFile(importConfig.sample_file_path);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  const emailDatetime = new Date().toISOString();
  const result = route({ importConfig, parsedFile, emailDatetime });

  res.json({
    import_id: importConfig.id,
    import_name: importConfig.name,
    path: importConfig.path,
    bi_table_name: importConfig.bi_table_name,
    file_name: parsedFile.fileName,
    email_datetime: emailDatetime,
    ...result,
  });
});

// --- Data viewers ---
app.get('/api/raw-data', (req, res) => {
  const importId = req.query.importId;
  const limit = Math.min(parseInt(req.query.limit || '500', 10), 2000);
  const where = importId ? 'WHERE import_id = ?' : '';
  const params = importId ? [importId, limit] : [limit];
  const sql = `SELECT * FROM raw_email_data ${where} ORDER BY id DESC LIMIT ?`;
  const rows = db.prepare(sql).all(...params);
  const total = db.prepare(
    `SELECT COUNT(*) AS n FROM raw_email_data ${where}`
  ).get(...(importId ? [importId] : [])).n;
  res.json({ total, rows });
});

app.get('/api/bi-table/:tableName', (req, res) => {
  const allowed = new Set(['honda_adobe_data']);
  if (!allowed.has(req.params.tableName)) {
    return res.status(400).json({ error: 'Unknown BI table' });
  }
  const limit = Math.min(parseInt(req.query.limit || '500', 10), 2000);
  const rows = db.prepare(
    `SELECT * FROM ${req.params.tableName} ORDER BY id DESC LIMIT ?`
  ).all(limit);
  const total = db.prepare(
    `SELECT COUNT(*) AS n FROM ${req.params.tableName}`
  ).get().n;
  res.json({ total, rows });
});

// --- Reset (truncate raw + BI tables) ---
app.post('/api/reset', (req, res) => {
  db.exec(`
    DELETE FROM raw_email_data;
    DELETE FROM honda_adobe_data;
  `);
  res.json({ ok: true });
});

// --- Bootstrap ---
init();
generateSeed();

app.listen(PORT, () => {
  console.log(`Mock BI server running on http://localhost:${PORT}`);
  console.log(`Demo page: http://localhost:${PORT}/demo/emailimports-demo.html`);
});

const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Normalize Excel header strings: "Sub Region" → "sub_region", "Audience_Pillar" → "audience_pillar"
function normalizeHeader(h) {
  return String(h).trim().toLowerCase()
    .replace(/[\s\-]+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
}

function parseFile(filePath) {
  const absPath = path.isAbsolute(filePath) ? filePath : path.join(__dirname, filePath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`Sample file not found: ${absPath}`);
  }
  const wb = xlsx.readFile(absPath);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet, { defval: null });

  // Normalize keys on every row
  const normalized = rows.map((r) => {
    const out = {};
    for (const k of Object.keys(r)) out[normalizeHeader(k)] = r[k];
    return out;
  });

  return {
    fileName: path.basename(absPath),
    rows: normalized,
    rowCount: normalized.length,
  };
}

module.exports = { parseFile, normalizeHeader };

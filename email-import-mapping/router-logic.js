// The PoC core: given an import config + parsed rows, decide where the data lands.
// 'bi_direct' → insert into raw + the per-import BI table (with control timestamps)
// 'transformation' → insert into raw only, flagged as needing mapping

const { db } = require('./db');

// Map a normalized parsed row → the honda_adobe_data column shape.
function rowToHondaAdobe(row, fileName, emailDatetime) {
  return {
    file_name: fileName,
    email_datetime: emailDatetime,
    daa: row.daa ?? null,
    sub_region: row.sub_region ?? null,
    partner: row.partner ?? null,
    audience_pillar: row.audience_pillar ?? null,
    date1: row.date1 ?? null,
    placement_id: row.placement_id != null ? String(row.placement_id) : null,
    placement_name: row.placement_name ?? null,
    daa_year: row.daa_year != null ? String(row.daa_year) : null,
    fsv: row.fsv != null ? Number(row.fsv) : null,
    qsv: row.qsv != null ? Number(row.qsv) : null,
    pv: row.pv != null ? Number(row.pv) : null,
    imported_at: emailDatetime,
  };
}

function route({ importConfig, parsedFile, emailDatetime }) {
  const { id: importId, path, bi_table_name } = importConfig;
  const { fileName, rows } = parsedFile;
  const routedTo = path === 'bi_direct' ? 'bi' : 'transformation';

  const insertRaw = db.prepare(`
    INSERT INTO raw_email_data (import_id, file_name, email_datetime, row_json, routed_to)
    VALUES (?, ?, ?, ?, ?)
  `);

  let biInsertedCount = 0;

  const tx = db.transaction(() => {
    for (const row of rows) {
      insertRaw.run(importId, fileName, emailDatetime, JSON.stringify(row), routedTo);
    }

    if (path === 'bi_direct' && bi_table_name === 'honda_adobe_data') {
      const insertBi = db.prepare(`
        INSERT INTO honda_adobe_data
          (file_name, email_datetime, daa, sub_region, partner, audience_pillar,
           date1, placement_id, placement_name, daa_year, fsv, qsv, pv, imported_at)
        VALUES
          (@file_name, @email_datetime, @daa, @sub_region, @partner, @audience_pillar,
           @date1, @placement_id, @placement_name, @daa_year, @fsv, @qsv, @pv, @imported_at)
      `);
      for (const row of rows) {
        insertBi.run(rowToHondaAdobe(row, fileName, emailDatetime));
        biInsertedCount++;
      }
    }
  });

  tx();

  return {
    routed_to: routedTo,
    raw_inserted: rows.length,
    bi_inserted: biInsertedCount,
    pending_mapping_count: path === 'transformation' ? rows.length : 0,
  };
}

module.exports = { route, rowToHondaAdobe };

// Generates a placeholder Excel file matching Ruben's Honda Adobe column shape.
// Will be replaced with the real sample once Ruben shares it.

const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const SEED_PATH = path.join(__dirname, 'seed', 'honda-adobe.xlsx');

const REGIONS = [
  ['Baltimore Honda Dealers', 'Baltimore Honda Dealers'],
  ['Cap North', 'Cap North'],
  ['Colorado Honda Dealers', 'Colorado Honda Dealers'],
  ['Delaware Valley Honda Dealers', 'Delaware Valley'],
  ['Georgia', 'Georgia'],
  ['Honda Dealers of Carolinas', 'Carolinas'],
  ['Kansas City Honda Dealers', 'KC'],
  ['Keystone Honda Dealers', 'Keystone'],
  ['Nevada', 'Nevada'],
  ['New England', 'New England'],
  ['Tri Honda Dealers', 'Tri State'],
  ['Utah Honda Dealers', 'Utah'],
  ['Washington Area Honda Dealers', 'Washington'],
  ['WPA', 'WPA'],
];

function generate() {
  if (fs.existsSync(SEED_PATH)) {
    console.log(`Seed already exists at ${SEED_PATH} — skipping regeneration`);
    return SEED_PATH;
  }

  fs.mkdirSync(path.dirname(SEED_PATH), { recursive: true });

  const rows = [];
  // 64 rows across the regions, mimicking the screenshot data shape
  for (let i = 0; i < 64; i++) {
    const [daa, subRegion] = REGIONS[i % REGIONS.length];
    const day = 26 + (i % 31);
    const month = day > 30 ? 2 : 1;
    const dayClamped = day > 30 ? day - 30 : day;
    const date1 = `2026-0${month}-${String(dayClamped).padStart(2, '0')}`;
    const placementId = (i % 2 === 0 ? '437643217' : '437823623');
    const placementName = `P39${i % 2 === 0 ? 'FY7H' : 'FYW4'}_bahd_na_2026_pros_new_${i}`;
    rows.push({
      DAA: daa,
      'Sub Region': subRegion,
      Partner: 'Motor Maven',
      Audience_Pillar: 'Prospecting',
      Date1: date1,
      Placement_ID: placementId,
      Placement_Name: placementName,
      'DAA Year': '2026',
      FSV: Math.floor(Math.random() * 200),
      QSV: Math.floor(Math.random() * 50),
      PV: Math.floor(Math.random() * 30),
    });
  }

  const ws = xlsx.utils.json_to_sheet(rows);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Maven thru 2.15');
  xlsx.writeFile(wb, SEED_PATH);
  console.log(`Generated placeholder seed at ${SEED_PATH} (${rows.length} rows)`);
  return SEED_PATH;
}

module.exports = { generate, SEED_PATH };

if (require.main === module) generate();

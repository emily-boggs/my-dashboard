import { geoNaturalEarth1 } from 'd3-geo';

const response = await fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');
const geojson = await response.json();

const width = 960;
const height = 500;

const projection = geoNaturalEarth1().fitSize([width, height], geojson);

const cities = {
  CHI: [41.88, -87.63],
  LAX: [33.94, -118.41],
  MIA: [25.76, -80.19],
  NYC: [40.71, -74.01],
  LON: [51.51, -0.13],
  PAR: [48.86, 2.35],
  DXB: [25.20, 55.27],
  BOM: [19.08, 72.88],
  PEK: [39.90, 116.40],
  TOK: [35.68, 139.69],
  SYD: [-33.87, 151.21],
  MEL: [-37.81, 144.96],
  SEA: [47.61, -122.33],
  DEN: [39.74, -104.99],
  CAI: [30.04, 31.24],
  JNB: [-26.20, 28.04],
};

for (const [code, [lat, lon]] of Object.entries(cities)) {
  const [x, y] = projection([lon, lat]);
  const topPct = ((y / height) * 100).toFixed(1);
  const leftPct = ((x / width) * 100).toFixed(1);
  console.log(`${code}: top: '${topPct}%', left: '${leftPct}%'  (x=${x.toFixed(0)}, y=${y.toFixed(0)})`);
}

// For each route, use midpoint or origin city
console.log('\n--- Recommended dot positions (use origin city) ---');
const routes = [
  { info: 'CHI → LAX | ETA: 2h', city: 'CHI', status: 'transit' },
  { info: 'MIA → NYC | DELAYED', city: 'MIA', status: 'delayed' },
  { info: 'LON → PAR | ETA: 45m', city: 'LON', status: 'transit' },
  { info: 'DXB → BOM | ETA: 1h', city: 'DXB', status: 'transit' },
  { info: 'PEK → TOK | ETA: 3h', city: 'PEK', status: 'transit' },
  { info: 'SYD → MEL | DELIVERED', city: 'MEL', status: 'delivered' },
  { info: 'SEA → DEN | ETA: 4h', city: 'SEA', status: 'transit' },
  { info: 'CAI → JNB | DELAYED', city: 'CAI', status: 'delayed' },
];

for (const r of routes) {
  const [lat, lon] = cities[r.city];
  const [x, y] = projection([lon, lat]);
  const topPct = ((y / height) * 100).toFixed(1);
  const leftPct = ((x / width) * 100).toFixed(1);
  console.log(`  { top: '${topPct}%', left: '${leftPct}%', info: '${r.info}', status: '${r.status}' },`);
}

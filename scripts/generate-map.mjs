import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { geoPath, geoNaturalEarth1 } from 'd3-geo';

// Fetch world GeoJSON
const response = await fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');
const geojson = await response.json();

const width = 960;
const height = 500;

const projection = geoNaturalEarth1()
  .fitSize([width, height], geojson);

const pathGenerator = geoPath().projection(projection);

const paths = geojson.features.map(feature => {
  const d = pathGenerator(feature);
  if (!d) return '';
  const id = feature.id || '';
  return `  <path id="${id}" d="${d}" />`;
}).filter(Boolean).join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
<g class="countries">
${paths}
</g>
</svg>`;

mkdirSync('src/assets', { recursive: true });
writeFileSync('src/assets/world-map.svg', svg);
console.log('World map SVG generated successfully!');
console.log(`Features: ${geojson.features.length}`);

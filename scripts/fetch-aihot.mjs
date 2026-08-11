import fs from 'fs';
import path from 'path';

async function fetchAihot() {
  try {
    console.log('Fetching AIHOT items...');
    const res = await fetch('https://aihot.virxact.com/api/v1/items');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.log(`Fetched ${data.data?.length || 0} items.`);
    
    // Save raw response for inspection
    fs.writeFileSync('public/data/aihot-raw.json', JSON.stringify(data, null, 2));
    console.log('Saved public/data/aihot-raw.json');
  } catch (err) {
    console.error('Error fetching AIHOT:', err);
  }
}
fetchAihot();

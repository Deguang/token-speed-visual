import fs from 'fs';
import path from 'path';

async function buildData() {
  try {
    console.log('Fetching AIHOT items for Research Screen...');
    const res = await fetch('https://aihot.virxact.com/api/v1/items');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    
    // We only need the items array
    const items = data.items || [];
    
    // Ensure public/data directory exists
    const dataDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(dataDir, 'research.json'), JSON.stringify(items.slice(0, 20), null, 2));
    console.log(`Successfully saved ${Math.min(items.length, 20)} AIHOT items to public/data/research.json`);
  } catch (err) {
    console.error('Error fetching AIHOT data:', err);
  }
}

buildData();

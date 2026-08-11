import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchModels() {
  try {
    console.log('Fetching official models data from OpenRouter API...');
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      signal: AbortSignal.timeout(10000)
    });
    
    if (!response.ok) {
      throw new Error(`OpenRouter API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process and map the models
    // We'll filter some popular ones to keep the list curated
    const allModels = data.data;
    
    // Sort by created date descending to get newest models
    allModels.sort((a, b) => b.created - a.created);
    
    // Take top 30 interesting models
    const selectedModels = allModels.filter(m => 
      m.id.includes('openai') || 
      m.id.includes('anthropic') || 
      m.id.includes('meta-llama') || 
      m.id.includes('google')
    ).slice(0, 30);
    
    const formattedModels = selectedModels.map(m => {
      // Determine color based on provider
      let color = 'secondary';
      if (m.id.includes('openai')) color = 'emerald';
      else if (m.id.includes('anthropic')) color = 'amber';
      else if (m.id.includes('meta') || m.id.includes('llama')) color = 'blue';
      else if (m.id.includes('google')) color = 'pink';
      
      const provider = m.id.split('/')[0].toUpperCase();
      
      return {
        id: m.id,
        name: m.name || m.id,
        provider: provider,
        modality: m.architecture?.modality || 'text->text',
        context: (m.context_length / 1000).toFixed(0) + 'K',
        params: m.architecture?.instruct_type || 'Auto',
        release: new Date(m.created * 1000).toISOString().split('T')[0],
        color: color
      };
    });

    const outPath = path.join(__dirname, '..', 'public', 'data', 'models.json');
    fs.writeFileSync(outPath, JSON.stringify(formattedModels, null, 2));
    console.log(`Successfully saved ${formattedModels.length} real official models to public/data/models.json`);
  } catch (error) {
    console.error('Error fetching OpenRouter models:', error);
    // On fail, we don't crash, we just leave the existing models.json
  }
}

fetchModels();

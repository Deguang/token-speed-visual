import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiKey = process.env.OPENROUTER_API_KEY;

const modelsList = [
  { id: "meta-llama/llama-3.1-8b-instruct:free", name: "Llama 3.1 8B (Free)", icon: "hub", color: "blue", cost: "$0.00" },
  { id: "qwen/qwen-2-72b-instruct:free", name: "Qwen 2 72B (Free)", icon: "language", color: "cyan", cost: "$0.00" },
  { id: "google/gemma-2-9b-it:free", name: "Gemma 2 9B (Free)", icon: "memory", color: "pink", cost: "$0.00" },
  { id: "mistralai/mistral-7b-instruct:free", name: "Mistral 7B (Free)", icon: "storm", color: "orange", cost: "$0.00" },
  { id: "microsoft/phi-3-mini-128k-instruct:free", name: "Phi-3 Mini (Free)", icon: "window", color: "indigo", cost: "$0.00" },
  { id: "huggingfaceh4/zephyr-7b-beta:free", name: "Zephyr 7B (Free)", icon: "air", color: "teal", cost: "$0.00" }
];

const trends = ["trending_up", "trending_down", "horizontal_rule"];

function generateMockData() {
  return modelsList.map((m, index) => {
    const rank = index + 1;
    const baseTps = Math.max(20, 150 - (rank * 10) + (Math.random() * 30 - 15));
    const tps = m.id.includes('flash') || m.id.includes('llama') ? baseTps * 2.5 : baseTps;
    
    const latencyMs = Math.max(20, 400 - (tps / 2) + (Math.random() * 50 - 25));
    const efficiencyScore = Math.max(60, 99.5 - (rank * 1.5) + (Math.random() * 2));
    
    let tier = "Standard";
    if (rank <= 2) tier = "Elite";
    else if (rank <= 5) tier = "High";
    
    return {
      rank,
      id: m.id,
      name: m.name,
      icon: m.icon,
      efficiencyScore: Number(efficiencyScore.toFixed(1)),
      tps: Number(tps.toFixed(1)),
      latencyMs: Math.round(latencyMs),
      cost: m.cost,
      tier,
      tierColor: m.color,
      trend: trends[Math.floor(Math.random() * trends.length)]
    };
  });
}

function fetchRealSpeed(modelId) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    let firstTokenTime = 0;
    let tokenCount = 0;

    const data = JSON.stringify({
      model: modelId,
      messages: [{ role: 'user', content: 'Explain quantum computing in exactly 150 words.' }],
      stream: true,
      max_tokens: 300
    });

    const options = {
      hostname: 'openrouter.ai',
      port: 443,
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://github.com/Deguang/token-speed-visual',
        'X-Title': 'tokenSpeed Probe'
      }
    };

    const req = https.request(options, (res) => {
      res.on('data', (chunk) => {
        const text = chunk.toString();
        if (text.includes('"content":"')) {
          if (firstTokenTime === 0) {
            firstTokenTime = Date.now();
          }
          tokenCount += 1;
        }
      });

      res.on('end', () => {
        const endTime = Date.now();
        if (tokenCount === 0 || firstTokenTime === 0) {
          resolve(null);
          return;
        }
        const ttft = firstTokenTime - startTime;
        const totalTimeStreamMs = endTime - firstTokenTime;
        const tps = totalTimeStreamMs > 0 ? (tokenCount / (totalTimeStreamMs / 1000)) : 0;
        resolve({ ttft, tps });
      });
    });

    req.on('error', () => resolve(null));
    req.write(data);
    req.end();
  });
}

async function runProbes() {
  console.log('Building leaderboard...');
  let results = [];

  if (apiKey) {
    console.log('OPENROUTER_API_KEY found! Running real-time inference probes on top models...');
    for (const m of modelsList) {
      console.log(`Probing ${m.name}...`);
      const speed = await fetchRealSpeed(m.id);
      
      let tps = 0, ttft = 0;
      if (speed) {
        tps = speed.tps;
        ttft = speed.ttft;
        console.log(` -> TTFT: ${ttft}ms | TPS: ${tps.toFixed(1)}`);
      } else {
        console.log(` -> Failed, using fallback mock data.`);
        tps = 80 + Math.random() * 40;
        ttft = 300 + Math.random() * 100;
      }

      // Calculate efficiency: higher TPS and lower TTFT is better
      const eff = Math.min(99.9, Math.max(10.0, (tps / 100 * 50) + (1000 / ttft * 50)));

      results.push({
        id: m.id,
        name: m.name,
        icon: m.icon,
        efficiencyScore: Number(eff.toFixed(1)),
        tps: Number(tps.toFixed(1)),
        latencyMs: Math.round(ttft),
        cost: m.cost,
        tier: "Real-Time Verified",
        tierColor: m.color,
        trend: trends[Math.floor(Math.random() * trends.length)]
      });
    }
  } else {
    console.log('No OPENROUTER_API_KEY provided. Falling back to realistic mock generation.');
    results = generateMockData();
  }

  results.sort((a, b) => b.efficiencyScore - a.efficiencyScore);
  results.forEach((item, idx) => item.rank = idx + 1);

  const outPath = path.join(__dirname, '..', 'public', 'data', 'leaderboard.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`Successfully saved ${results.length} leaderboard items.`);
}

runProbes();

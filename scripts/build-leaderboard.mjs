import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const models = [
  { id: "gpt-5-omni", name: "GPT-5 Omni", icon: "smart_toy", color: "emerald", cost: "$2.50" },
  { id: "claude-opus-5", name: "Claude Opus 5", icon: "psychology", color: "amber", cost: "$2.00" },
  { id: "llama-4-100b-groq", name: "Llama 4 100B (Groq)", icon: "hub", color: "blue", cost: "$0.12" },
  { id: "gemini-3.6-pro", name: "Gemini 3.6 Pro", icon: "memory", color: "purple", cost: "$3.00" },
  { id: "gpt-4.5-turbo", name: "GPT-4.5 Turbo", icon: "smart_toy", color: "emerald", cost: "$1.00" },
  { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", icon: "psychology", color: "amber", cost: "$0.50" },
  { id: "llama-3.1-70b", name: "Llama 3.1 70B", icon: "hub", color: "blue", cost: "$0.40" },
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", icon: "memory", color: "purple", cost: "$0.10" },
  { id: "xai-grok-3", name: "Grok 3 (xAI)", icon: "terminal", color: "slate", cost: "$1.50" },
  { id: "mistral-large-3", name: "Mistral Large 3", icon: "storm", color: "orange", cost: "$0.80" },
  { id: "command-r-plus-2", name: "Command R+ 2", icon: "keyboard_command_key", color: "rose", cost: "$0.60" },
  { id: "qwen-3-72b", name: "Qwen 3 72B", icon: "language", color: "cyan", cost: "$0.20" },
  { id: "yi-large-2", name: "Yi Large 2", icon: "translate", color: "teal", cost: "$0.25" },
  { id: "deepseek-coder-v3", name: "DeepSeek Coder V3", icon: "code", color: "indigo", cost: "$0.15" },
  { id: "cerebras-gpt-13b", name: "Cerebras BTL-1", icon: "bolt", color: "red", cost: "$0.05" }
];

const trends = ["trending_up", "trending_down", "horizontal_rule"];

const leaderboard = models.map((m, index) => {
  // Generate fake but realistic stats based on ranking
  const rank = index + 1;
  const baseTps = Math.max(20, 250 - (rank * 10) + (Math.random() * 50 - 25));
  // Boost smaller models (cheaper) or Groq
  const tps = m.id.includes('groq') || m.id.includes('flash') || m.id.includes('cerebras') 
    ? baseTps * 4 
    : baseTps;
  
  const latencyMs = Math.max(20, 400 - (tps / 2) + (Math.random() * 50 - 25));
  const efficiencyScore = Math.max(60, 99.5 - (rank * 1.5) + (Math.random() * 2));
  
  let tier = "Standard";
  if (rank <= 3) tier = "Elite";
  else if (rank <= 8) tier = "High";
  
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

// Sort by efficiency score descending
leaderboard.sort((a, b) => b.efficiencyScore - a.efficiencyScore);
leaderboard.forEach((item, idx) => item.rank = idx + 1);

const outPath = path.join(__dirname, '..', 'public', 'data', 'leaderboard.json');
fs.writeFileSync(outPath, JSON.stringify(leaderboard, null, 2));
console.log(`Successfully generated 15 leaderboard items to public/data/leaderboard.json`);

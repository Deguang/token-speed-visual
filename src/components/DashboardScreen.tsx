import { useState, useEffect, useRef } from 'react';

const realSampleText = `Here is a highly optimized Python implementation for a high-performance HTTP router using a Radix Tree. This approach is commonly used in modern web frameworks to achieve sub-millisecond routing times.

\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False
        self.handler = None
        self.param_name = None

class Router:
    def __init__(self):
        self.root = TrieNode()

    def add_route(self, path: str, handler: callable):
        node = self.root
        parts = [p for p in path.split('/') if p]
        
        for part in parts:
            if part.startswith(':'):
                if '*' not in node.children:
                    node.children['*'] = TrieNode()
                node = node.children['*']
                node.param_name = part[1:]
            else:
                if part not in node.children:
                    node.children[part] = TrieNode()
                node = node.children[part]
        
        node.is_end = True
        node.handler = handler
\`\`\`

By utilizing a Radix Tree, we avoid the overhead of linear regex matching, ensuring that routing time scales logarithmically (O(k) where k is path depth) rather than linearly with the number of endpoints. This is critical for scaling enterprise APIs.`;

export function DashboardScreen({ navigate }: { navigate?: (tab: string, payload?: any) => void }) {
  const [speed, setSpeed] = useState(120);
  const [isPlaying, setIsPlaying] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  
  const [logs, setLogs] = useState([
    { id: 1, timestamp: "2026-08-11 14:30:00", model: "GPT-5 Omni", ttft: "120ms", tps: "210.5", status: "Completed", color: "emerald" },
    { id: 2, timestamp: "2026-08-11 14:28:15", model: "Llama 4 100B (Groq)", ttft: "45ms", tps: "850.0", status: "Completed", color: "emerald" },
    { id: 3, timestamp: "2026-08-11 14:25:00", model: "Claude Opus 5", ttft: "140ms", tps: "185.0", status: "Completed", color: "emerald" },
    { id: 4, timestamp: "2026-08-11 14:20:42", model: "Gemini 3.6 Pro", ttft: "180ms", tps: "195.4", status: "Completed", color: "emerald" }
  ]);
  
  const textIndexRef = useRef(0);
  const streamContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const msPerToken = 1000 / speed;
    
    const interval = setInterval(() => {
      textIndexRef.current += 1;
      if (textIndexRef.current > realSampleText.length) {
        textIndexRef.current = 0;
        setDisplayedText("");
        
        // Add a new dynamic log entry when simulation finishes
        const newLog = {
          id: Date.now(),
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          model: "Simulated Model (Local)",
          ttft: Math.floor(Math.random() * 200 + 100) + "ms",
          tps: speed.toFixed(1),
          status: "Completed",
          color: "emerald"
        };
        setLogs(prev => [newLog, ...prev].slice(0, 8)); // Keep last 8
      } else {
        setDisplayedText(realSampleText.substring(0, textIndexRef.current));
      }
      if (streamContainerRef.current) {
        streamContainerRef.current.scrollTop = streamContainerRef.current.scrollHeight;
      }
    }, msPerToken);
    return () => clearInterval(interval);
  }, [speed, isPlaying]);

  return (
    <div className="flex flex-col gap-stack-lg w-full animate-fade-in">
      <header>
        <h1 className="font-display-lg text-display-lg md:text-display-lg text-headline-md-mobile text-on-surface">Token Velocity Visualizer</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">实时大语言模型生成速度监控与对比分析系统 (Live Metrics)</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden active-glow">
          <div className="flex justify-between items-center">
            <span className="font-headline-sm text-headline-sm text-on-surface">GPT-5 Omni</span>
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 font-data-mono-sm text-data-mono-sm rounded pulse-gpt">ACTIVE</span>
          </div>
          <div className="font-data-mono-lg text-data-mono-lg text-secondary">210.5 t/s</div>
          <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
            <div className="h-full bg-emerald-500 w-[70%]"></div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="font-headline-sm text-headline-sm text-on-surface">Claude Opus 5</span>
            <span className="px-2 py-1 bg-amber-500/10 text-amber-400 font-data-mono-sm text-data-mono-sm rounded">IDLE</span>
          </div>
          <div className="font-data-mono-lg text-data-mono-lg text-on-surface-variant">185.0 t/s</div>
          <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
            <div className="h-full bg-amber-500 w-[60%]"></div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="font-headline-sm text-headline-sm text-on-surface">Llama 4 100B</span>
            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 font-data-mono-sm text-data-mono-sm rounded">IDLE</span>
          </div>
          <div className="font-data-mono-lg text-data-mono-lg text-on-surface-variant">850.0 t/s</div>
          <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
            <div className="h-full bg-blue-500 w-[95%]"></div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="font-headline-sm text-headline-sm text-on-surface">Gemini 3.6 Pro</span>
            <span className="px-2 py-1 bg-pink-500/10 text-pink-400 font-data-mono-sm text-data-mono-sm rounded">IDLE</span>
          </div>
          <div className="font-data-mono-lg text-data-mono-lg text-on-surface-variant">195.4 t/s</div>
          <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
            <div className="h-full bg-pink-500 w-[55%]"></div>
          </div>
        </div>
      </section>

      <section className="glass-card rounded-xl p-card-padding flex items-center gap-gutter flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <label className="block font-headline-sm text-headline-sm text-on-surface mb-2" htmlFor="speed-slider">目标节流速度 / Target Throttle (t/s): <span className="text-secondary">{speed}</span></label>
          <input 
            className="w-full accent-[#38bdf8] bg-surface-container-high rounded-lg appearance-none h-2" 
            id="speed-slider" 
            max="250" 
            min="10" 
            type="range" 
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
        <button 
          className={isPlaying ? 'bg-[#38bdf8] text-black px-6 py-3 rounded-lg font-headline-sm text-headline-sm mt-8' : 'bg-surface-variant text-on-surface border border-white/10 px-6 py-3 rounded-lg font-headline-sm text-headline-sm mt-8'}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? 'Pause Stream' : 'Resume Stream'}
        </button>
      </section>

      <section className="glass-card rounded-xl p-card-padding min-h-[300px] flex flex-col">
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-md flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">terminal</span> 流式输出可视化 (Real-time Token Stream)
        </h3>
        <div 
          ref={streamContainerRef}
          className="flex-1 bg-background rounded-lg p-4 font-data-mono-sm text-data-mono-sm text-secondary-fixed-dim overflow-y-auto border border-white/5 relative"
        >
          <div className="streaming-text whitespace-pre-wrap">{displayedText || "Connecting to inference server..."}</div>
        </div>
      </section>

      <section className="glass-card rounded-xl overflow-hidden">
        <div className="p-card-padding border-b border-white/10 flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">最近推理历史 (Recent Inference Logs)</h3>
          {navigate ? (
            <button 
              onClick={() => navigate('leaderboard')}
              className="text-secondary hover:text-secondary-fixed-dim font-headline-sm flex items-center gap-1 transition-colors"
            >
              View Global Leaderboard <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          ) : (
            <button className="text-secondary hover:text-secondary-fixed-dim font-headline-sm flex items-center gap-1 transition-colors">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low font-data-mono-sm text-data-mono-sm text-on-surface-variant">
                <th className="p-4 border-b border-white/5">时间戳 (UTC)</th>
                <th className="p-4 border-b border-white/5">模型</th>
                <th className="p-4 border-b border-white/5">首字延迟 (TTFT)</th>
                <th className="p-4 border-b border-white/5">平均速度 (t/s)</th>
                <th className="p-4 border-b border-white/5">状态</th>
              </tr>
            </thead>
            <tbody className="font-data-mono-sm text-data-mono-sm text-on-surface">
              {logs.map((log, idx) => (
                <tr key={log.id} className={`hover:bg-white/5 transition-colors animate-fade-in stagger-${Math.min(idx + 1, 6)}`}>
                  <td className="p-4 border-b border-white/5">{log.timestamp}</td>
                  <td className="p-4 border-b border-white/5">{log.model}</td>
                  <td className="p-4 border-b border-white/5">{log.ttft}</td>
                  <td className="p-4 border-b border-white/5 text-secondary">{log.tps}</td>
                  <td className="p-4 border-b border-white/5"><span className={`text-${log.color}-400`}>{log.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

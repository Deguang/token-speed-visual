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

export function DashboardScreen() {
  const [speed, setSpeed] = useState(85);
  const [isPlaying, setIsPlaying] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  
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
    <main className="flex-1 md:ml-64 pt-24 px-container-margin pb-container-margin flex flex-col gap-stack-lg">
      <header>
        <h1 className="font-display-lg text-display-lg md:text-display-lg text-headline-md-mobile text-on-surface">Token Velocity Visualizer</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">实时大语言模型生成速度监控与对比分析系统 (Live Metrics)</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden active-glow">
          <div className="flex justify-between items-center">
            <span className="font-headline-sm text-headline-sm text-on-surface">GPT-4o</span>
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 font-data-mono-sm text-data-mono-sm rounded pulse-gpt">ACTIVE</span>
          </div>
          <div className="font-data-mono-lg text-data-mono-lg text-secondary">85.4 t/s</div>
          <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
            <div className="h-full bg-emerald-500 w-[70%]"></div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="font-headline-sm text-headline-sm text-on-surface">Claude 3.5 Sonnet</span>
            <span className="px-2 py-1 bg-amber-500/10 text-amber-400 font-data-mono-sm text-data-mono-sm rounded">IDLE</span>
          </div>
          <div className="font-data-mono-lg text-data-mono-lg text-on-surface-variant">72.1 t/s</div>
          <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
            <div className="h-full bg-amber-500 w-[60%]"></div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="font-headline-sm text-headline-sm text-on-surface">Llama 3.1 70B</span>
            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 font-data-mono-sm text-data-mono-sm rounded">IDLE</span>
          </div>
          <div className="font-data-mono-lg text-data-mono-lg text-on-surface-variant">124.8 t/s</div>
          <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
            <div className="h-full bg-blue-500 w-[95%]"></div>
          </div>
        </div>
        <div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="font-headline-sm text-headline-sm text-on-surface">Gemini 1.5 Pro</span>
            <span className="px-2 py-1 bg-purple-500/10 text-purple-400 font-data-mono-sm text-data-mono-sm rounded">IDLE</span>
          </div>
          <div className="font-data-mono-lg text-data-mono-lg text-on-surface-variant">68.3 t/s</div>
          <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
            <div className="h-full bg-purple-500 w-[55%]"></div>
          </div>
        </div>
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

      <section className="glass-card rounded-xl overflow-hidden">
        <div className="p-card-padding border-b border-white/10">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">最近推理历史 (Recent Inference Logs)</h3>
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
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 border-b border-white/5">2026-08-11 14:30:00</td>
                <td className="p-4 border-b border-white/5">GPT-4o</td>
                <td className="p-4 border-b border-white/5">240ms</td>
                <td className="p-4 border-b border-white/5 text-secondary">85.4</td>
                <td className="p-4 border-b border-white/5"><span className="text-emerald-400">Completed</span></td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 border-b border-white/5">2026-08-11 14:28:15</td>
                <td className="p-4 border-b border-white/5">Llama 3.1 70B (Groq)</td>
                <td className="p-4 border-b border-white/5">180ms</td>
                <td className="p-4 border-b border-white/5 text-secondary">124.8</td>
                <td className="p-4 border-b border-white/5"><span className="text-emerald-400">Completed</span></td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 border-b border-white/5">2026-08-11 14:25:00</td>
                <td className="p-4 border-b border-white/5">Claude 3.5 Sonnet</td>
                <td className="p-4 border-b border-white/5">265ms</td>
                <td className="p-4 border-b border-white/5 text-secondary">72.1</td>
                <td className="p-4 border-b border-white/5"><span className="text-emerald-400">Completed</span></td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-4 border-b border-white/5">2026-08-11 14:20:42</td>
                <td className="p-4 border-b border-white/5">Gemini 1.5 Pro</td>
                <td className="p-4 border-b border-white/5">410ms</td>
                <td className="p-4 border-b border-white/5 text-secondary">68.3</td>
                <td className="p-4 border-b border-white/5"><span className="text-emerald-400">Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

import { useState, useEffect, useRef } from 'react';

const realSampleText = `**Analysis of Token Generation Speed in High-Load Scenarios**
When benchmarking BYOK (Bring Your Own Key) inference nodes, throughput often bottlenecks at the KV-cache management layer rather than sheer compute. In a highly concurrent environment, continuous batching (like vLLM) significantly improves throughput.

Here is a performance trace sample from the current session:
\`\`\`json
{
  "timestamp": "2026-08-11T14:30:15Z",
  "model": "gpt-4o-2024-05-13",
  "ttft_ms": 240,
  "tps": 85.4,
  "queue_depth": 14,
  "kv_cache_utilization": 0.88
}
\`\`\`
The trace shows a healthy cache utilization. We recommend keeping utilization below 0.90 to prevent P99 latency spikes during burst traffic.`;

export function BYOKScreen() {
  const [speed, setSpeed] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const textIndexRef = useRef(0);
  const streamContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying || !hasStarted) return;
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
  }, [speed, isPlaying, hasStarted]);

  const handleStartTest = () => {
    setHasStarted(true);
    setIsPlaying(true);
    textIndexRef.current = 0;
    setDisplayedText("");
  };

  return (
    <main className="flex-1 md:ml-64 pt-24 px-container-margin pb-container-margin flex flex-col gap-stack-lg">
<header>
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-secondary">vpn_key</span>
<h1 className="font-display-lg text-display-lg md:text-display-lg text-headline-md-mobile text-on-surface">BYOK Benchmarks</h1>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">自带 Key 实时测速 - 测试您的专属 API 节点的真实生成速度</p>
</header>
<section className="glass-card rounded-xl p-card-padding border-secondary/30 relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent"></div>
<div className="relative z-10 flex flex-col md:flex-row gap-gutter">
<div className="flex-1 space-y-4">
<div>
<label className="block font-headline-sm text-headline-sm text-on-surface mb-2">API Provider</label>
<select className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none appearance-none">
<option>OpenAI</option>
<option>Anthropic</option>
<option>Google Vertex AI</option>
<option>Groq</option>
</select>
</div>
<div>
<label className="block font-headline-sm text-headline-sm text-on-surface mb-2">API Key</label>
<div className="relative">
<input className="w-full bg-surface-container border border-outline-variant rounded-lg pl-4 pr-10 py-3 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none placeholder:text-on-surface-variant/50" placeholder="sk-..." type="password" value="sk-fake-key-for-demo-purposes" readOnly/>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant cursor-pointer">visibility_off</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">密钥仅保存在本地浏览器中，不会上传至我们的服务器。</p>
</div>
</div>
<div className="w-full md:w-1/3 flex flex-col justify-end">
<button 
  className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-headline-sm text-headline-sm w-full hover:bg-secondary-fixed-dim transition-colors flex items-center justify-center gap-2"
  onClick={handleStartTest}
>
<span className="material-symbols-outlined">rocket_launch</span> 开始全链路测速
</button>
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
        <div className="flex justify-between items-center mb-stack-md">
          <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">terminal</span> 实时响应流
          </h3>
          <span className="px-2 py-1 bg-secondary/20 text-secondary rounded">LIVE</span>
        </div>
        <div className="flex-1 bg-background rounded-lg p-4 font-data-mono-sm text-data-mono-sm text-on-surface overflow-y-auto border border-white/5 relative" ref={streamContainerRef}>
          <div className="streaming-text whitespace-pre-wrap">{displayedText || (hasStarted ? "" : "Waiting for API Key and test execution...")}</div>
        </div>
      </section>
</main>
  );
}

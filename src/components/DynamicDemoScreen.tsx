import { useState, useEffect, useRef } from 'react';

const realSampleText = `Welcome to the Dynamic Demonstration of Token Velocity.
As you observe this output, consider how rapidly modern LLMs can synthesize information.

\`\`\`typescript
interface TokenVelocityMetrics {
  modelId: string;
  provider: 'OpenAI' | 'Anthropic' | 'Groq' | 'Meta';
  tokensPerSecond: number;
  timeToFirstTokenMs: number;
}

function analyzePerformance(metrics: TokenVelocityMetrics): void {
  if (metrics.tokensPerSecond > 100) {
    console.log("Hyper-fast inference detected. Likely running on specialized LPU hardware like Groq.");
  } else if (metrics.tokensPerSecond > 60) {
    console.log("Standard high-end inference. Typical for GPT-4o or Claude 3.5 Sonnet.");
  }
}
\`\`\`

The visualizer interprets each word, punctuation mark, and space as discrete tokens streaming directly from the inference engine's WebSocket connection. By fine-tuning the slider below, you manipulate the virtual baud rate of this connection, directly witnessing the impact of latency on user experience.`;

export function DynamicDemoScreen() {
  const [speed, setSpeed] = useState(110);
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
    <main className="flex-1 md:ml-64 pt-24 px-container-margin pb-container-margin flex flex-col gap-stack-lg max-w-7xl mx-auto w-full">
<header>
<h1 className="font-display-lg text-display-lg md:text-display-lg text-headline-md-mobile text-on-surface">Token Velocity Visualizer (Dynamic Demo)</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">实时大语言模型生成速度监控与对比分析系统</p>
</header>
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
<div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden active-glow model-card-glow bg-surface-container-low">
<div className="flex justify-between items-center">
<span className="font-headline-sm text-headline-sm text-on-surface">GPT-4o</span>
<span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 font-data-mono-sm text-data-mono-sm rounded pulse-gpt">ACTIVE</span>
</div>
<div className="font-data-mono-lg text-data-mono-lg text-secondary">85.4 t/s</div>
<div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
<div className="h-full bg-emerald-500 w-[70%]"></div>
</div>
</div>
<div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden model-card-glow bg-surface-container-low">
<div className="flex justify-between items-center">
<span className="font-headline-sm text-headline-sm text-on-surface">Claude 3.5</span>
<span className="px-2 py-1 bg-amber-500/10 text-amber-400 font-data-mono-sm text-data-mono-sm rounded">IDLE</span>
</div>
<div className="font-data-mono-lg text-data-mono-lg text-on-surface-variant">72.1 t/s</div>
<div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
<div className="h-full bg-amber-500 w-[60%]"></div>
</div>
</div>
<div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden model-card-glow bg-surface-container-low">
<div className="flex justify-between items-center">
<span className="font-headline-sm text-headline-sm text-on-surface">Llama 3.1</span>
<span className="px-2 py-1 bg-blue-500/10 text-blue-400 font-data-mono-sm text-data-mono-sm rounded">IDLE</span>
</div>
<div className="font-data-mono-lg text-data-mono-lg text-on-surface-variant">124.8 t/s</div>
<div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
<div className="h-full bg-blue-500 w-[95%]"></div>
</div>
</div>
<div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden model-card-glow bg-surface-container-low">
<div className="flex justify-between items-center">
<span className="font-headline-sm text-headline-sm text-on-surface">Gemini 1.5</span>
<span className="px-2 py-1 bg-purple-500/10 text-purple-400 font-data-mono-sm text-data-mono-sm rounded">IDLE</span>
</div>
<div className="font-data-mono-lg text-data-mono-lg text-on-surface-variant">68.3 t/s</div>
<div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
<div className="h-full bg-purple-500 w-[55%]"></div>
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
<span className="material-symbols-outlined text-secondary">terminal</span> 流式输出可视化
</h3>
<div ref={streamContainerRef} className="flex-1 bg-background rounded-lg p-4 font-data-mono-sm text-data-mono-sm text-secondary-fixed-dim overflow-y-auto border border-white/5 relative" id="stream-container">
  <div className="streaming-text whitespace-pre-wrap">{displayedText}</div>
</div>
</section>
</main>
  );
}

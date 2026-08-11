

export function BYOKScreen() {
  return (
    <main className="flex-1 md:ml-64 pt-24 px-container-margin pb-container-margin flex flex-col gap-stack-lg">
{/*  Hero Header  */}
<header>
<h1 className="font-display-lg text-display-lg md:text-display-lg text-headline-md-mobile text-on-surface">Token Velocity Visualizer</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">实时大语言模型生成速度监控与对比分析系统</p>
</header>
{/*  Model Comparison Row  */}
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
{/*  GPT-4o  */}
<div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden active-glow model-card-glow bg-surface-container-low">
<div className="flex justify-between items-center">
<span className="font-headline-sm text-headline-sm text-on-surface">GPT-4o</span>
<span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 font-data-mono-sm text-data-mono-sm rounded pulse-gpt">ACTIVE</span>
</div>
<div className="font-data-mono-lg text-data-mono-lg text-secondary">85 t/s</div>
<div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
<div className="h-full bg-emerald-500 w-[70%]"></div>
</div>
</div>
{/*  Claude 3.5  */}
<div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden model-card-glow bg-surface-container-low">
<div className="flex justify-between items-center">
<span className="font-headline-sm text-headline-sm text-on-surface">Claude 3.5</span>
<span className="px-2 py-1 bg-amber-500/10 text-amber-400 font-data-mono-sm text-data-mono-sm rounded">IDLE</span>
</div>
<div className="font-data-mono-lg text-data-mono-lg text-on-surface-variant">72 t/s</div>
<div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
<div className="h-full bg-amber-500 w-[60%]"></div>
</div>
</div>
{/*  Llama 3  */}
<div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden model-card-glow bg-surface-container-low">
<div className="flex justify-between items-center">
<span className="font-headline-sm text-headline-sm text-on-surface">Llama 3</span>
<span className="px-2 py-1 bg-blue-500/10 text-blue-400 font-data-mono-sm text-data-mono-sm rounded">IDLE</span>
</div>
<div className="font-data-mono-lg text-data-mono-lg text-on-surface-variant">110 t/s</div>
<div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
<div className="h-full bg-blue-500 w-[90%]"></div>
</div>
</div>
{/*  Gemini 1.5  */}
<div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden model-card-glow bg-surface-container-low">
<div className="flex justify-between items-center">
<span className="font-headline-sm text-headline-sm text-on-surface">Gemini 1.5</span>
<span className="px-2 py-1 bg-purple-500/10 text-purple-400 font-data-mono-sm text-data-mono-sm rounded">IDLE</span>
</div>
<div className="font-data-mono-lg text-data-mono-lg text-on-surface-variant">65 t/s</div>
<div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
<div className="h-full bg-purple-500 w-[50%]"></div>
</div>
</div>
</section>
{/*  BYOK Configuration Panel  */}
<section className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-md">
<div className="flex items-center justify-between">
<h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary">key</span> Bring Your Own Key (BYOK) 配置
        </h3>
<span className="hidden" id="test-status"></span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
<div>
<label className="block font-body-sm text-body-sm text-on-surface-variant mb-1" htmlFor="byok-key">API Key</label>
<input className="w-full bg-surface-container-high border border-white/10 rounded-lg p-2 text-on-surface focus:outline-none focus:border-tertiary transition-colors font-data-mono-sm" id="byok-key" placeholder="sk-..." type="password"/>
</div>
<div>
<label className="block font-body-sm text-body-sm text-on-surface-variant mb-1" htmlFor="byok-url">Base URL</label>
<input className="w-full bg-surface-container-high border border-white/10 rounded-lg p-2 text-on-surface focus:outline-none focus:border-tertiary transition-colors font-data-mono-sm" id="byok-url" type="text" value="https://api.openai.com/v1"/>
</div>
<div>
<label className="block font-body-sm text-body-sm text-on-surface-variant mb-1" htmlFor="byok-model">Model ID</label>
<input className="w-full bg-surface-container-high border border-white/10 rounded-lg p-2 text-on-surface focus:outline-none focus:border-tertiary transition-colors font-data-mono-sm" id="byok-model" type="text" value="gpt-4o"/>
</div>
</div>
<div className="flex justify-between items-center mt-2">
<div className="text-error font-body-sm text-body-sm" id="byok-error"></div>
<button className="bg-tertiary text-tertiary-container px-6 py-2 rounded-lg font-headline-sm text-headline-sm transition-colors hover:bg-tertiary-fixed cursor-pointer shadow-[0_0_15px_rgba(78,222,163,0.3)]" id="btn-start-test">
            开始实时测试
        </button>
</div>
</section>
{/*  Streaming Visualizer  */}
<section className="glass-card rounded-xl p-card-padding min-h-[300px] flex flex-col">
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-md flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">terminal</span> 流式输出可视化
    </div>
<div className="flex gap-2 font-data-mono-sm">
<span className="px-2 py-1 bg-secondary/20 text-secondary rounded" id="mode-simulated">SIMULATED</span>
<span className="px-2 py-1 bg-surface-container-high text-on-surface-variant rounded opacity-50" id="mode-realtime">REAL-TIME</span>
</div>
</h3>
<div className="flex-1 bg-background rounded-lg p-4 overflow-hidden border border-white/5 relative" id="stream-container">

</div>
</section>
{/*  Custom Controls  */}
<section className="glass-card rounded-xl p-card-padding flex items-center gap-gutter">
<div className="flex-1">
<label className="block font-headline-sm text-headline-sm text-on-surface mb-2" htmlFor="speed-slider">自定义速度 (t/s): <span className="text-secondary" id="speed-value">10</span></label>
<input className="w-full accent-[#38bdf8] bg-surface-container-high rounded-lg appearance-none h-2 cursor-pointer" id="speed-slider" max="200" min="1" type="range" value="10"/>
</div>
<button className="bg-[#38bdf8] text-black px-6 py-3 rounded-lg font-headline-sm text-headline-sm mt-8 transition-colors" id="toggle-stream">暂停</button>
</section>
{/*  Data Grid  */}
<section className="glass-card rounded-xl overflow-hidden">
<div className="p-card-padding border-b border-white/10">
<h3 className="font-headline-sm text-headline-sm text-on-surface">历史吞吐量数据</h3>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low font-data-mono-sm text-data-mono-sm text-on-surface-variant">
<th className="p-4 border-b border-white/5">时间戳</th>
<th className="p-4 border-b border-white/5">模型</th>
<th className="p-4 border-b border-white/5">平均速度 (t/s)</th>
<th className="p-4 border-b border-white/5">峰值 (t/s)</th>
<th className="p-4 border-b border-white/5">状态</th>
</tr>
</thead>
<tbody className="font-data-mono-sm text-data-mono-sm text-on-surface">
<tr className="hover:bg-white/5 transition-colors">
<td className="p-4 border-b border-white/5">2026-08-11 14:30:00</td>
<td className="p-4 border-b border-white/5">GPT-4o</td>
<td className="p-4 border-b border-white/5 text-secondary">84.2</td>
<td className="p-4 border-b border-white/5">91.5</td>
<td className="p-4 border-b border-white/5"><span className="text-emerald-400">稳定</span></td>
</tr>
<tr className="hover:bg-white/5 transition-colors">
<td className="p-4 border-b border-white/5">2026-08-11 14:25:00</td>
<td className="p-4 border-b border-white/5">Claude 3.5</td>
<td className="p-4 border-b border-white/5 text-secondary">71.8</td>
<td className="p-4 border-b border-white/5">75.0</td>
<td className="p-4 border-b border-white/5"><span className="text-emerald-400">稳定</span></td>
</tr>
</tbody>
</table>
</div>
</section>
</main>
  );
}

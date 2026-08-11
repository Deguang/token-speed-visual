import { useState } from 'react';

// Main App Component that matches the layout of Token Velocity Visualizer
function App() {
  const [speed, setSpeed] = useState(10);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="antialiased min-h-screen flex flex-col relative overflow-x-hidden">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-container-margin py-4 bg-background/80 backdrop-blur-xl border-b border-white/10 hidden md:flex">
        <div className="flex items-center gap-gutter">
          <span className="font-display-lg text-[24px] md:text-[32px] font-bold tracking-tighter text-on-surface">VELOCITY.IO</span>
        </div>
        <div className="flex items-center gap-stack-lg">
          <a className="font-headline-sm text-headline-sm text-on-primary-container hover:text-secondary-fixed-dim transition-colors" href="#">Benchmarks</a>
          <a className="font-headline-sm text-headline-sm text-on-primary-container hover:text-secondary-fixed-dim transition-colors" href="#">Models</a>
          <a className="font-headline-sm text-headline-sm text-on-primary-container hover:text-secondary-fixed-dim transition-colors" href="#">Research</a>
          <a className="font-headline-sm text-headline-sm text-secondary border-b-2 border-secondary pb-1 scale-95 duration-100" href="#">Leaderboard</a>
        </div>
        <div className="flex items-center gap-gutter">
          <button className="bg-[#38bdf8] text-black px-4 py-2 rounded-lg font-headline-sm text-headline-sm">Live</button>
          <span className="material-symbols-outlined text-on-primary-container cursor-pointer hover:text-on-surface">settings</span>
          <span className="material-symbols-outlined text-on-primary-container cursor-pointer hover:text-on-surface">help</span>
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-16 h-full w-64 flex-col p-stack-md bg-surface-container-lowest/50 backdrop-blur-2xl border-r border-white/5 hidden md:flex z-40">
        <div className="mb-stack-lg mt-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Metrics</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Real-time technical clarity</p>
        </div>
        <button className="bg-surface-variant text-on-surface py-2 rounded-lg mb-stack-lg border border-white/10 hover:bg-white/5 font-body-md text-body-md w-full">New Simulation</button>
        <nav className="flex-1 space-y-unit">
          <a className="flex items-center gap-stack-sm p-3 font-body-md text-body-md text-on-surface-variant hover:bg-white/5 rounded-lg transition-all duration-300" href="#">
            <span className="material-symbols-outlined">dashboard</span> 概览
          </a>
          <a className="flex items-center gap-stack-sm p-3 font-body-md text-body-md text-tertiary font-bold bg-tertiary/10 rounded-xl transition-all duration-300" href="#">
            <span className="material-symbols-outlined">speed</span> 吞吐量
          </a>
          <a className="flex items-center gap-stack-sm p-3 font-body-md text-body-md text-on-surface-variant hover:bg-white/5 rounded-lg transition-all duration-300" href="#">
            <span className="material-symbols-outlined">timer</span> 延迟
          </a>
          <a className="flex items-center gap-stack-sm p-3 font-body-md text-body-md text-on-surface-variant hover:bg-white/5 rounded-lg transition-all duration-300" href="#">
            <span className="material-symbols-outlined">payments</span> 经济学
          </a>
        </nav>
        <div className="mt-auto space-y-unit pt-stack-md border-t border-white/5 mb-16">
          <a className="flex items-center gap-stack-sm p-3 font-body-md text-body-md text-on-surface-variant hover:bg-white/5 rounded-lg transition-all duration-300" href="#">
            <span className="material-symbols-outlined">settings</span> 设置
          </a>
          <a className="flex items-center gap-stack-sm p-3 font-body-md text-body-md text-on-surface-variant hover:bg-white/5 rounded-lg transition-all duration-300" href="#">
            <span className="material-symbols-outlined">description</span> 文档
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-24 px-container-margin pb-container-margin flex flex-col gap-stack-lg">
        {/* Hero Header */}
        <header>
          <h1 className="font-display-lg text-display-lg md:text-display-lg text-headline-md-mobile text-on-surface">Token Velocity Visualizer</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">实时大语言模型生成速度监控与对比分析系统</p>
        </header>

        {/* Model Comparison Row */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* GPT-4o */}
          <div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden active-glow">
            <div className="flex justify-between items-center">
              <span className="font-headline-sm text-headline-sm text-on-surface">GPT-4o</span>
              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 font-data-mono-sm text-data-mono-sm rounded pulse-gpt">ACTIVE</span>
            </div>
            <div className="font-data-mono-lg text-data-mono-lg text-secondary">85 t/s</div>
            <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
              <div className="h-full bg-emerald-500 w-[70%]"></div>
            </div>
          </div>
          {/* Claude 3.5 */}
          <div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden">
            <div className="flex justify-between items-center">
              <span className="font-headline-sm text-headline-sm text-on-surface">Claude 3.5</span>
              <span className="px-2 py-1 bg-amber-500/10 text-amber-400 font-data-mono-sm text-data-mono-sm rounded">IDLE</span>
            </div>
            <div className="font-data-mono-lg text-data-mono-lg text-on-surface-variant">72 t/s</div>
            <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
              <div className="h-full bg-amber-500 w-[60%]"></div>
            </div>
          </div>
          {/* Llama 3 */}
          <div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden">
            <div className="flex justify-between items-center">
              <span className="font-headline-sm text-headline-sm text-on-surface">Llama 3</span>
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 font-data-mono-sm text-data-mono-sm rounded">IDLE</span>
            </div>
            <div className="font-data-mono-lg text-data-mono-lg text-on-surface-variant">110 t/s</div>
            <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-2">
              <div className="h-full bg-blue-500 w-[90%]"></div>
            </div>
          </div>
          {/* Gemini 1.5 */}
          <div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-sm relative overflow-hidden">
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

        {/* Streaming Visualizer */}
        <section className="glass-card rounded-xl p-card-padding min-h-[300px] flex flex-col">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-stack-md flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">terminal</span> 流式输出可视化
          </h3>
          <div className="flex-1 bg-background rounded-lg p-4 font-data-mono-sm text-data-mono-sm text-secondary-fixed-dim overflow-y-auto border border-white/5 relative">
            <div className="streaming-text whitespace-pre-wrap">正在初始化数据流... (Speed: {speed} t/s)</div>
          </div>
        </section>

        {/* Custom Controls */}
        <section className="glass-card rounded-xl p-card-padding flex items-center gap-gutter flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block font-headline-sm text-headline-sm text-on-surface mb-2" htmlFor="speed-slider">自定义速度 (t/s): <span className="text-secondary">{speed}</span></label>
            <input 
              className="w-full accent-[#38bdf8] bg-surface-container-high rounded-lg appearance-none h-2" 
              id="speed-slider" 
              max="200" 
              min="1" 
              type="range" 
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </div>
          <button 
            className={isPlaying ? 'bg-[#38bdf8] text-black px-6 py-3 rounded-lg font-headline-sm text-headline-sm mt-8' : 'bg-surface-variant text-on-surface border border-white/10 px-6 py-3 rounded-lg font-headline-sm text-headline-sm mt-8'}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? 'Pause' : 'Resume'}
          </button>
        </section>

        {/* Data Grid */}
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
                  <td className="p-4 border-b border-white/5">2024-05-20 14:30:00</td>
                  <td className="p-4 border-b border-white/5">GPT-4o</td>
                  <td className="p-4 border-b border-white/5 text-secondary">84.2</td>
                  <td className="p-4 border-b border-white/5">91.5</td>
                  <td className="p-4 border-b border-white/5"><span className="text-emerald-400">Stable</span></td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-4 border-b border-white/5">2024-05-20 14:25:00</td>
                  <td className="p-4 border-b border-white/5">Claude 3.5</td>
                  <td className="p-4 border-b border-white/5 text-secondary">71.8</td>
                  <td className="p-4 border-b border-white/5">75.0</td>
                  <td className="p-4 border-b border-white/5"><span className="text-emerald-400">Stable</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-gutter px-container-margin flex flex-wrap justify-between items-center bg-surface-container-lowest border-t border-white/10 z-50 relative">
        <span className="font-data-mono-sm text-data-mono-sm text-on-surface">© 2024 VELOCITY LLM INFRA. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-gutter font-data-mono-sm text-data-mono-sm text-on-primary-container">
          <a className="hover:text-on-surface" href="#">Methodology</a>
          <a className="hover:text-on-surface" href="#">Documentation</a>
          <a className="hover:text-on-surface" href="#">API Docs</a>
          <a className="hover:text-on-surface" href="#">Privacy</a>
        </div>
      </footer>
    </div>
  );
}

export default App;

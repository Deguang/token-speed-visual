import { useState } from 'react';
import { DashboardScreen } from './components/DashboardScreen';
import { BYOKScreen } from './components/BYOKScreen';
import { DynamicDemoScreen } from './components/DynamicDemoScreen';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="antialiased min-h-screen flex flex-col relative overflow-x-hidden">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-container-margin py-4 bg-background/80 backdrop-blur-xl border-b border-white/10 hidden md:flex">
        <div className="flex items-center gap-gutter">
          <span className="font-display-lg text-[24px] md:text-[32px] font-bold tracking-tighter text-on-surface">VELOCITY.IO</span>
        </div>
        <div className="flex items-center gap-stack-lg">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`font-headline-sm text-headline-sm transition-colors ${activeTab === 'dashboard' ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-on-primary-container hover:text-secondary-fixed-dim'}`}
          >Dashboard</button>
          <button 
            onClick={() => setActiveTab('byok')} 
            className={`font-headline-sm text-headline-sm transition-colors ${activeTab === 'byok' ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-on-primary-container hover:text-secondary-fixed-dim'}`}
          >BYOK Benchmarks</button>
          <button 
            onClick={() => setActiveTab('demo')} 
            className={`font-headline-sm text-headline-sm transition-colors ${activeTab === 'demo' ? 'text-secondary border-b-2 border-secondary pb-1' : 'text-on-primary-container hover:text-secondary-fixed-dim'}`}
          >Dynamic Demo</button>
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
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-stack-sm p-3 font-body-md text-body-md w-full text-left rounded-lg transition-all duration-300 ${activeTab === 'dashboard' ? 'text-tertiary font-bold bg-tertiary/10' : 'text-on-surface-variant hover:bg-white/5'}`}>
            <span className="material-symbols-outlined">dashboard</span> 概览
          </button>
          <button onClick={() => setActiveTab('byok')} className={`flex items-center gap-stack-sm p-3 font-body-md text-body-md w-full text-left rounded-lg transition-all duration-300 ${activeTab === 'byok' ? 'text-tertiary font-bold bg-tertiary/10' : 'text-on-surface-variant hover:bg-white/5'}`}>
            <span className="material-symbols-outlined">speed</span> BYOK 测速
          </button>
          <button onClick={() => setActiveTab('demo')} className={`flex items-center gap-stack-sm p-3 font-body-md text-body-md w-full text-left rounded-lg transition-all duration-300 ${activeTab === 'demo' ? 'text-tertiary font-bold bg-tertiary/10' : 'text-on-surface-variant hover:bg-white/5'}`}>
            <span className="material-symbols-outlined">play_circle</span> 动态演示
          </button>
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

      {/* Dynamic Content */}
      {activeTab === 'dashboard' && <DashboardScreen />}
      {activeTab === 'byok' && <BYOKScreen />}
      {activeTab === 'demo' && <DynamicDemoScreen />}

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

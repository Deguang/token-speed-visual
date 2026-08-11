import { useState } from 'react';
import { DashboardScreen } from './components/DashboardScreen';
import { BYOKScreen } from './components/BYOKScreen';
import { ResearchScreen } from './components/ResearchScreen';
import { ModelsScreen } from './components/ModelsScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [routePayload, setRoutePayload] = useState<any>(null);

  const navigate = (tab: string, payload?: any) => {
    setActiveTab(tab);
    if (payload) setRoutePayload(payload);
  };

  return (
    <div className="antialiased min-h-screen flex flex-col relative overflow-x-hidden">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-container-margin py-4 bg-background/80 backdrop-blur-xl border-b border-white/10 hidden md:flex">
        <div className="flex items-center gap-gutter">
          <span className="font-display-lg text-[24px] md:text-[32px] font-bold tracking-tighter text-on-surface">VELOCITY.IO</span>
        </div>
        <div className="flex items-center gap-stack-lg">
          <button 
            onClick={() => setActiveTab('models')} 
            className={`font-headline-sm text-headline-sm transition-colors ${activeTab === 'models' ? 'text-secondary border-b-2 border-secondary pb-1 scale-95 duration-100' : 'text-on-primary-container hover:text-secondary-fixed-dim'}`}
          >Models</button>
          <button 
            onClick={() => setActiveTab('research')} 
            className={`font-headline-sm text-headline-sm transition-colors ${activeTab === 'research' ? 'text-secondary border-b-2 border-secondary pb-1 scale-95 duration-100' : 'text-on-primary-container hover:text-secondary-fixed-dim'}`}
          >Research</button>
          <button 
            onClick={() => setActiveTab('leaderboard')} 
            className={`font-headline-sm text-headline-sm transition-colors ${activeTab === 'leaderboard' ? 'text-secondary border-b-2 border-secondary pb-1 scale-95 duration-100' : 'text-on-primary-container hover:text-secondary-fixed-dim'}`}
          >Leaderboard</button>
        </div>
        <div className="flex items-center gap-gutter">
          <div className="bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] px-3 py-1.5 rounded-lg font-headline-sm text-headline-sm flex items-center gap-2 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#38bdf8]"></span>
            </span>
            System Live
          </div>
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-16 h-full w-64 flex-col p-stack-md bg-surface-container-lowest/50 backdrop-blur-2xl border-r border-white/5 hidden md:flex z-40">
        <div className="mb-stack-lg mt-4">
          <h2 className="font-headline-md text-headline-md text-on-surface">Metrics</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Real-time technical clarity</p>
        </div>
        <button 
          onClick={() => navigate('byok')}
          className="bg-secondary text-on-secondary py-2 rounded-lg mb-stack-lg border border-white/10 hover:bg-secondary-fixed-dim transition-colors font-headline-sm text-headline-sm w-full shadow-[0_0_15px_rgba(56,189,248,0.2)] flex justify-center items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">add</span> New Simulation
        </button>
        <nav className="flex-1 space-y-unit">
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-stack-sm p-3 font-body-md text-body-md w-full text-left rounded-lg transition-all duration-300 ${activeTab === 'dashboard' ? 'text-tertiary font-bold bg-tertiary/10' : 'text-on-surface-variant hover:bg-white/5'}`}>
            <span className="material-symbols-outlined">dashboard</span> 概览
          </button>
          <button onClick={() => setActiveTab('byok')} className={`flex items-center gap-stack-sm p-3 font-body-md text-body-md w-full text-left rounded-lg transition-all duration-300 ${activeTab === 'byok' ? 'text-tertiary font-bold bg-tertiary/10' : 'text-on-surface-variant hover:bg-white/5'}`}>
            <span className="material-symbols-outlined">speed</span> BYOK 测速
          </button>
        </nav>
        <div className="mt-auto space-y-unit pt-stack-md border-white/5 mb-16">
          {/* Settings and Documentation hidden for now */}
        </div>
      </aside>

      {/* Dynamic Content */}
      {activeTab === 'dashboard' && <DashboardScreen navigate={navigate} />}
      {activeTab === 'byok' && <BYOKScreen routePayload={routePayload} />}
      {activeTab === 'research' && <ResearchScreen />}
      {activeTab === 'models' && <ModelsScreen navigate={navigate} />}
      {activeTab === 'leaderboard' && <LeaderboardScreen />}

      {/* Footer */}
      <footer className="w-full py-gutter px-container-margin flex flex-wrap justify-between items-center bg-surface-container-lowest border-t border-white/10 z-50 relative">
        <span className="font-data-mono-sm text-data-mono-sm text-on-surface">© 2026 VELOCITY LLM INFRA. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-gutter font-data-mono-sm text-data-mono-sm text-on-primary-container">
          <a className="hover:text-on-surface" href="#">Methodology</a>
          <a className="hover:text-on-surface" href="#">Privacy</a>
        </div>
      </footer>
    </div>
  );
}

export default App;

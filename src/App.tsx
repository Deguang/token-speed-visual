import { useState, lazy, Suspense } from 'react';

const DashboardScreen = lazy(() => import('./components/DashboardScreen').then(module => ({ default: module.DashboardScreen })));
const BYOKScreen = lazy(() => import('./components/BYOKScreen').then(module => ({ default: module.BYOKScreen })));
const ResearchScreen = lazy(() => import('./components/ResearchScreen').then(module => ({ default: module.ResearchScreen })));
const ModelsScreen = lazy(() => import('./components/ModelsScreen').then(module => ({ default: module.ModelsScreen })));
const LeaderboardScreen = lazy(() => import('./components/LeaderboardScreen').then(module => ({ default: module.LeaderboardScreen })));
const PrivacyScreen = lazy(() => import('./components/PrivacyScreen').then(module => ({ default: module.PrivacyScreen })));

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [routePayload, setRoutePayload] = useState<any>(null);

  const navigate = (tab: string, payload?: any) => {
    setActiveTab(tab);
    if (payload) setRoutePayload(payload);
  };

  return (
    <div className="antialiased min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Floating Bespoke Navigation */}
      <header className="fixed top-0 w-full z-50 px-container-margin py-6 flex justify-between items-center pointer-events-none hidden md:flex">
        {/* Brand */}
        <div className="flex items-center gap-3 pointer-events-auto group cursor-pointer">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-black border border-white/10 shadow-2xl transition-transform group-hover:scale-105">
            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="tokenSpeed Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display-lg text-[24px] font-bold tracking-tighter text-on-surface">token<span className="text-secondary opacity-80">Speed</span></span>
        </div>

        {/* Center Pill Nav */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 p-1.5 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl pointer-events-auto">
          {[
            { id: 'dashboard', label: 'Telemetry' },
            { id: 'leaderboard', label: 'Leaderboard' },
            { id: 'research', label: 'Research' },
            { id: 'models', label: 'Models' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full font-headline-sm text-headline-sm transition-all duration-300 ${activeTab === tab.id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 text-white/50 font-headline-sm text-[13px] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            System Live
          </div>
          <button 
            onClick={() => navigate('byok')}
            className="px-5 py-2 bg-white text-black rounded-full font-headline-sm text-[14px] font-semibold hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-2"
          >
            New Simulation
          </button>
        </div>
      </header>

      {/* Main Content Area - No Sidebar Offset */}
      <main className="flex-1 w-full max-w-7xl mx-auto pt-24 md:pt-32 pb-32 px-container-margin relative z-10">
        <Suspense fallback={<div className="flex-1 pt-24 flex items-center justify-center h-full min-h-[50vh]"><div className="font-data-mono-sm text-secondary animate-pulse flex items-center gap-2"><span className="material-symbols-outlined animate-spin">sync</span> Loading interface modules...</div></div>}>
        {activeTab === 'dashboard' && <DashboardScreen navigate={navigate} />}
        {activeTab === 'byok' && <BYOKScreen routePayload={routePayload} />}
        {activeTab === 'research' && <ResearchScreen />}
        {activeTab === 'models' && <ModelsScreen navigate={navigate} />}
        {activeTab === 'leaderboard' && <LeaderboardScreen />}
        {activeTab === 'privacy' && <PrivacyScreen />}
      </Suspense>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container/90 backdrop-blur-md border-t border-white/10 z-50 flex justify-around items-center p-2 pb-safe">
        {[
          { id: 'dashboard', icon: 'dashboard', label: '概览' },
          { id: 'byok', icon: 'speed', label: 'BYOK' },
          { id: 'models', icon: 'memory', label: '模型' },
          { id: 'leaderboard', icon: 'emoji_events', label: '榜单' },
          { id: 'research', icon: 'science', label: '研究' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === tab.id ? 'text-secondary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
            <span className="text-[10px] mt-1 font-body-sm">{tab.label}</span>
          </button>
        ))}
      </nav>
      </main>

      {/* Footer */}
      <footer className="w-full py-gutter px-container-margin flex flex-wrap justify-between items-center bg-surface-container-lowest border-t border-white/10 z-50 relative md:block hidden">
        <span className="font-data-mono-sm text-data-mono-sm text-on-surface">© 2026 tokenSpeed. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-gutter font-data-mono-sm text-data-mono-sm text-on-primary-container">
          <button onClick={() => navigate('privacy')} className="hover:text-on-surface transition-colors cursor-pointer">Methodology</button>
          <button onClick={() => navigate('privacy')} className="hover:text-on-surface transition-colors cursor-pointer">Privacy</button>
          <button onClick={() => navigate('privacy')} className="hover:text-on-surface transition-colors cursor-pointer">Terms</button>
        </div>
      </footer>
    </div>
  );
}

export default App;

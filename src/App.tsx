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
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-container-margin py-4 bg-background/80 backdrop-blur-xl border-b border-white/10 hidden md:flex">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-[#0B1120] border border-white/10 shadow-lg">
            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="tokenSpeed Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display-lg text-[24px] md:text-[32px] font-bold tracking-tighter text-on-surface">token<span className="text-secondary">Speed</span></span>
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
          <div className="bg-[#38bdf8]/10 text-[#38bdf8] px-3 py-1.5 rounded-lg font-headline-sm text-headline-sm flex items-center gap-2">
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
          className="bg-secondary text-on-secondary py-2 rounded-lg mb-stack-lg border border-white/10 hover:bg-secondary-fixed-dim transition-colors font-headline-sm text-headline-sm w-full shadow-lg flex justify-center items-center gap-2"
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
      <Suspense fallback={<div className="flex-1 md:ml-64 pt-24 flex items-center justify-center h-full min-h-[50vh]"><div className="font-data-mono-sm text-secondary animate-pulse flex items-center gap-2"><span className="material-symbols-outlined animate-spin">sync</span> Loading interface modules...</div></div>}>
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

import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  icon: string;
  efficiencyScore: number;
  tps: number;
  latencyMs: number;
  cost: string;
  tier: string;
  tierColor: string;
  trend: string;
}

export function LeaderboardScreen() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'realtime' | 'official'>('realtime');

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + `data/leaderboard.json?t=${Date.now()}`)
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load leaderboard:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex-1 md:ml-64 pt-24 flex flex-col h-full overflow-y-auto relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-container/40 via-background to-background max-w-7xl mx-auto w-full">
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 mix-blend-screen">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-tertiary/10 blur-[150px]"></div>
      </div>
      <div className="px-container-margin py-stack-lg max-w-7xl mx-auto w-full z-10 flex-1 flex flex-col">
        <header className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-2 tracking-tight">Global Leaderboard</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              {dataSource === 'realtime' 
                ? <><span className="text-secondary font-semibold">Real-time ranking</span> based on the Efficiency Score (weighted composite of speed, latency, and cost).</>
                : <><span className="text-on-surface font-semibold">Official benchmarks</span> sorted strictly by raw inference speed (Tokens per second).</>
              }
            </p>
          </div>
          <div className="flex bg-surface-container-highest/50 p-1 rounded-xl border border-outline-variant backdrop-blur-md self-start md:self-auto">
            <button 
              onClick={() => setDataSource('realtime')}
              className={`px-4 py-2 rounded-lg font-body-sm text-body-sm transition-colors flex items-center gap-2 ${dataSource === 'realtime' ? 'bg-surface border border-outline text-on-surface shadow-[0_2px_10px_rgba(0,0,0,0.2)]' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              {dataSource === 'realtime' && <span className="w-2 h-2 rounded-full bg-tertiary glow-pulse"></span>}
              Real-time (Live User Data)
            </button>
            <button 
              onClick={() => setDataSource('official')}
              className={`px-4 py-2 rounded-lg font-body-sm text-body-sm transition-colors ${dataSource === 'official' ? 'bg-surface border border-outline text-on-surface shadow-[0_2px_10px_rgba(0,0,0,0.2)]' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Official Benchmarks
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
          <div className="glass-panel p-card-padding rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-transparent opacity-50"></div>
            <h3 className="font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase mb-1">Current Leader</h3>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md text-on-surface">GPT-4o</span>
              <span className="font-body-sm text-body-sm text-tertiary flex items-center"><span className="material-symbols-outlined" style={{"fontSize":"16px"}}>trending_up</span> Maintains #1</span>
            </div>
          </div>
          <div className="glass-panel p-card-padding rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tertiary to-transparent opacity-50"></div>
            <h3 className="font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase mb-1">Global Avg Velocity</h3>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md text-on-surface">84.2</span>
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">tok/s</span>
            </div>
          </div>
          <div className="glass-panel p-card-padding rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50"></div>
            <h3 className="font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase mb-1">Active Models Tracked</h3>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md text-on-surface">142</span>
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">Live</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl border-t border-white/10 overflow-hidden flex-1 flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/50 bg-surface-container-low/50">
                  <th className="py-4 px-6 font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase font-medium w-24">Rank</th>
                  <th className="py-4 px-6 font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase font-medium">Model Identity</th>
                  <th className="py-4 px-6 font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase font-medium text-right">Efficiency Score</th>
                  <th className="py-4 px-6 font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase font-medium text-right">Tokens/s</th>
                  <th className="py-4 px-6 font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase font-medium text-right">Latency (ms)</th>
                  <th className="py-4 px-6 font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase font-medium text-right">Cost ($/1M)</th>
                  <th className="py-4 px-6 font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase font-medium text-center">Tier</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md divide-y divide-outline-variant/30">
                {loading ? (
                  <tr><td colSpan={7} className="py-4 px-6 text-center text-on-surface-variant font-data-mono-sm">Loading dynamic leaderboard data...</td></tr>
                ) : (
                  [...data].sort((a, b) => dataSource === 'realtime' ? b.efficiencyScore - a.efficiencyScore : b.tps - a.tps)
                    .map((item, idx) => ({ ...item, rank: idx + 1 }))
                    .map((row, idx) => (
                    <tr key={row.id} className={`hover:bg-surface-container-highest/30 transition-colors group animate-fade-in stagger-${Math.min(idx + 1, 6)}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`font-data-mono-lg text-data-mono-lg ${row.rank === 1 ? 'text-secondary' : 'text-on-surface'}`}>0{row.rank}</span>
                          <span className={`material-symbols-outlined ${row.trend === 'trending_up' ? 'text-tertiary' : row.trend === 'trending_down' ? 'text-error' : 'text-outline-variant'}`} style={{"fontSize":"16px"}}>{row.trend}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant">
                            <span className="material-symbols-outlined text-on-surface-variant" style={{"fontSize":"18px"}}>{row.icon}</span>
                          </div>
                          <span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">{row.name}</span>
                        </div>
                      </td>
                      <td className={`py-4 px-6 text-right font-data-mono-lg text-data-mono-lg ${row.rank === 1 ? 'text-secondary' : 'text-on-surface'}`}>{row.efficiencyScore.toFixed(1)}</td>
                      <td className={`py-4 px-6 text-right font-data-mono-sm text-data-mono-sm ${row.tps > 200 ? 'text-tertiary' : 'text-on-surface'}`}>{row.tps.toFixed(1)}</td>
                      <td className="py-4 px-6 text-right font-data-mono-sm text-data-mono-sm text-on-surface">{row.latencyMs}</td>
                      <td className="py-4 px-6 text-right font-data-mono-sm text-data-mono-sm text-on-surface-variant">{row.cost}</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-2 py-1 rounded bg-${row.tierColor}/10 border border-${row.tierColor}/30 font-data-mono-sm text-data-mono-sm text-${row.tierColor} uppercase tracking-widest`}>{row.tier}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

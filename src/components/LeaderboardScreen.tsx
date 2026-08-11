
export function LeaderboardScreen() {
  return (
    <main className="flex-1 md:ml-64 flex flex-col h-full overflow-y-auto relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-container/40 via-background to-background">
{/*  Atmospheric Background Effect  */}
<div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 mix-blend-screen">
<div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px]"></div>
<div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-tertiary/10 blur-[150px]"></div>
</div>
<div className="px-container-margin py-stack-lg max-w-7xl mx-auto w-full z-10 flex-1 flex flex-col">
{/*  Page Header & Controls  */}
<header className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-stack-md">
<div>
<h1 className="font-display-lg text-display-lg text-on-surface mb-2 tracking-tight">Global Leaderboard</h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                            Real-time ranking based on the <span className="text-secondary font-semibold">Efficiency Score</span> (a weighted composite of inference speed, latency, and cost per million tokens).
                        </p>
</div>
{/*  Tabs  */}
<div className="flex bg-surface-container-highest/50 p-1 rounded-xl border border-outline-variant backdrop-blur-md self-start md:self-auto">
<button className="px-4 py-2 rounded-lg bg-surface border border-outline text-on-surface font-body-sm text-body-sm shadow-[0_2px_10px_rgba(0,0,0,0.2)] flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-tertiary glow-pulse"></span>
                            Real-time (Live User Data)
                        </button>
<button className="px-4 py-2 rounded-lg text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors">
                            Official Benchmarks
                        </button>
</div>
</header>
{/*  Top Stats Bento  */}
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
{/*  Main Leaderboard Table  */}
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
{/*  Row 1  */}
<tr className="hover:bg-surface-container-highest/30 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-2">
<span className="font-data-mono-lg text-data-mono-lg text-secondary">01</span>
<span className="material-symbols-outlined text-outline-variant" style={{"fontSize":"16px"}}>horizontal_rule</span>
</div>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant">
<span className="material-symbols-outlined text-on-surface-variant" style={{"fontSize":"18px"}}>smart_toy</span>
</div>
<span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">GPT-4o</span>
</div>
</td>
<td className="py-4 px-6 text-right font-data-mono-lg text-data-mono-lg text-secondary">98.4</td>
<td className="py-4 px-6 text-right font-data-mono-sm text-data-mono-sm text-on-surface">115.2</td>
<td className="py-4 px-6 text-right font-data-mono-sm text-data-mono-sm text-on-surface">240</td>
<td className="py-4 px-6 text-right font-data-mono-sm text-data-mono-sm text-on-surface-variant">$5.00</td>
<td className="py-4 px-6 text-center">
<span className="inline-block px-2 py-1 rounded bg-secondary/10 border border-secondary/30 font-data-mono-sm text-data-mono-sm text-secondary uppercase tracking-widest">Elite</span>
</td>
</tr>
{/*  Row 2  */}
<tr className="hover:bg-surface-container-highest/30 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-2">
<span className="font-data-mono-lg text-data-mono-lg text-on-surface">02</span>
<span className="material-symbols-outlined text-tertiary" style={{"fontSize":"16px"}}>trending_up</span>
</div>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant">
<span className="material-symbols-outlined text-on-surface-variant" style={{"fontSize":"18px"}}>psychology</span>
</div>
<span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">Claude 3.5 Sonnet</span>
</div>
</td>
<td className="py-4 px-6 text-right font-data-mono-lg text-data-mono-lg text-on-surface">97.8</td>
<td className="py-4 px-6 text-right font-data-mono-sm text-data-mono-sm text-on-surface">110.5</td>
<td className="py-4 px-6 text-right font-data-mono-sm text-data-mono-sm text-on-surface">265</td>
<td className="py-4 px-6 text-right font-data-mono-sm text-data-mono-sm text-on-surface-variant">$3.00</td>
<td className="py-4 px-6 text-center">
<span className="inline-block px-2 py-1 rounded bg-secondary/10 border border-secondary/30 font-data-mono-sm text-data-mono-sm text-secondary uppercase tracking-widest">Elite</span>
</td>
</tr>
{/*  Row 3  */}
<tr className="hover:bg-surface-container-highest/30 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-2">
<span className="font-data-mono-lg text-data-mono-lg text-on-surface">03</span>
<span className="material-symbols-outlined text-error" style={{"fontSize":"16px"}}>trending_down</span>
</div>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant">
<span className="material-symbols-outlined text-on-surface-variant" style={{"fontSize":"18px"}}>hub</span>
</div>
<span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">Llama 3 70B (Groq)</span>
</div>
</td>
<td className="py-4 px-6 text-right font-data-mono-lg text-data-mono-lg text-on-surface">94.2</td>
<td className="py-4 px-6 text-right font-data-mono-sm text-data-mono-sm text-tertiary">320.0</td>
<td className="py-4 px-6 text-right font-data-mono-sm text-data-mono-sm text-on-surface">180</td>
<td className="py-4 px-6 text-right font-data-mono-sm text-data-mono-sm text-on-surface-variant">$0.64</td>
<td className="py-4 px-6 text-center">
<span className="inline-block px-2 py-1 rounded bg-primary/10 border border-primary/30 font-data-mono-sm text-data-mono-sm text-primary uppercase tracking-widest">High</span>
</td>
</tr>
{/*  Row 4  */}
<tr className="hover:bg-surface-container-highest/30 transition-colors group">
<td className="py-4 px-6">
<div className="flex items-center gap-2">
<span className="font-data-mono-lg text-data-mono-lg text-on-surface">04</span>
<span className="material-symbols-outlined text-tertiary" style={{"fontSize":"16px"}}>trending_up</span>
</div>
</td>
<td className="py-4 px-6">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center border border-outline-variant">
<span className="material-symbols-outlined text-on-surface-variant" style={{"fontSize":"18px"}}>neurology</span>
</div>
<span className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">Gemini 1.5 Pro</span>
</div>
</td>
<td className="py-4 px-6 text-right font-data-mono-lg text-data-mono-lg text-on-surface">91.5</td>
<td className="py-4 px-6 text-right font-data-mono-sm text-data-mono-sm text-on-surface">85.4</td>
<td className="py-4 px-6 text-right font-data-mono-sm text-data-mono-sm text-on-surface">310</td>
<td className="py-4 px-6 text-right font-data-mono-sm text-data-mono-sm text-on-surface-variant">$7.00</td>
<td className="py-4 px-6 text-center">
<span className="inline-block px-2 py-1 rounded bg-primary/10 border border-primary/30 font-data-mono-sm text-data-mono-sm text-primary uppercase tracking-widest">High</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
{/*  Footer  */}
<footer className="bg-surface-container-lowest border-t border-outline-variant w-full mt-auto flex flex-col md:flex-row justify-between items-center px-container-margin py-stack-lg z-10 relative">
<div className="font-headline-sm text-headline-sm text-on-surface mb-4 md:mb-0">
<span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">© 2026 Velocity.io LLM Infrastructure</span>
</div>
<div className="flex flex-wrap justify-center gap-gutter">
<a className="font-data-mono-sm text-data-mono-sm text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Privacy Policy</a>
<a className="font-data-mono-sm text-data-mono-sm text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Terms of Service</a>
<a className="font-data-mono-sm text-data-mono-sm text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">API Docs</a>
<a className="font-data-mono-sm text-data-mono-sm text-on-surface-variant hover:text-secondary transition-colors duration-200 flex items-center gap-1" href="#">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Status
                    </a>
</div>
</footer>
</main>
  );
}

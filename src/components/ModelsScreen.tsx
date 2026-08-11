export function ModelsScreen() {
  return (
    <main className="flex-1 md:ml-64 p-container-margin md:p-stack-lg">
<div className="mb-stack-lg">
<h1 className="font-display-lg text-display-lg text-on-surface mb-stack-sm">Model Library (Updated Aug 2026)</h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-stack-md">Explore and compare specifications across major Large Language Models available in 2026.</p>
<div className="flex flex-col md:flex-row gap-stack-md bg-surface-container/50 p-stack-sm rounded-lg border border-white/5 backdrop-blur-sm">
<div className="relative flex-1">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full bg-surface-container border border-outline-variant rounded pl-10 pr-4 py-2 text-on-surface placeholder:text-on-surface-variant focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors" placeholder="Search models (e.g. GPT-4o, Claude 3.5)" type="text"/>
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-md">
<div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-md hover:border-secondary/50 transition-colors group relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="flex justify-between items-start z-10">
<div>
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-secondary transition-colors">GPT-4o</h3>
<span className="font-body-sm text-body-sm text-on-surface-variant">OpenAI</span>
</div>
<span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded font-data-mono-sm text-data-mono-sm uppercase tracking-wider">Omni</span>
</div>
<div className="grid grid-cols-2 gap-stack-sm z-10 mt-auto">
<div className="flex flex-col">
<span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase">Context</span>
<span className="font-data-mono-lg text-data-mono-lg text-on-surface">128k</span>
</div>
<div className="flex flex-col">
<span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase">Params</span>
<span className="font-data-mono-lg text-data-mono-lg text-on-surface">Undisclosed</span>
</div>
<div className="flex flex-col col-span-2 mt-stack-sm pt-stack-sm border-t border-white/5">
<span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase">Release</span>
<span className="font-body-sm text-body-sm text-on-surface">May 2024</span>
</div>
</div>
</div>
<div className="glass-card active-glow rounded-xl p-card-padding flex flex-col gap-stack-md border-secondary/30 relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent"></div>
<div className="flex justify-between items-start z-10">
<div>
<div className="flex items-center gap-2">
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-secondary transition-colors">Claude 3.5 Sonnet</h3>
<span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Anthropic</span>
</div>
<span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded font-data-mono-sm text-data-mono-sm uppercase tracking-wider">Text+Vision</span>
</div>
<div className="grid grid-cols-2 gap-stack-sm z-10 mt-auto">
<div className="flex flex-col">
<span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase">Context</span>
<span className="font-data-mono-lg text-data-mono-lg text-on-surface text-secondary">200k</span>
</div>
<div className="flex flex-col">
<span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase">Params</span>
<span className="font-data-mono-lg text-data-mono-lg text-on-surface">Undisclosed</span>
</div>
<div className="flex flex-col col-span-2 mt-stack-sm pt-stack-sm border-t border-white/5">
<span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase">Release</span>
<span className="font-body-sm text-body-sm text-on-surface">Jun 2024</span>
</div>
</div>
</div>
<div className="glass-card rounded-xl p-card-padding flex flex-col gap-stack-md hover:border-secondary/50 transition-colors group relative overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="flex justify-between items-start z-10">
<div>
<h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-secondary transition-colors">Llama 3.1 405B</h3>
<span className="font-body-sm text-body-sm text-on-surface-variant">Meta</span>
</div>
<span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded font-data-mono-sm text-data-mono-sm uppercase tracking-wider">Open Text</span>
</div>
<div className="grid grid-cols-2 gap-stack-sm z-10 mt-auto">
<div className="flex flex-col">
<span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase">Context</span>
<span className="font-data-mono-lg text-data-mono-lg text-on-surface">128k</span>
</div>
<div className="flex flex-col">
<span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase">Params</span>
<span className="font-data-mono-lg text-data-mono-lg text-on-surface">405B</span>
</div>
<div className="flex flex-col col-span-2 mt-stack-sm pt-stack-sm border-t border-white/5">
<span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant uppercase">Release</span>
<span className="font-body-sm text-body-sm text-on-surface">Jul 2024</span>
</div>
</div>
</div>
</div>
    </main>
  );
}


export function ResearchScreen() {
  return (
    <main className="flex-1 md:ml-64 p-container-margin md:p-stack-lg max-w-7xl mx-auto w-full">
<header className="mb-stack-lg">
<h1 className="font-display-lg text-display-lg text-gradient mb-2">Research &amp; Trends</h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Deep dives, architectural analysis, and velocity benchmarks for next-generation Large Language Models.</p>
</header>
{/*  Featured Article  */}
<section className="mb-stack-lg">
<div className="glass-panel rounded-xl overflow-hidden flex flex-col md:flex-row group glow-hover transition-all duration-300 cursor-pointer">
<div className="md:w-1/2 h-64 md:h-auto relative">
<div className="absolute inset-0 bg-cover bg-center w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" data-alt="A highly abstract, dark mode data visualization showing streams of glowing blue and cyan particles representing token velocity, deep atmospheric background, tech-focused, high contrast." style={{"backgroundImage":"url('https"}}></div>
<div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container-low hidden md:block"></div>
<div className="absolute top-4 left-4 bg-primary-container border border-primary/30 px-2 py-1 rounded text-primary font-data-mono-sm text-data-mono-sm flex items-center gap-1">
<span className="material-symbols-outlined" style={{"fontSize":"14px"}}>star</span> FEATURED
                        </div>
</div>
<div className="p-card-padding md:p-stack-lg md:w-1/2 flex flex-col justify-center bg-surface-container-low">
<div className="flex items-center gap-2 mb-3">
<span className="text-tertiary bg-tertiary/10 px-2 py-0.5 rounded text-xs font-data-mono-sm text-data-mono-sm uppercase tracking-wider border border-tertiary/20">Optimization</span>
<span className="text-on-surface-variant font-data-mono-sm text-data-mono-sm">12 Min Read</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-secondary transition-colors">The Rise of Small Language Models: Edge Inference Optimization</h2>
<p className="text-on-surface-variant font-body-sm text-body-sm mb-6 line-clamp-3">Analyzing the throughput and latency trade-offs in sub-10B parameter models deployed on edge hardware, utilizing dynamic quantization and speculative decoding.</p>
<div className="flex items-center gap-3 mt-auto">
<img alt="Author" className="w-8 h-8 rounded-full border border-white/10" data-alt="A small, stylized circular avatar for an author, dark mode, tech aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAasgAjs-zU9Dpf2B2pz95stRB7Nok3qaxsjlOSdVSORWIKHRV0Pm6i6daCMRGtCjeh7R_mDbmjhtyu_XcK27vQJiiCqD244QaLo-2QrdqYNbawS5c7reqMoznBh4-MEPH2uJmHjbxxq_V-AnLhe8Wq0Sl5iLNF2CcD_lyY3u79g8lhyFZlGuKakSyRJgodCM75lNiLn46uGSzkdJolUGwxxJXyQkZa1ern9sKPttOvcB_zUFw0F-tvhA"/>
<div>
<p className="font-headline-sm text-sm text-on-surface leading-tight">Dr. Elena Rostova</p>
<p className="font-data-mono-sm text-data-mono-sm text-on-surface-variant leading-tight">Lead Research Scientist</p>
</div>
</div>
</div>
</div>
</section>
{/*  Grid Layout  */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
{/*  Article Card 1  */}
<article className="glass-panel rounded-xl overflow-hidden flex flex-col group glow-hover transition-all duration-300 cursor-pointer">
<div className="h-48 relative border-b border-white/5">
<div className="absolute inset-0 bg-cover bg-center w-full h-full opacity-70 group-hover:opacity-100 transition-opacity mix-blend-screen" data-alt="Abstract dark mode 3D render of layered glowing green and blue glass planes representing neural network architecture layers, precise analytical aesthetic." style={{"backgroundImage":"url('https"}}></div>
</div>
<div className="p-card-padding flex-1 flex flex-col">
<div className="flex items-center gap-2 mb-2">
<span className="text-secondary bg-secondary/10 px-2 py-0.5 rounded text-xs font-data-mono-sm text-data-mono-sm uppercase tracking-wider border border-secondary/20">Architecture</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 group-hover:text-secondary transition-colors">MoE Scaling Laws in v3</h3>
<p className="text-on-surface-variant font-body-sm text-body-sm mb-4 flex-1 line-clamp-2">Evaluating the router efficiency and active parameter ratio in the latest Mixture of Experts iterations.</p>
<div className="font-data-mono-sm text-data-mono-sm text-outline flex items-center justify-between mt-auto">
<span>Oct 24, 2023</span>
<span className="flex items-center gap-1 group-hover:text-secondary transition-colors">Read <span className="material-symbols-outlined" style={{"fontSize":"14px"}}>arrow_forward</span></span>
</div>
</div>
</article>
{/*  Article Card 2  */}
<article className="glass-panel rounded-xl overflow-hidden flex flex-col group glow-hover transition-all duration-300 cursor-pointer">
<div className="h-48 relative border-b border-white/5">
<div className="absolute inset-0 bg-cover bg-center w-full h-full opacity-70 group-hover:opacity-100 transition-opacity mix-blend-screen" data-alt="Minimalist dark mode visualization of a line chart showing rapid upward trajectory, glowing red and orange lines against deep navy background, sharp technical look." style={{"backgroundImage":"url('https"}}></div>
</div>
<div className="p-card-padding flex-1 flex flex-col">
<div className="flex items-center gap-2 mb-2">
<span className="text-error bg-error/10 px-2 py-0.5 rounded text-xs font-data-mono-sm text-data-mono-sm uppercase tracking-wider border border-error/20">Benchmarks</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 group-hover:text-secondary transition-colors">Throughput Bottlenecks at Scale</h3>
<p className="text-on-surface-variant font-body-sm text-body-sm mb-4 flex-1 line-clamp-2">Identifying the key constraints in multi-GPU setups when exceeding 100k tokens/second generation rates.</p>
<div className="font-data-mono-sm text-data-mono-sm text-outline flex items-center justify-between mt-auto">
<span>Oct 18, 2023</span>
<span className="flex items-center gap-1 group-hover:text-secondary transition-colors">Read <span className="material-symbols-outlined" style={{"fontSize":"14px"}}>arrow_forward</span></span>
</div>
</div>
</article>
{/*  Newsletter Widget  */}
<div className="glass-panel rounded-xl p-card-padding flex flex-col bg-surface-container-high/80 relative overflow-hidden">
<div className="absolute -right-10 -top-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
<div className="mb-4">
<div className="w-12 h-12 rounded-full bg-surface-bright border border-white/10 flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-secondary" style={{"fontSize":"24px"}}>mail</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Velocity Briefing</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Weekly technical insights and benchmark updates delivered directly to your inbox.</p>
</div>
<form className="mt-auto space-y-3">
<input className="w-full bg-black/30 border border-outline-variant rounded-lg px-4 py-2 text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" placeholder="Email address" type="email"/>
<button className="w-full bg-secondary text-on-secondary font-headline-sm text-sm py-2 rounded-lg hover:bg-secondary-fixed transition-colors" type="button">Subscribe</button>
</form>
</div>
</div>
{/*  Tech Notes List  */}
<section className="glass-panel rounded-xl p-card-padding mb-stack-lg">
<div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
<h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">description</span> Technical Notes
                    </h2>
<button className="text-secondary font-data-mono-sm text-data-mono-sm hover:text-secondary-fixed transition-colors">View All</button>
</div>
<div className="space-y-1">
<a className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group" href="#">
<div className="flex items-center gap-4">
<span className="font-data-mono-sm text-data-mono-sm text-outline w-24">TN-042</span>
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-secondary transition-colors">KV Cache Management in Long Contexts</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-secondary" style={{"fontSize":"16px"}}>download</span>
</a>
<a className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group" href="#">
<div className="flex items-center gap-4">
<span className="font-data-mono-sm text-data-mono-sm text-outline w-24">TN-041</span>
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-secondary transition-colors">Triton Kernel Optimization for Flash Attention</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-secondary" style={{"fontSize":"16px"}}>download</span>
</a>
</div>
</section>
</main>
  );
}

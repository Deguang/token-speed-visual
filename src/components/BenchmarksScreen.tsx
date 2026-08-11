
export function BenchmarksScreen() {
  return (
    <main className="flex-1 w-full lg:ml-64 p-container-margin overflow-y-auto">
<header className="mb-stack-lg flex justify-between items-end">
<div>
<h1 className="font-display-lg text-display-lg text-on-surface">Model Benchmarks</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">Comprehensive evaluation across MMLU, GSM8K, HumanEval, and MATH. Data updated real-time via continuous API sampling.</p>
</div>
</header>
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-stack-lg">
{/*  Radar Chart Card  */}
<div className="md:col-span-4 glass-card rounded-xl p-card-padding flex flex-col">
<h2 className="font-headline-sm text-headline-sm mb-4">Capability Footprint</h2>
<div className="flex-1 min-h-[300px] flex items-center justify-center relative">
{/*  Placeholder for complex radar chart  */}
<div className="w-full h-full border border-white/10 rounded-full flex items-center justify-center relative opacity-50">
<span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">RADAR_VIZ_TARGET</span>
</div>
</div>
</div>
{/*  Main Bar Chart Card  */}
<div className="md:col-span-8 glass-card rounded-xl p-card-padding active-glass-card pulse-border flex flex-col">
<div className="flex justify-between items-center mb-6">
<h2 className="font-headline-sm text-headline-sm">Dataset Performance</h2>
<div className="flex space-x-2">
<span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 font-data-mono-sm text-data-mono-sm rounded-sm">GPT-4</span>
<span className="px-2 py-1 bg-purple-500/10 text-purple-400 font-data-mono-sm text-data-mono-sm rounded-sm">Claude 3.5</span>
</div>
</div>
<div className="flex-1 min-h-[300px] flex flex-col justify-end space-y-4">
{/*  Bar Chart Rows (Simplified representation)  */}
<div className="space-y-1">
<div className="flex justify-between font-data-mono-sm text-data-mono-sm text-on-surface-variant"><span className="w-24">MMLU</span> <span>88.7%</span></div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-[#38bdf8] h-full" style={{"width":"88.7%"}}></div>
</div>
</div>
<div className="space-y-1">
<div className="flex justify-between font-data-mono-sm text-data-mono-sm text-on-surface-variant"><span className="w-24">GSM8K</span> <span>92.0%</span></div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-[#38bdf8] h-full" style={{"width":"92%"}}></div>
</div>
</div>
</div>
</div>
</div>
{/*  Detailed Table  */}
<div className="glass-card rounded-xl p-card-padding">
<h2 className="font-headline-sm text-headline-sm mb-4">Detailed Metrics</h2>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-white/10">
<th className="py-3 px-4 font-body-sm text-body-sm text-on-surface-variant font-medium">Model</th>
<th className="py-3 px-4 font-body-sm text-body-sm text-on-surface-variant font-medium">MMLU</th>
<th className="py-3 px-4 font-body-sm text-body-sm text-on-surface-variant font-medium">HumanEval</th>
<th className="py-3 px-4 font-body-sm text-body-sm text-on-surface-variant font-medium">MATH</th>
<th className="py-3 px-4 font-body-sm text-body-sm text-on-surface-variant font-medium">Throughput (T/s)</th>
</tr>
</thead>
<tbody className="font-data-mono-sm text-data-mono-sm">
<tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
<td className="py-3 px-4 font-body-sm text-body-sm text-on-surface flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>GPT-4 Omni</td>
<td className="py-3 px-4">88.7</td>
<td className="py-3 px-4">90.2</td>
<td className="py-3 px-4">76.6</td>
<td className="py-3 px-4 text-[#38bdf8]">105.4</td>
</tr>
<tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
<td className="py-3 px-4 font-body-sm text-body-sm text-on-surface flex items-center"><span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>Claude 3.5 Sonnet</td>
<td className="py-3 px-4">88.3</td>
<td className="py-3 px-4">92.0</td>
<td className="py-3 px-4">71.1</td>
<td className="py-3 px-4 text-[#38bdf8]">142.1</td>
</tr>
</tbody>
</table>
</div>
</div>
</main>
  );
}

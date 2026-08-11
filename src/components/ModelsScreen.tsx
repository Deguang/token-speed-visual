import { useState, useEffect } from 'react';

interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  modality: string;
  context: string;
  params: string;
  release: string;
  color: string;
}

interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  modality: string;
  context: string;
  params: string;
  release: string;
  color: string;
}

export function ModelsScreen({ navigate }: { navigate?: (tab: string, payload?: any) => void }) {
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModels = models.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + `data/models.json?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        setModels(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load models:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-stack-lg w-full animate-fade-in">
      <div className="mb-stack-lg">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-stack-sm">Model Library (Updated Aug 2026)</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-stack-md">Explore and compare specifications across major Large Language Models available in 2026.</p>
        <div className="flex flex-col md:flex-row gap-stack-md bg-surface-container/50 p-stack-sm rounded-lg border border-white/5 backdrop-blur-sm">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input 
              className="w-full bg-surface-container border border-outline-variant rounded pl-10 pr-4 py-2 text-on-surface placeholder:text-on-surface-variant focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-colors" 
              placeholder="Search models (e.g. GPT-4o, Claude 3.5)" 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-on-surface-variant font-data-mono-sm">Loading models data...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-md">
          {filteredModels.length === 0 && !loading && (
            <div className="text-on-surface-variant col-span-3 text-center py-8">No models found matching "{searchQuery}"</div>
          )}
          {filteredModels.map((model, idx) => (
            <div key={model.id} className={`glass-card rounded-xl p-card-padding flex flex-col gap-stack-md hover:border-secondary/50 transition-colors group relative overflow-hidden animate-fade-in stagger-${Math.min(idx + 1, 6)} ${model.name.includes('Claude') ? 'active-glow border-secondary/30' : ''}`}>
              <div className={`absolute inset-0 bg-gradient-to-br from-${model.color}-500/5 to-transparent z-0 ${model.name.includes('Claude') ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-500'}`}></div>
              
              {/* Giant Typographic Diagonal Logo Watermark */}
              <div 
                className="absolute -bottom-10 -right-10 font-display-lg font-black text-white/[0.04] text-[180px] leading-none pointer-events-none select-none z-0 transition-all duration-700 ease-out group-hover:scale-110 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:rotate-[-5deg]"
                style={{ WebkitMaskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)', maskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)' }}
              >
                {model.provider.substring(0, 1).toUpperCase()}
              </div>
              <div 
                className="absolute bottom-4 right-4 font-display-lg font-bold text-white/[0.06] text-[24px] pointer-events-none select-none z-0 tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ WebkitMaskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)', maskImage: 'linear-gradient(to top left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 100%)' }}
              >
                {model.provider}
              </div>

              <div className="flex flex-col gap-3 z-10 relative">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface group-hover:text-secondary transition-colors line-clamp-1" title={model.name}>{model.name}</h3>
                    {model.name.includes('Claude') && <span className="flex-shrink-0 flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">{model.provider}</span>
                </div>
                <div className="self-start">
                  <span className={`bg-${model.color}-500/10 text-${model.color}-400 border border-${model.color}-500/20 px-2 py-1 rounded font-data-mono-sm text-[10px] md:text-xs uppercase tracking-wider max-w-full truncate block`} title={model.modality}>{model.modality}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-stack-sm z-10 relative mt-auto pt-4">
                <div className="flex flex-col">
                  <span className="font-data-mono-sm text-[10px] md:text-xs text-on-surface-variant uppercase">Context</span>
                  <span className={`font-data-mono-sm text-sm md:text-base text-on-surface ${model.name.includes('Claude') ? 'text-secondary' : ''}`}>{model.context}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-data-mono-sm text-[10px] md:text-xs text-on-surface-variant uppercase">Params</span>
                  <span className="font-data-mono-sm text-sm md:text-base text-on-surface">{model.params}</span>
                </div>
                <div className="flex justify-between items-center mt-stack-md pt-stack-sm border-t border-white/5 col-span-2">
                  <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant px-2 py-1 bg-surface-container rounded">{model.release}</span>
                  {navigate && (
                    <button 
                      onClick={() => navigate('byok', { provider: 'Custom API Endpoint', autoStart: false })}
                      className="font-headline-sm text-headline-sm text-secondary hover:text-secondary-fixed-dim transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">speed</span>
                      Test Node
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';

interface AIHotItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  links: {
    original: string;
    aihot: string;
  };
  source: {
    name: string;
  }
}

export function ResearchScreen() {
  const [articles, setArticles] = useState<AIHotItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + `data/research.json?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load research articles:", err);
        setLoading(false);
      });
  }, []);

  const featured = articles.length > 0 ? articles[0] : null;
  const regular = articles.slice(1);

  return (
    <main className="flex-1 md:ml-64 pt-24 px-container-margin pb-container-margin md:p-stack-lg md:pt-24 max-w-7xl mx-auto w-full">
      <header className="mb-stack-lg">
        <h1 className="font-display-lg text-display-lg text-gradient mb-2">Research & Trends (Powered by AIHOT)</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Daily AI news, model releases, and research updates fetched directly from AIHOT.</p>
      </header>

      {loading ? (
        <div className="text-on-surface-variant font-data-mono-sm">Loading latest news from AIHOT...</div>
      ) : (
        <>
          {featured && (
            <section className="mb-stack-lg animate-fade-in">
              <div 
                className="glass-panel rounded-xl overflow-hidden flex flex-col md:flex-row group glow-hover transition-all duration-300 cursor-pointer"
                onClick={() => window.open(featured.links.original, '_blank')}
              >
                <div className="md:w-1/2 h-64 md:h-auto relative">
                  <div className="absolute inset-0 bg-cover bg-center w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" style={{backgroundImage: "url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000')"}}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-container-low hidden md:block"></div>
                  <div className="absolute top-4 left-4 bg-primary-container border border-primary/30 px-2 py-1 rounded text-primary font-data-mono-sm text-data-mono-sm flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{fontSize: "14px"}}>star</span> {featured.category.toUpperCase()}
                  </div>
                </div>
                <div className="p-card-padding md:p-stack-lg md:w-1/2 flex flex-col justify-center bg-surface-container-low">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-tertiary bg-tertiary/10 px-2 py-0.5 rounded text-xs font-data-mono-sm text-data-mono-sm uppercase tracking-wider border border-tertiary/20">{featured.source.name}</span>
                    <span className="text-on-surface-variant font-data-mono-sm text-data-mono-sm">{new Date(featured.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-3 group-hover:text-secondary transition-colors">{featured.title}</h2>
                  <p className="text-on-surface-variant font-body-sm text-body-sm mb-6 line-clamp-3">{featured.summary}</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <span className="flex items-center gap-1 text-secondary">Read Original <span className="material-symbols-outlined" style={{fontSize: "14px"}}>open_in_new</span></span>
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
            {regular.map((article, idx) => (
              <article 
                key={article.id} 
                className={`glass-panel rounded-xl overflow-hidden flex flex-col group glow-hover transition-all duration-300 cursor-pointer animate-fade-in stagger-${Math.min(idx + 1, 6)}`}
                onClick={() => window.open(article.links.original, '_blank')}
              >
                <div className="p-card-padding flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-secondary bg-secondary/10 px-2 py-0.5 rounded text-xs font-data-mono-sm text-data-mono-sm uppercase tracking-wider border border-secondary/20">{article.category}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 group-hover:text-secondary transition-colors">{article.title}</h3>
                  <p className="text-on-surface-variant font-body-sm text-body-sm mb-4 flex-1 line-clamp-4">{article.summary}</p>
                  <div className="font-data-mono-sm text-data-mono-sm text-outline flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1 group-hover:text-secondary transition-colors">Read <span className="material-symbols-outlined" style={{fontSize: "14px"}}>arrow_forward</span></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

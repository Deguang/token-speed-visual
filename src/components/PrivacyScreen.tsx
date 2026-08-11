export function PrivacyScreen() {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <h1 className="font-display-lg text-display-lg text-on-surface mb-2 tracking-tight">Privacy Policy</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mb-stack-xl">Last updated: August 2026</p>

      <div className="glass-card rounded-2xl p-card-padding flex flex-col gap-stack-lg">
        
        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">1. Data Collection & Telemetry</h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            <strong>tokenSpeed</strong> is built with absolute respect for developer privacy. When you run benchmarks using your own API keys (BYOK), the requests are made directly from your browser to the respective LLM providers (e.g., OpenAI, Groq, Together). We do not proxy, intercept, log, or store your API keys or the generated prompt completions on our servers.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">2. Global Leaderboard Data</h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            The telemetry data surfaced on the Global Leaderboard is aggregated asynchronously via anonymized edge functions. We only collect metadata parameters: Tokens Per Second (TPS), Time To First Token (TTFT), Provider Name, and Model Name. No prompt content or user identity is linked to these performance metrics.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">3. Local Storage</h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            We use your browser's local storage to persist your UI preferences (such as dark mode state) and your custom API keys for the BYOK sandbox. This ensures your keys never leave your device unless transmitted directly to the authorized LLM provider over TLS. If you wish to wipe this data, you can clear your browser's local storage or use the "Clear Keys" button in the sandbox.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">4. Third-Party Analytics</h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            We employ minimalistic, privacy-first analytics (such as Vercel Web Analytics or Plausible) strictly to monitor aggregate traffic and page load performance. These tools do not use cookies, nor do they track you across other websites.
          </p>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-sm">5. Open Source Transparency</h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Our codebase is fully open-source and auditable. If you have any concerns regarding how data is handled, we encourage you to review the network activity in your browser's Developer Tools or inspect our source code directly on GitHub.
          </p>
        </section>

      </div>
    </div>
  );
}

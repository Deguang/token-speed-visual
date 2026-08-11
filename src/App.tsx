import { useState, useEffect, useRef } from 'react';
import type { ViewTab, SampleText, ModelPreset, TokenChunk } from './types';
import { SAMPLE_TEXTS } from './data/sampleTexts';
import { tokenizeText } from './utils/tokenizer';
import { playTokenTick } from './utils/audio';

import { Header } from './components/Header';
import { SpeedSlider } from './components/SpeedSlider';
import { StreamOutput } from './components/StreamOutput';
import { PresetCardSection } from './components/PresetCard';
import { ComparisonView } from './components/ComparisonView';
import { ReadingBenchmark } from './components/ReadingBenchmark';
import { ThreeCanvas } from './components/ThreeCanvas';
import { ByokBenchmarker } from './components/ByokBenchmarker';
import { DesignSystemView } from './components/DesignSystemView';

export function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');
  const [speed, setSpeed] = useState<number>(10); // Default target: 10 token/s!
  const [selectedSample, setSelectedSample] = useState<SampleText>(SAMPLE_TEXTS[0]);

  const [isCustomTextMode, setIsCustomTextMode] = useState(false);
  const [customTextInput, setCustomTextInput] = useState(
    '10 token/s 的速率大约相当于每秒生成 5-7 个汉字。这种速度贴合人类自然朗读的节奏，既方便实时思考，又不会拖沓。'
  );

  const [allTokens, setAllTokens] = useState<TokenChunk[]>([]);
  const [streamedTokens, setStreamedTokens] = useState<TokenChunk[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTokenHighlight, setShowTokenHighlight] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const [elapsedMs, setElapsedMs] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const indexRef = useRef<number>(0);

  // Re-tokenize when text changes
  useEffect(() => {
    const rawText = isCustomTextMode ? customTextInput : selectedSample.content;
    const tokens = tokenizeText(rawText);
    setAllTokens(tokens);
    handleReset();
  }, [selectedSample, isCustomTextMode, customTextInput]);

  const handleReset = () => {
    setIsPlaying(false);
    setStreamedTokens([]);
    indexRef.current = 0;
    setElapsedMs(0);
    startTimeRef.current = null;
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (indexRef.current >= allTokens.length) {
        // Reset if reached end
        indexRef.current = 0;
        setStreamedTokens([]);
        setElapsedMs(0);
      }
      startTimeRef.current = Date.now() - elapsedMs;
      setIsPlaying(true);
    }
  };

  // Streaming Interval Logic
  useEffect(() => {
    if (!isPlaying || allTokens.length === 0) return;

    let timer: ReturnType<typeof setInterval>;

    // Calculate token output interval
    // 10 t/s = 1 token per 100ms
    const intervalMs = Math.max(8, Math.floor(1000 / speed));

    timer = setInterval(() => {
      if (startTimeRef.current) {
        setElapsedMs(Date.now() - startTimeRef.current);
      }

      indexRef.current += 1;
      const nextCount = indexRef.current;

      if (nextCount > allTokens.length) {
        setIsPlaying(false);
        clearInterval(timer);
      } else {
        setStreamedTokens(allTokens.slice(0, nextCount));
        if (audioEnabled) {
          playTokenTick(true);
        }
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, speed, allTokens, audioEnabled]);

  // Quick Select Speed handler
  const handleQuickSelectSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
    handleReset();
    // Auto start stream for instant visual feedback
    setTimeout(() => {
      startTimeRef.current = Date.now();
      setIsPlaying(true);
    }, 100);
  };

  // Preset Card click handler
  const handleSelectPreset = (preset: ModelPreset) => {
    setSpeed(preset.tokensPerSecond);
    setActiveTab('dashboard');
    handleReset();
    setTimeout(() => {
      startTimeRef.current = Date.now();
      setIsPlaying(true);
    }, 150);
  };

  return (
    <div className="app-layout">
      {/* Header & Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentSpeed={speed}
        onQuickSelectSpeed={handleQuickSelectSpeed}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <div className="sandbox-view">
            {/* Speed Control Panel */}
            <SpeedSlider
              speed={speed}
              onSpeedChange={(s) => {
                setSpeed(s);
              }}
              selectedText={selectedSample}
              onSelectText={(t) => {
                setSelectedSample(t);
              }}
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
              onReset={handleReset}
              showTokenHighlight={showTokenHighlight}
              onToggleHighlight={() => setShowTokenHighlight(!showTokenHighlight)}
              audioEnabled={audioEnabled}
              onToggleAudio={() => setAudioEnabled(!audioEnabled)}
              customTextInput={customTextInput}
              onCustomTextInputChange={setCustomTextInput}
              isCustomTextMode={isCustomTextMode}
              setIsCustomTextMode={setIsCustomTextMode}
            />

            {/* Live Streaming Typewriter Output */}
            <StreamOutput
              streamedTokens={streamedTokens}
              totalTokens={allTokens}
              isPlaying={isPlaying}
              speed={speed}
              elapsedMs={elapsedMs}
              showTokenHighlight={showTokenHighlight}
              onReset={handleReset}
            />
          </div>
        )}

        {activeTab === 'race' && <ComparisonView />}

        {activeTab === 'byok' && <ByokBenchmarker />}

        {activeTab === 'threejs' && (
          <ThreeCanvas
            speed={speed}
            onSpeedChange={(s) => setSpeed(s)}
          />
        )}

        {activeTab === 'design-system' && <DesignSystemView />}

        {activeTab === 'presets' && (
          <PresetCardSection
            onSelectPreset={handleSelectPreset}
            activeSpeed={speed}
          />
        )}

        {activeTab === 'guide' && (
          <ReadingBenchmark
            onSelectSpeed={(s) => {
              handleQuickSelectSpeed(s);
              setActiveTab('dashboard');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <p>Token Speed Visualizer &copy; {new Date().getFullYear()} — 为直观体验 10 token/s 及主流大模型速率打造</p>
          <div className="footer-links">
            <span className="pill-target-sm">🎯 核心基准: 10 Token/s (朗读速度)</span>
            <span>Stitch Design System • BPE Token Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

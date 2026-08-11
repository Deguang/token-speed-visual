export interface ModelPreset {
  id: string;
  name: string;
  provider: string;
  tokensPerSecond: number;
  ttftMs: number; // Time to First Token in ms
  description: string;
  iconName: string;
  category: 'legacy' | 'standard' | 'fast' | 'ultra' | 'human';
  tag: string;
  color: string;
}

export interface SampleText {
  id: string;
  title: string;
  category: 'chinese_tech' | 'chinese_story' | 'code' | 'english_essay' | 'markdown_table';
  content: string;
  description: string;
}

export interface TokenChunk {
  id: number;
  text: string;
  colorIdx: number;
  type: 'word' | 'chinese_char' | 'code' | 'whitespace' | 'punct';
}

export type ViewTab = 'dashboard' | 'presets' | 'race' | 'byok' | 'threejs' | 'design-system' | 'guide';

export interface RaceRunnerState {
  id: string;
  name: string;
  tokensPerSecond: number;
  currentTokens: TokenChunk[];
  generatedCount: number;
  elapsedMs: number;
  isFinished: boolean;
  color: string;
}

export interface ByokConfig {
  provider: 'openai' | 'deepseek' | 'siliconflow' | 'openrouter' | 'ollama' | 'custom';
  apiKey: string;
  baseUrl: string;
  model: string;
  prompt: string;
  temperature: number;
}

export interface ByokMetricResult {
  ttftMs: number | null;
  totalTokens: number;
  totalTimeMs: number;
  avgTps: number;
  peakTps: number;
  streamText: string;
  tpsHistory: { timeMs: number; tps: number }[];
  isStreaming: boolean;
  error?: string;
}

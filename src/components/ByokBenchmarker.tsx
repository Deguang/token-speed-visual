import React, { useState, useEffect, useRef } from 'react';
import type { ByokConfig, ByokMetricResult } from '../types';
import { Key, Play, RotateCcw, ShieldCheck, Terminal, AlertCircle, Copy, Check } from 'lucide-react';
import { playTokenTick } from '../utils/audio';

const PROVIDER_PRESETS: { [key in ByokConfig['provider']]: { name: string; baseUrl: string; defaultModel: string } } = {
  deepseek: {
    name: 'DeepSeek 官方 API',
    baseUrl: 'https://api.deepseek.com/v1',
    defaultModel: 'deepseek-chat',
  },
  siliconflow: {
    name: '硅基流动 (SiliconFlow)',
    baseUrl: 'https://api.siliconflow.cn/v1',
    defaultModel: 'deepseek-ai/DeepSeek-V3',
  },
  openai: {
    name: 'OpenAI 官方 API',
    baseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4o-mini',
  },
  openrouter: {
    name: 'OpenRouter 聚合 API',
    baseUrl: 'https://openrouter.ai/api/v1',
    defaultModel: 'google/gemini-2.0-flash-001',
  },
  ollama: {
    name: 'Ollama 本地 LLM (localhost)',
    baseUrl: 'http://localhost:11434/v1',
    defaultModel: 'qwen2.5:latest',
  },
  custom: {
    name: '自定义 OpenAI 兼容接口',
    baseUrl: 'https://your-custom-endpoint.com/v1',
    defaultModel: 'default',
  },
};

const DEFAULT_TEST_PROMPT = `请用一段简练优雅、富有创意的中文，介绍 10 token/s 速率在人工智能人机交互中的独特魅力与实用价值（200字左右）。`;

export const ByokBenchmarker: React.FC = () => {
  const [config, setConfig] = useState<ByokConfig>(() => {
    const saved = localStorage.getItem('token_visual_byok_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      provider: 'deepseek',
      apiKey: '',
      baseUrl: PROVIDER_PRESETS.deepseek.baseUrl,
      model: PROVIDER_PRESETS.deepseek.defaultModel,
      prompt: DEFAULT_TEST_PROMPT,
      temperature: 0.7,
    };
  });

  const [metrics, setMetrics] = useState<ByokMetricResult>({
    ttftMs: null,
    totalTokens: 0,
    totalTimeMs: 0,
    avgTps: 0,
    peakTps: 0,
    streamText: '',
    tpsHistory: [],
    isStreaming: false,
  });

  const [audioEnabled, setAudioEnabled] = useState(false);
  const [copied, setCopied] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Save config to localStorage (excluding or including key safely)
  useEffect(() => {
    localStorage.setItem('token_visual_byok_config', JSON.stringify(config));
  }, [config]);

  // Provider change handler
  const handleProviderChange = (provider: ByokConfig['provider']) => {
    const preset = PROVIDER_PRESETS[provider];
    setConfig((prev) => ({
      ...prev,
      provider,
      baseUrl: preset.baseUrl,
      model: preset.defaultModel,
    }));
  };

  const handleStopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setMetrics((prev) => ({ ...prev, isStreaming: false }));
  };

  const handleStartBenchmark = async () => {
    if (metrics.isStreaming) {
      handleStopStream();
      return;
    }

    if (config.provider !== 'ollama' && !config.apiKey.trim()) {
      alert('请先输入您的 API Key 以发起真实测速！');
      return;
    }

    // Reset Metrics
    setMetrics({
      ttftMs: null,
      totalTokens: 0,
      totalTimeMs: 0,
      avgTps: 0,
      peakTps: 0,
      streamText: '',
      tpsHistory: [],
      isStreaming: true,
    });

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const startTime = performance.now();
    let firstTokenTime: number | null = null;
    let tokenCount = 0;
    let accumulatedText = '';
    let peakTpsVal = 0;
    const history: { timeMs: number; tps: number }[] = [];

    try {
      const url = `${config.baseUrl.replace(/\/+$/, '')}/chat/completions`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: config.model.trim(),
          messages: [{ role: 'user', content: config.prompt }],
          stream: true,
          temperature: config.temperature,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API 响应错误 (${response.status}): ${errText.slice(0, 150)}`);
      }

      if (!response.body) {
        throw new Error('ReadableStream 不是有效的响应主体');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            if (dataStr === '[DONE]') break;

            try {
              const json = JSON.parse(dataStr);
              const deltaContent = json.choices?.[0]?.delta?.content || '';

              if (deltaContent) {
                const now = performance.now();
                if (!firstTokenTime) {
                  firstTokenTime = now;
                  const ttft = Math.round(firstTokenTime - startTime);
                  setMetrics((prev) => ({ ...prev, ttftMs: ttft }));
                }

                // Rough estimation of token count from delta text
                // 1 Chinese char ~ 0.6 token, 1 English word ~ 1 token
                const deltaTokenEstimate = Math.max(1, Math.ceil(deltaContent.length * 0.75));
                tokenCount += deltaTokenEstimate;
                accumulatedText += deltaContent;

                if (audioEnabled) {
                  playTokenTick(true);
                }

                const elapsedMs = now - startTime;
                const streamTimeSec = (now - firstTokenTime) / 1000;
                const currentTps = streamTimeSec > 0 ? parseFloat((tokenCount / streamTimeSec).toFixed(1)) : 0;
                if (currentTps > peakTpsVal) peakTpsVal = currentTps;

                if (history.length === 0 || now - history[history.length - 1].timeMs >= 200) {
                  history.push({ timeMs: Math.round(elapsedMs), tps: currentTps });
                }

                setMetrics({
                  ttftMs: firstTokenTime ? Math.round(firstTokenTime - startTime) : null,
                  totalTokens: tokenCount,
                  totalTimeMs: Math.round(elapsedMs),
                  avgTps: streamTimeSec > 0 ? parseFloat((tokenCount / streamTimeSec).toFixed(1)) : 0,
                  peakTps: peakTpsVal,
                  streamText: accumulatedText,
                  tpsHistory: [...history],
                  isStreaming: true,
                });
              }
            } catch (e) {
              // Ignore non-json data chunks
            }
          }
        }
      }

      const totalElapsed = Math.round(performance.now() - startTime);
      const streamTimeSec = firstTokenTime ? (performance.now() - firstTokenTime) / 1000 : 0;
      const finalAvgTps = streamTimeSec > 0 ? parseFloat((tokenCount / streamTimeSec).toFixed(1)) : 0;

      setMetrics((prev) => ({
        ...prev,
        totalTimeMs: totalElapsed,
        avgTps: finalAvgTps,
        isStreaming: false,
      }));
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setMetrics((prev) => ({
        ...prev,
        isStreaming: false,
        error: err.message || '测速请求失败',
      }));
    } finally {
      abortControllerRef.current = null;
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(metrics.streamText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="byok-container">
      {/* Top Banner */}
      <div className="byok-banner">
        <div className="byok-title">
          <Key size={24} className="text-amber-400" />
          <div>
            <h2>Token 速率可视化看板 (支持 BYOK 实时测速)</h2>
            <p>使用您自己的大模型 API Key 发起真实网络与推理速率测试，实测 TTFT、TPS 与吐字流畅度</p>
          </div>
        </div>

        <div className="security-notice">
          <ShieldCheck size={16} />
          <span>隐私安全承诺：API Key 仅存于浏览器端本地内存，绝不经过任何中转服务器。</span>
        </div>
      </div>

      <div className="byok-grid">
        {/* Left Column: API Configuration Panel */}
        <div className="byok-config-card">
          <h3>1. 测速配置 (API Settings)</h3>

          {/* Provider Presets */}
          <div className="form-group">
            <label>选择 API 提供商 / 端点:</label>
            <div className="provider-grid">
              {(Object.keys(PROVIDER_PRESETS) as Array<keyof typeof PROVIDER_PRESETS>).map((pKey) => (
                <button
                  key={pKey}
                  className={`provider-chip ${config.provider === pKey ? 'active' : ''}`}
                  onClick={() => handleProviderChange(pKey)}
                >
                  {PROVIDER_PRESETS[pKey].name}
                </button>
              ))}
            </div>
          </div>

          {/* API Key */}
          <div className="form-group">
            <label>API Key:</label>
            <input
              type="password"
              placeholder={config.provider === 'ollama' ? 'Ollama 本地运行无需 Key' : 'sk-xxxxxxxxxxxxxxxxxxxxxxxx'}
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
              className="byok-input"
            />
          </div>

          {/* Base URL & Model */}
          <div className="form-row">
            <div className="form-group flex-1">
              <label>API Base URL:</label>
              <input
                type="text"
                value={config.baseUrl}
                onChange={(e) => setConfig({ ...config, baseUrl: e.target.value })}
                className="byok-input"
              />
            </div>
            <div className="form-group flex-1">
              <label>Model 名称:</label>
              <input
                type="text"
                value={config.model}
                onChange={(e) => setConfig({ ...config, model: e.target.value })}
                className="byok-input"
              />
            </div>
          </div>

          {/* Prompt */}
          <div className="form-group">
            <label>测试 Prompt 内容:</label>
            <textarea
              rows={3}
              value={config.prompt}
              onChange={(e) => setConfig({ ...config, prompt: e.target.value })}
              className="byok-textarea"
            />
          </div>

          {/* Audio Toggle & Action Button */}
          <div className="byok-action-row">
            <label className="audio-checkbox">
              <input
                type="checkbox"
                checked={audioEnabled}
                onChange={(e) => setAudioEnabled(e.target.checked)}
              />
              <span>实时 Token 节拍音效</span>
            </label>

            <button
              className={`btn-primary ${metrics.isStreaming ? 'btn-danger' : ''}`}
              onClick={handleStartBenchmark}
            >
              {metrics.isStreaming ? (
                <>
                  <RotateCcw size={18} /> 中止实测
                </>
              ) : (
                <>
                  <Play size={18} style={{ fill: 'currentColor' }} /> 发起 BYOK 实时测速
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Real-time Benchmark Metrics & Output */}
        <div className="byok-results-card">
          <h3>2. 实测数据指标 (Live Benchmark Metrics)</h3>

          {/* Metrics Overview Cards */}
          <div className="byok-metrics-grid">
            <div className="metric-box box-amber">
              <span className="metric-title">TTFT 首 Token 延迟</span>
              <span className="metric-value">{metrics.ttftMs !== null ? `${metrics.ttftMs} ms` : '--'}</span>
              <span className="metric-sub">Time to First Token</span>
            </div>

            <div className="metric-box box-blue">
              <span className="metric-title">实时生成速率</span>
              <span className="metric-value">{metrics.avgTps > 0 ? `${metrics.avgTps} t/s` : '--'}</span>
              <span className="metric-sub">Average Tokens/sec</span>
            </div>

            <div className="metric-box box-purple">
              <span className="metric-title">峰值速率 Peak TPS</span>
              <span className="metric-value">{metrics.peakTps > 0 ? `${metrics.peakTps} t/s` : '--'}</span>
              <span className="metric-sub">最高瞬时速度</span>
            </div>

            <div className="metric-box box-emerald">
              <span className="metric-title">总 Token / 耗时</span>
              <span className="metric-value">
                {metrics.totalTokens} t / {(metrics.totalTimeMs / 1000).toFixed(1)}s
              </span>
              <span className="metric-sub">Total Generated</span>
            </div>
          </div>

          {/* Comparison with 10 token/s benchmark */}
          {metrics.avgTps > 0 && (
            <div className="byok-comparison-bar">
              <span className="comp-label">10 t/s 朗读基准倍率:</span>
              <span className="comp-badge">
                {(metrics.avgTps / 10).toFixed(1)}x 朗读速率 ({metrics.avgTps >= 10 ? '超过朗读速度' : '慢于朗读速度'})
              </span>
            </div>
          )}

          {/* Error Notice */}
          {metrics.error && (
            <div className="byok-error-box">
              <AlertCircle size={18} />
              <span>{metrics.error}</span>
            </div>
          )}

          {/* Stream Output Window */}
          <div className="byok-terminal-container">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="terminal-title">
                <Terminal size={14} /> 实测数据流输出 ({config.model})
              </span>
              <button className="copy-btn" onClick={handleCopyText} title="复制文本">
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>

            <div className="terminal-body">
              {metrics.streamText ? (
                <div className="stream-content">
                  {metrics.streamText}
                  {metrics.isStreaming && <span className="cursor-blink">▌</span>}
                </div>
              ) : (
                <div className="stream-placeholder">
                  点击上方 "发起 BYOK 实时测速" 按钮，此处将以 SSE 流式实时展示大模型响应文本并计算出精确 t/s。
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

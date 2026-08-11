import React, { useState } from 'react';
import { Palette, Type, Sliders, Play, Volume2, ShieldCheck, Sparkles, Flame, Activity } from 'lucide-react';

export const DesignSystemView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'components' | 'tokens'>('colors');

  const colorPalette = [
    { name: 'Background Dark', hex: '#0b0f19', var: '--bg-dark', category: 'Neutral' },
    { name: 'Card Container', hex: '#151c2c', var: '--bg-card', category: 'Neutral' },
    { name: 'Hover Glass', hex: '#1e293b', var: '--bg-card-hover', category: 'Neutral' },
    { name: 'Accent Blue (10 t/s)', hex: '#3b82f6', var: '--accent-blue', category: 'Brand' },
    { name: 'Emerald Success', hex: '#10b981', var: '--accent-emerald', category: 'Status' },
    { name: 'Purple Reasoning', hex: '#8b5cf6', var: '--accent-purple', category: 'Accent' },
    { name: 'Amber Target', hex: '#f59e0b', var: '--accent-amber', category: 'Highlight' },
    { name: 'Cyan Fast Stream', hex: '#06b6d4', var: '--accent-cyan', category: 'Accent' },
    { name: 'Pink Ultra Burst', hex: '#ec4899', var: '--accent-pink', category: 'Accent' },
  ];

  const tokenHighlightColors = [
    { name: 'Token Color 0', bg: 'rgba(59, 130, 246, 0.22)', border: 'rgba(59, 130, 246, 0.5)', text: '#93c5fd' },
    { name: 'Token Color 1', bg: 'rgba(16, 185, 129, 0.22)', border: 'rgba(16, 185, 129, 0.5)', text: '#6ee7b7' },
    { name: 'Token Color 2', bg: 'rgba(139, 92, 246, 0.22)', border: 'rgba(139, 92, 246, 0.5)', text: '#c4b5fd' },
    { name: 'Token Color 3', bg: 'rgba(245, 158, 11, 0.22)', border: 'rgba(245, 158, 11, 0.5)', text: '#fcd34d' },
    { name: 'Token Color 4', bg: 'rgba(6, 182, 212, 0.22)', border: 'rgba(6, 182, 212, 0.5)', text: '#67e8f9' },
    { name: 'Token Color 5', bg: 'rgba(236, 72, 153, 0.22)', border: 'rgba(236, 72, 153, 0.5)', text: '#f472b6' },
  ];

  return (
    <div className="design-system-container">
      {/* Design System Banner */}
      <div className="ds-hero">
        <div className="ds-badge">
          <Palette size={16} />
          <span>Stitch Design System v1.0</span>
        </div>
        <h2>Token Visual Design System</h2>
        <p>专为 10 token/s 人类朗读基准与大模型实时吐字打造的流式交互 UI 设计规范</p>

        {/* Sub Navigation */}
        <div className="ds-nav">
          <button
            className={`ds-nav-item ${activeTab === 'colors' ? 'active' : ''}`}
            onClick={() => setActiveTab('colors')}
          >
            <Palette size={16} /> 色彩与 Token 高亮
          </button>
          <button
            className={`ds-nav-item ${activeTab === 'typography' ? 'active' : ''}`}
            onClick={() => setActiveTab('typography')}
          >
            <Type size={16} /> 字体与排版
          </button>
          <button
            className={`ds-nav-item ${activeTab === 'components' ? 'active' : ''}`}
            onClick={() => setActiveTab('components')}
          >
            <Sliders size={16} /> 组件库与控件
          </button>
          <button
            className={`ds-nav-item ${activeTab === 'tokens' ? 'active' : ''}`}
            onClick={() => setActiveTab('tokens')}
          >
            <Sparkles size={16} /> Token 速率分级规范
          </button>
        </div>
      </div>

      {/* Colors & Token Highlight */}
      {activeTab === 'colors' && (
        <div className="ds-section">
          <h3>品牌与系统色彩 (Color Palette)</h3>
          <p className="ds-desc">采用 Cyber-Dark 玻璃态暗色调，保证流式吐字时的视觉舒适度与高对比度</p>

          <div className="color-grid">
            {colorPalette.map((c, idx) => (
              <div key={idx} className="color-card">
                <div className="color-swatch" style={{ backgroundColor: c.hex }} />
                <div className="color-info">
                  <div className="color-name">{c.name}</div>
                  <div className="color-hex">{c.hex}</div>
                  <code className="color-var">{c.var}</code>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: '2.5rem' }}>BPE Token 块着色高亮系统 (Token Highlight Rules)</h3>
          <p className="ds-desc">流式生成时，相邻 Token 自动应用动态循环着色，便于视线追踪单个 Token 切分边界</p>

          <div className="token-swatch-grid">
            {tokenHighlightColors.map((t, idx) => (
              <div
                key={idx}
                className="token-swatch-item"
                style={{ backgroundColor: t.bg, borderColor: t.border, color: t.text }}
              >
                <span>{t.name}</span>
                <code style={{ fontSize: '0.75rem', opacity: 0.8 }}>SampleToken_{idx + 1}</code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Typography */}
      {activeTab === 'typography' && (
        <div className="ds-section">
          <h3>字体层级与样式 (Typography Scale)</h3>
          <p className="ds-desc">正文选用系统 UI 默认无衬线字体，代码与 Token 吐字容器统一使用 JetBrains Mono / Fira Code 等宽字体</p>

          <div className="typo-spec-box">
            <div className="typo-row">
              <span className="typo-label">Title Display (H1)</span>
              <span className="typo-sample h1-sample">Token Speed Visualizer (32px / Bold)</span>
            </div>
            <div className="typo-row">
              <span className="typo-label">Section Heading (H2/H3)</span>
              <span className="typo-sample h2-sample">🎯 10 Token/s 核心朗读基准看板 (20px / Medium)</span>
            </div>
            <div className="typo-row">
              <span className="typo-label">Monospace Stream Output</span>
              <code className="typo-sample mono-sample">
                [Token_1] 10 token/s [Token_2] 的速率 [Token_3] 相当于 [Token_4] 每秒 [Token_5] 5-7个汉字。
              </code>
            </div>
            <div className="typo-row">
              <span className="typo-label">Stat Value Counter</span>
              <span className="typo-sample stat-sample">10.0 t/s | 120 ms | 480 WPM</span>
            </div>
          </div>
        </div>
      )}

      {/* Components Showcase */}
      {activeTab === 'components' && (
        <div className="ds-section">
          <h3>组件与交互控件 (UI Component Gallery)</h3>
          <p className="ds-desc">看板中使用的可复用交互组件示范</p>

          <div className="comp-demo-grid">
            {/* Buttons */}
            <div className="comp-demo-card">
              <h4>1. 操作按钮 (Action Buttons)</h4>
              <div className="comp-row">
                <button className="btn-primary">
                  <Play size={16} style={{ fill: 'currentColor' }} /> 开始流式播报
                </button>
                <button className="btn-secondary">
                  <Volume2 size={16} /> 开启打字音效
                </button>
                <button className="btn-outline">
                  <Activity size={16} /> 测速重置
                </button>
              </div>
            </div>

            {/* Speed Pills */}
            <div className="comp-demo-card">
              <h4>2. 快捷速率胶囊 (Speed Pills)</h4>
              <div className="comp-row">
                <span className="pill-btn">2.5 t/s (打字)</span>
                <span className="pill-btn highlight-pill active">🎯 10 t/s (朗读)</span>
                <span className="pill-btn">35 t/s (标准)</span>
                <span className="pill-btn">300 t/s ⚡ (极速)</span>
              </div>
            </div>

            {/* Status Badges */}
            <div className="comp-demo-card">
              <h4>3. 状态与标贴 (Badges & Tags)</h4>
              <div className="comp-row">
                <span className="badge-highlight">10 Token/s 体验中心</span>
                <span className="badge-fast"><Flame size={14} /> 极速吐字</span>
                <span className="badge-reasoning"><Sparkles size={14} /> 思考链 (Reasoning)</span>
                <span className="badge-live"><ShieldCheck size={14} /> SSE 实测已连接</span>
              </div>
            </div>

            {/* Live Token Chips */}
            <div className="comp-demo-card">
              <h4>4. 流式 Token 状态块 (Live Token Chips)</h4>
              <div className="comp-row">
                <span className="token-chip chunk-0">Token_1: "实时"</span>
                <span className="token-chip chunk-1">Token_2: "速率"</span>
                <span className="token-chip chunk-2">Token_3: "可视化"</span>
                <span className="token-chip chunk-3">Token_4: "10 t/s"</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Speed Spectrum Scale */}
      {activeTab === 'tokens' && (
        <div className="ds-section">
          <h3>Token 速率分级与体验映射 (Speed Spectrum Standards)</h3>
          <p className="ds-desc">明确划分不同 token/s 下的人机交互心理感知阶段</p>

          <div className="scale-list">
            <div className="scale-item scale-human">
              <div className="scale-rate">2.5 t/s</div>
              <div className="scale-info">
                <h4>人类日常打字速度 (Human Typing)</h4>
                <p>每分钟约 40-50 词。适合用于慢节奏演练，但作为 LLM 交互会引发用户较强焦虑感。</p>
              </div>
            </div>

            <div className="scale-item scale-target">
              <div className="scale-rate">🎯 10.0 t/s</div>
              <div className="scale-info">
                <h4>黄金朗读与思考基准线 (Reading Benchmark)</h4>
                <p>相当于每秒 5-7 个汉字（约 250-300 WPM）。视线跟随流流畅，最适合阅读 Reasoning 思考过程。</p>
              </div>
            </div>

            <div className="scale-item scale-cloud">
              <div className="scale-rate">35 - 50 t/s</div>
              <div className="scale-info">
                <h4>标准云端 LLM 吐字 (Standard Cloud LLM)</h4>
                <p>GPT-4o、Claude 3.5 Sonnet 标准 API 速度。快速生成完整段落，略快于人类默读速度。</p>
              </div>
            </div>

            <div className="scale-item scale-ultra">
              <div className="scale-rate">150 - 300+ t/s</div>
              <div className="scale-info">
                <h4>Groq / Cerebras / Speculative 极速引擎 (Ultra Speed)</h4>
                <p>文字像水流般瞬间呈现，实现真正“零感知等待”的代码生成与长文档检索。</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { MODEL_PRESETS } from '../data/models';
import type { ModelPreset } from '../types';
import { Play, Sparkles, Zap, Brain, Rocket, Gauge, User, Flame } from 'lucide-react';

interface PresetCardProps {
  onSelectPreset: (preset: ModelPreset) => void;
  activeSpeed: number;
}

export const PresetCardSection: React.FC<PresetCardProps> = ({
  onSelectPreset,
  activeSpeed,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'User': return <User size={20} />;
      case 'Gauge': return <Gauge size={20} />;
      case 'Brain': return <Brain size={20} />;
      case 'Sparkles': return <Sparkles size={20} />;
      case 'Zap': return <Zap size={20} />;
      case 'Flame': return <Flame size={20} />;
      case 'Rocket': return <Rocket size={20} />;
      default: return <Zap size={20} />;
    }
  };

  return (
    <div className="presets-section">
      <div className="section-header">
        <h2>主流大模型速率模板 (Model Speed Benchmarks)</h2>
        <p>点击任何模型卡片，即可在沙盒中一键模拟其真实 Token 吐字速度</p>
      </div>

      <div className="presets-grid">
        {MODEL_PRESETS.map((preset) => {
          const isSelected = activeSpeed === preset.tokensPerSecond;
          const isTarget10 = preset.tokensPerSecond === 10;

          return (
            <div
              key={preset.id}
              className={`preset-card ${isSelected ? 'is-active' : ''} ${
                isTarget10 ? 'target-highlight-card' : ''
              }`}
            >
              {isTarget10 && (
                <div className="card-top-badge">
                  🎯 核心观察基准 (10 t/s)
                </div>
              )}

              <div className="card-header-row">
                <div className="model-icon" style={{ backgroundColor: `${preset.color}20`, color: preset.color }}>
                  {getIcon(preset.iconName)}
                </div>
                <div className="model-info">
                  <h3 className="model-name">{preset.name}</h3>
                  <span className="provider-tag">{preset.provider}</span>
                </div>
              </div>

              <div className="speed-stat-row">
                <div className="speed-huge">
                  <span className="num" style={{ color: preset.color }}>{preset.tokensPerSecond}</span>
                  <span className="unit">token/s</span>
                </div>
                <div className="ttft-stat">
                  <span className="label">典型延迟 (TTFT):</span>
                  <span className="val">~{preset.ttftMs} ms</span>
                </div>
              </div>

              <p className="preset-desc">{preset.description}</p>

              <div className="card-actions">
                <button
                  className="preset-run-btn"
                  onClick={() => onSelectPreset(preset)}
                >
                  <Play size={14} />
                  <span>切换并测试该速率</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

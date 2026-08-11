import React from 'react';
import { SAMPLE_TEXTS } from '../data/sampleTexts';
import type { SampleText } from '../types';
import { Sliders, FileText, Play, RotateCcw, Volume2, VolumeX, Eye } from 'lucide-react';

interface SpeedSliderProps {
  speed: number;
  onSpeedChange: (newSpeed: number) => void;
  selectedText: SampleText;
  onSelectText: (text: SampleText) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  showTokenHighlight: boolean;
  onToggleHighlight: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  customTextInput: string;
  onCustomTextInputChange: (val: string) => void;
  isCustomTextMode: boolean;
  setIsCustomTextMode: (val: boolean) => void;
}

export const SpeedSlider: React.FC<SpeedSliderProps> = ({
  speed,
  onSpeedChange,
  selectedText,
  onSelectText,
  isPlaying,
  onTogglePlay,
  onReset,
  showTokenHighlight,
  onToggleHighlight,
  audioEnabled,
  onToggleAudio,
  customTextInput,
  onCustomTextInputChange,
  isCustomTextMode,
  setIsCustomTextMode,
}) => {
  // Speed quick buttons
  const speedPresets = [1, 2.5, 5, 10, 15, 30, 60, 100, 150, 300];

  // Calculate equivalent words per minute / character speed
  const wordsPerMin = Math.round(speed * 0.75 * 60); // approx WPM for English
  const chineseCharsPerMin = Math.round(speed * 0.6 * 60); // approx Chinese chars per min

  const getPerceptionText = (tps: number) => {
    if (tps <= 2) return '🐢 极慢打字体感：适合单字观察或逐字校对。';
    if (tps === 2.5) return '⌨️ 人类正常键盘打字速度 (约 40-50 WPM)。';
    if (tps > 2.5 && tps < 10) return '🚶 慢速朗读体感：逐字清晰吐出，眼神毫无压力。';
    if (tps === 10) return '🎯 10 Token/s 黄金基准：相当于舒适的人类自然朗读速度，注意力可完美同步！';
    if (tps > 10 && tps <= 20) return '🧠 沉稳思考阶段：常见于 DeepSeek-R1 等 Reasoning 模型输出。';
    if (tps > 20 && tps <= 45) return '🏃 快速阅读速度：高于人声朗读，适合快速扫视接收信息。';
    if (tps > 45 && tps <= 90) return '🚀 极速飞流：如 GPT-4o / Claude 3.5，瞬间出多行文本。';
    if (tps > 90 && tps <= 180) return '⚡ 闪电输出：段落秒级全亮，适合大批量代码/文档生成。';
    return '💥 芯片级极致推断 (300+ t/s)：整页内容瞬时打满，几乎无感知等待！';
  };

  return (
    <div className="speed-controls-card">
      <div className="card-header">
        <div className="card-title">
          <Sliders className="icon-blue" size={20} />
          <span>速率调节与展示控制 (Speed Control)</span>
        </div>

        {/* Play/Pause & Reset controls */}
        <div className="action-buttons">
          <button
            className={`btn-primary ${isPlaying ? 'btn-pause' : 'btn-play'}`}
            onClick={onTogglePlay}
          >
            <Play className={`play-icon ${isPlaying ? 'playing' : ''}`} size={16} />
            <span>{isPlaying ? '暂停生成 (Pause)' : '开始演示 (Start Stream)'}</span>
          </button>
          <button className="btn-secondary" onClick={onReset} title="重头开始吐字">
            <RotateCcw size={16} />
            <span>重置 (Reset)</span>
          </button>
        </div>
      </div>

      {/* Main Slider Section */}
      <div className="slider-box">
        <div className="slider-header">
          <div className="speed-badge-container">
            <span className="speed-label">当前生成速率:</span>
            <span className={`speed-number-badge ${speed === 10 ? 'is-target' : ''}`}>
              {speed} <span className="speed-unit">token/s</span>
            </span>
            {speed === 10 && <span className="target-pill-badge">🎯 用户重点观察目标</span>}
          </div>

          {/* Quick Metrics */}
          <div className="speed-equivalents">
            <span>≈ 约 <strong>{chineseCharsPerMin}</strong> 字/分钟 (中文)</span>
            <span className="divider">|</span>
            <span>≈ 约 <strong>{wordsPerMin}</strong> WPM (英文)</span>
          </div>
        </div>

        {/* Range Input Slider */}
        <div className="slider-track-wrapper">
          <input
            type="range"
            min="1"
            max="350"
            step={speed <= 20 ? 1 : speed <= 100 ? 5 : 10}
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="custom-range-slider"
          />
          <div className="slider-ticks">
            <span>1 t/s</span>
            <span className="target-tick">🎯 10 t/s</span>
            <span>50 t/s</span>
            <span>100 t/s</span>
            <span>200 t/s</span>
            <span>350 t/s</span>
          </div>
        </div>

        {/* Quick Preset Speed Buttons */}
        <div className="speed-presets-grid">
          {speedPresets.map((preset) => (
            <button
              key={preset}
              className={`preset-speed-btn ${speed === preset ? 'selected' : ''} ${
                preset === 10 ? 'target-10-btn' : ''
              }`}
              onClick={() => onSpeedChange(preset)}
            >
              {preset === 10 ? '🎯 10 t/s (目标)' : `${preset} t/s`}
            </button>
          ))}
        </div>

        {/* Dynamic Speed Perception Explainer */}
        <div className="perception-callout">
          <p>{getPerceptionText(speed)}</p>
        </div>
      </div>

      {/* Text Sample & Feature Options */}
      <div className="options-grid">
        {/* Sample Text Selector */}
        <div className="option-box">
          <label className="option-label">
            <FileText size={16} />
            <span>选择演示文本样本:</span>
          </label>
          <div className="text-select-tabs">
            {SAMPLE_TEXTS.map((sample) => (
              <button
                key={sample.id}
                className={`sample-tab ${
                  !isCustomTextMode && selectedText.id === sample.id ? 'active' : ''
                }`}
                onClick={() => {
                  setIsCustomTextMode(false);
                  onSelectText(sample);
                }}
              >
                {sample.title}
              </button>
            ))}
            <button
              className={`sample-tab ${isCustomTextMode ? 'active' : ''}`}
              onClick={() => setIsCustomTextMode(true)}
            >
              ✏️ 自定义文本
            </button>
          </div>

          {isCustomTextMode && (
            <textarea
              className="custom-text-area"
              rows={3}
              value={customTextInput}
              onChange={(e) => onCustomTextInputChange(e.target.value)}
              placeholder="在此粘贴或输入任何你想测试吐字速率的文本..."
            />
          )}
        </div>

        {/* View Options (Token Boundaries & Sound) */}
        <div className="toggles-box">
          <button
            className={`toggle-chip ${showTokenHighlight ? 'active' : ''}`}
            onClick={onToggleHighlight}
          >
            <Eye size={16} />
            <span>{showTokenHighlight ? '关闭 Token 高亮' : '开启 Token 边界彩色高亮'}</span>
          </button>

          <button
            className={`toggle-chip ${audioEnabled ? 'active' : ''}`}
            onClick={onToggleAudio}
          >
            {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{audioEnabled ? '声音已开启 (每 Token 音效)' : '音效已静音'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

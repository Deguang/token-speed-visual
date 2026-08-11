import React from 'react';
import { BookOpen, Gauge, Lightbulb, Target } from 'lucide-react';

interface GuideProps {
  onSelectSpeed: (speed: number) => void;
}

export const ReadingBenchmark: React.FC<GuideProps> = ({ onSelectSpeed }) => {
  return (
    <div className="guide-container">
      {/* Hero Banner */}
      <div className="guide-hero">
        <div className="hero-content">
          <div className="hero-badge">🎯 核心疑问解答</div>
          <h1>深入理解 10 Token/s 及其体感本质</h1>
          <p className="hero-desc">
            “10 token/s” 到底意味着什么？为什么在大模型交互中，10 token/s 被视为人类阅读体验的黄金分割线？
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => onSelectSpeed(10)}>
              <Target size={16} />
              <span>立即体验 10 Token/s 速率</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Key Concepts */}
      <div className="concepts-grid">
        {/* Concept 1: What is a Token */}
        <div className="concept-card">
          <div className="concept-icon icon-blue">
            <BookOpen size={22} />
          </div>
          <h3>1. 什么是 Token (词元)？</h3>
          <p>
            Token 是大语言模型 (LLM) 处理和生成文本的基本单位。它并非简单的“字符”或“单词”，而是通过 Byte-Pair Encoding (BPE) 分词算法切分的子词片段：
          </p>
          <ul className="concept-list">
            <li><strong>英文文本：</strong> 1 个单词平均对应 <strong>1.3 个 Token</strong>（例如 `understanding` 可能被拆分为 `under` + `standing`）。</li>
            <li><strong>中文文本：</strong> 1 个常用汉字通常对应 <strong>1 至 2 个 Token</strong>（常用词如“人工智能”约 4-6 tokens）。</li>
            <li><strong>代码文本：</strong> 缩进与符号（如 `{}`、`()`) 通常单独构成 Token。</li>
          </ul>
        </div>

        {/* Concept 2: Human Reading Speed */}
        <div className="concept-card highlight-card">
          <div className="concept-icon icon-green">
            <Gauge size={22} />
          </div>
          <h3>2. 10 Token/s 与人类阅读速度的对比</h3>
          <p>
            人类自然阅读速度一般为 <strong>200 - 300 词/分钟</strong> (WPM)。
          </p>
          <div className="comparison-table-mini">
            <div className="table-row">
              <span className="row-label">人类舒适朗读速度:</span>
              <span className="row-val">~150 WPM ≈ <strong>4 - 5 token/s</strong></span>
            </div>
            <div className="table-row highlight-row">
              <span className="row-label">🎯 10 Token/s (本页面焦点):</span>
              <span className="row-val">~300 WPM ≈ <strong>逐句默读速度 (完美同步)</strong></span>
            </div>
            <div className="table-row">
              <span className="row-label">人类快速扫视速度:</span>
              <span className="row-val">~500 WPM ≈ <strong>15 - 20 token/s</strong></span>
            </div>
            <div className="table-row">
              <span className="row-label">超速阅读 / 满屏涌出:</span>
              <span className="row-val">&gt; 1000 WPM ≈ <strong>50+ token/s</strong></span>
            </div>
          </div>
          <p className="note-text">
            👉 当速率在 <strong>10 token/s</strong> 时，文字出现的速度刚好与你的阅读节奏一致。眼睛不需要停顿等待，也不会因为文字喷出过快而产生心理压迫感！
          </p>
        </div>

        {/* Concept 3: Why 10 token/s matters */}
        <div className="concept-card">
          <div className="concept-icon icon-purple">
            <Lightbulb size={22} />
          </div>
          <h3>3. 为什么 10 token/s 在 LLM 发展史上如此关键？</h3>
          <ul className="concept-list">
            <li><strong>心理等待临界点：</strong> 早期 GPT-4 部署时，API 速度大约维持在 10-15 token/s。这是人机实时交互中保障“打字机效应”不打断用户思路的最低体验标准。</li>
            <li><strong>思考链 (Reasoning) 可读性：</strong> OpenAI o1、DeepSeek-R1 等推理模型在吐出 <code>&lt;think&gt;</code> 过程时，若在 10-15 token/s 吐字，用户可以像观看人类思维演进过程一样清晰审阅逻辑。</li>
            <li><strong>边缘端 (Edge LLM) 性能指标：</strong> 在手机、MacBook 或嵌入式设备本地运行 LLM (如 Ollama) 时，达到 10 token/s 意味着“本地推理已具备实用价值”。</li>
          </ul>
        </div>
      </div>

      {/* Speed Spectrum Visualizer */}
      <div className="spectrum-box">
        <h3>全速率感知光谱 (Speed Spectrum Overview)</h3>
        <p>从人类打字到芯片级推断的全场景体验映射</p>

        <div className="spectrum-bar">
          <div className="spec-segment seg-1" onClick={() => onSelectSpeed(2.5)} title="点击体验 2.5 t/s">
            <span className="spec-title">人类打字</span>
            <span className="spec-speed">2.5 t/s</span>
          </div>
          <div className="spec-segment seg-target" onClick={() => onSelectSpeed(10)} title="点击体验 10 t/s">
            <span className="spec-title">🎯 朗读/默读基准</span>
            <span className="spec-speed">10 t/s</span>
          </div>
          <div className="spec-segment seg-2" onClick={() => onSelectSpeed(35)} title="点击体验 35 t/s">
            <span className="spec-title">云端标准 LLM</span>
            <span className="spec-speed">35 t/s</span>
          </div>
          <div className="spec-segment seg-3" onClick={() => onSelectSpeed(75)} title="点击体验 75 t/s">
            <span className="spec-title">旗舰极速</span>
            <span className="spec-speed">75 t/s</span>
          </div>
          <div className="spec-segment seg-4" onClick={() => onSelectSpeed(300)} title="点击体验 300 t/s">
            <span className="spec-title">芯片级闪速</span>
            <span className="spec-speed">300+ t/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

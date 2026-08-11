import React, { useRef, useEffect } from 'react';
import type { TokenChunk } from '../types';
import { Terminal, Copy, Clock, Hash, Activity, CheckCircle2 } from 'lucide-react';

interface StreamOutputProps {
  streamedTokens: TokenChunk[];
  totalTokens: TokenChunk[];
  isPlaying: boolean;
  speed: number;
  elapsedMs: number;
  showTokenHighlight: boolean;
  onReset: () => void;
}

export const StreamOutput: React.FC<StreamOutputProps> = ({
  streamedTokens,
  totalTokens,
  isPlaying,
  speed,
  elapsedMs,
  showTokenHighlight,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  // Auto scroll output window when streaming
  useEffect(() => {
    if (isPlaying && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [streamedTokens.length, isPlaying]);

  const elapsedSec = (elapsedMs / 1000).toFixed(1);
  const generatedCount = streamedTokens.length;
  const totalCount = totalTokens.length;
  const progressPct = totalCount > 0 ? Math.min(100, Math.round((generatedCount / totalCount) * 100)) : 0;
  const isFinished = generatedCount >= totalCount && totalCount > 0;

  // Actual measured TPS
  const measuredTps = elapsedMs > 500 ? (generatedCount / (elapsedMs / 1000)).toFixed(1) : speed.toFixed(1);

  const fullText = streamedTokens.map((t) => t.text).join('');

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Pastel colors for token highlights
  const tokenColors = [
    'rgba(59, 130, 246, 0.15)', // Blue
    'rgba(16, 185, 129, 0.15)', // Emerald
    'rgba(168, 85, 247, 0.15)', // Purple
    'rgba(245, 158, 11, 0.15)', // Amber
    'rgba(236, 72, 153, 0.15)', // Pink
    'rgba(6, 182, 212, 0.15)',  // Cyan
  ];

  const tokenBorders = [
    'rgba(59, 130, 246, 0.4)',
    'rgba(16, 185, 129, 0.4)',
    'rgba(168, 85, 247, 0.4)',
    'rgba(245, 158, 11, 0.4)',
    'rgba(236, 72, 153, 0.4)',
    'rgba(6, 182, 212, 0.4)',
  ];

  return (
    <div className="stream-output-wrapper">
      {/* Output Header Status Bar */}
      <div className="stream-header">
        <div className="stream-status">
          <Terminal size={18} className="status-icon" />
          <span className="window-title">实时 Token 吐字模拟屏 (Streaming Window)</span>
          {isPlaying && <span className="live-tag">● LIVE STREAMING</span>}
          {isFinished && <span className="finish-tag">✓ 完成 (Finished)</span>}
        </div>

        {/* Stats Dashboard */}
        <div className="stream-metrics">
          <div className="metric-item" title="已被生成的 Token 数量">
            <Hash size={14} />
            <span>Tokens: <strong>{generatedCount} / {totalCount}</strong></span>
          </div>

          <div className="metric-item" title="耗时秒数">
            <Clock size={14} />
            <span>用时: <strong>{elapsedSec}s</strong></span>
          </div>

          <div className="metric-item highlight-metric" title="实际测得每秒 Token 数">
            <Activity size={14} />
            <span>实测速率: <strong>{measuredTps} t/s</strong></span>
          </div>

          <button className="copy-btn" onClick={handleCopy} title="复制生成文本">
            {copied ? <CheckCircle2 size={14} className="text-green" /> : <Copy size={14} />}
            <span>{copied ? '已复制' : '复制'}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div
          className={`progress-fill ${isFinished ? 'completed' : ''}`}
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Main Streaming Display Box */}
      <div className="stream-content" ref={containerRef}>
        {streamedTokens.length === 0 ? (
          <div className="empty-state">
            <p>点击上方 <strong>“开始演示 (Start Stream)”</strong> 查看在 <strong>{speed} token/s</strong> 速率下的真实吐字体感。</p>
          </div>
        ) : (
          <div className="text-display">
            {showTokenHighlight ? (
              // Token Highlighting Mode
              <div className="token-pills-flow">
                {streamedTokens.map((token, idx) => {
                  const bg = tokenColors[token.colorIdx];
                  const border = tokenBorders[token.colorIdx];
                  return (
                    <span
                      key={idx}
                      className="token-chip"
                      style={{ backgroundColor: bg, borderColor: border }}
                      title={`Token #${token.id} (${token.type})`}
                    >
                      {token.text === '\n' ? '↵\n' : token.text}
                    </span>
                  );
                })}
                {isPlaying && <span className="streaming-cursor">▋</span>}
              </div>
            ) : (
              // Normal Formatted Text Streaming Mode
              <div className="normal-text-flow">
                <span className="whitespace-pre-wrap">{fullText}</span>
                {isPlaying && <span className="streaming-cursor">▋</span>}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Info Pill */}
      <div className="stream-footer">
        <span>当前设置速率: <strong>{speed} Token/s</strong></span>
        <span>
          {speed === 10
            ? '🎯 此时正是 10 token/s! 注意感受这个速度下视线阅读的舒适度。'
            : speed < 10
            ? '🐢 此时速率低于 10 token/s (朗读体感)'
            : '⚡ 此时速率高于 10 token/s (速读/浏览体感)'}
        </span>
      </div>
    </div>
  );
};

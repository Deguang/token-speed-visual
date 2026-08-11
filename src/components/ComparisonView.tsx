import React, { useState, useEffect, useRef } from 'react';
import { SAMPLE_TEXTS } from '../data/sampleTexts';
import { tokenizeText } from '../utils/tokenizer';
import type { TokenChunk } from '../types';
import { Trophy, Play, RotateCcw, Flag } from 'lucide-react';

export const ComparisonView: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_TEXTS[0]);
  const [tokens, setTokens] = useState<TokenChunk[]>([]);

  // 3 Lanes configuration
  const [lane1Speed, setLane1Speed] = useState(10); // Target 10 t/s!
  const [lane2Speed, setLane2Speed] = useState(35); // DeepSeek
  const [lane3Speed, setLane3Speed] = useState(120); // Fast LLM

  const [isPlaying, setIsPlaying] = useState(false);
  const [lane1Index, setLane1Index] = useState(0);
  const [lane2Index, setLane2Index] = useState(0);
  const [lane3Index, setLane3Index] = useState(0);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [lane1Time, setLane1Time] = useState<number | null>(null);
  const [lane2Time, setLane2Time] = useState<number | null>(null);
  const [lane3Time, setLane3Time] = useState<number | null>(null);

  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const containerRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = tokenizeText(selectedSample.content);
    setTokens(t);
    handleReset();
  }, [selectedSample]);

  const handleReset = () => {
    setIsPlaying(false);
    setLane1Index(0);
    setLane2Index(0);
    setLane3Index(0);
    setStartTime(null);
    setLane1Time(null);
    setLane2Time(null);
    setLane3Time(null);
  };

  const handleStart = () => {
    handleReset();
    setIsPlaying(true);
    setStartTime(Date.now());
  };

  useEffect(() => {
    if (!isPlaying || tokens.length === 0) return;

    const intervalMs = 20; // 50Hz ticker update
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsedSec = (now - (startTime || now)) / 1000;

      // Lane 1
      const count1 = Math.min(tokens.length, Math.floor(elapsedSec * lane1Speed));
      setLane1Index(count1);
      if (count1 >= tokens.length && !lane1Time) {
        setLane1Time(elapsedSec);
      }

      // Lane 2
      const count2 = Math.min(tokens.length, Math.floor(elapsedSec * lane2Speed));
      setLane2Index(count2);
      if (count2 >= tokens.length && !lane2Time) {
        setLane2Time(elapsedSec);
      }

      // Lane 3
      const count3 = Math.min(tokens.length, Math.floor(elapsedSec * lane3Speed));
      setLane3Index(count3);
      if (count3 >= tokens.length && !lane3Time) {
        setLane3Time(elapsedSec);
      }

      // Check if all finished
      if (count1 >= tokens.length && count2 >= tokens.length && count3 >= tokens.length) {
        setIsPlaying(false);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, tokens, lane1Speed, lane2Speed, lane3Speed, startTime, lane1Time, lane2Time, lane3Time]);

  // Auto-scroll
  useEffect(() => {
    if (isPlaying) {
      if (containerRef1.current) containerRef1.current.scrollTop = containerRef1.current.scrollHeight;
      if (containerRef2.current) containerRef2.current.scrollTop = containerRef2.current.scrollHeight;
      if (containerRef3.current) containerRef3.current.scrollTop = containerRef3.current.scrollHeight;
    }
  }, [lane1Index, lane2Index, lane3Index, isPlaying]);

  const text1 = tokens.slice(0, lane1Index).map((t) => t.text).join('');
  const text2 = tokens.slice(0, lane2Index).map((t) => t.text).join('');
  const text3 = tokens.slice(0, lane3Index).map((t) => t.text).join('');

  return (
    <div className="race-container">
      <div className="section-header">
        <div className="title-with-badge">
          <h2>多速率同屏竞速赛 (Multi-Speed Race)</h2>
          <span className="badge-highlight">直观同屏对比</span>
        </div>
        <p>让相同的内容在不同 Token 速率下同步喷出，对比 10 t/s 与 35 t/s、120 t/s 的体感差异</p>
      </div>

      {/* Control Bar */}
      <div className="race-control-bar">
        <div className="sample-picker">
          <label>比赛文本:</label>
          <select
            value={selectedSample.id}
            onChange={(e) => {
              const s = SAMPLE_TEXTS.find((t) => t.id === e.target.value);
              if (s) setSelectedSample(s);
            }}
            className="race-select"
          >
            {SAMPLE_TEXTS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title} ({t.content.length} 字)
              </option>
            ))}
          </select>
        </div>

        <div className="race-actions">
          <button className="btn-primary" onClick={handleStart}>
            <Play size={16} />
            <span>{isPlaying ? '重新竞速' : '开始同屏比拼 (Start Race)'}</span>
          </button>
          <button className="btn-secondary" onClick={handleReset}>
            <RotateCcw size={16} />
            <span>重置</span>
          </button>
        </div>
      </div>

      {/* 3 Speed Lanes */}
      <div className="lanes-grid">
        {/* Lane 1: Target 10 t/s */}
        <div className="race-lane target-lane">
          <div className="lane-header">
            <div className="lane-title">
              <span className="target-star">🎯</span>
              <span>通道 A: 焦点对比速率</span>
            </div>
            <div className="lane-speed-control">
              <input
                type="number"
                min="1"
                max="300"
                value={lane1Speed}
                onChange={(e) => setLane1Speed(Number(e.target.value))}
                className="lane-input target-input"
              />
              <span className="unit">t/s</span>
            </div>
          </div>

          <div className="lane-progress">
            <div
              className="lane-progress-bar bar-blue"
              style={{ width: `${(lane1Index / Math.max(1, tokens.length)) * 100}%` }}
            />
          </div>

          <div className="lane-stats">
            <span>已生成: {lane1Index} / {tokens.length} tokens</span>
            {lane1Time ? (
              <span className="finish-time"><Flag size={12} /> 用时: {lane1Time.toFixed(2)}s</span>
            ) : (
              <span>耗时: {startTime ? ((Date.now() - startTime) / 1000).toFixed(1) : 0}s</span>
            )}
          </div>

          <div className="lane-content" ref={containerRef1}>
            <pre>{text1}</pre>
            {isPlaying && lane1Index < tokens.length && <span className="streaming-cursor">▋</span>}
          </div>
        </div>

        {/* Lane 2: Standard 35 t/s */}
        <div className="race-lane">
          <div className="lane-header">
            <div className="lane-title">
              <span>通道 B: 标准云端大模型</span>
            </div>
            <div className="lane-speed-control">
              <input
                type="number"
                min="1"
                max="300"
                value={lane2Speed}
                onChange={(e) => setLane2Speed(Number(e.target.value))}
                className="lane-input"
              />
              <span className="unit">t/s</span>
            </div>
          </div>

          <div className="lane-progress">
            <div
              className="lane-progress-bar bar-cyan"
              style={{ width: `${(lane2Index / Math.max(1, tokens.length)) * 100}%` }}
            />
          </div>

          <div className="lane-stats">
            <span>已生成: {lane2Index} / {tokens.length} tokens</span>
            {lane2Time ? (
              <span className="finish-time"><Trophy size={12} /> 用时: {lane2Time.toFixed(2)}s</span>
            ) : (
              <span>耗时: {startTime ? ((Date.now() - startTime) / 1000).toFixed(1) : 0}s</span>
            )}
          </div>

          <div className="lane-content" ref={containerRef2}>
            <pre>{text2}</pre>
            {isPlaying && lane2Index < tokens.length && <span className="streaming-cursor">▋</span>}
          </div>
        </div>

        {/* Lane 3: High-speed 120 t/s */}
        <div className="race-lane">
          <div className="lane-header">
            <div className="lane-title">
              <span>通道 C: 轻量/硬件极速</span>
            </div>
            <div className="lane-speed-control">
              <input
                type="number"
                min="1"
                max="300"
                value={lane3Speed}
                onChange={(e) => setLane3Speed(Number(e.target.value))}
                className="lane-input"
              />
              <span className="unit">t/s</span>
            </div>
          </div>

          <div className="lane-progress">
            <div
              className="lane-progress-bar bar-emerald"
              style={{ width: `${(lane3Index / Math.max(1, tokens.length)) * 100}%` }}
            />
          </div>

          <div className="lane-stats">
            <span>已生成: {lane3Index} / {tokens.length} tokens</span>
            {lane3Time ? (
              <span className="finish-time"><Trophy size={12} /> 用时: {lane3Time.toFixed(2)}s</span>
            ) : (
              <span>耗时: {startTime ? ((Date.now() - startTime) / 1000).toFixed(1) : 0}s</span>
            )}
          </div>

          <div className="lane-content" ref={containerRef3}>
            <pre>{text3}</pre>
            {isPlaying && lane3Index < tokens.length && <span className="streaming-cursor">▋</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

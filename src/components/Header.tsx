import React from 'react';
import type { ViewTab } from '../types';
import { Gauge, Zap, Trophy, HelpCircle, Activity, Key, Box, Palette } from 'lucide-react';

interface HeaderProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  currentSpeed: number;
  onQuickSelectSpeed: (speed: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentSpeed,
  onQuickSelectSpeed,
}) => {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand Logo & Title */}
        <div className="brand-title">
          <div className="brand-icon">
            <Activity className="icon-pulse" size={24} />
          </div>
          <div>
            <div className="title-row">
              <h1>Token Speed Visualizer</h1>
              <span className="badge-highlight">Stitch 5屏完整合集</span>
            </div>
            <p className="sub-title">Token 速率可视化看板 • 10 token/s 朗读基准与大模型实测</p>
          </div>
        </div>

        {/* Top Quick Speed Pills */}
        <div className="quick-pills">
          <span className="pills-label">快捷速率:</span>
          <button
            className={`pill-btn ${currentSpeed === 1 ? 'active' : ''}`}
            onClick={() => onQuickSelectSpeed(1)}
          >
            1 t/s
          </button>
          <button
            className={`pill-btn highlight-pill ${currentSpeed === 10 ? 'active' : ''}`}
            onClick={() => onQuickSelectSpeed(10)}
            title="核心对比目标: 相当于人类自然朗读速度"
          >
            🎯 10 t/s
          </button>
          <button
            className={`pill-btn ${currentSpeed === 35 ? 'active' : ''}`}
            onClick={() => onQuickSelectSpeed(35)}
          >
            35 t/s
          </button>
          <button
            className={`pill-btn ${currentSpeed === 75 ? 'active' : ''}`}
            onClick={() => onQuickSelectSpeed(75)}
          >
            75 t/s
          </button>
          <button
            className={`pill-btn ${currentSpeed === 150 ? 'active' : ''}`}
            onClick={() => onQuickSelectSpeed(150)}
          >
            150 t/s
          </button>
          <button
            className={`pill-btn ${currentSpeed === 300 ? 'active' : ''}`}
            onClick={() => onQuickSelectSpeed(300)}
          >
            ⚡ 300 t/s
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="nav-tabs">
        <button
          className={`tab-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Gauge size={18} />
          <span>速率看板</span>
        </button>
        <button
          className={`tab-item ${activeTab === 'race' ? 'active' : ''}`}
          onClick={() => setActiveTab('race')}
        >
          <Trophy size={18} />
          <span>动态演示 (赛跑)</span>
        </button>
        <button
          className={`tab-item ${activeTab === 'byok' ? 'active' : ''}`}
          onClick={() => setActiveTab('byok')}
        >
          <Key size={18} />
          <span>BYOK 实时测速</span>
        </button>
        <button
          className={`tab-item ${activeTab === 'threejs' ? 'active' : ''}`}
          onClick={() => setActiveTab('threejs')}
        >
          <Box size={18} />
          <span>Three.js 3D</span>
        </button>
        <button
          className={`tab-item ${activeTab === 'design-system' ? 'active' : ''}`}
          onClick={() => setActiveTab('design-system')}
        >
          <Palette size={18} />
          <span>Design System</span>
        </button>
        <button
          className={`tab-item ${activeTab === 'presets' ? 'active' : ''}`}
          onClick={() => setActiveTab('presets')}
        >
          <Zap size={18} />
          <span>主流模型库</span>
        </button>
        <button
          className={`tab-item ${activeTab === 'guide' ? 'active' : ''}`}
          onClick={() => setActiveTab('guide')}
        >
          <HelpCircle size={18} />
          <span>10 t/s 指南</span>
        </button>
      </nav>
    </header>
  );
};

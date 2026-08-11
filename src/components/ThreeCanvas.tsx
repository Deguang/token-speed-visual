import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Play, Sparkles, Zap } from 'lucide-react';

interface ThreeCanvasProps {
  speed: number;
  onSpeedChange: (s: number) => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ speed, onSpeedChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'cyber' | 'matrix' | 'quantum' | 'solar'>('cyber');
  const [isPlaying, setIsPlaying] = useState(true);
  const [fps, setFps] = useState(60);
  const [activeNodesCount, setActiveNodesCount] = useState(0);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesGroupRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number | null>(null);

  // Colors based on theme
  const themeColors = {
    cyber: { primary: 0x3b82f6, secondary: 0xec4899, glow: 0x8b5cf6, bg: 0x070a12 },
    matrix: { primary: 0x10b981, secondary: 0x34d399, glow: 0x059669, bg: 0x04120a },
    quantum: { primary: 0x8b5cf6, secondary: 0x06b6d4, glow: 0xd946ef, bg: 0x0c0714 },
    solar: { primary: 0xf59e0b, secondary: 0xef4444, glow: 0xfacc15, bg: 0x120a04 },
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 480;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(themeColors[theme].bg, 0.025);
    scene.background = new THREE.Color(themeColors[theme].bg);
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 2, 22);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(themeColors[theme].primary, 2, 50);
    pointLight.position.set(0, 5, 10);
    scene.add(pointLight);

    // 5. Grid helper tunnel
    const grid = new THREE.GridHelper(60, 40, themeColors[theme].primary, 0x1e293b);
    grid.position.y = -4;
    scene.add(grid);

    // 6. Particles Group (Token Stream in 3D Space)
    const particlesGroup = new THREE.Group();
    scene.add(particlesGroup);
    particlesGroupRef.current = particlesGroup;

    // Create Initial Particle Pool
    const geometries = [
      new THREE.BoxGeometry(0.6, 0.6, 0.6),
      new THREE.SphereGeometry(0.35, 12, 12),
      new THREE.TetrahedronGeometry(0.4),
    ];

    const materials = [
      new THREE.MeshStandardMaterial({
        color: themeColors[theme].primary,
        wireframe: false,
        emissive: themeColors[theme].primary,
        emissiveIntensity: 0.5,
        roughness: 0.2,
      }),
      new THREE.MeshStandardMaterial({
        color: themeColors[theme].secondary,
        wireframe: false,
        emissive: themeColors[theme].secondary,
        emissiveIntensity: 0.6,
      }),
      new THREE.MeshStandardMaterial({
        color: themeColors[theme].glow,
        wireframe: true,
      }),
    ];

    // Animation Loop
    let lastTime = performance.now();
    let spawnCounter = 0;
    let frames = 0;
    let lastFpsUpdate = performance.now();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // FPS Counter
      frames++;
      if (now - lastFpsUpdate >= 500) {
        setFps(Math.round((frames * 1000) / (now - lastFpsUpdate)));
        frames = 0;
        lastFpsUpdate = now;
      }

      if (isPlaying && particlesGroupRef.current) {
        // Rotate container slightly
        particlesGroup.rotation.y += 0.003;

        // Spawn new token particles based on target t/s speed!
        // higher speed = more frequent spawn
        spawnCounter += speed * delta;
        while (spawnCounter >= 1) {
          spawnCounter -= 1;

          if (particlesGroup.children.length < 300) {
            const geom = geometries[Math.floor(Math.random() * geometries.length)];
            const mat = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geom, mat);

            // Random initial placement in 3D tunnel emitter
            mesh.position.x = (Math.random() - 0.5) * 14;
            mesh.position.y = (Math.random() - 0.5) * 8;
            mesh.position.z = -40; // Fly out from background

            // Store custom speed vector on meshUserData
            mesh.userData = {
              speedZ: 10 + (speed / 10) * 8 + Math.random() * 4,
              rotSpeedX: (Math.random() - 0.5) * 0.05,
              rotSpeedY: (Math.random() - 0.5) * 0.05,
            };

            particlesGroup.add(mesh);
          }
        }

        // Update positions of floating 3D Token nodes
        for (let i = particlesGroup.children.length - 1; i >= 0; i--) {
          const p = particlesGroup.children[i];
          p.position.z += p.userData.speedZ * delta;
          p.rotation.x += p.userData.rotSpeedX;
          p.rotation.y += p.userData.rotSpeedY;

          // Recycle if moved past camera
          if (p.position.z > 25) {
            particlesGroup.remove(p);
          }
        }

        setActiveNodesCount(particlesGroup.children.length);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      cameraRef.current.aspect = w / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
    };
  }, [theme, speed, isPlaying]);

  return (
    <div className="three-view-container">
      {/* Top Controls & Metrics */}
      <div className="three-header-bar">
        <div className="three-title">
          <Box size={22} className="text-blue-400" />
          <div>
            <h3>Three.js 3D Token 流动粒子特效看板</h3>
            <p>在三维空间中动态把 Token 抽象为能量节点，真实映射当前 {speed} token/s 的流动通量</p>
          </div>
        </div>

        {/* 3D HUD Stats */}
        <div className="three-hud-metrics">
          <div className="hud-badge">
            <span className="hud-label">FPS:</span>
            <span className="hud-val">{fps}</span>
          </div>
          <div className="hud-badge">
            <span className="hud-label">3D 活跃 Token 节点:</span>
            <span className="hud-val highlight">{activeNodesCount}</span>
          </div>
          <div className="hud-badge">
            <span className="hud-label">粒子流动通量:</span>
            <span className="hud-val">{(speed * 1.5).toFixed(0)} node/s</span>
          </div>
        </div>
      </div>

      {/* 3D Canvas Box */}
      <div className="three-canvas-wrapper" style={{ position: 'relative' }}>
        <div ref={containerRef} className="three-dom-container" style={{ width: '100%', height: '480px', borderRadius: '16px', overflow: 'hidden' }} />

        {/* Floating Controls Overlay */}
        <div className="three-floating-controls">
          {/* Speed Adjuster */}
          <div className="control-group">
            <span className="control-label"><Zap size={14} /> 粒子喷射速率 ({speed} t/s):</span>
            <input
              type="range"
              min="1"
              max="200"
              value={speed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="three-range"
            />
          </div>

          {/* Theme Selector */}
          <div className="control-group">
            <span className="control-label"><Sparkles size={14} /> 主题色彩:</span>
            <div className="theme-buttons">
              <button className={`theme-btn ${theme === 'cyber' ? 'active' : ''}`} onClick={() => setTheme('cyber')}>
                赛博蓝粉
              </button>
              <button className={`theme-btn ${theme === 'matrix' ? 'active' : ''}`} onClick={() => setTheme('matrix')}>
                黑客矩阵
              </button>
              <button className={`theme-btn ${theme === 'quantum' ? 'active' : ''}`} onClick={() => setTheme('quantum')}>
                量子紫深
              </button>
              <button className={`theme-btn ${theme === 'solar' ? 'active' : ''}`} onClick={() => setTheme('solar')}>
                日光炽黄
              </button>
            </div>
          </div>

          {/* Play/Pause */}
          <button className="btn-secondary" onClick={() => setIsPlaying(!isPlaying)}>
            <Play size={14} /> {isPlaying ? '暂停 3D 动画' : '继续 3D 动画'}
          </button>
        </div>
      </div>

      {/* Speed Quick Preset Selector in 3D View */}
      <div className="three-preset-bar">
        <span>3D 速率预设体验:</span>
        <button className="pill-btn" onClick={() => onSpeedChange(2.5)}>2.5 t/s 打字</button>
        <button className="pill-btn highlight-pill" onClick={() => onSpeedChange(10)}>🎯 10 t/s 人类朗读</button>
        <button className="pill-btn" onClick={() => onSpeedChange(35)}>35 t/s 云端标准</button>
        <button className="pill-btn" onClick={() => onSpeedChange(80)}>80 t/s 高速推理</button>
        <button className="pill-btn" onClick={() => onSpeedChange(160)}>160 t/s 极速集群</button>
      </div>
    </div>
  );
};

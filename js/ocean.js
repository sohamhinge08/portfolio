/* ==========================================================================
   SOHAM HINGE — DEVELOPER PORTFOLIO
   Interactive Ocean Canvas & Atmospheric Scene
   Features: Multi-layer procedural sine waves, bobbing explorer galleon silhouette,
             night sky with golden celestial stars, and bioluminescent wave crests.
   ========================================================================== */

(function () {
  'use strict';

  const canvas = document.getElementById('oceanCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Check reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Starfield & ambient particles
  const stars = [];
  const starCount = Math.min(85, Math.floor(width / 14));

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * (height * 0.7),
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      isGold: Math.random() > 0.7,
    });
  }

  // Ship parameters
  const ship = {
    x: width * 0.15,
    y: height * 0.65,
    width: 54,
    height: 36,
    speed: prefersReducedMotion ? 0 : 0.35,
    bobAngle: 0,
    pitch: 0,
  };

  // Wave parameters using Dark Ocean palette
  let time = 0;
  const waves = [
    {
      amplitude: 14,
      length: 0.0035,
      speed: 0.012,
      color: 'rgba(9, 19, 44, 0.95)',
      yOffset: 0.64,
    },
    {
      amplitude: 18,
      length: 0.0045,
      speed: 0.018,
      color: 'rgba(12, 28, 64, 0.9)',
      yOffset: 0.68,
    },
    {
      amplitude: 22,
      length: 0.003,
      speed: 0.024,
      color: 'rgba(15, 36, 82, 0.85)',
      yOffset: 0.73,
    },
    {
      amplitude: 26,
      length: 0.002,
      speed: 0.03,
      color: 'rgba(6, 11, 24, 1.0)',
      yOffset: 0.79,
    },
  ];

  // Mouse interaction
  let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  // Handle Resize
  function onResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', onResize);

  // Draw Starfield & Deep Night Sky Gradient
  function drawSky() {
    // Night sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.8);
    skyGrad.addColorStop(0, '#030712');
    skyGrad.addColorStop(0.5, '#060d1f');
    skyGrad.addColorStop(1, '#0c1a3b');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle celestial gold nebula glow
    const nebulaGrad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.25,
      10,
      width * 0.5,
      height * 0.25,
      width * 0.45
    );
    nebulaGrad.addColorStop(0, 'rgba(234, 179, 8, 0.04)');
    nebulaGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.03)');
    nebulaGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = nebulaGrad;
    ctx.fillRect(0, 0, width, height * 0.75);

    // Stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      if (!prefersReducedMotion) {
        s.alpha += Math.sin(time * 50 * s.twinkleSpeed) * 0.015;
        if (s.alpha > 1) s.alpha = 1;
        if (s.alpha < 0.2) s.alpha = 0.2;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = s.isGold
        ? `rgba(254, 240, 138, ${s.alpha})`
        : `rgba(224, 242, 254, ${s.alpha})`;
      ctx.fill();
    }
  }

  // Draw Distant Island Silhouette
  function drawDistantIslands() {
    ctx.save();
    ctx.fillStyle = 'rgba(7, 14, 30, 0.75)';
    ctx.beginPath();
    const baseY = height * 0.63;
    ctx.moveTo(0, baseY);

    // Left island peak
    ctx.quadraticCurveTo(width * 0.12, baseY - 35, width * 0.25, baseY);
    ctx.lineTo(width * 0.65, baseY);
    // Right mysterious island peak
    ctx.quadraticCurveTo(width * 0.78, baseY - 48, width * 0.9, baseY);
    ctx.lineTo(width, baseY);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Draw the Explorer Galleon Silhouette
  function drawShip(x, y, pitch) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(pitch);

    // Lantern Warm Gold Glow
    const lanternGlow = ctx.createRadialGradient(-18, -12, 1, -18, -12, 16);
    lanternGlow.addColorStop(0, 'rgba(251, 191, 36, 0.85)');
    lanternGlow.addColorStop(0.5, 'rgba(234, 179, 8, 0.3)');
    lanternGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = lanternGlow;
    ctx.beginPath();
    ctx.arc(-18, -12, 16, 0, Math.PI * 2);
    ctx.fill();

    // Ship Hull
    ctx.fillStyle = '#060b18';
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(-24, 0);
    ctx.quadraticCurveTo(-20, 10, 0, 12);
    ctx.quadraticCurveTo(20, 10, 26, -2);
    ctx.lineTo(22, -6);
    ctx.lineTo(-22, -6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Masts
    ctx.strokeStyle = '#060b18';
    ctx.lineWidth = 2.5;

    // Main Mast
    ctx.beginPath();
    ctx.moveTo(2, -6);
    ctx.lineTo(2, -28);
    ctx.stroke();

    // Fore Mast
    ctx.beginPath();
    ctx.moveTo(-12, -6);
    ctx.lineTo(-12, -22);
    ctx.stroke();

    // Sails (Parchment White-Gold Tint)
    ctx.fillStyle = 'rgba(248, 250, 252, 0.9)';
    ctx.strokeStyle = 'rgba(234, 179, 8, 0.6)';
    ctx.lineWidth = 1;

    // Main Sail
    ctx.beginPath();
    ctx.moveTo(2, -26);
    ctx.quadraticCurveTo(12, -18, 2, -10);
    ctx.lineTo(3, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Fore Sail
    ctx.beginPath();
    ctx.moveTo(-12, -20);
    ctx.quadraticCurveTo(-4, -14, -12, -8);
    ctx.lineTo(-11, -8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Small Gold Flag
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(2, -28);
    ctx.lineTo(10, -26);
    ctx.lineTo(2, -24);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // Draw Wave Layer
  function drawWave(waveIndex, isTopLayer) {
    const wave = waves[waveIndex];
    ctx.save();
    ctx.fillStyle = wave.color;

    ctx.beginPath();
    const baseY = height * wave.yOffset;
    ctx.moveTo(0, height);
    ctx.lineTo(0, baseY);

    let shipWaveY = baseY;
    let shipWaveSlope = 0;

    for (let x = 0; x <= width; x += 10) {
      const wave1 = Math.sin(x * wave.length + time * wave.speed * 60) * wave.amplitude;
      const wave2 = Math.cos(x * wave.length * 0.6 - time * wave.speed * 40) * (wave.amplitude * 0.4);
      const y = baseY + wave1 + wave2;

      ctx.lineTo(x, y);

      if (waveIndex === 1 && Math.abs(x - ship.x) < 8) {
        shipWaveY = y;
        const nextY = baseY + Math.sin((x + 10) * wave.length + time * wave.speed * 60) * wave.amplitude;
        shipWaveSlope = (nextY - y) / 10;
      }
    }

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // Subtle Wave Crest
    if (isTopLayer || waveIndex === 2) {
      ctx.strokeStyle = waveIndex === 2 ? 'rgba(56, 189, 248, 0.4)' : 'rgba(234, 179, 8, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.restore();

    return { shipWaveY, shipWaveSlope };
  }

  // Animation Loop
  function render() {
    time += 0.016;

    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    ctx.clearRect(0, 0, width, height);

    drawSky();
    drawDistantIslands();
    drawWave(0, false);

    const waveData = drawWave(1, false);

    if (!prefersReducedMotion) {
      ship.x += ship.speed;
      if (ship.x > width + 80) {
        ship.x = -80;
      }
      ship.y = waveData.shipWaveY - 4;
      ship.pitch = waveData.shipWaveSlope * 0.6;
    } else {
      ship.y = height * 0.67;
      ship.pitch = 0;
    }

    drawShip(ship.x, ship.y, ship.pitch);

    drawWave(2, true);
    drawWave(3, false);

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationFrameId);
  });
})();

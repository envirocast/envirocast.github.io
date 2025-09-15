// src/components/models/quantum-particle-canvas.tsx

'use client';

import React, { useRef, useEffect } from 'react';
import { QuantumPhysicsEngine } from '@/lib/quantum-physics';

interface QuantumParticleCanvasProps {
  isPlaying: boolean;
  speed: number;
  selectedParticle: string | null;
  onParticleClick: (particleId: string | null) => void;
  engine: QuantumPhysicsEngine;
}

export const QuantumParticleCanvas: React.FC<QuantumParticleCanvasProps> = ({
  isPlaying,
  speed,
  selectedParticle,
  onParticleClick,
  engine
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !engine) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      drawBackground(ctx, canvas);

      if (isPlaying) {
        // Update particles
        const particles = engine.getAllParticles();
        particles.forEach(particle => {
          engine.updateParticle(particle, deltaTime, speed);
        });

        // Check for collisions
        engine.checkCollisions();
      }

      // Draw particles and effects
      drawQuantumField(ctx, canvas);
      drawParticles(ctx, engine, selectedParticle);
      drawEntanglements(ctx, engine);
      drawInterferencePatterns(ctx, engine);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speed, selectedParticle, engine]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !engine) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if click is on a particle
    const particles = engine.getAllParticles();
    let clickedParticle: string | null = null;

    for (const particle of particles) {
      const distance = Math.sqrt((x - particle.x) ** 2 + (y - particle.y) ** 2);
      if (distance < 15) { // Click radius
        clickedParticle = particle.id;
        break;
      }
    }

    onParticleClick(clickedParticle === selectedParticle ? null : clickedParticle);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={500}
      className="border border-slate-600 rounded-lg cursor-pointer bg-black"
      onClick={handleCanvasClick}
      style={{ background: 'radial-gradient(circle at center, #0f172a 0%, #000000 100%)' }}
    />
  );
};

function drawBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  // Draw quantum vacuum fluctuations
  ctx.save();
  ctx.globalAlpha = 0.1;
  
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 2;
    
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.restore();
}

function drawQuantumField(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  // Draw quantum field grid
  ctx.save();
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
  ctx.lineWidth = 0.5;
  
  const gridSize = 40;
  
  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  
  ctx.restore();
}

function drawParticles(ctx: CanvasRenderingContext2D, engine: QuantumPhysicsEngine, selectedParticle: string | null) {
  const particles = engine.getAllParticles();
  
  particles.forEach(particle => {
    const isSelected = selectedParticle === particle.id;
    
    // Draw particle trail
    drawParticleTrail(ctx, particle);
    
    // Draw uncertainty cloud for selected particle
    drawUncertaintyCloud(ctx, particle, isSelected);
    
    // Draw main particle
    ctx.save();
    
    // Particle glow effect
    if (particle.superposition) {
      const glowGradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, 20);
      glowGradient.addColorStop(0, particle.isEntangled ? 'rgba(239, 68, 68, 0.8)' : 'rgba(139, 92, 246, 0.8)');
      glowGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 20, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Main particle body
    ctx.fillStyle = particle.isEntangled ? '#ef4444' : particle.superposition ? '#8b5cf6' : '#06b6d4';
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius || 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Selection indicator
    if (isSelected) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, (particle.radius || 5) + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Draw quantum state visualization for selected particle
    drawQuantumStateVisualization(ctx, particle, isSelected);
    
    ctx.restore();
  });
}

function drawParticleTrail(ctx: CanvasRenderingContext2D, particle: any) {
  if (!particle.trail || particle.trail.length < 2) return;
  
  ctx.save();
  
  for (let i = 1; i < particle.trail.length; i++) {
    const current = particle.trail[i];
    const previous = particle.trail[i - 1];
    
    ctx.globalAlpha = current.opacity * 0.5;
    ctx.strokeStyle = particle.isEntangled ? '#ef4444' : '#06b6d4';
    ctx.lineWidth = 2 * current.opacity;
    
    ctx.beginPath();
    ctx.moveTo(previous.x, previous.y);
    ctx.lineTo(current.x, current.y);
    ctx.stroke();
  }
  
  ctx.restore();
}

function drawUncertaintyCloud(ctx: CanvasRenderingContext2D, particle: any, isSelected: boolean) {
  if (!isSelected) return;
  
  ctx.save();
  ctx.globalAlpha = 0.2;
  
  const radius = particle.uncertainty || 30;
  const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, radius);
  gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
  gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
}

function drawQuantumStateVisualization(ctx: CanvasRenderingContext2D, particle: any, isSelected: boolean) {
  if (!isSelected) return;
  
  const stateRadius = 30;
  const centerX = particle.x + 40;
  const centerY = particle.y - 40;
  
  ctx.save();
  
  // Draw Bloch sphere representation
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  
  // Draw sphere outline
  ctx.beginPath();
  ctx.arc(centerX, centerY, stateRadius, 0, Math.PI * 2);
  ctx.stroke();
  
  // Draw axes
  ctx.beginPath();
  ctx.moveTo(centerX - stateRadius, centerY);
  ctx.lineTo(centerX + stateRadius, centerY);
  ctx.moveTo(centerX, centerY - stateRadius);
  ctx.lineTo(centerX, centerY + stateRadius);
  ctx.stroke();
  
  // Draw state vector
  const theta = (particle.qubitState?.probability || 0.5) * Math.PI;
  const phi = Date.now() * 0.001;
  
  const stateX = centerX + stateRadius * 0.8 * Math.sin(theta) * Math.cos(phi);
  const stateY = centerY - stateRadius * 0.8 * Math.cos(theta);
  
  ctx.strokeStyle = '#8b5cf6';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(stateX, stateY);
  ctx.stroke();
  
  // Draw state point
  ctx.fillStyle = '#8b5cf6';
  ctx.beginPath();
  ctx.arc(stateX, stateY, 3, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
}

function drawEntanglements(ctx: CanvasRenderingContext2D, engine: QuantumPhysicsEngine) {
  const entanglements = engine.getEntanglements();
  const particles = engine.getAllParticles();
  
  entanglements.forEach(entanglement => {
    const particle1 = particles.find(p => p.id === entanglement.particle1);
    const particle2 = particles.find(p => p.id === entanglement.particle2);
    
    if (!particle1 || !particle2) return;
    
    ctx.save();
    
    // Animated entanglement line
    const time = Date.now() * 0.005;
    const opacity = 0.5 + 0.3 * Math.sin(time);
    ctx.globalAlpha = opacity;
    
    // Create gradient line
    const gradient = ctx.createLinearGradient(particle1.x, particle1.y, particle2.x, particle2.y);
    gradient.addColorStop(0, '#ef4444');
    gradient.addColorStop(0.5, '#f59e0b');
    gradient.addColorStop(1, '#ef4444');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.lineDashOffset = -time * 10;
    
    ctx.beginPath();
    ctx.moveTo(particle1.x, particle1.y);
    ctx.lineTo(particle2.x, particle2.y);
    ctx.stroke();
    
    // Draw entanglement strength indicator
    const midX = (particle1.x + particle2.x) / 2;
    const midY = (particle1.y + particle2.y) / 2;
    
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${(entanglement.strength * 100).toFixed(0)}%`, midX, midY - 10);
    
    ctx.restore();
  });
}

function drawInterferencePatterns(ctx: CanvasRenderingContext2D, engine: QuantumPhysicsEngine) {
  const particles = engine.getAllParticles();
  
  // Draw wave interference between superposition particles
  const superpositionParticles = particles.filter(p => p.superposition && p.visible !== false);
  
  if (superpositionParticles.length < 2) return;
  
  ctx.save();
  ctx.globalAlpha = 0.1;
  
  for (let i = 0; i < superpositionParticles.length; i++) {
    for (let j = i + 1; j < superpositionParticles.length; j++) {
      const p1 = superpositionParticles[i];
      const p2 = superpositionParticles[j];
      
      const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
      
      if (distance < 150) {
        // Draw interference pattern
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        
        const time = Date.now() * 0.001;
        const waveLength = 20;
        const amplitude = 10 * (1 - distance / 150);
        
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 1;
        
        for (let k = 0; k < 5; k++) {
          const offset = k * waveLength;
          const radius = offset + amplitude * Math.sin(time * 2 + k);
          
          if (radius > 0) {
            ctx.beginPath();
            ctx.arc(midX, midY, radius, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }
    }
  }
  
  ctx.restore();
}

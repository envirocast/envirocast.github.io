// src/components/models/quantum-particle-canvas.tsx

'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Particle } from '@/types/quantum';
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
  const animationFrameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    if (!particle.visible && particle.superposition) {
      // Flickering due to superposition
      if (Math.random() < 0.3) return;
    }

    const isSelected = selectedParticle === particle.id;
    const isHighlighted = selectedParticle && particle.entangledWith === selectedParticle;

    // Draw uncertainty halo
    if (isSelected || isHighlighted) {
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.uncertainty
      );
      gradient.addColorStop(0, 'rgba(100, 200, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(100, 200, 255, 0.02)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.uncertainty, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw particle
    const size = particle.energy / 20 + 3;
    let color = '#00D4FF';
    
    if (particle.isEntangled) {
      color = '#FF6B6B';
    } else if (particle.hasTunneled) {
      color = '#FFD93D';
    } else if (particle.superposition) {
      color = `hsl(${(Date.now() * 0.1) % 360}, 70%, 60%)`;
    }

    // Outer glow
    const glowGradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, size * 3
    );
    glowGradient.addColorStop(0, color);
    glowGradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2);
    ctx.fill();

    // Core particle
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = size * 2;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Selection highlight
    if (isSelected || isHighlighted) {
      ctx.strokeStyle = isSelected ? '#FFFFFF' : '#FFD93D';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, [selectedParticle]);

  const drawTrail = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    if (particle.trail.length < 2) return;

    ctx.strokeStyle = '#00D4FF';
    ctx.lineWidth = 2;

    for (let i = 1; i < particle.trail.length; i++) {
      const current = particle.trail[i];
      const previous = particle.trail[i - 1];
      
      ctx.globalAlpha = current.opacity * 0.5;
      ctx.beginPath();
      ctx.moveTo(previous.x, previous.y);
      ctx.lineTo(current.x, current.y);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
  }, []);

  const drawEntanglementLines = useCallback((ctx: CanvasRenderingContext2D) => {
    const particles = engine.getAllParticles();
    
    particles.forEach(particle => {
      if (particle.isEntangled && particle.entangledWith) {
        const entangled = engine.getParticle(particle.entangledWith);
        if (entangled && particle.id < entangled.id) { // Draw line only once per pair
          ctx.strokeStyle = '#FF6B6B';
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.6;
          ctx.setLineDash([5, 5]);
          
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(entangled.x, entangled.y);
          ctx.stroke();
          
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;
        }
      }
    });
  }, [engine]);

  const render = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dark background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (isPlaying) {
      // Update physics
      const particles = engine.getAllParticles();
      particles.forEach(particle => {
        engine.updateParticle(particle, deltaTime, speed);
      });
      
      // Check for collisions/entanglements
      engine.checkCollisions();
    }

    // Draw trails first
    engine.getAllParticles().forEach(particle => {
      drawTrail(ctx, particle);
    });

    // Draw entanglement lines
    drawEntanglementLines(ctx);

    // Draw particles
    engine.getAllParticles().forEach(particle => {
      drawParticle(ctx, particle);
    });

    animationFrameRef.current = requestAnimationFrame(render);
  }, [isPlaying, speed, drawParticle, drawTrail, drawEntanglementLines, engine]);

  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if click is on a particle
    const particles = engine.getAllParticles();
    let clickedParticle = null;

    for (const particle of particles) {
      const dx = x - particle.x;
      const dy = y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const particleSize = particle.energy / 20 + 3;

      if (distance <= particleSize + 5) {
        clickedParticle = particle.id;
        break;
      }
    }

    onParticleClick(clickedParticle);
  }, [engine, onParticleClick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 500;

    // Start animation
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      className="border border-slate-700 rounded-xl cursor-pointer bg-slate-900"
      onClick={handleCanvasClick}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};

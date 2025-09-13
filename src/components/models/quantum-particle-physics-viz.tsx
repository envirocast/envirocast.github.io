// src/components/models/quantum-particle-physics-viz.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import { QuantumPhysicsEngine } from '@/lib/quantum-physics';
import { QuantumParticleCanvas } from './quantum-particle-canvas';
import { ParticlePropertiesPanel } from './particle-properties-panel';
import { QuantumInfoPanel } from './quantum-info-panel';

interface QuantumParticlePhysicsVizProps {
  isPlaying: boolean;
  speed: number;
  onPlayToggle: () => void;
  onSpeedChange: (speed: number) => void;
}

export const QuantumParticlePhysicsViz: React.FC<QuantumParticlePhysicsVizProps> = ({
  isPlaying,
  speed,
  onPlayToggle,
  onSpeedChange
}) => {
  const [selectedParticle, setSelectedParticle] = useState<string | null>(null);
  const [particleCount, setParticleCount] = useState(25);
  const engineRef = useRef<QuantumPhysicsEngine | null>(null);

  // Initialize physics engine
  useEffect(() => {
    engineRef.current = new QuantumPhysicsEngine({ width: 800, height: 500 });
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      engineRef.current.createParticle();
    }
  }, []);

  // Update particle count
  useEffect(() => {
    if (!engineRef.current) return;
    
    const currentParticles = engineRef.current.getAllParticles();
    const currentCount = currentParticles.length;
    
    if (currentCount < particleCount) {
      // Add particles
      for (let i = 0; i < particleCount - currentCount; i++) {
        engineRef.current.createParticle();
      }
    } else if (currentCount > particleCount) {
      // Remove particles
      const particlesToRemove = currentParticles.slice(particleCount);
      particlesToRemove.forEach(particle => {
        engineRef.current?.removeParticle(particle.id);
      });
    }
  }, [particleCount]);

  const handleReset = () => {
    if (!engineRef.current) return;
    
    // Clear existing particles and create new ones
    engineRef.current.clearAllParticles();
    for (let i = 0; i < particleCount; i++) {
      engineRef.current.createParticle();
    }
    setSelectedParticle(null);
  };

  const adjustParticleCount = (delta: number) => {
    setParticleCount(prev => Math.max(5, Math.min(50, prev + delta)));
  };

  if (!engineRef.current) {
    return <div className="text-center py-8 text-white">Loading quantum simulation...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              Quantum Particle Physics Simulation
            </h3>
            <p className="text-slate-300">
              Interactive quantum mechanics demonstration showing superposition, entanglement, and tunneling
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Particle Count Controls */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-300">Particles:</span>
              <button
                onClick={() => adjustParticleCount(-5)}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <Minus className="w-4 h-4 text-slate-300" />
              </button>
              <span className="text-white font-semibold min-w-[2rem] text-center">
                {particleCount}
              </span>
              <button
                onClick={() => adjustParticleCount(5)}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 text-slate-300" />
              </button>
            </div>

            {/* Speed Control */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-300">Speed:</span>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={speed}
                onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                className="w-20 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-white font-semibold text-sm min-w-[2rem]">
                {speed.toFixed(1)}x
              </span>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onPlayToggle}
                className={`p-3 rounded-lg font-semibold transition-all ${
                  isPlaying 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg'
                }`}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={handleReset}
                className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <RotateCcw className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex justify-center">
          <QuantumParticleCanvas
            isPlaying={isPlaying}
            speed={speed}
            selectedParticle={selectedParticle}
            onParticleClick={setSelectedParticle}
            engine={engineRef.current}
          />
        </div>
        
        {/* Canvas Instructions */}
        <div className="mt-4 text-center">
          <p className="text-sm text-slate-400">
            Click on particles to view their quantum properties • Watch for entanglement when particles collide
          </p>
        </div>
      </div>

      {/* Information Panel */}
      <QuantumInfoPanel />

      {/* Particle Properties Panel (Floating) */}
      <ParticlePropertiesPanel
        selectedParticle={selectedParticle}
        onClose={() => setSelectedParticle(null)}
        engine={engineRef.current}
      />
    </div>
  );
};

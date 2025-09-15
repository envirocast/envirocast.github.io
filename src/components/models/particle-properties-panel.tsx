// src/components/models/particle-properties-panel.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Atom, Zap, Eye, Link, Shuffle, AlertTriangle, Target, Activity } from 'lucide-react';
import { GlobalEnvironmentEngine } from '@/lib/global-environment';
import { QuantumPhysicsEngine } from '@/lib/quantum-physics';

interface ParticlePropertiesPanelProps {
  selectedParticle: string;
  onClose: () => void;
  engine: QuantumPhysicsEngine;
  inline?: boolean;
}

export const ParticlePropertiesPanel: React.FC<ParticlePropertiesPanelProps> = ({
  selectedParticle,
  onClose,
  engine,
  inline = false
}) => {
  const [properties, setProperties] = useState<any>(null);
  const [updateCounter, setUpdateCounter] = useState(0);

  useEffect(() => {
    const updateProperties = () => {
      const props = engine.getParticleProperties(selectedParticle);
      setProperties(props);
    };

    updateProperties();
    const interval = setInterval(() => {
      updateProperties();
      setUpdateCounter(prev => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [selectedParticle, engine]);

  if (!properties) {
    return (
      <div className={`${inline ? 'h-full' : ''} bg-slate-800 rounded-xl p-6 border border-slate-700`}>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading particle data...</p>
        </div>
      </div>
    );
  }

  const containerClasses = inline 
    ? "h-full bg-slate-900 rounded-xl p-4 border border-slate-700"
    : "bg-slate-800 rounded-2xl p-6 border border-slate-700";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={containerClasses}
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-bold text-white flex items-center">
          <Atom className="w-5 h-5 mr-2 text-purple-400" />
          Quantum Particle {properties.id}
        </h4>
        <button
          onClick={onClose}
          className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-slate-300" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Basic Properties */}
        <div className="bg-slate-900/50 rounded-lg p-4">
          <h5 className="text-white font-medium mb-3 flex items-center">
            <Target className="w-4 h-4 mr-2 text-cyan-400" />
            Position & Motion
          </h5>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-slate-400">Position (x, y)</div>
              <div className="text-cyan-300 font-mono">
                ({properties.position.x}, {properties.position.y})
              </div>
            </div>
            <div>
              <div className="text-slate-400">Velocity (vx, vy)</div>
              <div className="text-green-300 font-mono">
                ({properties.velocity.vx}, {properties.velocity.vy})
              </div>
            </div>
            <div>
              <div className="text-slate-400">Energy Level</div>
              <div className="text-yellow-300 font-semibold">{properties.energy} eV</div>
            </div>
            <div>
              <div className="text-slate-400">Uncertainty</div>
              <div className="text-orange-300 font-semibold">±{properties.uncertainty}</div>
            </div>
          </div>
        </div>

        {/* Quantum State */}
        <div className="bg-slate-900/50 rounded-lg p-4">
          <h5 className="text-white font-medium mb-3 flex items-center">
            <Atom className="w-4 h-4 mr-2 text-purple-400" />
            Quantum State
          </h5>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">|0⟩ Probability</span>
              <span className="text-purple-300 font-mono">{(properties.qubitProbabilities.state0 * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${properties.qubitProbabilities.state0 * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-400">|1⟩ Probability</span>
              <span className="text-pink-300 font-mono">{(properties.qubitProbabilities.state1 * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500"
                style={{ width: `${properties.qubitProbabilities.state1 * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quantum Effects */}
        <div className="bg-slate-900/50 rounded-lg p-4">
          <h5 className="text-white font-medium mb-3 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-yellow-400" />
            Quantum Effects
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className={`w-4 h-4 ${properties.superposition ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="text-slate-300">Superposition</span>
              </div>
              <div className={`px-2 py-1 rounded text-xs ${
                properties.superposition ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-700 text-slate-400'
              }`}>
                {properties.superposition ? 'Active' : 'Collapsed'}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link className={`w-4 h-4 ${properties.isEntangled ? 'text-red-400' : 'text-slate-500'}`} />
                <span className="text-slate-300">Entanglement</span>
              </div>
              <div className={`px-2 py-1 rounded text-xs ${
                properties.isEntangled ? 'bg-red-500/20 text-red-300' : 'bg-slate-700 text-slate-400'
              }`}>
                {properties.isEntangled ? `Linked to ${properties.entangledWith}` : 'Independent'}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shuffle className="w-4 h-4 text-yellow-400" />
                <span className="text-slate-300">Tunnel Events</span>
              </div>
              <div className="text-yellow-300 font-semibold">{properties.tunnelCount}</div>
            </div>
          </div>
        </div>

        {/* Heisenberg Uncertainty */}
        <div className="bg-slate-900/50 rounded-lg p-4">
          <h5 className="text-white font-medium mb-3 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 text-orange-400" />
            Heisenberg Uncertainty Principle
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Position Error (Δx)</span>
              <span className="text-orange-300">±{properties.errorMargins.position}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Momentum Error (Δp)</span>
              <span className="text-orange-300">±{properties.errorMargins.momentum}</span>
            </div>
            <div className="mt-2 p-2 bg-orange-500/10 rounded border border-orange-500/20">
              <div className="text-orange-300 text-xs">
                Δx · Δp ≥ ℏ/2 = {(properties.errorMargins.position * properties.errorMargins.momentum).toFixed(3)}
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Updates Indicator */}
        <div className="flex items-center justify-center py-2">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>Live Updates: {updateCounter}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

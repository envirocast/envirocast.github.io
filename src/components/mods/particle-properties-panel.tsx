// src/components/mods/particle-properties-panel.tsx

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Target, Atom, Activity, AlertTriangle } from 'lucide-react';
import { QuantumPhysicsEngine } from '@/lib/quantum-physics';

interface ParticlePropertiesPanelProps {
  selectedParticle: string | null;
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
  if (!selectedParticle) return null;

  const properties = engine.getParticleProperties(selectedParticle);
  if (!properties) return null;

  // Inline version (inside canvas container)
  if (inline) {
    return (
      <div className="bg-slate-900 border border-slate-600 rounded-xl h-full flex flex-col w-full">
        {/* Fixed Header */}
        <div className="flex-shrink-0 bg-slate-900 border-b border-slate-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Atom className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Particle Properties</h3>
                <p className="text-sm text-slate-400">ID: {properties.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Position & Velocity */}
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="w-4 h-4 text-blue-400" />
              <h4 className="text-sm font-semibold text-white">Position & Motion</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Position (x, y):</span>
                <span className="text-white font-mono">
                  ({properties.position.x}, {properties.position.y})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Velocity (vx, vy):</span>
                <span className="text-white font-mono">
                  ({properties.velocity.vx}, {properties.velocity.vy})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Energy Level:</span>
                <span className="text-green-400 font-semibold">{properties.energy}</span>
              </div>
            </div>
          </div>

          {/* Quantum States */}
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Activity className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-semibold text-white">Quantum State</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">|0⟩ Probability:</span>
                <span className="text-cyan-400 font-mono">
                  {properties.qubitProbabilities.state0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">|1⟩ Probability:</span>
                <span className="text-cyan-400 font-mono">
                  {properties.qubitProbabilities.state1}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Superposition:</span>
                <span className={properties.superposition ? "text-yellow-400" : "text-gray-400"}>
                  {properties.superposition ? "Active" : "Collapsed"}
                </span>
              </div>
            </div>
          </div>

          {/* Entanglement */}
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-4 h-4 text-red-400" />
              <h4 className="text-sm font-semibold text-white">Entanglement</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Status:</span>
                <span className={properties.isEntangled ? "text-red-400" : "text-gray-400"}>
                  {properties.isEntangled ? "Entangled" : "Independent"}
                </span>
              </div>
              {properties.entangledWith && (
                <div className="flex justify-between">
                  <span className="text-slate-300">Entangled with:</span>
                  <span className="text-red-400 font-mono text-xs">{properties.entangledWith}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-300">Tunnel Count:</span>
                <span className="text-yellow-400">{properties.tunnelCount}</span>
              </div>
            </div>
          </div>

          {/* Uncertainty & Error Margins */}
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <h4 className="text-sm font-semibold text-white">Heisenberg Uncertainty</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Position Error:</span>
                <span className="text-orange-400">±{properties.errorMargins.position}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Momentum Error:</span>
                <span className="text-orange-400">±{properties.errorMargins.momentum}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Uncertainty:</span>
                <span className="text-orange-400">{properties.uncertainty}</span>
              </div>
            </div>
          </div>

          {/* Visual Indicators */}
          <div className="flex flex-wrap gap-4 text-xs pb-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
              <span className="text-slate-300">Normal</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-slate-300">Entangled</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-slate-300">Tunneled</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original floating version (fallback)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-20 right-4 w-80 bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl z-50"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Atom className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Particle Properties</h3>
              <p className="text-sm text-slate-400">ID: {properties.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Position & Velocity */}
          <div className="bg-slate-900 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="w-4 h-4 text-blue-400" />
              <h4 className="text-sm font-semibold text-white">Position & Motion</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Position (x, y):</span>
                <span className="text-white font-mono">
                  ({properties.position.x}, {properties.position.y})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Velocity (vx, vy):</span>
                <span className="text-white font-mono">
                  ({properties.velocity.vx}, {properties.velocity.vy})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Energy Level:</span>
                <span className="text-green-400 font-semibold">{properties.energy}</span>
              </div>
            </div>
          </div>

          {/* Quantum States */}
          <div className="bg-slate-900 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Activity className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-semibold text-white">Quantum State</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">|0⟩ Probability:</span>
                <span className="text-cyan-400 font-mono">
                  {properties.qubitProbabilities.state0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">|1⟩ Probability:</span>
                <span className="text-cyan-400 font-mono">
                  {properties.qubitProbabilities.state1}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Superposition:</span>
                <span className={properties.superposition ? "text-yellow-400" : "text-gray-400"}>
                  {properties.superposition ? "Active" : "Collapsed"}
                </span>
              </div>
            </div>
          </div>

          {/* Entanglement */}
          <div className="bg-slate-900 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-4 h-4 text-red-400" />
              <h4 className="text-sm font-semibold text-white">Entanglement</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Status:</span>
                <span className={properties.isEntangled ? "text-red-400" : "text-gray-400"}>
                  {properties.isEntangled ? "Entangled" : "Independent"}
                </span>
              </div>
              {properties.entangledWith && (
                <div className="flex justify-between">
                  <span className="text-slate-300">Entangled with:</span>
                  <span className="text-red-400 font-mono">{properties.entangledWith}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-300">Tunnel Count:</span>
                <span className="text-yellow-400">{properties.tunnelCount}</span>
              </div>
            </div>
          </div>

          {/* Uncertainty & Error Margins */}
          <div className="bg-slate-900 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <h4 className="text-sm font-semibold text-white">Heisenberg Uncertainty</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Position Error:</span>
                <span className="text-orange-400">±{properties.errorMargins.position}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Momentum Error:</span>
                <span className="text-orange-400">±{properties.errorMargins.momentum}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Uncertainty:</span>
                <span className="text-orange-400">{properties.uncertainty}</span>
              </div>
            </div>
          </div>

          {/* Visual Indicators */}
          <div className="flex space-x-2 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
              <span className="text-slate-300">Normal</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-slate-300">Entangled</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-slate-300">Tunneled</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

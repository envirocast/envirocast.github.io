// src/components/mods/quantum-info-panel.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Atom, 
  Zap, 
  Eye, 
  Activity, 
  AlertTriangle, 
  Target,
  Shuffle,
  Link
} from 'lucide-react';
import { QuantumPhysicsEngine } from '@/lib/quantum-physics';

interface QuantumInfoPanelProps {
  engine: QuantumPhysicsEngine;
}

export const QuantumInfoPanel: React.FC<QuantumInfoPanelProps> = ({ engine }) => {
  // Get real-time statistics
  const particles = engine.getAllParticles();
  const entanglements = engine.getEntanglements();
  
  const activeParticles = particles.length;
  const entangledPairs = entanglements.length;
  const totalTunnels = particles.reduce((sum, p) => sum + p.tunnelCount, 0);
  const superpositionCount = particles.filter(p => p.superposition).length;

  const quantumConcepts = [
    {
      icon: Atom,
      title: "Quantum Superposition",
      description: "Particles exist in multiple states simultaneously until observed. Watch for flickering particles.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Link,
      title: "Quantum Entanglement", 
      description: "When particles touch, they become entangled and share quantum properties instantaneously.",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Shuffle,
      title: "Quantum Tunneling",
      description: "Particles can 'tunnel' through barriers and appear in different locations randomly.",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: AlertTriangle,
      title: "Heisenberg Uncertainty",
      description: "The more precisely we know a particle's position, the less we know about its momentum.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Activity,
      title: "Wave-Particle Duality",
      description: "Particles exhibit both wave and particle properties, creating trails and interference patterns.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Eye,
      title: "Observer Effect",
      description: "The act of observation affects quantum systems. Click particles to 'observe' their properties.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          Quantum Physics Concepts
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          This simulation demonstrates key quantum mechanical principles that power our 
          environmental modeling algorithms. Each particle follows quantum rules that 
          enable superposition-based calculations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quantumConcepts.map((concept, index) => {
          const Icon = concept.icon;
          return (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800 rounded-xl p-4 border border-slate-700"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${concept.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {concept.title}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {concept.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quantum Statistics Panel */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h4 className="text-xl font-bold text-white mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-cyan-400" />
          Real-Time Quantum Statistics
        </h4>
        
        <div className="grid md:grid-cols-4 gap-4">
          <motion.div 
            className="bg-slate-900 rounded-lg p-4 text-center"
            key="active-particles"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl font-bold text-cyan-400 mb-1">{activeParticles}</div>
            <div className="text-xs text-slate-400">Active Particles</div>
          </motion.div>
          
          <motion.div 
            className="bg-slate-900 rounded-lg p-4 text-center"
            key="entangled-pairs"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl font-bold text-red-400 mb-1">{entangledPairs}</div>
            <div className="text-xs text-slate-400">Entangled Pairs</div>
          </motion.div>
          
          <motion.div 
            className="bg-slate-900 rounded-lg p-4 text-center"
            key="total-tunnels"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl font-bold text-yellow-400 mb-1">{totalTunnels}</div>
            <div className="text-xs text-slate-400">Total Tunnels</div>
          </motion.div>
          
          <motion.div 
            className="bg-slate-900 rounded-lg p-4 text-center"
            key="superposition-count"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl font-bold text-purple-400 mb-1">{superpositionCount}</div>
            <div className="text-xs text-slate-400">Superposition</div>
          </motion.div>
        </div>
      </div>

      {/* Interaction Guide */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-6 border border-cyan-500/30">
        <h4 className="text-lg font-bold text-white mb-4">Interaction Guide</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-cyan-300 mb-2">Controls</h5>
            <ul className="space-y-1 text-slate-300">
              <li>• Click particles to view properties</li>
              <li>• Use play/pause to control simulation</li>
              <li>• Adjust speed to see effects clearly</li>
              <li>• Watch for particle collisions</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-purple-300 mb-2">Visual Cues</h5>
            <ul className="space-y-1 text-slate-300">
              <li>• Blue glow: Normal particles</li>
              <li>• Red glow: Entangled particles</li>
              <li>• Yellow glow: Recently tunneled</li>
              <li>• Flickering: Superposition state</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

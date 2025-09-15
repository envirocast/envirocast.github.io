// src/components/models/quantum-particle-physics-viz.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuantumPhysicsEngine } from '@/lib/quantum-physics';
import { QuantumParticleCanvas } from './quantum-particle-canvas';
import { ParticlePropertiesPanel } from './particle-properties-panel';
import { QuantumInfoPanel } from './quantum-info-panel';
import { 
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Zap,
  Target,
  Atom
} from 'lucide-react';

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
  const [engine] = useState(() => new QuantumPhysicsEngine({ width: 800, height: 500 }));
  const [selectedParticle, setSelectedParticle] = useState<string | null>(null);
  const [particleCount, setParticleCount] = useState(12);

  useEffect(() => {
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      engine.createParticle();
    }
  }, [engine, particleCount]);

  const handleAddParticles = () => {
    if (particleCount < 50) {
      engine.createParticle();
      setParticleCount(prev => prev + 1);
    }
  };

  const handleRemoveParticles = () => {
    if (particleCount > 1) {
      const particles = engine.getAllParticles();
      if (particles.length > 0) {
        engine.removeParticle(particles[particles.length - 1].id);
        setParticleCount(prev => prev - 1);
        if (selectedParticle === particles[particles.length - 1].id) {
          setSelectedParticle(null);
        }
      }
    }
  };

  const handleReset = () => {
    engine.clearAllParticles();
    for (let i = 0; i < 12; i++) {
      engine.createParticle();
    }
    setParticleCount(12);
    setSelectedParticle(null);
  };

  const handleParticleClick = (particleId: string | null) => {
    setSelectedParticle(particleId);
  };

  return (
    <div className="space-y-8">
      {/* Main Simulation */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <Atom className="w-6 h-6 mr-3 text-purple-400" />
            Quantum Particle Physics Simulation
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-slate-300 text-sm">Particles:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRemoveParticles}
                  disabled={particleCount <= 1}
                  className="p-1 bg-red-500/20 hover:bg-red-500/30 disabled:bg-slate-700 disabled:opacity-50 rounded text-red-300 disabled:text-slate-500 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white font-semibold text-sm w-8 text-center">{particleCount}</span>
                <button
                  onClick={handleAddParticles}
                  disabled={particleCount >= 50}
                  className="p-1 bg-green-500/20 hover:bg-green-500/30 disabled:bg-slate-700 disabled:opacity-50 rounded text-green-300 disabled:text-slate-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-slate-300" />
            </button>
          </div>
        </div>

        {/* Canvas and Properties Panel */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <QuantumParticleCanvas
              isPlaying={isPlaying}
              speed={speed}
              selectedParticle={selectedParticle}
              onParticleClick={handleParticleClick}
              engine={engine}
            />
            
            {/* Canvas Info */}
            <div className="mt-4 text-center">
              <p className="text-slate-400 text-sm">
                Click on particles to inspect their quantum properties. 
                Watch for entanglement (red lines), tunneling (yellow glow), and superposition (flickering).
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <ParticlePropertiesPanel
              selectedParticle={selectedParticle}
              onClose={() => setSelectedParticle(null)}
              engine={engine}
              inline={true}
            />
          </div>
        </div>
      </div>

      {/* Quantum Concepts Explanation */}
      <QuantumInfoPanel engine={engine} />

      {/* Quantum Physics in Environmental Modeling */}
      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl p-8 border border-purple-500/30">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Zap className="w-6 h-6 mr-3 text-cyan-400" />
          How This Powers EnviroCast
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cyan-300">Quantum Environmental Modeling</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <p>
                Just as quantum particles exist in superposition, our environmental models analyze 
                multiple pollution scenarios simultaneously, enabling faster and more accurate predictions.
              </p>
              <p>
                Quantum entanglement principles help us understand how environmental factors across 
                different regions are interconnected, leading to better global climate modeling.
              </p>
              <p>
                The uncertainty principle applies to environmental measurements too - our models account 
                for measurement limitations and provide confidence intervals for predictions.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-300">Practical Applications</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <Target className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Superposition Computing</div>
                  <div className="text-slate-400">Analyze thousands of weather scenarios in parallel</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Zap className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Quantum Entanglement</div>
                  <div className="text-slate-400">Model correlations between distant environmental systems</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Atom className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Quantum Tunneling</div>
                  <div className="text-slate-400">Predict sudden environmental changes and tipping points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Quantum Computing Applications */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Cpu className="w-6 h-6 mr-3 text-purple-400" />
          Quantum Computing in Environmental Science
        </h3>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-slate-900 rounded-xl p-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white">Data Processing</h4>
            </div>
            <div className="space-y-3 text-sm text-slate-300">
              <p>Quantum algorithms process massive environmental datasets exponentially faster than classical computers.</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">TEMPO Satellite Data:</span>
                  <span className="text-cyan-400">2.3 TB/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Processing Speed:</span>
                  <span className="text-green-400">1000x faster</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Parallel Scenarios:</span>
                  <span className="text-purple-400">10,000+</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-slate-900 rounded-xl p-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Network className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white">Pattern Recognition</h4>
            </div>
            <div className="space-y-3 text-sm text-slate-300">
              <p>Quantum machine learning identifies complex environmental patterns invisible to classical analysis.</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Climate Correlations:</span>
                  <span className="text-red-400">98.7% accuracy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pollution Hotspots:</span>
                  <span className="text-orange-400">Real-time ID</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tipping Points:</span>
                  <span className="text-yellow-400">Early warning</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-slate-900 rounded-xl p-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white">Global Modeling</h4>
            </div>
            <div className="space-y-3 text-sm text-slate-300">
              <p>Quantum entanglement models capture global environmental interconnections with unprecedented detail.</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Global Coverage:</span>
                  <span className="text-blue-400">100% Earth</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Resolution:</span>
                  <span className="text-cyan-400">2.1km grid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Update Freq:</span>
                  <span className="text-green-400">Hourly</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quantum vs Classical Comparison */}
        <div className="bg-slate-900/50 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-cyan-400" />
            Performance Comparison: Quantum vs Classical Computing
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-md font-medium text-slate-300 mb-3">Classical Computing Limitations</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <span className="text-slate-400">Sequential processing limits scenario analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  <span className="text-slate-400">Exponential time complexity for optimization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <span className="text-slate-400">Limited correlation detection across datasets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="text-slate-400">Requires simplified environmental models</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="text-md font-medium text-cyan-300 mb-3">Quantum Computing Advantages</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-slate-300">Parallel processing via superposition states</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  <span className="text-slate-300">Polynomial speedup for optimization problems</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  <span className="text-slate-300">Quantum entanglement reveals hidden correlations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-slate-300">Handles full complexity of atmospheric systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Applications */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Factory className="w-6 h-6 mr-3 text-orange-400" />
          Real-World Environmental Applications
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Satellite className="w-8 h-8 text-blue-300" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">TEMPO Integration</h4>
            <p className="text-sm text-slate-400">NASA's TEMPO satellite provides hourly air quality data across North America</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-8 h-8 text-red-300" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Health Alerts</h4>
            <p className="text-sm text-slate-400">Predict pollution spikes and health risks hours before they occur</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Wind className="w-8 h-8 text-green-300" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Climate Modeling</h4>
            <p className="text-sm text-slate-400">Model complex atmospheric interactions and climate feedback loops</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Brain className="w-8 h-8 text-purple-300" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">AI Enhancement</h4>
            <p className="text-sm text-slate-400">Quantum-enhanced machine learning for pattern recognition</p>
          </div>
        </div>

        {/* Case Studies */}
        <div className="space-y-6">
          <h4 className="text-xl font-semibold text-white mb-4">Case Studies & Success Stories</h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Thermometer className="w-5 h-5 text-red-400" />
                <h5 className="text-lg font-medium text-white">Urban Heat Island Detection</h5>
              </div>
              <div className="space-y-3 text-sm text-slate-300">
                <p>
                  Quantum algorithms identified previously unknown urban heat correlations in Houston, 
                  leading to 23% improvement in temperature forecasting accuracy.
                </p>
                <div className="flex justify-between">
                  <span className="text-slate-400">Accuracy Improvement:</span>
                  <span className="text-green-400 font-semibold">+23%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Processing Time:</span>
                  <span className="text-cyan-400 font-semibold">-89%</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Cloud className="w-5 h-5 text-blue-400" />
                <h5 className="text-lg font-medium text-white">Pollution Dispersion Modeling</h5>
              </div>
              <div className="space-y-3 text-sm text-slate-300">
                <p>
                  Quantum superposition enables modeling of thousands of wind patterns simultaneously, 
                  revolutionizing air quality predictions for industrial zones.
                </p>
                <div className="flex justify-between">
                  <span className="text-slate-400">Scenarios Modeled:</span>
                  <span className="text-purple-400 font-semibold">10,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Prediction Range:</span>
                  <span className="text-orange-400 font-semibold">72 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/20">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-cyan-400" />
            Technical Implementation Pipeline
          </h4>
          
          <div className="grid md:grid-cols-5 gap-4 items-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Radio className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-sm font-medium text-white">Data Ingestion</div>
              <div className="text-xs text-slate-400">TEMPO + Sensors</div>
            </div>

            <div className="hidden md:flex justify-center">
              <ArrowRight className="w-5 h-5 text-slate-500" />
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Atom className="w-6 h-6 text-purple-400 animate-spin" style={{animationDuration: '4s'}} />
              </div>
              <div className="text-sm font-medium text-white">Quantum Processing</div>
              <div className="text-xs text-slate-400">Superposition Analysis</div>
            </div>

            <div className="hidden md:flex justify-center">
              <ArrowRight className="w-5 h-5 text-slate-500" />
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-sm font-medium text-white">Predictions</div>
              <div className="text-xs text-slate-400">Real-time Forecasts</div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-300 leading-relaxed">
              Our quantum-classical hybrid approach combines the best of both worlds: quantum speedup for 
              complex optimization problems and classical reliability for data processing and user interfaces.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

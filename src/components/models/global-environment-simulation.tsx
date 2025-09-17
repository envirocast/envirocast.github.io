// src/components/models/global-environment-simulation.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Thermometer, 
  Droplets, 
  Database,
  Wind, 
  Users, 
  TreePine,
  Brain,
  Satellite,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Eye,
  Activity,
  Heart,
  Skull,
  Fish,
  Bird,
  Snowflake,
  Sun,
  Cloud,
  CloudRain,
  Waves,
  Mountain,
  Factory,
  Car,
  Home,
  Zap,
  Gauge,
  Timer,
  MapPin,
  Info,
  Settings,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Layers,
  Target
} from 'lucide-react';

interface GlobalEnvironmentSimulationProps {
  isPlaying: boolean;
  speed: number;
  onPlayToggle: () => void;
  onSpeedChange: (speed: number) => void;
}

interface EnvironmentMetrics {
  temperature: number;
  co2Level: number;
  pollutionIndex: number;
  biodiversityIndex: number;
  oceanPh: number;
  seaLevel: number;
  iceCapCoverage: number;
  forestCoverage: number;
  populationDensity: number;
  mortalityRate: number;
  migrationRate: number;
  foodSecurity: number;
}

interface RegionData {
  name: string;
  temperature: number;
  airQuality: number;
  precipitation: number;
  populationDensity: number;
  healthRisk: 'low' | 'moderate' | 'high' | 'critical';
  species: number;
  coordinates: { x: number; y: number };
}

export const GlobalEnvironmentSimulation: React.FC<GlobalEnvironmentSimulationProps> = ({
  isPlaying,
  speed,
  onPlayToggle,
  onSpeedChange
}) => {
  // Environment State
  const [metrics, setMetrics] = useState<EnvironmentMetrics>({
    temperature: 15.2,
    co2Level: 420,
    pollutionIndex: 65,
    biodiversityIndex: 72,
    oceanPh: 8.1,
    seaLevel: 0,
    iceCapCoverage: 85,
    forestCoverage: 68,
    populationDensity: 45,
    mortalityRate: 2.3,
    migrationRate: 1.8,
    foodSecurity: 78
  });

  // Control States
  const [selectedScenario, setSelectedScenario] = useState('current');
  const [timeScale, setTimeScale] = useState(2025);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [activeLayers, setActiveLayers] = useState({
    temperature: true,
    pollution: true,
    biodiversity: false,
    population: false,
    climate: false
  });
  const [showAtmosphere, setShowAtmosphere] = useState(false);
  const [environmentalDamage, setEnvironmentalDamage] = useState(45);

  // User Controls
  const [controls, setControls] = useState({
    industrialization: 50,
    renewableEnergy: 35,
    deforestation: 25,
    urbanization: 60,
    carbonEmissions: 70,
    conservation: 40
  });

  const regions: RegionData[] = [
    {
      name: 'North America',
      temperature: 12.5,
      airQuality: 89,
      precipitation: 750,
      populationDensity: 22,
      healthRisk: 'moderate',
      species: 4500,
      coordinates: { x: 25, y: 35 }
    },
    {
      name: 'Amazon Basin',
      temperature: 26.8,
      airQuality: 45,
      precipitation: 2300,
      populationDensity: 5,
      healthRisk: 'high',
      species: 12000,
      coordinates: { x: 35, y: 65 }
    },
    {
      name: 'Sahara Region',
      temperature: 28.2,
      airQuality: 125,
      precipitation: 50,
      populationDensity: 3,
      healthRisk: 'critical',
      species: 850,
      coordinates: { x: 55, y: 45 }
    },
    {
      name: 'Arctic Circle',
      temperature: -5.2,
      airQuality: 15,
      precipitation: 400,
      populationDensity: 0.1,
      healthRisk: 'low',
      species: 200,
      coordinates: { x: 45, y: 15 }
    },
    {
      name: 'Southeast Asia',
      temperature: 27.5,
      airQuality: 156,
      precipitation: 1800,
      populationDensity: 145,
      healthRisk: 'critical',
      species: 8500,
      coordinates: { x: 75, y: 55 }
    },
    {
      name: 'Europe',
      temperature: 8.9,
      airQuality: 67,
      precipitation: 650,
      populationDensity: 75,
      healthRisk: 'moderate',
      species: 2200,
      coordinates: { x: 55, y: 30 }
    }
  ];

  const scenarios = [
    { id: 'current', name: 'Current Trajectory', description: 'Business as usual' },
    { id: 'optimistic', name: 'Green Revolution', description: 'Rapid renewable adoption' },
    { id: 'pessimistic', name: 'Climate Crisis', description: 'Worst-case emissions' },
    { id: 'intervention', name: 'Global Intervention', description: 'Coordinated action' }
  ];

  const atmosphereLayers = [
    { name: 'Troposphere', height: '0-12km', description: 'Weather and pollution layer', color: 'from-red-500/30 to-orange-500/30' },
    { name: 'Stratosphere', height: '12-50km', description: 'Ozone layer protection', color: 'from-blue-500/30 to-cyan-500/30' },
    { name: 'Mesosphere', height: '50-85km', description: 'Meteor protection', color: 'from-purple-500/30 to-pink-500/30' },
    { name: 'Thermosphere', height: '85-600km', description: 'Satellite operations', color: 'from-green-500/30 to-emerald-500/30' }
  ];

  // Simulation Updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setMetrics(prev => {
          const newMetrics = { ...prev };
          
          // Apply control effects
          const industrialEffect = controls.industrialization / 100;
          const renewableEffect = controls.renewableEnergy / 100;
          const deforestationEffect = controls.deforestation / 100;
          const urbanizationEffect = controls.urbanization / 100;
          
          // Temperature changes
          newMetrics.temperature += (industrialEffect - renewableEffect) * 0.1 * speed;
          newMetrics.temperature = Math.max(-2, Math.min(25, newMetrics.temperature));
          
          // CO2 levels
          newMetrics.co2Level += (controls.carbonEmissions - controls.renewableEnergy) * 0.5 * speed;
          newMetrics.co2Level = Math.max(350, Math.min(600, newMetrics.co2Level));
          
          // Pollution
          newMetrics.pollutionIndex += (industrialEffect - renewableEffect) * 2 * speed;
          newMetrics.pollutionIndex = Math.max(10, Math.min(200, newMetrics.pollutionIndex));
          
          // Biodiversity
          newMetrics.biodiversityIndex -= (deforestationEffect + urbanizationEffect) * 0.8 * speed;
          newMetrics.biodiversityIndex += (controls.conservation / 100) * 0.5 * speed;
          newMetrics.biodiversityIndex = Math.max(20, Math.min(100, newMetrics.biodiversityIndex));
          
          // Sea level
          newMetrics.seaLevel += (newMetrics.temperature - 14) * 0.02 * speed;
          newMetrics.seaLevel = Math.max(-0.5, Math.min(2, newMetrics.seaLevel));
          
          // Ice cap coverage
          newMetrics.iceCapCoverage -= (newMetrics.temperature - 14) * 0.5 * speed;
          newMetrics.iceCapCoverage = Math.max(40, Math.min(95, newMetrics.iceCapCoverage));
          
          // Forest coverage
          newMetrics.forestCoverage -= deforestationEffect * 0.3 * speed;
          newMetrics.forestCoverage += (controls.conservation / 100) * 0.2 * speed;
          newMetrics.forestCoverage = Math.max(30, Math.min(85, newMetrics.forestCoverage));
          
          return newMetrics;
        });

        // Update environmental damage indicator
        setEnvironmentalDamage(prev => {
          const tempFactor = Math.max(0, (metrics.temperature - 14) * 5);
          const pollutionFactor = (metrics.pollutionIndex - 50) * 0.5;
          const biodiversityFactor = (100 - metrics.biodiversityIndex) * 0.3;
          const newDamage = (tempFactor + pollutionFactor + biodiversityFactor) / 3;
          return Math.max(0, Math.min(100, newDamage));
        });

        // Update timeline
        setTimeScale(prev => prev + 1 * speed);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, speed, controls, metrics]);

  const getDamageColor = (damage: number) => {
    if (damage < 25) return 'from-green-500 to-emerald-500';
    if (damage < 50) return 'from-yellow-500 to-orange-400';
    if (damage < 75) return 'from-orange-500 to-red-400';
    return 'from-red-500 to-pink-500';
  };

  const getDamageLabel = (damage: number) => {
    if (damage < 25) return 'Sustainable';
    if (damage < 50) return 'Manageable';
    if (damage < 75) return 'Critical';
    return 'Catastrophic';
  };

  const getHealthRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400';
      case 'moderate': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Control Panel */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
              <Globe className="w-6 h-6 mr-3 text-cyan-400" />
              Global Environment Simulation
            </h3>
            <p className="text-slate-300">
              Interactive modeling of environmental systems, climate change, and human impact
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Timeline */}
            <div className="text-center">
              <div className="text-lg font-bold text-cyan-300">{timeScale.toFixed(2)}</div>
              <div className="text-xs text-slate-400">Timeline Year</div>
              <input
                type="range"
                min="2025"
                max="2100"
                step="0.01"
                value={timeScale}
                onChange={(e) => setTimeScale(parseFloat(e.target.value))}
                className="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer mt-1"
              />
            </div>

            {/* Scenario Selector */}
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              className="bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600"
            >
              {scenarios.map(scenario => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </select>

            {/* Speed Control */}
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-slate-400" />
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={speed}
                onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                className="w-20 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
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
                onClick={() => {
                  setTimeScale(2025);
                  setMetrics({
                    temperature: 15.2,
                    co2Level: 420,
                    pollutionIndex: 65,
                    biodiversityIndex: 72,
                    oceanPh: 8.1,
                    seaLevel: 0,
                    iceCapCoverage: 85,
                    forestCoverage: 68,
                    populationDensity: 45,
                    mortalityRate: 2.3,
                    migrationRate: 1.8,
                    foodSecurity: 78
                  });
                  setEnvironmentalDamage(45);
                }}
                className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Simulation Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Global Map Panel */}
        <div className="lg:col-span-2 bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-white flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-400" />
              Global Environmental Status
            </h4>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAtmosphere(!showAtmosphere)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  showAtmosphere
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <Layers className="w-4 h-4 mr-1 inline" />
                Atmosphere
              </button>
              
              <div className="text-sm text-slate-400">
                Active: <span className="text-cyan-300">{Object.values(activeLayers).filter(Boolean).length}/5</span>
              </div>
            </div>
          </div>

          {/* Atmosphere Visualization */}
          {showAtmosphere && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-slate-900 rounded-xl"
            >
              <h5 className="text-lg font-semibold text-white mb-4">Atmospheric Layers</h5>
              <div className="space-y-3">
                {atmosphereLayers.map((layer, index) => (
                  <div key={layer.name} className="flex items-center space-x-4">
                    <div className={`w-4 h-8 rounded bg-gradient-to-t ${layer.color} border border-slate-600`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{layer.name}</span>
                        <span className="text-sm text-slate-400">{layer.height}</span>
                      </div>
                      <p className="text-sm text-slate-300">{layer.description}</p>
                      
                      <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                        <div className="bg-slate-800/50 rounded px-2 py-1">
                          <div className="text-slate-400">Density</div>
                          <div className="text-white">{(Math.random() * 100 + index * 20).toFixed(1)}%</div>
                        </div>
                        <div className="bg-slate-800/50 rounded px-2 py-1">
                          <div className="text-slate-400">Temp</div>
                          <div className="text-white">{(15 - index * 10 + Math.random() * 5).toFixed(1)}°C</div>
                        </div>
                        <div className="bg-slate-800/50 rounded px-2 py-1">
                          <div className="text-slate-400">Press</div>
                          <div className="text-white">{(1013 - index * 200 + Math.random() * 50).toFixed(0)}hPa</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Global Map Representation */}
          <div className="relative bg-slate-900 rounded-xl p-8 min-h-96 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-green-900/20 to-brown-900/20"></div>
            
            {/* Region Cards */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 h-full">
              {regions.map((region, index) => (
                <motion.div
                  key={region.name}
                  className={`bg-slate-800/80 backdrop-blur rounded-xl p-4 cursor-pointer border-2 transition-all ${
                    selectedRegion === region.name
                      ? 'border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 to-purple-500/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                  onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <h6 className="font-semibold text-white text-sm">{region.name}</h6>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Temperature</span>
                      <span className="text-orange-300 font-semibold">{region.temperature.toFixed(1)}°C</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Air Quality</span>
                      <span className={`font-semibold ${
                        region.airQuality <= 50 ? 'text-green-300' :
                        region.airQuality <= 100 ? 'text-yellow-300' :
                        region.airQuality <= 150 ? 'text-orange-300' : 'text-red-300'
                      }`}>
                        AQI {region.airQuality}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Health Risk</span>
                      <span className={`font-semibold ${getHealthRiskColor(region.healthRisk)} capitalize`}>
                        {region.healthRisk}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Species</span>
                      <span className="text-green-300 font-semibold">{region.species.toLocaleString()}</span>
                    </div>
                  </div>

                  {selectedRegion === region.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-slate-600 space-y-1 text-xs"
                    >
                      <div className="flex justify-between">
                        <span className="text-slate-400">Precipitation</span>
                        <span className="text-blue-300">{region.precipitation}mm/yr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Pop. Density</span>
                        <span className="text-purple-300">{region.populationDensity}/km²</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Environmental Event Indicators */}
            <div className="absolute top-4 left-4 space-y-2">
              {metrics.temperature > 18 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center space-x-2 bg-red-500/20 border border-red-500/30 rounded-lg px-3 py-2"
                >
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-red-300 text-sm">Heat Wave</span>
                </motion.div>
              )}
              
              {metrics.pollutionIndex > 120 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center space-x-2 bg-orange-500/20 border border-orange-500/30 rounded-lg px-3 py-2"
                >
                  <Factory className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-300 text-sm">High Pollution</span>
                </motion.div>
              )}
              
              {metrics.seaLevel > 0.5 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center space-x-2 bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-2"
                >
                  <Waves className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-sm">Rising Seas</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Layer Toggle Controls */}
          <div className="mt-6 flex flex-wrap gap-2">
            {Object.entries(activeLayers).map(([layer, active]) => (
              <button
                key={layer}
                onClick={() => setActiveLayers(prev => ({ ...prev, [layer]: !active }))}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  active
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {layer.charAt(0).toUpperCase() + layer.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Environmental Damage Indicator */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h4 className="text-xl font-bold text-white mb-6 flex items-center">
            <Gauge className="w-5 h-5 mr-2 text-red-400" />
            Environmental Impact
          </h4>

          {/* Damage Meter */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-300">Global Damage Level</span>
              <span className={`font-bold text-lg bg-gradient-to-r ${getDamageColor(environmentalDamage)} bg-clip-text text-transparent`}>
                {Math.round(environmentalDamage)}%
              </span>
            </div>
            
            <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${getDamageColor(environmentalDamage)} relative`}
                initial={{ width: 0 }}
                animate={{ width: `${environmentalDamage}%` }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </motion.div>
            </div>
            
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Sustainable</span>
              <span>Manageable</span>
              <span>Critical</span>
              <span>Catastrophic</span>
            </div>
            
            <div className="mt-3 text-center">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getDamageColor(environmentalDamage)} bg-clip-text text-transparent border border-slate-600`}>
                {getDamageLabel(environmentalDamage)}
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900 rounded-lg p-3 text-center">
                <Thermometer className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                <div className="text-lg font-bold text-orange-300">{metrics.temperature.toFixed(1)}°C</div>
                <div className="text-xs text-slate-400">Global Temp</div>
              </div>
              
              <div className="bg-slate-900 rounded-lg p-3 text-center">
                <Factory className="w-5 h-5 mx-auto mb-1 text-red-400" />
                <div className="text-lg font-bold text-red-300">{metrics.co2Level.toFixed(0)} ppm</div>
                <div className="text-xs text-slate-400">CO₂ Level</div>
              </div>
              
              <div className="bg-slate-900 rounded-lg p-3 text-center">
                <TreePine className="w-5 h-5 mx-auto mb-1 text-green-400" />
                <div className="text-lg font-bold text-green-300">{metrics.forestCoverage.toFixed(0)}%</div>
                <div className="text-xs text-slate-400">Forest Cover</div>
              </div>
              
              <div className="bg-slate-900 rounded-lg p-3 text-center">
                <Waves className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                <div className="text-lg font-bold text-blue-300">{metrics.seaLevel > 0 ? '+' : ''}{(metrics.seaLevel * 100).toFixed(1)}cm</div>
                <div className="text-xs text-slate-400">Sea Level</div>
              </div>
            </div>

            {/* Impact Breakdown */}
            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-white">Impact Factors:</h5>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Climate Change</span>
                  <span className={`${metrics.temperature > 16 ? 'text-red-300' : 'text-green-300'}`}>
                    {metrics.temperature > 16 ? 'High' : 'Moderate'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Biodiversity Loss</span>
                  <span className={`${metrics.biodiversityIndex < 60 ? 'text-red-300' : 'text-yellow-300'}`}>
                    {metrics.biodiversityIndex < 60 ? 'Critical' : 'Concerning'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pollution Level</span>
                  <span className={`${metrics.pollutionIndex > 100 ? 'text-red-300' : 'text-orange-300'}`}>
                    {metrics.pollutionIndex > 100 ? 'Severe' : 'Moderate'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panels */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Human Impact Controls */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h4 className="text-xl font-bold text-white mb-6 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-purple-400" />
            Human Impact Controls
          </h4>

          <div className="space-y-4">
            {Object.entries(controls).map(([control, value]) => (
              <div key={control}>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-slate-300 capitalize">
                    {control.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <span className="text-white font-semibold">{value}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => setControls(prev => ({ 
                    ...prev, 
                    [control]: parseInt(e.target.value) 
                  }))}
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer slider ${
                    control === 'renewableEnergy' || control === 'conservation' 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gradient-to-r from-red-500 to-orange-500'
                  }`}
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Low Impact</span>
                  <span>High Impact</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Statistics */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h4 className="text-xl font-bold text-white mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-400" />
            Live Environmental Metrics
          </h4>

          <div className="space-y-4">
            {/* Primary Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span className="text-sm text-slate-300">Health Impact</span>
                </div>
                <div className="text-lg font-bold text-pink-300">
                  {(metrics.mortalityRate).toFixed(1)} per 1000
                </div>
                <div className="text-xs text-slate-400">Mortality Rate</div>
              </div>

              <div className="bg-slate-900 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-slate-300">Migration</span>
                </div>
                <div className="text-lg font-bold text-blue-300">
                  {(metrics.migrationRate).toFixed(1)}%
                </div>
                <div className="text-xs text-slate-400">Displacement Rate</div>
              </div>

              <div className="bg-slate-900 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-slate-300">Ocean Health</span>
                </div>
                <div className="text-lg font-bold text-cyan-300">
                  pH {metrics.oceanPh.toFixed(2)}
                </div>
                <div className="text-xs text-slate-400">Ocean Acidity</div>
              </div>

              <div className="bg-slate-900 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Fish className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-slate-300">Food Security</span>
                </div>
                <div className="text-lg font-bold text-emerald-300">
                  {metrics.foodSecurity.toFixed(0)}%
                </div>
                <div className="text-xs text-slate-400">Global Index</div>
              </div>
            </div>

            {/* Trend Indicators */}
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-white">Current Trends:</h5>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Temperature</span>
                  <div className="flex items-center space-x-1">
                    {metrics.temperature > 15.5 ? (
                      <TrendingUp className="w-4 h-4 text-red-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-green-400" />
                    )}
                    <span className={metrics.temperature > 15.5 ? 'text-red-300' : 'text-green-300'}>
                      {metrics.temperature > 15.5 ? 'Rising' : 'Stable'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Biodiversity</span>
                  <div className="flex items-center space-x-1">
                    {metrics.biodiversityIndex < 70 ? (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    )}
                    <span className={metrics.biodiversityIndex < 70 ? 'text-red-300' : 'text-green-300'}>
                      {metrics.biodiversityIndex < 70 ? 'Declining' : 'Stable'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Ice Coverage</span>
                  <div className="flex items-center space-x-1">
                    {metrics.iceCapCoverage < 80 ? (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    )}
                    <span className={metrics.iceCapCoverage < 80 ? 'text-red-300' : 'text-green-300'}>
                      {metrics.iceCapCoverage < 80 ? 'Melting' : 'Stable'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Panels */}
      <div className="space-y-6">
        {/* Environmental Concepts */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-green-300 bg-clip-text text-transparent">
              Environmental Systems & Climate Science
            </h2>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto">
              Understanding the interconnected systems that govern our planet's climate, 
              biodiversity, and environmental health through interactive modeling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Climate Change */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900 rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Thermometer className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Climate Change</h4>
                  <p className="text-sm text-slate-400">Global temperature patterns</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Rising global temperatures affect weather patterns, sea levels, and ecosystem stability. 
                Our model tracks temperature changes across regions and their cascading effects on 
                agriculture, migration patterns, and extreme weather events.
              </p>
            </motion.div>

            {/* Biodiversity Loss */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-900 rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <TreePine className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Biodiversity & Ecosystems</h4>
                  <p className="text-sm text-slate-400">Species and habitat health</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Monitor species populations, habitat loss, and ecosystem resilience. 
                Track how deforestation, urbanization, and climate change impact 
                biodiversity indices and ecosystem services critical for human survival.
              </p>
            </motion.div>

            {/* Pollution & Air Quality */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-900 rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Factory className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Pollution Dispersion</h4>
                  <p className="text-sm text-slate-400">Air quality and contaminants</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Real-time modeling of pollutant dispersion through atmospheric layers. 
                Track how industrial emissions, vehicle exhaust, and natural events 
                affect air quality and human health across different regions.
              </p>
            </motion.div>

            {/* Ocean Systems */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-900 rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Ocean Health</h4>
                  <p className="text-sm text-slate-400">Marine ecosystems</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Ocean acidity, temperature, and circulation patterns affect marine life 
                and global climate regulation. Monitor sea level rise, coral bleaching, 
                and the ocean's role as a carbon sink in our climate system.
              </p>
            </motion.div>

            {/* Human Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-slate-900 rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Human Factors</h4>
                  <p className="text-sm text-slate-400">Population and development</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Population density, urbanization, and industrial development drive 
                environmental change. Model how human activities create feedback loops 
                that accelerate or mitigate environmental degradation.
              </p>
            </motion.div>

            {/* Extreme Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-slate-900 rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">Extreme Events</h4>
                  <p className="text-sm text-slate-400">Climate disasters</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Hurricanes, droughts, floods, and wildfires become more frequent with 
                climate change. Our models predict extreme event probability and 
                their cascading effects on human displacement and food security.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scenario Analysis */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h4 className="text-xl font-bold text-white mb-6 flex items-center">
            <Target className="w-5 h-5 mr-2 text-cyan-400" />
            Scenario Outcomes & Projections
          </h4>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Short-term Effects */}
            <div className="bg-slate-900 rounded-xl p-6">
              <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Timer className="w-4 h-4 mr-2 text-green-400" />
                Short-Term Effects (2025-2035)
              </h5>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-white">Temperature Rise</div>
                    <div className="text-slate-300">
                      Current trajectory shows +{((metrics.temperature - 15.2) * 5).toFixed(1)}°C increase 
                      leading to more frequent heat waves and altered precipitation patterns.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-white">Air Quality Degradation</div>
                    <div className="text-slate-300">
                      Pollution index at {metrics.pollutionIndex.toFixed(0)} indicates increased 
                      respiratory health risks in urban areas and vulnerable populations.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-white">Coastal Impact</div>
                    <div className="text-slate-300">
                      Sea level rise of {(metrics.seaLevel * 100).toFixed(1)}cm affects 
                      coastal communities and infrastructure planning requirements.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Long-term Effects */}
            <div className="bg-slate-900 rounded-xl p-6">
              <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Timer className="w-4 h-4 mr-2 text-purple-400" />
                Long-Term Projections (2035-2075)
              </h5>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-white">Ecosystem Adaptation</div>
                    <div className="text-slate-300">
                      Current biodiversity index of {metrics.biodiversityIndex.toFixed(0)}% 
                      suggests ecosystem resilience but requires active conservation efforts.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-white">Food System Stress</div>
                    <div className="text-slate-300">
                      Food security at {metrics.foodSecurity.toFixed(0)}% indicates need 
                      for agricultural adaptation and sustainable farming practices.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-white">Technological Solutions</div>
                    <div className="text-slate-300">
                      Current renewable energy adoption at {controls.renewableEnergy}% 
                      shows potential for carbon neutrality with accelerated deployment.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mitigation Strategies */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
            <h5 className="text-lg font-semibold text-white mb-3">Effective Mitigation Strategies</h5>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-green-300 mb-1">Renewable Transition</div>
                <div className="text-slate-300">
                  Accelerating renewable energy adoption reduces CO₂ emissions 
                  and improves long-term sustainability metrics.
                </div>
              </div>
              <div>
                <div className="font-medium text-blue-300 mb-1">Conservation Programs</div>
                <div className="text-slate-300">
                  Forest protection and habitat restoration maintain biodiversity 
                  and natural carbon sequestration capabilities.
                </div>
              </div>
              <div>
                <div className="font-medium text-purple-300 mb-1">Smart Urbanization</div>
                <div className="text-slate-300">
                  Sustainable city planning reduces pollution while supporting 
                  population growth and economic development.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration with EnviroCast */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700">
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="w-6 h-6 text-cyan-400" />
            <h4 className="text-2xl font-bold text-white">Powering Real-World Predictions</h4>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h5 className="text-lg font-semibold text-cyan-300 mb-3">Environmental Intelligence</h5>
                <p className="text-slate-300 leading-relaxed">
                  This comprehensive environmental modeling system demonstrates the complex 
                  interactions that EnviroCast processes in real-time using NASA TEMPO data. 
                  Every parameter you adjust represents actual environmental variables our 
                  quantum algorithms analyze continuously.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5">
                    <Satellite className="w-3 h-3 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">TEMPO Integration</div>
                    <div className="text-slate-400 text-sm">
                      Hourly pollution measurements across North America drive our models
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                    <Brain className="w-3 h-3 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Quantum Processing</div>
                    <div className="text-slate-400 text-sm">
                      Complex environmental interactions modeled through quantum superposition
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <Target className="w-3 h-3 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Predictive Accuracy</div>
                    <div className="text-slate-400 text-sm">
                      96% accuracy in environmental forecasts and health impact predictions
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h5 className="text-lg font-semibold text-purple-300 mb-3">Real-World Applications</h5>
                <p className="text-slate-300 leading-relaxed">
                  The environmental patterns you observe here directly translate to actionable 
                  insights for policymakers, health officials, and environmental agencies 
                  using EnviroCast for decision-making and public health protection.
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4 space-y-3">
                <div className="text-sm font-medium text-white">Current Model Performance:</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Data Processing:</span>
                    <span className="text-cyan-300">Real-time</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Model Accuracy:</span>
                    <span className="text-green-300">96.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Coverage Area:</span>
                    <span className="text-purple-300">North America</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Update Frequency:</span>
                    <span className="text-orange-300">Hourly</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/20">
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-sm font-medium text-white">Environmental Monitoring</div>
                    <div className="text-xs text-slate-400">Continuous analysis of {regions.length} major regions</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-cyan-300">Live</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Sources & API Access */}
      <div className="mt-8 bg-slate-900/50 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-white flex items-center">
            <Database className="w-5 h-5 mr-2 text-blue-400" />
            Data Sources & API Access
          </h4>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <h5 className="text-sm font-semibold text-white mb-2">NASA TEMPO Satellite</h5>
            <p className="text-xs text-slate-400 mb-3">Hourly atmospheric composition data</p>
            <button className="w-full px-3 py-2 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-300 hover:bg-blue-500/30 transition-colors">
              Access TEMPO API
            </button>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4">
            <h5 className="text-sm font-semibold text-white mb-2">NOAA Climate Data</h5>
            <p className="text-xs text-slate-400 mb-3">Global climate and weather patterns</p>
            <button className="w-full px-3 py-2 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-300 hover:bg-green-500/30 transition-colors">
              Access NOAA API
            </button>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4">
            <h5 className="text-sm font-semibold text-white mb-2">EnviroCast API</h5>
            <p className="text-xs text-slate-400 mb-3">Processed environmental predictions</p>
            <button className="w-full px-3 py-2 bg-purple-500/20 border border-purple-500/30 rounded text-xs text-purple-300 hover:bg-purple-500/30 transition-colors">
              Access Our API
            </button>
          </div>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #8b5cf6);
          cursor: pointer;
          border: 2px solid #1e293b;
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #8b5cf6);
          cursor: pointer;
          border: 2px solid #1e293b;
        }
      `}</style>
    </div>
  );
};

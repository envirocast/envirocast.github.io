// src/components/models/global-environment-viz.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Thermometer, Droplets, Wind, Activity, Users, Heart, 
  TreePine, Factory, Zap, Eye, EyeOff, Layers, AlertTriangle,
  TrendingUp, TrendingDown, BarChart3, Clock, MapPin, Target,
  Gauge, Timer, Settings, Lightbulb, Leaf, Waves, Mountain
} from 'lucide-react';
import { GlobalEnvironmentEngine, ScenarioPreset } from '@/lib/global-environment';
import { GlobalEnvironmentCanvas } from './global-environment-canvas';

interface GlobalEnvironmentVizProps {
  isPlaying: boolean;
  speed: number;
  onPlayToggle: () => void;
  onSpeedChange: (speed: number) => void;
}

export const GlobalEnvironmentViz: React.FC<GlobalEnvironmentVizProps> = ({
  isPlaying,
  speed,
  onPlayToggle,
  onSpeedChange
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'pollution' | 'temperature' | 'biodiversity' | 'health' | 'population'>('pollution');
  const [showAtmosphere, setShowAtmosphere] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'short' | 'long'>('short');
  const [isEngineReady, setIsEngineReady] = useState(false);
  const engineRef = useRef<GlobalEnvironmentEngine | null>(null);

  // Initialize engine
  useEffect(() => {
    const initializeEngine = () => {
      engineRef.current = new GlobalEnvironmentEngine({ width: 800, height: 500 });
      setIsEngineReady(true);
    };

    const timer = setTimeout(initializeEngine, 100);
    return () => clearTimeout(timer);
  }, []);

  const scenarioPresets: ScenarioPreset[] = [
    {
      id: 'current',
      name: 'Current Trajectory',
      description: 'Business as usual scenario based on current trends',
      settings: {
        industrialization: 60,
        deforestation: 40,
        renewableEnergy: 25,
        conservation: 30,
        population: 70,
        emissions: 55
      }
    },
    {
      id: 'sustainable',
      name: 'Sustainable Future',
      description: 'Aggressive environmental protection and clean energy',
      settings: {
        industrialization: 40,
        deforestation: 10,
        renewableEnergy: 80,
        conservation: 75,
        population: 50,
        emissions: 20
      }
    },
    {
      id: 'collapse',
      name: 'Environmental Collapse',
      description: 'Worst-case scenario with accelerated degradation',
      settings: {
        industrialization: 90,
        deforestation: 80,
        renewableEnergy: 10,
        conservation: 5,
        population: 85,
        emissions: 90
      }
    }
  ];

  const viewModes = [
    { id: 'pollution', label: 'Air Quality', icon: Factory, color: 'red' },
    { id: 'temperature', label: 'Temperature', icon: Thermometer, color: 'orange' },
    { id: 'biodiversity', label: 'Biodiversity', icon: TreePine, color: 'green' },
    { id: 'health', label: 'Health Risk', icon: Heart, color: 'pink' },
    { id: 'population', label: 'Population', icon: Users, color: 'blue' }
  ];

  const handleControlChange = (key: string, value: number) => {
    if (engineRef.current) {
      engineRef.current.updateControl(key as any, value);
    }
  };

  const applyPreset = (preset: ScenarioPreset) => {
    if (engineRef.current) {
      engineRef.current.applyScenarioPreset(preset);
    }
  };

  const getEnvironmentalHealth = () => {
    return engineRef.current ? engineRef.current.getEnvironmentalHealth() : 50;
  };

  const getHealthColor = (health: number) => {
    if (health > 70) return 'from-green-500 to-emerald-500';
    if (health > 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getHealthLabel = (health: number) => {
    if (health > 70) return 'Healthy';
    if (health > 40) return 'At Risk';
    return 'Critical';
  };

  if (!isEngineReady || !engineRef.current) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-white text-lg">Initializing global environment simulation...</p>
            <p className="text-slate-400 text-sm mt-2">Loading climate models and regional data</p>
          </div>
        </div>
      </div>
    );
  }

  const environmentalHealth = getEnvironmentalHealth();
  const climateData = engineRef.current.getClimateData();

  return (
    <div className="space-y-6">
      {/* Global Overview */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center">
              <Globe className="w-6 h-6 mr-2 text-cyan-400" />
              Global Environment Simulation
            </h3>
            <p className="text-slate-300">
              Interactive climate and environmental modeling with real-time feedback
            </p>
          </div>

          {/* Environmental Health Indicator */}
          <div className="bg-slate-900 rounded-xl p-4 min-w-48">
            <div className="text-center">
              <div className="text-sm text-slate-400 mb-2">Global Environmental Health</div>
              <div className={`text-3xl font-bold bg-gradient-to-r ${getHealthColor(environmentalHealth)} bg-clip-text text-transparent`}>
                {Math.round(environmentalHealth)}%
              </div>
              <div className="text-sm text-slate-300">{getHealthLabel(environmentalHealth)}</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <motion.div 
                  className={`h-2 rounded-full bg-gradient-to-r ${getHealthColor(environmentalHealth)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${environmentalHealth}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Climate Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            className="bg-slate-900 rounded-xl p-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between mb-2">
              <Thermometer className="w-5 h-5 text-orange-400" />
              <span className="text-xs text-slate-400">GLOBAL TEMP</span>
            </div>
            <div className="text-2xl font-bold text-orange-300">{climateData.globalTemp.toFixed(1)}°C</div>
            <div className="text-xs text-slate-400">
              {climateData.globalTemp > 15.5 ? '+' : ''}{(climateData.globalTemp - 15).toFixed(1)}°C from baseline
            </div>
          </motion.div>

          <motion.div 
            className="bg-slate-900 rounded-xl p-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between mb-2">
              <Factory className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-slate-400">CO₂ PPM</span>
            </div>
            <div className="text-2xl font-bold text-gray-300">{Math.round(climateData.co2Concentration)}</div>
            <div className="text-xs text-slate-400">Parts per million</div>
          </motion.div>

          <motion.div 
            className="bg-slate-900 rounded-xl p-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between mb-2">
              <Waves className="w-5 h-5 text-blue-400" />
              <span className="text-xs text-slate-400">SEA LEVEL</span>
            </div>
            <div className="text-2xl font-bold text-blue-300">+{climateData.seaLevelRise.toFixed(2)}m</div>
            <div className="text-xs text-slate-400">Rise since baseline</div>
          </motion.div>

          <motion.div 
            className="bg-slate-900 rounded-xl p-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-between mb-2">
              <TreePine className="w-5 h-5 text-red-400" />
              <span className="text-xs text-slate-400">DEFORESTATION</span>
            </div>
            <div className="text-2xl font-bold text-red-300">{climateData.deforestation.toFixed(1)}%</div>
            <div className="text-xs text-slate-400">Forest loss rate</div>
          </motion.div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-white flex items-center">
            <Settings className="w-5 h-5 mr-2 text-purple-400" />
            Environmental Controls
          </h4>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-300">Timeframe:</span>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as 'short' | 'long')}
                className="bg-slate-700 text-white rounded px-2 py-1 text-sm"
              >
                <option value="short">Short-term (1-10 years)</option>
                <option value="long">Long-term (10-100 years)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Human Activity Controls */}
          <div className="space-y-4">
            <h5 className="text-white font-semibold">Human Activities</h5>
            
            <div className="space-y-3">
              <div>
                <label className="flex items-center justify-between text-sm text-slate-300 mb-2">
                  <span className="flex items-center">
                    <Factory className="w-4 h-4 mr-2" />
                    Industrialization
                  </span>
                  <span>{engineRef.current.controls.industrialization}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={engineRef.current.controls.industrialization}
                  onChange={(e) => handleControlChange('industrialization', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm text-slate-300 mb-2">
                  <span className="flex items-center">
                    <TreePine className="w-4 h-4 mr-2" />
                    Deforestation Rate
                  </span>
                  <span>{engineRef.current.controls.deforestation}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={engineRef.current.controls.deforestation}
                  onChange={(e) => handleControlChange('deforestation', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm text-slate-300 mb-2">
                  <span className="flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Renewable Energy
                  </span>
                  <span>{engineRef.current.controls.renewableEnergy}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={engineRef.current.controls.renewableEnergy}
                  onChange={(e) => handleControlChange('renewableEnergy', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>

          {/* Environmental Controls */}
          <div className="space-y-4">
            <h5 className="text-white font-semibold">Environmental Factors</h5>
            
            <div className="space-y-3">
              <div>
                <label className="flex items-center justify-between text-sm text-slate-300 mb-2">
                  <span className="flex items-center">
                    <Leaf className="w-4 h-4 mr-2" />
                    Conservation Efforts
                  </span>
                  <span>{engineRef.current.controls.conservation}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={engineRef.current.controls.conservation}
                  onChange={(e) => handleControlChange('conservation', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm text-slate-300 mb-2">
                  <span className="flex items-center">
                    <Wind className="w-4 h-4 mr-2" />
                    Wind Intensity
                  </span>
                  <span>{engineRef.current.controls.windIntensity}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={engineRef.current.controls.windIntensity}
                  onChange={(e) => handleControlChange('windIntensity', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="flex items-center justify-between text-sm text-slate-300 mb-2">
                  <span className="flex items-center">
                    <Droplets className="w-4 h-4 mr-2" />
                    Precipitation
                  </span>
                  <span>{engineRef.current.controls.precipitation}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={engineRef.current.controls.precipitation}
                  onChange={(e) => handleControlChange('precipitation', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>

          {/* Scenario Presets */}
          <div className="space-y-4">
            <h5 className="text-white font-semibold">Scenario Presets</h5>
            
            <div className="space-y-2">
              {scenarioPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className="w-full p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-left transition-colors"
                >
                  <div className="text-white font-medium">{preset.name}</div>
                  <div className="text-slate-400 text-xs">{preset.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h4 className="text-lg font-bold text-white">Global Environmental Map</h4>
            
            {/* View Mode Selector */}
            <div className="flex space-x-2">
              {viewModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id as any)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
                      viewMode === mode.id
                        ? `bg-${mode.color}-500/20 text-${mode.color}-300 border border-${mode.color}-500/30`
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layer Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAtmosphere(!showAtmosphere)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
                showAtmosphere
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {showAtmosphere ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="hidden sm:inline">Atmosphere</span>
            </button>
          </div>
        </div>

        <GlobalEnvironmentCanvas
          isPlaying={isPlaying}
          speed={speed}
          selectedRegion={selectedRegion}
          onRegionClick={setSelectedRegion}
          engine={engineRef.current}
          viewMode={viewMode}
          showAtmosphere={showAtmosphere}
        />

        {/* Canvas Instructions */}
        <div className="mt-4 text-center">
          <p className="text-sm text-slate-400">
            Click on regions to view detailed information • Adjust controls to see environmental impacts in real-time
          </p>
        </div>
      </div>

      {/* Region Details Panel */}
      {selectedRegion && (
        <RegionDetailsPanel
          regionId={selectedRegion}
          engine={engineRef.current}
          onClose={() => setSelectedRegion(null)}
        />
      )}

      {/* Environmental Concepts */}
      <EnvironmentalConceptsPanel />

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

const RegionDetailsPanel: React.FC<{
  regionId: string;
  engine: GlobalEnvironmentEngine;
  onClose: () => void;
}> = ({ regionId, engine, onClose }) => {
  const region = engine.getRegions().get(regionId);
  if (!region) return null;

  const metrics = [
    { label: 'Air Quality Index', value: Math.round(100 - region.pollution), unit: 'AQI', icon: Factory, color: region.pollution > 50 ? 'red' : 'green' },
    { label: 'Temperature', value: region.temperature.toFixed(1), unit: '°C', icon: Thermometer, color: 'orange' },
    { label: 'Biodiversity Index', value: Math.round(region.biodiversity), unit: '%', icon: TreePine, color: 'green' },
    { label: 'Health Risk', value: Math.round(region.healthRisk), unit: '%', icon: Heart, color: 'red' },
    { label: 'Population', value: Math.round(region.population), unit: 'M', icon: Users, color: 'blue' },
    { label: 'Species Count', value: Math.round(region.species / 1000), unit: 'K', icon: Target, color: 'purple' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-bold text-white flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-cyan-400" />
          {region.name} - Regional Analysis
        </h4>
        <button
          onClick={onClose}
          className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4 text-slate-300" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-slate-900 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 text-${metric.color}-400`} />
                <span className="text-xs text-slate-400">{metric.unit}</span>
              </div>
              <div className={`text-2xl font-bold text-${metric.color}-300 mb-1`}>
                {metric.value}
              </div>
              <div className="text-xs text-slate-400">{metric.label}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-slate-900/50 rounded-xl">
        <h5 className="text-white font-medium mb-2">Environmental Impact Summary</h5>
        <p className="text-slate-300 text-sm">
          {region.name} shows {region.pollution > 50 ? 'elevated' : 'moderate'} pollution levels with{' '}
          {region.biodiversity > 60 ? 'healthy' : 'declining'} biodiversity. Current health risk is{' '}
          {region.healthRisk < 30 ? 'low' : region.healthRisk < 70 ? 'moderate' : 'high'} based on environmental factors.
        </p>
      </div>
    </motion.div>
  );
};

const EnvironmentalConceptsPanel: React.FC = () => {
  const concepts = [
    {
      icon: Globe,
      title: "Climate Interconnectedness",
      description: "Changes in one region affect global weather patterns, ocean currents, and atmospheric circulation.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Waves,
      title: "Ocean-Atmosphere Exchange",
      description: "Oceans absorb CO₂ and heat, influencing global temperature and sea level rise patterns.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Wind,
      title: "Pollution Dispersion",
      description: "Wind patterns and atmospheric circulation transport pollutants across continents, affecting air quality globally.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: TreePine,
      title: "Biodiversity Impact",
      description: "Species migrations, habitat loss, and ecosystem disruption cascade through interconnected food webs.",
      color: "from-emerald-500 to-green-500"
    }
  ];

  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <h4 className="text-xl font-bold text-white mb-6 flex items-center">
        <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
        Understanding Environmental Interactions
      </h4>
      
      <div className="grid md:grid-cols-2 gap-6">
        {concepts.map((concept, index) => {
          const Icon = concept.icon;
          return (
            <motion.div
              key={index}
              className="bg-slate-900/50 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${concept.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="text-lg font-semibold text-white mb-2">{concept.title}</h5>
                  <p className="text-slate-300 text-sm">{concept.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

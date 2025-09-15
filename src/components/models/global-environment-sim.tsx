// src/components/models/global-environment-sim.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Thermometer, 
  Droplets, 
  Wind, 
  CloudRain, 
  TrendingUp,
  TrendingDown,
  Users,
  Trees,
  Fish,
  Factory,
  Car,
  Home,
  Zap,
  Skull,
  Heart,
  AlertTriangle,
  Info,
  Eye,
  EyeOff,
  Play,
  Pause,
  RotateCcw,
  MapPin,
  Layers,
  Mountain,
  Waves,
  Sun,
  Cloud,
  Snowflake,
  Activity,
  BarChart3,
  Timer,
  Settings,
  Target,
  Filter,
  Gauge
} from 'lucide-react';

interface GlobalEnvironmentSimProps {
  isPlaying: boolean;
  speed: number;
  onPlayToggle: () => void;
  onSpeedChange: (speed: number) => void;
}

interface EnvironmentalData {
  temperature: number;
  airQuality: number;
  co2Levels: number;
  biodiversity: number;
  pollution: number;
  seaLevel: number;
  deforestation: number;
  population: number;
  mortality: number;
  species: number;
  precipitation: number;
  humidity: number;
  windSpeed: number;
  iceCapCoverage: number;
  oceanHealth: number;
  foodSecurity: number;
}

interface Region {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  data: EnvironmentalData;
  color: string;
  isUrban: boolean;
  coastalRisk: number;
}

interface AtmosphericLayer {
  id: string;
  name: string;
  altitude: string;
  description: string;
  visible: boolean;
  color: string;
  opacity: number;
}

export const GlobalEnvironmentSim: React.FC<GlobalEnvironmentSimProps> = ({
  isPlaying,
  speed,
  onPlayToggle,
  onSpeedChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [timeScale, setTimeScale] = useState<'hours' | 'days' | 'months' | 'years'>('days');
  const [currentTime, setCurrentTime] = useState(0);
  const [environmentalHealth, setEnvironmentalHealth] = useState(65);
  const [selectedPreset, setSelectedPreset] = useState('current');
  const [activeLayer, setActiveLayer] = useState('pollution');
  const [showAtmosphere, setShowAtmosphere] = useState(true);
  const [globalStats, setGlobalStats] = useState<EnvironmentalData>({
    temperature: 15.2,
    airQuality: 78,
    co2Levels: 415,
    biodiversity: 67,
    pollution: 45,
    seaLevel: 0.22,
    deforestation: 15.3,
    population: 7900,
    mortality: 12.7,
    species: 8700000,
    precipitation: 800,
    humidity: 65,
    windSpeed: 12,
    iceCapCoverage: 85.2,
    oceanHealth: 72,
    foodSecurity: 68
  });

  const [regions] = useState<Region[]>([
    {
      id: 'north-america',
      name: 'North America',
      x: 100,
      y: 120,
      width: 180,
      height: 100,
      data: {
        temperature: 12.5,
        airQuality: 82,
        co2Levels: 420,
        biodiversity: 75,
        pollution: 35,
        seaLevel: 0.18,
        deforestation: 8.2,
        population: 580,
        mortality: 9.8,
        species: 1200000,
        precipitation: 850,
        humidity: 68,
        windSpeed: 14,
        iceCapCoverage: 92,
        oceanHealth: 78,
        foodSecurity: 85
      },
      color: '#3B82F6',
      isUrban: true,
      coastalRisk: 0.3
    },
    {
      id: 'europe',
      name: 'Europe',
      x: 420,
      y: 100,
      width: 120,
      height: 80,
      data: {
        temperature: 10.8,
        airQuality: 85,
        co2Levels: 390,
        biodiversity: 82,
        pollution: 28,
        seaLevel: 0.15,
        deforestation: 5.1,
        population: 750,
        mortality: 8.2,
        species: 950000,
        precipitation: 720,
        humidity: 72,
        windSpeed: 11,
        iceCapCoverage: 88,
        oceanHealth: 81,
        foodSecurity: 92
      },
      color: '#10B981',
      isUrban: true,
      coastalRisk: 0.25
    },
    {
      id: 'asia',
      name: 'Asia',
      x: 480,
      y: 130,
      width: 220,
      height: 140,
      data: {
        temperature: 18.3,
        airQuality: 65,
        co2Levels: 450,
        biodiversity: 58,
        pollution: 68,
        seaLevel: 0.28,
        deforestation: 22.7,
        population: 4600,
        mortality: 15.8,
        species: 3200000,
        precipitation: 1100,
        humidity: 78,
        windSpeed: 8,
        iceCapCoverage: 72,
        oceanHealth: 64,
        foodSecurity: 62
      },
      color: '#F59E0B',
      isUrban: true,
      coastalRisk: 0.45
    },
    {
      id: 'africa',
      name: 'Africa',
      x: 380,
      y: 220,
      width: 160,
      height: 180,
      data: {
        temperature: 24.1,
        airQuality: 72,
        co2Levels: 380,
        biodiversity: 85,
        pollution: 42,
        seaLevel: 0.12,
        deforestation: 18.9,
        population: 1340,
        mortality: 18.3,
        species: 2800000,
        precipitation: 650,
        humidity: 58,
        windSpeed: 16,
        iceCapCoverage: 45,
        oceanHealth: 75,
        foodSecurity: 48
      },
      color: '#EF4444',
      isUrban: false,
      coastalRisk: 0.35
    },
    {
      id: 'south-america',
      name: 'South America',
      x: 200,
      y: 280,
      width: 140,
      height: 160,
      data: {
        temperature: 22.8,
        airQuality: 75,
        co2Levels: 400,
        biodiversity: 92,
        pollution: 38,
        seaLevel: 0.20,
        deforestation: 35.2,
        population: 430,
        mortality: 13.5,
        species: 1850000,
        precipitation: 1450,
        humidity: 82,
        windSpeed: 9,
        iceCapCoverage: 25,
        oceanHealth: 70,
        foodSecurity: 72
      },
      color: '#8B5CF6',
      isUrban: false,
      coastalRisk: 0.28
    },
    {
      id: 'australia',
      name: 'Australia',
      x: 620,
      y: 320,
      width: 100,
      height: 80,
      data: {
        temperature: 21.4,
        airQuality: 88,
        co2Levels: 410,
        biodiversity: 78,
        pollution: 25,
        seaLevel: 0.32,
        deforestation: 12.1,
        population: 26,
        mortality: 7.9,
        species: 600000,
        precipitation: 520,
        humidity: 55,
        windSpeed: 18,
        iceCapCoverage: 15,
        oceanHealth: 73,
        foodSecurity: 89
      },
      color: '#06B6D4',
      isUrban: true,
      coastalRisk: 0.55
    }
  ]);

  const [atmosphericLayers] = useState<AtmosphericLayer[]>([
    {
      id: 'troposphere',
      name: 'Troposphere',
      altitude: '0-12km',
      description: 'Where weather occurs and most life exists',
      visible: true,
      color: '#3B82F6',
      opacity: 0.3
    },
    {
      id: 'stratosphere', 
      name: 'Stratosphere',
      altitude: '12-50km',
      description: 'Contains the ozone layer',
      visible: true,
      color: '#8B5CF6',
      opacity: 0.25
    },
    {
      id: 'mesosphere',
      name: 'Mesosphere', 
      altitude: '50-85km',
      description: 'Meteors burn up here',
      visible: false,
      color: '#EF4444',
      opacity: 0.2
    },
    {
      id: 'thermosphere',
      name: 'Thermosphere',
      altitude: '85-600km', 
      description: 'Aurora and satellite orbit zone',
      visible: false,
      color: '#F59E0B',
      opacity: 0.15
    }
  ]);

  const layerTypes = [
    { id: 'pollution', name: 'Air Pollution', icon: Factory, color: '#EF4444' },
    { id: 'temperature', name: 'Temperature', icon: Thermometer, color: '#F59E0B' },
    { id: 'precipitation', name: 'Precipitation', icon: CloudRain, color: '#3B82F6' },
    { id: 'biodiversity', name: 'Biodiversity', icon: Trees, color: '#10B981' },
    { id: 'population', name: 'Population Density', icon: Users, color: '#8B5CF6' },
    { id: 'ocean-health', name: 'Ocean Health', icon: Waves, color: '#06B6D4' }
  ];

  const presets = [
    { id: 'current', name: 'Current State', description: 'Today\'s environmental conditions' },
    { id: 'climate-change', name: 'Climate Crisis', description: '2°C warming scenario' },
    { id: 'green-future', name: 'Green Recovery', description: 'Sustainable development path' },
    { id: 'pollution-spike', name: 'Industrial Surge', description: 'Heavy pollution event' },
    { id: 'natural-disaster', name: 'Extreme Weather', description: 'Hurricane and wildfire scenario' },
    { id: 'pandemic', name: 'Global Health Crisis', description: 'Pandemic impact simulation' }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => prev + speed);
        updateEnvironmentalData();
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, speed]);

  const updateEnvironmentalData = () => {
    setGlobalStats(prev => ({
      ...prev,
      temperature: Math.max(10, Math.min(30, prev.temperature + (Math.random() - 0.5) * 0.1 * speed)),
      airQuality: Math.max(0, Math.min(100, prev.airQuality + (Math.random() - 0.5) * 2 * speed)),
      co2Levels: Math.max(350, Math.min(500, prev.co2Levels + (Math.random() - 0.3) * 0.5 * speed)),
      pollution: Math.max(0, Math.min(100, prev.pollution + (Math.random() - 0.4) * 3 * speed)),
      seaLevel: Math.max(0, prev.seaLevel + (Math.random() - 0.2) * 0.001 * speed),
      biodiversity: Math.max(0, Math.min(100, prev.biodiversity + (Math.random() - 0.6) * 0.5 * speed))
    }));

    // Update environmental health based on all factors
    const newHealth = calculateEnvironmentalHealth();
    setEnvironmentalHealth(newHealth);
  };

  const calculateEnvironmentalHealth = (): number => {
    const airScore = globalStats.airQuality * 0.2;
    const climateScore = Math.max(0, (100 - Math.abs(globalStats.temperature - 15) * 5)) * 0.2;
    const biodiversityScore = globalStats.biodiversity * 0.2;
    const pollutionScore = (100 - globalStats.pollution) * 0.2;
    const oceanScore = globalStats.oceanHealth * 0.1;
    const co2Score = Math.max(0, (100 - (globalStats.co2Levels - 350) / 2)) * 0.1;
    
    return Math.round(airScore + climateScore + biodiversityScore + pollutionScore + oceanScore + co2Score);
  };

  const getHealthColor = (health: number): string => {
    if (health >= 80) return 'from-green-500 to-emerald-500';
    if (health >= 60) return 'from-yellow-500 to-orange-400';
    if (health >= 40) return 'from-orange-500 to-red-400';
    return 'from-red-500 to-pink-500';
  };

  const getHealthLabel = (health: number): string => {
    if (health >= 80) return 'Excellent';
    if (health >= 60) return 'Good';
    if (health >= 40) return 'Fair';
    if (health >= 20) return 'Poor';
    return 'Critical';
  };

  const applyPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    
    switch (presetId) {
      case 'climate-change':
        setGlobalStats(prev => ({
          ...prev,
          temperature: prev.temperature + 2,
          co2Levels: 450,
          pollution: prev.pollution + 15,
          seaLevel: prev.seaLevel + 0.3,
          biodiversity: prev.biodiversity - 20,
          iceCapCoverage: prev.iceCapCoverage - 15
        }));
        break;
      case 'green-future':
        setGlobalStats(prev => ({
          ...prev,
          airQuality: Math.min(100, prev.airQuality + 20),
          co2Levels: 350,
          pollution: Math.max(0, prev.pollution - 30),
          biodiversity: Math.min(100, prev.biodiversity + 15),
          foodSecurity: Math.min(100, prev.foodSecurity + 20)
        }));
        break;
      case 'pollution-spike':
        setGlobalStats(prev => ({
          ...prev,
          pollution: prev.pollution + 40,
          airQuality: Math.max(0, prev.airQuality - 30),
          mortality: prev.mortality + 5,
          co2Levels: prev.co2Levels + 50
        }));
        break;
    }
  };

  const drawWorldMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ocean background
    ctx.fillStyle = '#1e40af';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw atmospheric layers if enabled
    if (showAtmosphere) {
      atmosphericLayers.forEach((layer, index) => {
        if (layer.visible) {
          const y = index * 15;
          ctx.fillStyle = `${layer.color}${Math.round(layer.opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.fillRect(0, y, canvas.width, 20);
        }
      });
    }

    // Draw regions with layer-specific coloring
    regions.forEach(region => {
      let fillColor = region.color;
      let intensity = 1;

      switch (activeLayer) {
        case 'pollution':
          intensity = region.data.pollution / 100;
          fillColor = `rgba(239, 68, 68, ${0.3 + intensity * 0.7})`;
          break;
        case 'temperature':
          const tempNorm = (region.data.temperature - 10) / 20;
          fillColor = `rgba(${Math.round(255 * tempNorm)}, ${Math.round(100 * (1 - tempNorm))}, 100, 0.8)`;
          break;
        case 'biodiversity':
          intensity = region.data.biodiversity / 100;
          fillColor = `rgba(16, 185, 129, ${0.3 + intensity * 0.7})`;
          break;
        case 'population':
          intensity = Math.min(1, region.data.population / 1000);
          fillColor = `rgba(139, 92, 246, ${0.3 + intensity * 0.7})`;
          break;
      }

      // Draw region
      ctx.fillStyle = fillColor;
      ctx.fillRect(region.x, region.y, region.width, region.height);

      // Draw border
      ctx.strokeStyle = selectedRegion === region.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = selectedRegion === region.id ? 3 : 1;
      ctx.strokeRect(region.x, region.y, region.width, region.height);

      // Draw region label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(region.name, region.x + region.width / 2, region.y + region.height / 2);

      // Draw environmental indicators
      if (region.data.pollution > 60) {
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(region.x + 10, region.y + 10, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (region.coastalRisk > 0.4) {
        ctx.fillStyle = '#3B82F6';
        ctx.beginPath();
        ctx.arc(region.x + region.width - 10, region.y + region.height - 10, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw wind patterns
    if (activeLayer === 'temperature' || activeLayer === 'pollution') {
      drawWindPatterns(ctx);
    }

    // Draw pollution clouds
    if (activeLayer === 'pollution') {
      drawPollutionClouds(ctx);
    }
  };

  const drawWindPatterns = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    for (let i = 0; i < 10; i++) {
      const startX = Math.random() * (canvasRef.current?.width || 800);
      const startY = Math.random() * (canvasRef.current?.height || 400);
      const endX = startX + Math.random() * 100 - 50;
      const endY = startY + Math.random() * 50 - 25;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Arrow head
      const angle = Math.atan2(endY - startY, endX - startX);
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - 10 * Math.cos(angle - 0.5), endY - 10 * Math.sin(angle - 0.5));
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - 10 * Math.cos(angle + 0.5), endY - 10 * Math.sin(angle + 0.5));
      ctx.stroke();
    }

    ctx.setLineDash([]);
  };

  const drawPollutionClouds = (ctx: CanvasRenderingContext2D) => {
    regions.forEach(region => {
      if (region.data.pollution > 40) {
        const cloudCount = Math.floor(region.data.pollution / 20);
        for (let i = 0; i < cloudCount; i++) {
          const x = region.x + Math.random() * region.width;
          const y = region.y + Math.random() * region.height;
          
          ctx.fillStyle = `rgba(139, 69, 19, ${0.3 + (region.data.pollution / 100) * 0.4})`;
          ctx.beginPath();
          ctx.arc(x, y, 8 + Math.random() * 12, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 800;
      canvas.height = 450;
      drawWorldMap();
    }
  }, [activeLayer, selectedRegion, showAtmosphere, currentTime]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check which region was clicked
    const clickedRegion = regions.find(region => 
      x >= region.x && x <= region.x + region.width &&
      y >= region.y && y <= region.y + region.height
    );

    setSelectedRegion(clickedRegion ? clickedRegion.id : null);
  };

  return (
    <div className="space-y-8">
      {/* Main Simulation Canvas */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <Globe className="w-6 h-6 mr-3 text-cyan-400" />
            Global Environment Monitor
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-300">
                {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
              </span>
            </div>
            <select 
              value={timeScale} 
              onChange={(e) => setTimeScale(e.target.value as any)}
              className="bg-slate-700 text-white px-3 py-1 rounded text-sm"
            >
              <option value="hours">Hours</option>
              <option value="days">Days</option>
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="w-full border border-slate-700 rounded-xl cursor-pointer bg-slate-900"
            />

            {/* Layer Controls */}
            <div className="mt-4 flex flex-wrap gap-2">
              {layerTypes.map(layer => {
                const Icon = layer.icon;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
                      activeLayer === layer.id 
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white' 
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{layer.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Atmosphere Toggle */}
            <div className="mt-4 flex items-center space-x-4">
              <button
                onClick={() => setShowAtmosphere(!showAtmosphere)}
                className="flex items-center space-x-2 px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
              >
                {showAtmosphere ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span className="text-sm text-slate-300">Atmospheric Layers</span>
              </button>

              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-400">
                  Active Layer: <span className="text-cyan-300">{layerTypes.find(l => l.id === activeLayer)?.name}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* Environmental Health Gauge */}
            <div className="bg-slate-900 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Gauge className="w-5 h-5 mr-2 text-green-400" />
                Global Health
              </h4>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${getHealthColor(environmentalHealth)} bg-clip-text text-transparent`}>
                  {environmentalHealth}%
                </div>
                <div className="text-sm text-slate-400 mb-3">{getHealthLabel(environmentalHealth)}</div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${getHealthColor(environmentalHealth)} transition-all duration-500`}
                    style={{ width: `${environmentalHealth}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-slate-900 rounded-xl p-4">
              <h5 className="text-sm font-semibold text-white mb-3">Key Indicators</h5>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">CO2 Level:</span>
                  <span className="text-red-400">{globalStats.co2Levels} ppm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg. Temperature:</span>
                  <span className="text-orange-400">{globalStats.temperature.toFixed(1)}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Biodiversity:</span>
                  <span className="text-green-400">{globalStats.biodiversity.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sea Level:</span>
                  <span className="text-blue-400">+{globalStats.seaLevel.toFixed(2)}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Air Quality:</span>
                  <span className="text-cyan-400">{globalStats.airQuality.toFixed(0)}/100</span>
                </div>
              </div>
            </div>

            {/* Selected Region Info */}
            {selectedRegion && (
              <div className="bg-slate-900 rounded-xl p-4">
                <h5 className="text-sm font-semibold text-white mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                  {regions.find(r => r.id === selectedRegion)?.name}
                </h5>
                {(() => {
                  const region = regions.find(r => r.id === selectedRegion);
                  if (!region) return null;
                  return (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Temperature:</span>
                        <span className="text-orange-400">{region.data.temperature.toFixed(1)}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Air Quality:</span>
                        <span className="text-cyan-400">{region.data.airQuality}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Population:</span>
                        <span className="text-purple-400">{region.data.population}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Biodiversity:</span>
                        <span className="text-green-400">{region.data.biodiversity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Pollution Level:</span>
                        <span className="text-red-400">{region.data.pollution}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Coastal Risk:</span>
                        <span className="text-yellow-400">{(region.coastalRisk * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Environmental Controls */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-bold text-white flex items-center">
            <Settings className="w-5 h-5 mr-2 text-purple-400" />
            Environmental Parameters
          </h4>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-400">Preset:</span>
            <select 
              value={selectedPreset} 
              onChange={(e) => applyPreset(e.target.value)}
              className="bg-slate-700 text-white px-3 py-2 rounded text-sm"
            >
              {presets.map(preset => (
                <option key={preset.id} value={preset.id}>{preset.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Parameter Sliders */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ParameterSlider
            label="Global Temperature"
            value={globalStats.temperature}
            min={10}
            max={30}
            unit="°C"
            icon={Thermometer}
            color="orange"
            onChange={(value) => setGlobalStats(prev => ({ ...prev, temperature: value }))}
          />
          
          <ParameterSlider
            label="CO2 Concentration"
            value={globalStats.co2Levels}
            min={350}
            max={500}
            unit="ppm"
            icon={Factory}
            color="red"
            onChange={(value) => setGlobalStats(prev => ({ ...prev, co2Levels: value }))}
          />
          
          <ParameterSlider
            label="Deforestation Rate"
            value={globalStats.deforestation}
            min={0}
            max={50}
            unit="%"
            icon={Trees}
            color="green"
            onChange={(value) => setGlobalStats(prev => ({ ...prev, deforestation: value }))}
          />
          
          <ParameterSlider
            label="Industrial Activity"
            value={globalStats.pollution}
            min={0}
            max={100}
            unit="%"
            icon={Factory}
            color="gray"
            onChange={(value) => setGlobalStats(prev => ({ ...prev, pollution: value }))}
          />
          
          <ParameterSlider
            label="Ocean Health"
            value={globalStats.oceanHealth}
            min={0}
            max={100}
            unit="%"
            icon={Waves}
            color="blue"
            onChange={(value) => setGlobalStats(prev => ({ ...prev, oceanHealth: value }))}
          />
          
          <ParameterSlider
            label="Biodiversity Index"
            value={globalStats.biodiversity}
            min={0}
            max={100}
            unit="%"
            icon={Fish}
            color="emerald"
            onChange={(value) => setGlobalStats(prev => ({ ...prev, biodiversity: value }))}
          />
        </div>
      </div>

      {/* Environmental Impact Dashboard */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ImpactCard
          title="Health Impact"
          value={`${globalStats.mortality.toFixed(1)}M`}
          subtitle="Annual Deaths"
          trend="up"
          icon={Heart}
          color="red"
          description="Deaths attributed to environmental factors"
        />
        
        <ImpactCard
          title="Species Loss"
          value={`${((8700000 - globalStats.species) / 1000).toFixed(0)}K`}
          subtitle="Species Extinct"
          trend="up"
          icon={Skull}
          color="orange"
          description="Species lost due to habitat destruction"
        />
        
        <ImpactCard
          title="Food Security"
          value={`${globalStats.foodSecurity.toFixed(0)}%`}
          subtitle="Population Fed"
          trend="down"
          icon={Target}
          color="yellow"
          description="Population with adequate nutrition access"
        />
        
        <ImpactCard
          title="Economic Impact"
          value="$2.8T"
          subtitle="Annual Losses"
          trend="up"
          icon={TrendingDown}
          color="red"
          description="Economic losses from environmental damage"
        />
      </div>

      {/* Atmospheric Layers Info */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h4 className="text-xl font-bold text-white mb-6 flex items-center">
          <Layers className="w-5 h-5 mr-2 text-blue-400" />
          Atmospheric Composition
        </h4>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {atmosphericLayers.map(layer => (
            <div key={layer.id} className="bg-slate-900 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-sm font-semibold text-white">{layer.name}</h5>
                <div 
                  className="w-4 h-4 rounded" 
                  style={{ backgroundColor: layer.color }}
                />
              </div>
              <div className="space-y-2 text-xs">
                <div className="text-slate-400">Altitude: {layer.altitude}</div>
                <div className="text-slate-300">{layer.description}</div>
                <button
                  onClick={() => {
                    const updated = atmosphericLayers.map(l => 
                      l.id === layer.id ? { ...l, visible: !l.visible } : l
                    );
                    // Would need to update state properly in real implementation
                  }}
                  className={`px-2 py-1 rounded text-xs ${
                    layer.visible 
                      ? 'bg-cyan-500 text-white' 
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {layer.visible ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Concepts Explanation */}
      <EnvironmentalConceptsPanel />
    </div>
  );
};

// Parameter Slider Component
interface ParameterSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  icon: React.ComponentType<any>;
  color: string;
  onChange: (value: number) => void;
}

const ParameterSlider: React.FC<ParameterSliderProps> = ({
  label,
  value,
  min,
  max,
  unit,
  icon: Icon,
  color,
  onChange
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const getColor = () => {
    switch (color) {
      case 'orange': return 'from-orange-500 to-red-400';
      case 'red': return 'from-red-500 to-pink-500';
      case 'green': return 'from-green-500 to-emerald-500';
      case 'blue': return 'from-blue-500 to-cyan-500';
      case 'emerald': return 'from-emerald-500 to-teal-500';
      case 'gray': return 'from-gray-500 to-slate-500';
      default: return 'from-cyan-500 to-purple-500';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon className={`w-4 h-4 text-${color}-400`} />
          <span className="text-sm font-medium text-white">{label}</span>
        </div>
        <span className="text-sm font-semibold text-slate-300">
          {value.toFixed(1)}{unit}
        </span>
      </div>
      
      <div className="space-y-2">
        <input
          type="range"
          min={min}
          max={max}
          step={(max - min) / 100}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-1">
          <div 
            className={`h-1 rounded-full bg-gradient-to-r ${getColor()} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// Impact Card Component
interface ImpactCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

const ImpactCard: React.FC<ImpactCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  color,
  description
}) => {
  return (
    <motion.div
      className="bg-slate-800 rounded-xl p-4 border border-slate-700"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-3">
        <Icon className={`w-5 h-5 text-${color}-400`} />
        {trend === 'up' ? (
          <TrendingUp className="w-4 h-4 text-red-400" />
        ) : (
          <TrendingDown className="w-4 h-4 text-green-400" />
        )}
      </div>
      
      <div className="mb-2">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-slate-400">{subtitle}</div>
      </div>
      
      <div className="text-xs text-slate-500 mb-3">{description}</div>
      
      <div className="text-xs font-medium text-white">{title}</div>
    </motion.div>
  );
};

// Environmental Concepts Panel Component
const EnvironmentalConceptsPanel: React.FC = () => {
  const concepts = [
    {
      icon: Thermometer,
      title: "Climate Change",
      description: "Global temperature increases due to greenhouse gas emissions, causing widespread environmental disruption.",
      color: "from-red-500 to-orange-500",
      details: [
        "Rising sea levels threaten coastal communities",
        "Extreme weather events become more frequent",
        "Ecosystem disruption affects biodiversity",
        "Agricultural productivity changes regionally"
      ]
    },
    {
      icon: Factory,
      title: "Air Pollution",
      description: "Atmospheric contamination from industrial and vehicular emissions affects health and environment.",
      color: "from-gray-500 to-slate-500",
      details: [
        "PM2.5 particles penetrate deep into lungs",
        "Smog formation reduces air quality",
        "Acid rain damages ecosystems",
        "Respiratory diseases increase in urban areas"
      ]
    },
    {
      icon: Trees,
      title: "Deforestation",
      description: "Large-scale removal of forests reduces carbon absorption and destroys wildlife habitats.",
      color: "from-green-500 to-emerald-500",
      details: [
        "Loss of carbon sequestration capacity",
        "Habitat destruction threatens species",
        "Soil erosion increases without tree roots",
        "Local climate patterns change"
      ]
    },
    {
      icon: Waves,
      title: "Ocean Acidification",
      description: "Increased CO2 absorption makes oceans more acidic, threatening marine ecosystems.",
      color: "from-blue-500 to-cyan-500",
      details: [
        "Coral reefs bleach and die",
        "Shellfish struggle to form shells",
        "Marine food chain disruption",
        "Fishing industries face declining catches"
      ]
    },
    {
      icon: Users,
      title: "Population Pressure",
      description: "Growing populations increase resource consumption and environmental stress.",
      color: "from-purple-500 to-pink-500",
      details: [
        "Increased demand for food and water",
        "Urban expansion into natural areas",
        "Waste generation overwhelms systems",
        "Competition for limited resources"
      ]
    },
    {
      icon: Fish,
      title: "Biodiversity Loss",
      description: "Species extinction accelerates due to habitat loss and environmental changes.",
      color: "from-emerald-500 to-teal-500",
      details: [
        "Ecosystem services decline",
        "Food web stability decreases",
        "Genetic diversity reduces",
        "Pollination networks collapse"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
          Environmental Science Concepts
        </h2>
        <p className="text-xl text-slate-300 max-w-4xl mx-auto">
          Understanding the interconnected systems that govern our planet's environmental health. 
          Each parameter in the simulation represents complex real-world processes affecting global sustainability.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concepts.map((concept, index) => {
          const Icon = concept.icon;
          return (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${concept.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {concept.title}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {concept.description}
                  </p>
                  <div className="space-y-2">
                    {concept.details.map((detail, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs">
                        <div className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-400 leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interconnected Systems Explanation */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border border-cyan-500/30">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Activity className="w-6 h-6 mr-3 text-cyan-400" />
          System Interconnections
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cyan-300">Feedback Loops</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-white">Temperature → Ice Melting → Sea Level Rise</div>
                  <div className="text-slate-400">Rising temperatures melt polar ice, contributing to coastal flooding</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-white">Deforestation → CO2 → Temperature</div>
                  <div className="text-slate-400">Forest loss reduces CO2 absorption, accelerating warming</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-white">Ocean Acidification → Marine Life → Food Security</div>
                  <div className="text-slate-400">Acid oceans reduce fish populations, affecting human nutrition</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-300">Tipping Points</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-white">Arctic Ice Loss (2°C warming)</div>
                  <div className="text-slate-400">Irreversible melting accelerates sea level rise</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-white">Amazon Rainforest Dieback</div>
                  <div className="text-slate-400">Forest becomes carbon source instead of sink</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-white">Coral Reef Collapse</div>
                  <div className="text-slate-400">Marine biodiversity loss affects entire ecosystems</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-slate-900/50 rounded-xl">
          <h4 className="text-lg font-semibold text-white mb-4">How This Powers EnviroCast</h4>
          <p className="text-slate-300 leading-relaxed mb-4">
            Our global environment simulation demonstrates the same complex system modeling that EnviroCast uses 
            for environmental predictions. By understanding these interconnections, our quantum algorithms can 
            predict cascading environmental effects with unprecedented accuracy.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full" />
              <span className="text-slate-300">Real-time system modeling</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full" />
              <span className="text-slate-300">Cascade effect prediction</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <span className="text-slate-300">Tipping point detection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

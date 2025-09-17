'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Satellite, 
  MapPin, 
  Brain, 
  Bell, 
  Play,
  Pause,
  RefreshCw,
  Atom,
  Zap,
  Globe,
  Cloud,
  BarChart3,
  Users,
  Shield,
  ArrowRight,
  Info,
  Sliders,
  Download,
  Share2,
  TrendingUp,
  Wind,
  Eye,
  Settings,
  Target,
  Activity,
  Cpu,
  Database,
  Layers,
  Monitor,
  Network,
  GitBranch,
  Radio,
  Waves,
  Gauge,
  Timer,
  Thermometer,
  TreePine
} from 'lucide-react';
import { redirect } from 'next/navigation';
import { QuantumParticlePhysicsViz } from '@/components/models/quantum-particle-physics-viz';
import { GlobalEnvironmentSimulation } from '@/components/models/global-environment-simulation';

const ModelsPage = () => {
  const [activeTab, setActiveTab] = useState('quantum-particles');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedCity, setSelectedCity] = useState('Houston');
  const [trafficLevel, setTrafficLevel] = useState(50);
  const [emissionsLevel, setEmissionsLevel] = useState(30);
  const [weatherCondition, setWeatherCondition] = useState('clear');
  const [aqiValue, setAqiValue] = useState(89);
  const [predictionAccuracy, setPredictionAccuracy] = useState(94);
  
  // Quantum Processing specific states
  const [quantumLoad, setQuantumLoad] = useState(45);
  const [dataStreams, setDataStreams] = useState(12);
  const [processedSamples, setProcessedSamples] = useState(2847392);
  const [quantumCoherence, setQuantumCoherence] = useState(98.7);
  const [activeQubits, setActiveQubits] = useState(64);
  const [classicalNodes, setClassicalNodes] = useState(128);
  const [selectedProcessor, setSelectedProcessor] = useState('superposition');
  const [systemTemp, setSystemTemp] = useState(-272.8);

  const cities = [
    { name: 'Houston', aqi: 89, lat: 29.7604, lng: -95.3698 },
    { name: 'Los Angeles', aqi: 156, lat: 34.0522, lng: -118.2437 },
    { name: 'New York', aqi: 67, lat: 40.7128, lng: -74.0060 },
    { name: 'Chicago', aqi: 78, lat: 41.8781, lng: -87.6298 },
    { name: 'Phoenix', aqi: 134, lat: 33.4484, lng: -112.0740 },
    { name: 'Dallas', aqi: 92, lat: 32.7767, lng: -96.7970 }
  ];

  const getAQIColor = (value: number) => {
    if (value <= 50) return 'from-green-500 to-emerald-500';
    if (value <= 100) return 'from-yellow-500 to-orange-400';
    if (value <= 150) return 'from-orange-500 to-red-400';
    return 'from-red-500 to-pink-500';
  };

  const getAQILabel = (value: number) => {
    if (value <= 50) return 'Good';
    if (value <= 100) return 'Moderate';
    if (value <= 150) return 'Unhealthy for Sensitive';
    return 'Unhealthy';
  };

  const tabs = [
    { id: 'quantum-particles', label: 'Quantum Particle Physics', icon: Atom },
    { id: 'global-environment', label: 'Global Environment', icon: TreePine },
    { id: 'quantum-processing', label: 'Quantum Processing', icon: Cpu },
    { id: 'enviro-nex', label: 'EnviroNex', icon: Globe }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setAqiValue(prev => Math.max(20, Math.min(200, prev + (Math.random() - 0.5) * 4)));
        setPredictionAccuracy(prev => Math.max(85, Math.min(98, prev + (Math.random() - 0.5) * 2)));
        
        // Update quantum processing metrics
        setQuantumLoad(prev => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 8)));
        setDataStreams(prev => Math.max(8, Math.min(24, prev + Math.floor((Math.random() - 0.5) * 3))));
        setProcessedSamples(prev => prev + Math.floor(Math.random() * 1000));
        setQuantumCoherence(prev => Math.max(95, Math.min(99.9, prev + (Math.random() - 0.5) * 0.5)));
        setActiveQubits(prev => Math.max(32, Math.min(128, prev + Math.floor((Math.random() - 0.5) * 8))));
        setClassicalNodes(prev => Math.max(64, Math.min(256, prev + Math.floor((Math.random() - 0.5) * 16))));
        setSystemTemp(prev => Math.max(-273.15, Math.min(-271.5, prev + (Math.random() - 0.5) * 0.3)));
      }
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const InteractiveMap = () => (
    <div className="relative">
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">North America AQI Heatmap</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">Live TEMPO Data</span>
          </div>
        </div>

        {/* Map Visualization */}
        <div className="relative bg-slate-900 rounded-xl p-8 mb-6 min-h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
          
          {/* Simulated Map Points */}
          <div className="relative z-10 h-full">
            {cities.map((city, index) => (
              <motion.div
                key={city.name}
                className={`absolute w-6 h-6 rounded-full bg-gradient-to-r ${getAQIColor(city.aqi)} cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                style={{
                  left: `${30 + (index % 3) * 25}%`,
                  top: `${25 + Math.floor(index / 3) * 30}%`
                }}
                whileHover={{ scale: 1.5 }}
                animate={{ 
                  scale: selectedCity === city.name ? 1.3 : 1,
                  boxShadow: selectedCity === city.name ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none'
                }}
                onClick={() => setSelectedCity(city.name)}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                  {city.name}: {city.aqi}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selected City Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-xl p-6">
            <h4 className="text-lg font-bold text-white mb-4">{selectedCity} - Current Conditions</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Air Quality Index</span>
                <span className={`text-2xl font-bold bg-gradient-to-r ${getAQIColor(Math.round(aqiValue))} bg-clip-text text-transparent`}>
                  {Math.round(aqiValue)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Status</span>
                <span className="text-slate-200">{getAQILabel(Math.round(aqiValue))}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Model Accuracy</span>
                <span className="text-green-400 font-semibold">{Math.round(predictionAccuracy)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <h4 className="text-lg font-bold text-white mb-4">72-Hour Forecast</h4>
            <div className="space-y-3">
              {['Today', 'Tomorrow', 'Day 3'].map((day, index) => (
                <div key={day} className="flex justify-between items-center">
                  <span className="text-slate-300">{day}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-200">{Math.round(aqiValue + (Math.random() - 0.5) * 20)}</span>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getAQIColor(Math.round(aqiValue + (Math.random() - 0.5) * 20))}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const QuantumProcessing = () => {
    const processorTypes = [
      {
        id: 'superposition',
        name: 'Superposition Engine',
        description: 'Parallel environmental scenario modeling',
        icon: Atom,
        color: 'cyan',
        load: Math.round(quantumLoad),
        efficiency: 97.3
      },
      {
        id: 'entanglement',
        name: 'Entanglement Network',
        description: 'Correlation analysis across data streams',
        icon: Network,
        color: 'purple',
        load: Math.round(quantumLoad * 0.8),
        efficiency: 94.7
      },
      {
        id: 'optimization',
        name: 'Quantum Optimization',
        description: 'Resource allocation and routing',
        icon: Target,
        color: 'green',
        load: Math.round(quantumLoad * 1.2),
        efficiency: 98.9
      }
    ];

    const dataStreams_array = [
      { name: 'TEMPO Satellite', status: 'active', throughput: '2.3 TB/h', latency: '0.8ms', icon: Satellite },
      { name: 'Ground Sensors', status: 'active', throughput: '450 GB/h', latency: '1.2ms', icon: Radio },
      { name: 'Weather Stations', status: 'active', throughput: '180 GB/h', latency: '0.5ms', icon: Cloud },
      { name: 'Traffic Systems', status: isPlaying ? 'active' : 'idle', throughput: '890 MB/h', latency: '2.1ms', icon: Activity },
      { name: 'Industrial IoT', status: 'active', throughput: '1.1 GB/h', latency: '1.8ms', icon: Database },
      { name: 'Ocean Buoys', status: 'active', throughput: '67 MB/h', latency: '5.2ms', icon: Waves }
    ];

    return (
      <div className="space-y-8">
        {/* System Overview */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">EnviroCast Quantum Processing Hub</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                <span className="text-sm text-slate-300">{isPlaying ? 'Processing' : 'Standby'}</span>
              </div>
              <div className="text-sm text-slate-400">
                System Load: <span className="text-cyan-300 font-semibold">{quantumLoad}%</span>
              </div>
            </div>
          </div>

          {/* Real-time Metrics Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div 
              className="bg-slate-900 rounded-xl p-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span className="text-xs text-slate-400">QUBITS</span>
              </div>
              <div className="text-2xl font-bold text-cyan-300">{activeQubits}</div>
              <div className="text-xs text-slate-400">Active Quantum Bits</div>
            </motion.div>

            <motion.div 
              className="bg-slate-900 rounded-xl p-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <Monitor className="w-5 h-5 text-purple-400" />
                <span className="text-xs text-slate-400">NODES</span>
              </div>
              <div className="text-2xl font-bold text-purple-300">{classicalNodes}</div>
              <div className="text-xs text-slate-400">Classical Processors</div>
            </motion.div>

            <motion.div 
              className="bg-slate-900 rounded-xl p-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <Gauge className="w-5 h-5 text-green-400" />
                <span className="text-xs text-slate-400">COHERENCE</span>
              </div>
              <div className="text-2xl font-bold text-green-300">{quantumCoherence.toFixed(1)}%</div>
              <div className="text-xs text-slate-400">Quantum Coherence</div>
            </motion.div>

            <motion.div 
              className="bg-slate-900 rounded-xl p-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <Database className="w-5 h-5 text-orange-400" />
                <span className="text-xs text-slate-400">SAMPLES</span>
              </div>
              <div className="text-2xl font-bold text-orange-300">{(processedSamples / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-slate-400">Data Points Processed</div>
            </motion.div>
          </div>

          {/* Processing Pipeline */}
          <div className="grid lg:grid-cols-3 gap-6">
            {processorTypes.map((processor, index) => {
              const Icon = processor.icon;
              const isSelected = selectedProcessor === processor.id;
              return (
                <motion.div
                  key={processor.id}
                  className={`bg-slate-900 rounded-xl p-6 cursor-pointer border-2 transition-all ${
                    isSelected 
                      ? `border-${processor.color}-500/50 bg-gradient-to-br from-${processor.color}-500/10 to-${processor.color}-600/10` 
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                  onClick={() => setSelectedProcessor(processor.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 bg-${processor.color}-500/20 rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 text-${processor.color}-400`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{processor.name}</h4>
                      <p className="text-sm text-slate-400">{processor.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Load</span>
                      <span className={`text-sm font-semibold text-${processor.color}-300`}>{processor.load}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div 
                        className={`h-2 rounded-full bg-gradient-to-r from-${processor.color}-500 to-${processor.color}-400`}
                        initial={{ width: 0 }}
                        animate={{ width: `${processor.load}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Efficiency</span>
                      <span className={`text-sm font-semibold text-${processor.color}-300`}>{processor.efficiency}%</span>
                    </div>
                  </div>

                  {isSelected && isPlaying && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 bg-${processor.color}-400 rounded-full animate-pulse`}></div>
                        <span className="text-xs text-slate-400">Active Processing</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Data Stream Monitor */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-white flex items-center">
              <Radio className="w-5 h-5 mr-2 text-cyan-400" />
              Live Data Streams
            </h4>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-400">Active:</span>
              <span className="text-cyan-300 font-semibold">{dataStreams_array.filter(s => s.status === 'active').length}/6</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataStreams_array.map((stream, index) => {
              const Icon = stream.icon;
              const isActive = stream.status === 'active';
              return (
                <div
                  key={stream.name}
                  className={`p-4 rounded-xl border transition-all ${
                    isActive 
                      ? selectedProcessor === 'superposition' 
                        ? 'bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-cyan-500/30'
                        : selectedProcessor === 'entanglement'
                        ? 'bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30'
                        : 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30'
                      : 'bg-slate-900 border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon className={`w-5 h-5 ${isActive 
                      ? selectedProcessor === 'superposition' 
                        ? 'text-cyan-400'
                        : selectedProcessor === 'entanglement'
                        ? 'text-purple-400'
                        : 'text-green-400'
                      : 'text-slate-400'
                    }`} />
                    <div>
                      <div className="font-medium text-white text-sm">{stream.name}</div>
                      <div className={`text-xs ${isActive 
                        ? selectedProcessor === 'superposition' 
                          ? 'text-cyan-400'
                          : selectedProcessor === 'entanglement'
                          ? 'text-purple-400'
                          : 'text-green-400'
                        : 'text-slate-500'
                      } capitalize`}>
                        {stream.status}
                      </div>
                    </div>
                  </div>
                  
                  {isActive && (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Throughput:</span>
                        <motion.span 
                          className="text-slate-300"
                          key={`${stream.name}-throughput-${processedSamples}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {stream.throughput}
                        </motion.span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Latency:</span>
                        <motion.span 
                          className="text-slate-300"
                          key={`${stream.name}-latency-${processedSamples}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {stream.latency}
                        </motion.span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Processing Architecture Diagram */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h4 className="text-xl font-bold text-white mb-6 flex items-center">
            <Layers className="w-5 h-5 mr-2 text-purple-400" />
            Hybrid Processing Architecture
          </h4>
          
          <div className="relative">
            {/* Data Flow Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              {/* Input Layer */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                  <Database className="w-8 h-8 text-blue-300" />
                </div>
                <div className="text-sm font-medium text-blue-300">Environmental Data Input</div>
                <div className="text-xs text-slate-400">{(processedSamples / 1000).toFixed(0)}K samples/sec</div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex justify-center">
                <ArrowRight className="w-6 h-6 text-slate-500" />
              </div>

              {/* Quantum Processing */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center relative">
                  <Atom className="w-8 h-8 text-purple-300 animate-spin" style={{animationDuration: '4s'}} />
                  {isPlaying && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </div>
                <div className="text-sm font-medium text-purple-300">Quantum Processing</div>
                <div className="text-xs text-slate-400">{activeQubits} qubits active</div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex justify-center">
                <ArrowRight className="w-6 h-6 text-slate-500" />
              </div>

              {/* Classical ML */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-green-300" />
                </div>
                <div className="text-sm font-medium text-green-300">Classical-ML Fusion</div>
                <div className="text-xs text-slate-400">{classicalNodes} nodes active</div>
              </div>
            </div>

            {/* Connection Lines */}
            {isPlaying && (
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full">
                  <motion.path
                    d="M 100 50 Q 200 30 300 50"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* EnviroCast Integration Explanation */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700">
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="w-6 h-6 text-cyan-400" />
            <h4 className="text-2xl font-bold text-white">How This Powers EnviroCast</h4>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h5 className="text-lg font-semibold text-cyan-300 mb-3">Real-Time Environmental Intelligence</h5>
                <p className="text-slate-300 leading-relaxed">
                  Our quantum processing hub continuously analyzes environmental data from NASA's TEMPO satellite and ground sensors, 
                  providing unprecedented accuracy in air quality predictions and climate modeling.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <Target className="w-3 h-3 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Predictive Accuracy</div>
                    <div className="text-slate-400 text-sm">95% accuracy in short-term forecasts, 87% for long-term predictions</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h5 className="text-lg font-semibold text-purple-300 mb-3">Quantum Advantage in Action</h5>
                <p className="text-slate-300 leading-relaxed">
                  Traditional environmental models are limited by computational complexity. Our quantum-classical hybrid approach 
                  breaks through these barriers, enabling real-time analysis of interconnected environmental systems.
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4 space-y-3">
                <div className="text-sm font-medium text-white">Key Performance Metrics:</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Processing Speed:</span>
                    <span className="text-cyan-300">1000x faster</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Data Throughput:</span>
                    <span className="text-purple-300">1 TB/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Model Accuracy:</span>
                    <span className="text-green-300">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Response Time:</span>
                    <span className="text-orange-300">&lt;1s</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/20">
                <div className="flex items-center space-x-3">
                  <Thermometer className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-sm font-medium text-white">System Temperature</div>
                    <div className="text-xs text-slate-400">Quantum processors running optimal</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-cyan-300">{systemTemp.toFixed(4)}°C</div>
              </div>
            </div>
          </div>

          {/* Integration Flow */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <h5 className="text-lg font-semibold text-white mb-4">EnviroCast Integration Pipeline</h5>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'TEMPO Data Ingestion', color: 'blue' },
                { label: 'Quantum Feature Mapping', color: 'purple' },
                { label: 'Parallel State Processing', color: 'cyan' },
                { label: 'Classical ML Enhancement', color: 'green' },
                { label: 'Real-Time Predictions', color: 'orange' },
                { label: 'API Distribution', color: 'pink' }
              ].map((step, i) => (
                <div key={i} className={`px-3 py-2 bg-${step.color}-500/20 border border-${step.color}-500/30 rounded-lg text-sm text-${step.color}-300`}>
                  {step.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quantum Circuit Visualization */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-white flex items-center">
              <Atom className="w-5 h-5 mr-2 text-purple-400" />
              Live Quantum Circuit Visualization
            </h4>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-400">
                Circuit Depth: <span className="text-purple-300">12</span>
              </div>
              <div className="text-sm text-slate-400">
                Gate Operations: <span className="text-cyan-300">{Math.floor(processedSamples / 1000)}</span>
              </div>
            </div>
          </div>
          
          <div className="relative bg-black rounded-xl p-8 min-h-80 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
            
            {/* Quantum Circuit Lines */}
            <div className="relative z-10 space-y-8">
              {Array.from({ length: 8 }, (_, qubitIndex) => (
                <div key={qubitIndex} className="flex items-center space-x-6">
                  <div className="w-12 text-purple-300 text-sm font-mono">|q{qubitIndex}⟩</div>
                  
                  {/* Quantum Wire */}
                  <div className="flex-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 relative">
                    {/* Moving quantum states */}
                    {isPlaying && (
                      <motion.div
                        className="absolute w-3 h-3 bg-cyan-400 rounded-full -top-1 shadow-lg shadow-cyan-400/50"
                        animate={{ 
                          x: [0, 400, 0],
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 3 + (qubitIndex * 0.2), 
                          repeat: Infinity, 
                          ease: "linear",
                          delay: qubitIndex * 0.1
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Quantum Gates */}
                  <div className="flex space-x-4">
                    {/* Hadamard Gate */}
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded border-2 border-purple-300 flex items-center justify-center text-xs text-white font-bold">
                      H
                    </div>
                    
                    {/* Rotation Gate */}
                    {qubitIndex % 2 === 0 && (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full border-2 border-blue-300 flex items-center justify-center text-xs text-white font-bold">
                        R
                      </div>
                    )}
                    
                    {/* CNOT Gate */}
                    {qubitIndex < 7 && qubitIndex % 3 === 0 && (
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded border-2 border-green-300 flex items-center justify-center text-xs text-white font-bold">
                        ⊕
                      </div>
                    )}
                  </div>
                  
                  {/* Measurement */}
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border border-orange-300 flex items-center justify-center text-xs text-white">
                    M
                  </div>
                </div>
              ))}
            </div>

            {/* Quantum Entanglement Lines */}
            {isPlaying && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {Array.from({ length: 3 }, (_, i) => {
                  const y1 = 80 + (i * 2) * 64;
                  const y2 = 80 + (i * 2 + 1) * 64;
                  return (
                    <motion.line
                      key={i}
                      x1="200"
                      y1={y1}
                      x2="200"
                      y2={y2}
                      stroke="url(#entanglement)"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    />
                  );
                })}
                <defs>
                  <linearGradient id="entanglement" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            )}

            {/* Quantum State Header */}
            <div className="bg-slate-900/90 rounded-lg p-4 mt-4 border border-slate-700">
              <div className="flex items-center justify-between">
                <div className="text-sm font-mono">
                  <span className="text-cyan-300">Current State: </span>
                  <span className="text-purple-300">|ψ⟩ = α|0⟩ + β|1⟩</span>
                </div>
                <div className="text-sm text-slate-400">
                  Coherence: <span className="text-green-300 font-semibold">{quantumCoherence.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantum Processing Explanation */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Atom className="w-5 h-5 text-purple-400" />
              <h5 className="text-lg font-semibold text-white">Quantum Gates in Action</h5>
            </div>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded border border-purple-300 flex items-center justify-center text-xs text-white font-bold">H</div>
                  <span className="text-slate-300"><span className="text-purple-300 font-semibold">Hadamard (H)</span> - Creates superposition states for parallel environmental scenario modeling</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full border border-blue-300 flex items-center justify-center text-xs text-white font-bold">R</div>
                  <span className="text-slate-300"><span className="text-cyan-300 font-semibold">Rotation (R)</span> - Encodes environmental parameters like temperature and pollution levels</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded border border-green-300 flex items-center justify-center text-xs text-white font-bold">⊕</div>
                  <span className="text-slate-300"><span className="text-green-300 font-semibold">CNOT (⊕)</span> - Creates entanglement between qubits to model environmental correlations</span>
                </div>
              </div>
            </div>
          </div>
        
          <div className="bg-slate-900/50 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Network className="w-5 h-5 text-cyan-400" />
              <h5 className="text-lg font-semibold text-white">Environmental Modeling</h5>
            </div>
            <div className="space-y-3 text-sm text-slate-300">
              <p>
                Each qubit represents different atmospheric layers, with quantum superposition enabling parallel analysis of pollution dispersion across all altitudes.
              </p>
              <p>
                Entangled qubits model the complex relationships between wind patterns, temperature gradients, and pollutant concentrations.
              </p>
              <p>
                Quantum measurements collapse the superposition to reveal the most probable environmental outcomes for forecasting.
              </p>
            </div>
          </div>
        </div>

        {/* Performance Monitoring */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
              Real-Time Performance Analytics
            </h4>
          </div>
          
          <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
            <p className="text-slate-300 text-sm leading-relaxed">
              Monitor live processing efficiency as our quantum algorithms analyze environmental data streams. 
              The efficiency chart shows quantum processing performance over time, while system health indicators 
              track the operational status of quantum processors, classical nodes, memory systems, and error correction protocols.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Processing Efficiency Chart */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="text-lg font-medium text-white">Processing Efficiency</h5>
                <span className="text-sm text-slate-400">Last 60 seconds</span>
              </div>
              
              <div className="h-40 bg-slate-900 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-end justify-center space-x-1 p-4">
                  {Array.from({ length: 20 }, (_, i) => {
                    const height = Math.random() * 80 + 20;
                    const color = height > 70 ? 'bg-green-400' : height > 50 ? 'bg-yellow-400' : 'bg-red-400';
                    return (
                      <motion.div
                        key={i}
                        className={`w-3 ${color} rounded-t`}
                        style={{ height: `${height}%` }}
                        animate={{ height: `${Math.random() * 80 + 20}%` }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      />
                    );
                  })}
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-slate-400">
                <span>0s</span>
                <span>30s</span>
                <span>60s</span>
              </div>
            </div>

            {/* System Health */}
            <div className="space-y-4">
              <h5 className="text-lg font-medium text-white">System Health</h5>
              
              <div className="space-y-3">
                {[
                  { component: 'Quantum Processors', status: 'Optimal', value: 98, color: 'green' },
                  { component: 'Classical Nodes', status: 'Optimal', value: 96, color: 'green' },
                  { component: 'Memory Systems', status: 'Good', value: 87, color: 'yellow' },
                  { component: 'Network I/O', status: 'Optimal', value: 94, color: 'green' },
                  { component: 'Error Correction', status: 'Active', value: 99, color: 'cyan' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 bg-${item.color}-400 rounded-full animate-pulse`}></div>
                      <div>
                        <div className="text-sm font-medium text-white">{item.component}</div>
                        <div className={`text-xs text-${item.color}-400`}>{item.status}</div>
                      </div>
                    </div>
                    <div className={`text-sm font-semibold text-${item.color}-300`}>{item.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EnviroNex = () => (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <h3 className="text-2xl font-bold text-white mb-6">
        <span className="font-extrabold">EnviroNex</span>
      </h3>
      
      <div className="bg-slate-900 rounded-xl p-8 min-h-96 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20"></div>
        
        {/* 3D Globe Placeholder */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <motion.div
            className="w-32 h-32 border-4 border-cyan-400 rounded-full mb-6 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-4 border-2 border-purple-400 rounded-full">
              <div className="absolute inset-2 border-2 border-pink-400 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
          </motion.div>
          
          <h4 className="text-2xl font-bold text-white mb-4">Interactive 3D Globe & Quantum Forecasting</h4>
          <p className="text-slate-300 max-w-md">
            Explore real-time and long-term environmental predictions, including 24-hour pollution forecasts, multi-year projections, and health impact analysis.
          </p>
          
          <button
            className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg transition-all"
            onClick={() => window.location.href = "/nex"}
          >
            Launch EnviroNex
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 rounded-full border border-cyan-500/30 mb-8">
            <BarChart3 className="w-5 h-5 mr-3 text-cyan-400" />
            <span className="text-cyan-300 font-medium">Interactive Models & Simulations</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Explore Live
            </span>
            <br />
            <span className="text-white">Interactive Models</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Experience our quantum-enhanced forecasting system through interactive simulations and 
             in-depth looks into our core concepts, processes, and algorithms powered by NASA TEMPO data.
          </p>
        </motion.div>
      </section>

      {/* Control Panel */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Simulation Controls</h3>
                <p className="text-slate-300">Control playback speed and simulation parameters</p>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handlePlayToggle}
                    className={`p-3 rounded-lg transition-all ${
                      isPlaying 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-lg' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                  </button>
                  
                  <button 
                    onClick={() => {
                      setIsPlaying(false);
                      setAqiValue(89);
                      setPredictionAccuracy(94);
                    }}
                    className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <RefreshCw className="w-5 h-5 text-slate-300" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-slate-300 text-sm">Speed:</span>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={speed}
                    onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                    className="w-24 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-white font-semibold text-sm">{speed}x</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <Download className="w-4 h-4 text-slate-300" />
                  </button>
                  <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <Share2 className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 bg-slate-800 rounded-2xl p-2 border border-slate-700">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isEnviroNex = tab.id === 'enviro-nex';
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                      : isEnviroNex
                      ? 'text-blue-400 font-bold hover:text-blue-300 hover:bg-slate-700'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">

            {activeTab === 'quantum-particles' && (
              <motion.div
                key="quantum-particles"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <QuantumParticlePhysicsViz 
                  isPlaying={isPlaying}
                  speed={speed}
                  onPlayToggle={handlePlayToggle}
                  onSpeedChange={handleSpeedChange}
                />
              </motion.div>
            )}

            {activeTab === 'global-environment' && (
              <motion.div
                key="global-environment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <GlobalEnvironmentSimulation 
                  isPlaying={isPlaying}
                  speed={speed}
                  onPlayToggle={handlePlayToggle}
                  onSpeedChange={handleSpeedChange}
                />
              </motion.div>
            )}

            {activeTab === 'quantum-processing' && (
              <motion.div
                key="quantum-processing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <QuantumProcessing />
              </motion.div>
            )}

            {activeTab === 'enviro-nex' && (
              <motion.div
                key="enviro-nex"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <EnviroNex />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              TEMPO vs Traditional Forecasting
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              See how our quantum-enhanced TEMPO system outperforms traditional air quality monitoring approaches.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional Methods */}
            <motion.div
              className="bg-slate-800 rounded-2xl p-8 border border-slate-700"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-gray-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Traditional Methods</h3>
                  <p className="text-slate-400">Ground-based monitoring only</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Spatial Coverage</span>
                  <span className="text-gray-400">Limited</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Update Frequency</span>
                  <span className="text-gray-400">Daily</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Forecast Accuracy</span>
                  <span className="text-gray-400">~75%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Processing Speed</span>
                  <span className="text-gray-400">Hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Resolution</span>
                  <span className="text-gray-400">~50km</span>
                </div>
              </div>
            </motion.div>

            {/* TEMPO System */}
            <motion.div
              className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-2xl p-8 border border-cyan-500/30"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Satellite className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">TEMPO AirCast</h3>
                  <p className="text-cyan-300">Quantum-enhanced satellite monitoring</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Spatial Coverage</span>
                  <span className="text-cyan-400 font-semibold">Global</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Update Frequency</span>
                  <span className="text-cyan-400 font-semibold">Hourly</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Forecast Accuracy</span>
                  <span className="text-green-400 font-semibold">96.9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Processing Speed</span>
                  <span className="text-cyan-400 font-semibold">Minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Resolution</span>
                  <span className="text-cyan-400 font-semibold">~2.1km</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <motion.div
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl p-12 border border-cyan-500/30"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Ready to Dive Deeper?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Explore the team of experts behind these advanced quantum models or 
            dive headfirst into the power of our EnviroNex simulation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => redirect("/team")}
            >
              Meet Our Team
            </motion.button>
            <motion.button
              className="border-2 border-cyan-500 text-cyan-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-cyan-500 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = "/nex"}
            >
              Launch EnviroNex
            </motion.button>
          </div>
        </motion.div>
      </section>

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

export default ModelsPage;

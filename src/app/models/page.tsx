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
  Activity
} from 'lucide-react';

const ModelsPage = () => {
  const [activeTab, setActiveTab] = useState('realtime-map');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedCity, setSelectedCity] = useState('Houston');
  const [trafficLevel, setTrafficLevel] = useState(50);
  const [emissionsLevel, setEmissionsLevel] = useState(30);
  const [weatherCondition, setWeatherCondition] = useState('clear');
  const [aqiValue, setAqiValue] = useState(89);
  const [predictionAccuracy, setPredictionAccuracy] = useState(94);

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
    { id: 'realtime-map', label: 'Real-time Map', icon: Globe },
    { id: 'simulations', label: 'What-if Simulations', icon: Sliders },
    { id: 'quantum-viz', label: 'Quantum AI', icon: Atom },
    { id: '3d-model', label: '3D Atmospheric', icon: Cloud }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setAqiValue(prev => Math.max(20, Math.min(200, prev + (Math.random() - 0.5) * 4)));
        setPredictionAccuracy(prev => Math.max(85, Math.min(98, prev + (Math.random() - 0.5) * 2)));
      }
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

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

  const WhatIfSimulation = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-2xl font-bold text-white mb-6">What-If Scenario Builder</h3>
        <p className="text-slate-300 mb-8">
          Adjust environmental factors and see how they impact air quality predictions in real-time.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Traffic Level */}
          <div className="bg-slate-900 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Traffic Level</h4>
                <p className="text-slate-400 text-sm">Vehicle emissions impact</p>
              </div>
            </div>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="100"
                value={trafficLevel}
                onChange={(e) => setTrafficLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-slate-400">
                <span>Low</span>
                <span className="text-white font-semibold">{trafficLevel}%</span>
                <span>High</span>
              </div>
            </div>
          </div>

          {/* Industrial Emissions */}
          <div className="bg-slate-900 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Industrial Emissions</h4>
                <p className="text-slate-400 text-sm">Factory output levels</p>
              </div>
            </div>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="100"
                value={emissionsLevel}
                onChange={(e) => setEmissionsLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-slate-400">
                <span>Clean</span>
                <span className="text-white font-semibold">{emissionsLevel}%</span>
                <span>Heavy</span>
              </div>
            </div>
          </div>

          {/* Weather Conditions */}
          <div className="bg-slate-900 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Wind className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Weather</h4>
                <p className="text-slate-400 text-sm">Atmospheric conditions</p>
              </div>
            </div>
            <div className="space-y-3">
              <select
                value={weatherCondition}
                onChange={(e) => setWeatherCondition(e.target.value)}
                className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600"
              >
                <option value="clear">Clear Skies</option>
                <option value="windy">Windy</option>
                <option value="humid">High Humidity</option>
                <option value="inversion">Temperature Inversion</option>
              </select>
            </div>
          </div>
        </div>

        {/* Prediction Results */}
        <div className="bg-slate-900 rounded-xl p-6">
          <h4 className="text-lg font-bold text-white mb-4">Predicted Impact</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300">Predicted AQI</span>
                <span className={`text-3xl font-bold bg-gradient-to-r ${getAQIColor(Math.round(50 + trafficLevel * 0.8 + emissionsLevel * 1.2))} bg-clip-text text-transparent`}>
                  {Math.round(50 + trafficLevel * 0.8 + emissionsLevel * 1.2)}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${getAQIColor(Math.round(50 + trafficLevel * 0.8 + emissionsLevel * 1.2))} transition-all duration-500`}
                  style={{ width: `${Math.min(100, (50 + trafficLevel * 0.8 + emissionsLevel * 1.2) / 2)}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">Traffic Impact:</span>
                <span className="text-red-400">+{Math.round(trafficLevel * 0.8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Industrial Impact:</span>
                <span className="text-purple-400">+{Math.round(emissionsLevel * 1.2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Weather Modifier:</span>
                <span className="text-blue-400">{weatherCondition === 'windy' ? '-15' : weatherCondition === 'inversion' ? '+25' : '0'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const QuantumVisualization = () => (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <h3 className="text-2xl font-bold text-white mb-6">Quantum-Classical Hybrid Processing</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Quantum Circuit Visualization */}
        <div className="bg-slate-900 rounded-xl p-6">
          <h4 className="text-lg font-bold text-white mb-4">Quantum Circuit</h4>
          <div className="relative bg-black rounded-lg p-6 min-h-64 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
            
            {/* Animated quantum gates */}
            <div className="relative z-10 space-y-4">
              {[0, 1, 2, 3].map((qubit) => (
                <div key={qubit} className="flex items-center space-x-4">
                  <span className="text-purple-300 text-sm">|q{qubit}⟩</span>
                  <div className="flex-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 relative">
                    <motion.div
                      className="absolute w-4 h-4 bg-cyan-400 rounded-full -top-1.5"
                      animate={{ x: [0, 200, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded border-2 border-purple-300 flex items-center justify-center text-xs text-white">
                    H
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Processing Pipeline */}
        <div className="bg-slate-900 rounded-xl p-6">
          <h4 className="text-lg font-bold text-white mb-4">Processing Pipeline</h4>
          <div className="space-y-4">
            {[
              { stage: 'Data Encoding', progress: 100, color: 'from-blue-500 to-cyan-500' },
              { stage: 'Quantum Processing', progress: isPlaying ? 75 : 60, color: 'from-purple-500 to-pink-500' },
              { stage: 'Classical ML', progress: isPlaying ? 90 : 80, color: 'from-green-500 to-emerald-500' },
              { stage: 'Output Generation', progress: isPlaying ? 95 : 85, color: 'from-orange-500 to-red-500' }
            ].map((item, index) => (
              <div key={item.stage}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 text-sm">{item.stage}</span>
                  <span className="text-white font-semibold">{item.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div 
                    className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-slate-800 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Atom className="w-5 h-5 text-purple-400 animate-spin" />
              <span className="text-white font-semibold">Quantum Advantage</span>
            </div>
            <p className="text-slate-300 text-sm">
              Processing {Math.round(2 ** 10 * speed)}x faster than classical algorithms alone
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const AtmosphericModel3D = () => (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <h3 className="text-2xl font-bold text-white mb-6">3D Atmospheric Transport Model</h3>
      
      <div className="bg-slate-900 rounded-xl p-8 min-h-96 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20"></div>
        
        {/* 3D Model Placeholder */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <motion.div
            className="w-32 h-32 border-4 border-cyan-400 rounded-full mb-6 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-4 border-2 border-purple-400 rounded-full">
              <div className="absolute inset-2 border-2 border-pink-400 rounded-full flex items-center justify-center">
                <Cloud className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
          </motion.div>
          
          <h4 className="text-2xl font-bold text-white mb-4">Interactive 3D Visualization</h4>
          <p className="text-slate-300 max-w-md">
            Explore pollutant transport through atmospheric layers with real-time wind patterns 
            and chemical transformations from TEMPO satellite data.
          </p>
          
          <button className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:shadow-lg transition-all">
            Launch 3D Model
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
            <span className="text-white">Air Quality Models</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Experience our quantum-enhanced forecasting system through interactive simulations, 
            real-time maps, and what-if scenarios powered by NASA TEMPO data.
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
                    onClick={() => setIsPlaying(!isPlaying)}
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
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
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
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
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
            {activeTab === 'realtime-map' && (
              <motion.div
                key="realtime-map"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <InteractiveMap />
              </motion.div>
            )}

            {activeTab === 'simulations' && (
              <motion.div
                key="simulations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <WhatIfSimulation />
              </motion.div>
            )}

            {activeTab === 'quantum-viz' && (
              <motion.div
                key="quantum-viz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <QuantumVisualization />
              </motion.div>
            )}

            {activeTab === '3d-model' && (
              <motion.div
                key="3d-model"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <AtmosphericModel3D />
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
                  <span className="text-cyan-400 font-semibold">Continental</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Update Frequency</span>
                  <span className="text-cyan-400 font-semibold">Hourly</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Forecast Accuracy</span>
                  <span className="text-green-400 font-semibold">~94%</span>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
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
            Explore our team of experts, access raw datasets, or get in touch to learn more 
            about our revolutionary air quality forecasting technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Meet Our Team
            </motion.button>
            <motion.button
              className="border-2 border-cyan-500 text-cyan-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-cyan-500 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Access Data & Resources
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Atom className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">EnviroCast</span>
              </div>
              <p className="text-gray-400 text-sm">
                Revolutionary air quality forecasting powered by NASA's TEMPO satellite technology and quantum computing.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Navigation</h4>
              <div className="space-y-2 text-sm">
                <a href="#home" className="block text-gray-400 hover:text-cyan-300 transition-colors">Home</a>
                <a href="#about" className="block text-gray-400 hover:text-cyan-300 transition-colors">About</a>
                <a href="#models" className="block text-cyan-300">Models</a>
                <a href="#team" className="block text-gray-400 hover:text-cyan-300 transition-colors">Team</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <div className="space-y-2 text-sm">
                <a href="#resources" className="block text-gray-400 hover:text-cyan-300 transition-colors">Data Sources</a>
                <a href="#contact" className="block text-gray-400 hover:text-cyan-300 transition-colors">Contact</a>
                <a href="#" className="block text-gray-400 hover:text-cyan-300 transition-colors">API Documentation</a>
                <a href="#" className="block text-gray-400 hover:text-cyan-300 transition-colors">Terms of Service</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Connect</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-cyan-300 transition-colors">@envirocast_tech</a>
                <a href="#" className="block text-gray-400 hover:text-cyan-300 transition-colors">GitHub</a>
                <a href="#" className="block text-gray-400 hover:text-cyan-300 transition-colors">LinkedIn</a>
                <a href="#" className="block text-gray-400 hover:text-cyan-300 transition-colors">Research Papers</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 EnviroCast. All rights reserved. Powered by NASA TEMPO mission data and quantum computing.</p>
          </div>
        </div>
      </footer>

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

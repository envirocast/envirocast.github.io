'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Brain, 
  Zap, 
  Calendar, 
  Heart, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  MapPin, 
  BarChart3, 
  Activity, 
  Eye, 
  Users,
  Database,
  Code,
  ExternalLink,
  ArrowRight,
  Layers,
  Wind,
  CloudRain,
  Flame,
  Waves,
  Bot,
  Play,
  Pause,
  Settings,
  Target,
  Atom,
  FileText,
  Server,
  Key
} from 'lucide-react';

const NexPage = () => {
  const [activeTab, setActiveTab] = useState('simulation');

  const tabs = [
    { id: 'simulation', label: 'EnviroNex Simulation', icon: Globe },
    { id: 'api', label: 'API Interfacing', icon: Code }
  ];

  const features = [
    {
      title: "Interactive 3D Globe",
      description: "Navigate through our quantum-enhanced Earth visualization with real-time atmospheric data overlays",
      icon: Globe,
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "24-Hour Pollution Forecasts",
      description: "Real-time predictions for air quality across regions using quantum algorithms",
      icon: Calendar,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "7-Year Climate Projections",
      description: "Long-term environmental pattern analysis and weather predictions",
      icon: TrendingUp,
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Health Impact Analysis",
      description: "Quantum-driven analysis of pollutants with detailed health risk breakdowns",
      icon: Heart,
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Natural Disaster Tracking",
      description: "Visualize pollution and atmospheric statistics during hurricanes, wildfires, and floods",
      icon: AlertTriangle,
      color: "from-orange-500 to-amber-500"
    },
    {
      title: "AI Navigation Assistant",
      description: "Integrated chatbot to help navigate models, interpret results, and explore features",
      icon: Bot,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const apiFeatures = [
    {
      title: "Real-Time Environmental Data",
      description: "Access live atmospheric, pollution, and weather data from our quantum-enhanced processing systems",
      icon: Activity,
      endpoints: ["GET /api/v1/pollution/realtime", "GET /api/v1/weather/current", "GET /api/v1/atmospheric/live"]
    },
    {
      title: "Predictive Forecasting API",
      description: "Quantum-powered predictions for air quality, weather patterns, and environmental changes",
      icon: TrendingUp,
      endpoints: ["POST /api/v1/forecast/pollution", "POST /api/v1/forecast/weather", "GET /api/v1/forecast/longterm"]
    },
    {
      title: "Health Impact Endpoints",
      description: "Health risk assessments and population impact analysis based on environmental conditions",
      icon: Heart,
      endpoints: ["GET /api/v1/health/risks", "POST /api/v1/health/assessment", "GET /api/v1/health/population"]
    },
    {
      title: "Disaster Response Data",
      description: "Emergency environmental monitoring and disaster impact assessment APIs",
      icon: Shield,
      endpoints: ["GET /api/v1/disasters/active", "GET /api/v1/disasters/impact", "POST /api/v1/disasters/alert"]
    }
  ];

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
            <Globe className="w-5 h-5 mr-3 text-cyan-400 animate-spin" style={{animationDuration: '8s'}} />
            <span className="text-cyan-300 font-medium">EnviroNex Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              EnviroNex
            </span>
            <br />
            <span className="text-white">Quantum Environmental Intelligence</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Experience the future of environmental monitoring through our comprehensive platform that integrates 
            quantum algorithms, real-time predictions, and intelligent health impact analysis.
          </p>
        </motion.div>
      </section>

      {/* Tab Navigation */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-2 bg-slate-800 rounded-2xl p-2 border border-slate-700">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
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
            {activeTab === 'simulation' && (
              <motion.div
                key="simulation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-16"
              >
                {/* Launch App Section */}
                <div className="text-center">
                  <motion.div
                    className="inline-block p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 backdrop-blur-md"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative mb-6">
                      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-pulse rounded-full"></div>
                        <Globe className="w-16 h-16 text-cyan-300 animate-spin" style={{animationDuration: '12s'}} />
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                      Launch EnviroNex Platform
                    </h3>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                      Experience our full quantum-enhanced environmental intelligence platform with interactive 3D globe, 
                      real-time predictions, and comprehensive health analysis.
                    </p>
                    
                    <motion.button
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 inline-flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open("https://enviro-nex.vercel.app/", "_blank")}
                    >
                      <ExternalLink className="w-6 h-6 mr-3" />
                      Launch EnviroNex
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Platform Features */}
                <div className="space-y-12">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                      Platform Capabilities
                    </h2>
                    <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                      Our comprehensive environmental intelligence platform combines cutting-edge quantum computing 
                      with intuitive visualization for unprecedented environmental insights.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <motion.div
                          key={index}
                          className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                          <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Technical Overview */}
                <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-3xl p-12 border border-slate-700/50">
                  <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                    Quantum-Enhanced Intelligence
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {[
                          {
                            title: "Real-Time Processing",
                            description: "Quantum algorithms process massive environmental datasets in real-time for instant insights",
                            icon: Zap
                          },
                          {
                            title: "Predictive Modeling",
                            description: "Advanced forecasting from 24-hour pollution predictions to 7-year climate projections",
                            icon: TrendingUp
                          },
                          {
                            title: "Health Integration",
                            description: "Quantum-driven analysis linking environmental conditions to population health outcomes",
                            icon: Heart
                          },
                          {
                            title: "Disaster Response",
                            description: "Emergency monitoring during natural disasters with real-time impact assessment",
                            icon: Shield
                          }
                        ].map((item, i) => {
                          const Icon = item.icon;
                          return (
                            <div key={i} className="flex items-start space-x-4">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-6 h-6 text-cyan-300" />
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                                <p className="text-slate-400">{item.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                              <Atom className="w-12 h-12 text-cyan-300 animate-spin" style={{animationDuration: '8s'}} />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Quantum Processing Core</h4>
                            <p className="text-slate-400 text-sm">Advanced algorithms running 24/7</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'api' && (
              <motion.div
                key="api"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-16"
              >
                {/* API Access Section */}
                <div className="text-center">
                  <motion.div
                    className="inline-block p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 backdrop-blur-md"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative mb-6">
                      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 animate-pulse rounded-full"></div>
                        <Code className="w-16 h-16 text-green-300" />
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                      API Access & Documentation
                    </h3>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                      Access our quantum-enhanced environmental data through our comprehensive API. 
                      Open-access data for researchers, developers, and environmental organizations.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open("https://quantum-sky-probe.vercel.app/", "_blank")}
                      >
                        <Server className="w-5 h-5 mr-2" />
                        Access API
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </motion.button>
                      
                      <motion.button
                        className="border-2 border-blue-500 text-blue-300 px-8 py-3 rounded-xl font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 inline-flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open("https://quantum-sky-probe.vercel.app/api-docs", "_blank")}
                      >
                        <FileText className="w-5 h-5 mr-2" />
                        Documentation
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>

                {/* API Features */}
                <div className="space-y-12">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                      API Capabilities
                    </h2>
                    <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                      Comprehensive RESTful API providing access to our quantum-enhanced environmental intelligence data and predictions.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {apiFeatures.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <motion.div
                          key={index}
                          className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center space-x-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-green-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                          </div>
                          
                          <p className="text-slate-400 mb-6 leading-relaxed">{feature.description}</p>
                          
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-green-300 mb-3">Example Endpoints:</h4>
                            {feature.endpoints.map((endpoint, i) => (
                              <div key={i} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                                <code className="text-cyan-300 text-sm font-mono">{endpoint}</code>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Open Access Information */}
                <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-3xl p-12 border border-green-500/30">
                  <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                    Open Access Environmental Data
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                        <Database className="w-8 h-8 text-green-300" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">Free Access</h4>
                      <p className="text-slate-400">
                        Open-access environmental data for researchers, educators, and non-profit organizations
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                        <Key className="w-8 h-8 text-blue-300" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">API Keys</h4>
                      <p className="text-slate-400">
                        Simple registration process for API access with rate limits based on usage tier
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <Users className="w-8 h-8 text-purple-300" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">Community</h4>
                      <p className="text-slate-400">
                        Join our developer community for support, examples, and collaborative research
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-12 text-center">
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-500/30">
                      <Shield className="w-5 h-5 mr-3 text-green-400" />
                      <span className="text-green-300 font-medium">Committed to Open Science & Environmental Research</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
            Ready to Explore Environmental Intelligence?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Experience the future of environmental monitoring through our quantum-enhanced platform, 
            or integrate our data into your own applications through our comprehensive API.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("https://enviro-nex.vercel.app/", "_blank")}
            >
              <Globe className="w-5 h-5 mr-2" />
              Launch EnviroNex
            </motion.button>
            <motion.button
              className="border-2 border-green-500 text-green-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-500 hover:text-white transition-all duration-300 inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("https://quantum-sky-probe.vercel.app/", "_blank")}
            >
              <Code className="w-5 h-5 mr-2" />
              Explore API
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default NexPage;

'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Brain, Zap, ArrowLeft, ExternalLink, Atom, Globe, Target, Activity, Maximize, ArrowRight } from 'lucide-react';

export default function AIPage() {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // Simulate loading time for iframe
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Function to handle fullscreen request for the iframe
  const handleFullscreen = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,212,255,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      
      {/* Header */}
      <section className="relative z-40 px-6 pt-32 pb-8">
        <div className="max-w-7xl mx-auto">

          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-500/30">
              <Brain className="w-5 h-5 text-cyan-300 mr-3 animate-pulse" />
              <span className="text-cyan-300 font-semibold">Information for All</span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-green-300 bg-clip-text text-transparent">
                Interactive AI
              </span>
              <br />
              <span className="text-white">Environmental Intelligence</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
              Experience our enhanced environmental AI chatbot in real-time. Learn about environmental information, 
              gain knowledge from credible sources, and explore advanced concepts through our interactive interface.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
              {[
                { icon: Atom, label: "Powerful LLM Interface", color: "cyan" },
                { icon: Globe, label: "Real-Time Information", color: "green" },
                { icon: Target, label: "Precision Data", color: "purple" },
                { icon: Activity, label: "Live Responses", color: "yellow" }
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-md border border-slate-700/50">
                    <Icon className={`w-6 h-6 text-${feature.color}-400`} />
                    <span className="text-sm font-medium text-slate-300">{feature.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Iframe Container */}
      <section className="relative z-40 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 z-50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md rounded-3xl flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-600 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Initializing Quantum AI</h3>
                    <p className="text-slate-400">Loading environmental intelligence systems...</p>
                  </div>
                  <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Iframe Container with Styling */}
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-3xl p-4 shadow-2xl">
              {/* Header Bar */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700/50 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm font-medium text-slate-300 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-cyan-400" />
                    Enviro AI Console
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-400">Live</span>
                  <a 
                    href="https://enviro-ai.streamlit.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1 rounded hover:bg-slate-700/50 text-slate-400 hover:text-cyan-300 transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Iframe */}
              <div className="relative rounded-2xl overflow-hidden" style={{ height: '80vh', minHeight: '600px' }}>
                <iframe
                  src="https://enviro-ai.streamlit.app/?embedded=True"
                  className="w-full h-full border-0"
                  title="EnviroCast AI Demo"
                  allow="accelerometer; autoplay; camera; encrypted-media; gyroscope; microphone"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                  onLoad={() => setIsLoading(false)}
                  ref={iframeRef}
                />
                
                {/* Gradient Overlay for Seamless Integration */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-slate-800/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-slate-800/20 to-transparent"></div>
                  <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-slate-800/20 to-transparent"></div>
                  <div className="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-slate-800/20 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="absolute bottom-6 right-6 flex flex-col space-y-3">
              {/* Fullscreen button */}
              <button 
                onClick={handleFullscreen}
                className="w-12 h-12 bg-slate-800/80 backdrop-blur-md border border-slate-600 rounded-full flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 shadow-lg hover:scale-110 transition-all duration-300"
                title="View Fullscreen"
              >
                <Maximize className="w-5 h-5" />
              </button>
              <a 
                href="https://enviro-ai.streamlit.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800/80 backdrop-blur-md border border-slate-600 rounded-full flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 shadow-lg hover:scale-110 transition-all duration-300"
                title="Open in new tab"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated to match homepage styling */}
      <section className="relative z-40 px-6 py-20 bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Powered by Large Language Machine Learning Algorithms
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            This interactive demo showcases our innovative approach to providing environmental information to the public. 
            Learn from credible data sources using real-time data, analytics, and impact assessments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/about" 
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-white hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
            >
              Learn More About Our Technology
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="/mods" 
              className="px-8 py-4 bg-slate-800/50 backdrop-blur-md border border-slate-600 rounded-xl font-semibold text-white hover:bg-slate-700/50 transition-all duration-300 flex items-center justify-center"
            >
              Explore Our Models
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

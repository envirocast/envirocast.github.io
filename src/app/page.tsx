'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, Globe, Zap, Target, Users, ArrowRight, Play, Pause, BarChart3, Brain, Atom, Waves, CheckCircle } from 'lucide-react';
import { redirect } from "next/navigation";

// Animated Background Component
const QuantumBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight*2;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ['#00D4FF', '#8B5CF6', '#10B981', '#F59E0B'];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Connect nearby particles
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = particle.color;
              ctx.globalAlpha = (100 - distance) / 100 * 0.1;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #2d1b69 100%)' }}
    />
  );
};

type FloatingElementProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0, className = "" }: FloatingElementProps) => {
  return (
    <div 
      className={`animate-pulse ${className}`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }
      `}</style>
      {children}
    </div>
  );
};

type MetricCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  value: number | string;
  label: string;
  color: string;
};

// Interactive Metric Card
// Interactive Metric Card
const MetricCard = ({ icon: Icon, value, label, color }: MetricCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // Only animate numbers
    if (typeof value === 'string') return;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedValue(prev => {
          const increment = Math.ceil(value / 50);
          return prev < value ? Math.min(prev + increment, value) : value;
        });
      }, 50);

      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div 
      className={`relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-slate-700/50 transition-all duration-300 hover:scale-105 hover:border-${color}-500/50 cursor-pointer group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 text-${color}-400 group-hover:text-${color}-300 transition-colors`} />
        <div className={`w-2 h-2 rounded-full bg-${color}-400 animate-pulse`}></div>
      </div>
      
      <div className={`text-3xl font-bold text-${color}-300 mb-2`}>
        {typeof value === 'string' ? value : animatedValue.toLocaleString()}
      </div>
      
      <div className="text-slate-400 text-sm">{label}</div>
      
      {isHovered && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 pointer-events-none"></div>
      )}
    </div>
  );
};

// Team Member Preview
const TeamPreview = () => {
  const teamMembers = [
    { name: "Dr. Sarah Chen", role: "Quantum Algorithm Lead", avatar: "👩‍💼" },
    { name: "Marcus Rodriguez", role: "Environmental Data Scientist", avatar: "👨‍🔬" },
    { name: "Aisha Patel", role: "Climate Modeling Expert", avatar: "👩‍🎓" },
    { name: "Dr. James Wilson", role: "Quantum Computing Researcher", avatar: "👨‍💻" },
    { name: "Elena Kowalski", role: "Environmental Policy Analyst", avatar: "👩‍🌾" },
  ];

  return (
    <div className="flex -space-x-4 items-center">
      {teamMembers.slice(0, 4).map((member, i) => (
        <div
          key={i}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 p-0.5 transition-transform hover:scale-110 hover:z-10 relative"
          title={member.name}
        >
          <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-lg">
            {member.avatar}
          </div>
        </div>
      ))}
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center ml-2 text-sm text-slate-300">
        +1
      </div>
    </div>
  );
};

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const algorithmPoints = [
    {
      title: "Quantum Superposition Modeling",
      description: "Parallel pollution modeling across thousands of scenarios simultaneously",
      icon: Atom
    },
    {
      title: "Machine Learning Integration", 
      description: "AI-powered pattern recognition for complex environmental data",
      icon: Brain
    },
    {
      title: "Real-time Data Processing",
      description: "Instantaneous analysis of massive environmental datasets",
      icon: Zap
    },
    {
      title: "Predictive Climate Modeling",
      description: "Long-term forecasting with unprecedented accuracy",
      icon: Globe
    },
    {
      title: "Resource Optimization",
      description: "Quantum algorithms for maximum environmental efficiency",
      icon: Target
    },
    {
      title: "Multi-dimensional Analysis",
      description: "Comprehensive environmental impact assessment",
      icon: BarChart3
    },
    {
      title: "Quantum-enhanced Simulation",
      description: "Ultra-precise environmental scenario modeling",
      icon: Waves
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % algorithmPoints.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Animated Background */}
      <QuantumBackground />

      {/* Hero Section */}
      <section className="relative z-40 px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-500/30">
                  <Zap className="w-4 h-4 text-cyan-300 mr-2" />
                  <span className="text-cyan-300 text-sm font-semibold">Powered by Quantum Computing</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-cyan-300 to-purple-300 bg-clip-text text-transparent">
                    Environmental
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-green-300 bg-clip-text text-transparent">
                    Intelligence
                  </span>
                  <br />
                  <span className="text-slate-300">Evolved</span>
                </h1>
                
                <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                  Harness the power of quantum algorithms to model, predict, and combat environmental challenges with unprecedented precision and speed.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/models" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-white hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 flex items-center justify-center group">
                  Explore Models
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link href="/ai" className="px-8 py-4 bg-slate-800/50 backdrop-blur-md border border-slate-600 rounded-xl font-semibold text-white hover:bg-slate-700/50 transition-all duration-300 flex items-center justify-center group">
                  <Brain className="mr-2 w-5 h-5" />
                  Try AI Demo
                </Link>
              </div>

              {/* Algorithm Showcase */}
              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-md border border-slate-700/50">
                <div className="flex items-center mb-4">
                  <Brain className="w-6 h-6 text-cyan-400 mr-3" />
                  <h3 className="text-lg font-semibold text-cyan-300">Quantum Algorithm Highlights</h3>
                </div>
                <div className="h-16 overflow-hidden">
                  <div 
                    className="transition-transform duration-1000 ease-in-out"
                    style={{ transform: `translateY(-${currentSlide * 64}px)` }}
                  >
                    {algorithmPoints.map((point, i) => (
                      <div key={i} className="h-16 flex items-center text-slate-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mr-4"></div>
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative z-10 space-y-6">
                {/* Main Visualization */}
                <FloatingElement className="relative">
                  <div className="w-96 h-96 mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="relative w-full h-full rounded-full border-2 border-gradient-to-r from-cyan-400 to-purple-400 p-8">
                      <div className="w-full h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-full backdrop-blur-md flex items-center justify-center">
                        <div className="text-center space-y-4">
                          <Globe className="w-16 h-16 text-cyan-300 mx-auto animate-spin" style={{animationDuration: '20s'}} />
                          <div className="text-2xl font-bold text-cyan-300">99.7%</div>
                          <div className="text-sm text-slate-400">Prediction Accuracy</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FloatingElement>

                {/* Floating Metrics */}
                <FloatingElement delay={1} className="absolute top-0 right-0">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-500/30">
                    <Waves className="w-6 h-6 text-green-400 mb-2" />
                    <div className="text-lg font-bold text-green-300">2.3M</div>
                    <div className="text-xs text-green-400">Data Points</div>
                  </div>
                </FloatingElement>

                <FloatingElement delay={2} className="absolute bottom-0 left-0">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-500/30">
                    <BarChart3 className="w-6 h-6 text-purple-400 mb-2" />
                    <div className="text-lg font-bold text-purple-300">47%</div>
                    <div className="text-xs text-purple-400">CO₂ Reduction</div>
                  </div>
                </FloatingElement>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quantum Algorithm Highlights Section */}
      <section className="relative z-40 px-6 py-20 bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-500/30 mb-8">
              <Brain className="w-6 h-6 text-cyan-300 mr-3 animate-pulse" />
              <span className="text-cyan-300 font-semibold text-lg">Quantum Algorithm Suite</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-green-300 bg-clip-text text-transparent">
                Revolutionary Algorithms
              </span>
            </h2>
            
            <p className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
              Seven cutting-edge quantum algorithms working in perfect harmony to deliver environmental intelligence 
              that was previously impossible with classical computing.
            </p>
          </div>

          {/* Algorithm Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {algorithmPoints.map((algorithm, index) => {
              const Icon = algorithm.icon;
              const isActive = currentSlide === index;
              
              return (
                <div
                  key={index}
                  className={`relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer group
                    ${isActive 
                      ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/50 scale-105 shadow-2xl shadow-cyan-500/20' 
                      : 'bg-gradient-to-br from-slate-800/30 to-slate-900/30 border-slate-700/50 hover:border-cyan-500/30'
                    } backdrop-blur-md hover:scale-105`}
                >
                  {/* Icon and Status */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300
                      ${isActive ? 'bg-cyan-500/30' : 'bg-slate-700/30 group-hover:bg-cyan-500/20'}`}>
                      <Icon className={`w-7 h-7 transition-colors duration-300
                        ${isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-300'}`} />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full transition-all duration-300
                        ${isActive ? 'bg-cyan-400 animate-pulse scale-110' : 'bg-slate-500 group-hover:bg-cyan-400'}`}>
                      </div>
                      {isActive && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-300
                    ${isActive ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'}`}>
                    {algorithm.title}
                  </h3>
                  
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {algorithm.description}
                  </p>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-3 mb-8">
            {algorithmPoints.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300
                  ${currentSlide === index 
                    ? 'bg-cyan-400 scale-125' 
                    : 'bg-slate-600 hover:bg-slate-500'
                  }`}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link href="/about" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-semibold text-white hover:from-purple-400 hover:to-cyan-400 transition-all duration-300 inline-flex items-center group">
              Deep Dive into Algorithms
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="relative z-40 px-6 py-20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-300 to-orange-300 bg-clip-text text-transparent">The Crisis</span>
              {' & '}
              <span className="bg-gradient-to-r from-cyan-300 to-green-300 bg-clip-text text-transparent">Our Solution</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Environmental degradation threatens our planet's future. Traditional modeling falls short. 
              We're revolutionizing environmental science with quantum-powered intelligence.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Problem */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-red-300">The Challenge</h3>
                <div className="space-y-4">
                  {[
                    'Climate change accelerating beyond predictions',
                    'Pollution overwhelming natural recovery systems',
                    'Traditional models lack multi-dimensional analysis',
                    'Real-time environmental monitoring gaps'
                  ].map((problem, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      </div>
                      <span className="text-slate-300">{problem}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Crisis Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <MetricCard icon={Globe} value={1.5} label="°C Global Warming" color="red" />
                <MetricCard icon={Waves} value={8.3} label="Million Tons Plastic/Year" color="orange" />
              </div>
            </div>

            {/* Solution */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-cyan-300">Our Quantum Advantage</h3>
                <div className="space-y-4">
                  {[
                    'Quantum superposition enables parallel scenario modeling',
                    'AI integration for complex pattern recognition',
                    'Real-time processing of massive environmental datasets',
                    'Predictive accuracy exceeding traditional methods by 300%'
                  ].map((solution, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      </div>
                      <span className="text-slate-300">{solution}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Solution Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <MetricCard icon={Target} value="99.7" label="% Prediction Accuracy" color="cyan" />
                <MetricCard icon={Zap} value="1000" label="x Faster Processing" color="green" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Team Teaser */}
      <section className="relative z-40 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
              To democratize environmental intelligence through quantum computing, enabling rapid response to climate challenges 
              and empowering decision-makers with unprecedented insights into our planet's future.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Meet Our Team</h3>
                  <p className="text-slate-400 leading-relaxed">
                    World-class experts in quantum computing, environmental science, and climate modeling, 
                    united by a shared vision of a sustainable future powered by advanced technology.
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <TeamPreview />
                  <Link href="/team" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-semibold text-white hover:from-purple-400 hover:to-cyan-400 transition-all duration-300 flex items-center">
                    Meet the Team
                    <Users className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <FloatingElement>
                  <div className="w-80 h-80 mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-3xl"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl backdrop-blur-md border border-slate-700/50 p-8 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="flex justify-center space-x-2 mb-6">
                          <Atom className="w-8 h-8 text-cyan-300 animate-bounce" />
                          <Brain className="w-8 h-8 text-purple-300 animate-bounce" style={{animationDelay: '0.2s'}} />
                          <Globe className="w-8 h-8 text-green-300 animate-bounce" style={{animationDelay: '0.4s'}} />
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">5 Experts</div>
                        <div className="text-slate-400">Quantum + Climate Science</div>
                        <div className="text-cyan-300 text-sm">PhD • Research • Innovation</div>
                      </div>
                    </div>
                  </div>
                </FloatingElement>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-40 px-6 py-20 bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Ready to Transform Environmental Science?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Join us in revolutionizing how we understand, predict, and protect our planet using the power of quantum computing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-white hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group" onClick={() => redirect("/models")}>
              Explore Interactive Models
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="px-8 py-4 bg-slate-800/50 backdrop-blur-md border border-slate-600 rounded-xl font-semibold text-white hover:bg-slate-700/50 transition-all duration-300 flex items-center justify-center" onClick={() => window.open("https://quantum-sky-probe.vercel.app/", "_blank")}>
              View Our API Docs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client'
import React, { useState, useEffect, useRef } from 'react';
import { 
  Atom, Brain, Zap, Globe, BarChart3, Waves, Target, 
  ChevronRight, ChevronDown, Play, Pause, ArrowRight,
  Cpu, Database, TrendingUp, Shield, Lightbulb, Layers,
  GitBranch, Activity, Settings, Eye
} from 'lucide-react';

// ---------- TYPE DEFINITIONS ----------
type AlgorithmType = {
  title: string;
  category: string;
  type: string;
  description: string;
  metrics: { value: string; label: string }[];
  technical: { title: string; description: string }[];
  code: string[];
  impacts: { value: string; label: string }[];
  applications: { title: string; description: string }[];
};

type AlgorithmCardProps = {
  algorithm: AlgorithmType;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
};

type QuantumVisualizationProps = {
  isActive: boolean;
  algorithm: AlgorithmType;
};

type Qubit = { x: number; y: number; state: number; phase: number; entangled: boolean };
type Connection = { from: number; to: number; strength: number };

type SectionType = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

// ---------- QUANTUM VISUALIZATION ----------
const QuantumVisualization: React.FC<QuantumVisualizationProps> = ({ isActive, algorithm }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    const qubits: Qubit[] = [];
    const connections: Connection[] = [];

    // Create quantum state visualization
    for (let i = 0; i < 8; i++) {
      qubits.push({
        x: (i % 4) * 100 + 50,
        y: Math.floor(i / 4) * 150 + 75,
        state: Math.random(),
        phase: Math.random() * Math.PI * 2,
        entangled: i % 2 === 0
      });
    }

    // Create entanglement connections
    for (let i = 0; i < qubits.length - 1; i += 2) {
      connections.push({ from: i, to: i + 1, strength: Math.random() });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections (entanglement)
      connections.forEach(conn => {
        const from = qubits[conn.from];
        const to = qubits[conn.to];

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${conn.strength * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Animate connection strength
        conn.strength = 0.3 + Math.sin(Date.now() * 0.003 + conn.from) * 0.3;
      });

      // Draw qubits
      qubits.forEach((qubit, i) => {
        // Update quantum state
        qubit.phase += 0.02;
        qubit.state = 0.5 + Math.sin(qubit.phase) * 0.3;

        // Draw qubit sphere
        const radius = 15 + qubit.state * 10;
        const gradient = ctx.createRadialGradient(qubit.x, qubit.y, 0, qubit.x, qubit.y, radius);

        if (qubit.entangled) {
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0.2)');
        } else {
          gradient.addColorStop(0, 'rgba(0, 212, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(0, 212, 255, 0.2)');
        }

        ctx.beginPath();
        ctx.arc(qubit.x, qubit.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw state vector
        const vectorX = qubit.x + Math.cos(qubit.phase) * 20;
        const vectorY = qubit.y + Math.sin(qubit.phase) * 20;

        ctx.beginPath();
        ctx.moveTo(qubit.x, qubit.y);
        ctx.lineTo(vectorX, vectorY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw qubit label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Q${i}`, qubit.x, qubit.y + 35);
      });

      if (isActive) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isActive, algorithm]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-xl bg-gradient-to-br from-slate-900 to-slate-800"
        style={{ maxWidth: '400px', maxHeight: '300px' }}
      />
      <div className="absolute top-4 left-4 text-xs text-cyan-300 font-mono">
        Quantum State: |ψ⟩ = α|0⟩ + β|1⟩
      </div>
    </div>
  );
};

// ---------- ALGORITHM CARD ----------
const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ algorithm, index, isExpanded, onToggle }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const getIcon = (type: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      superposition: Atom,
      ml: Brain,
      realtime: Activity,
      prediction: TrendingUp,
      optimization: Target,
      analysis: BarChart3,
      simulation: Cpu
    };
    return icons[type] || Atom;
  };

  const Icon = getIcon(algorithm.type);

  return (
    <div className={`group transition-all duration-500 ${isExpanded ? 'col-span-full' : ''}`}>
      <div 
        className={`relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer
          ${isExpanded 
            ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500/50 shadow-2xl shadow-cyan-500/20' 
            : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 hover:border-cyan-500/30'
          } backdrop-blur-md hover:scale-105`}
        onClick={onToggle}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
              ${isExpanded ? 'bg-cyan-500/20' : 'bg-slate-700/50 group-hover:bg-cyan-500/20'}`}>
              <Icon className={`w-6 h-6 transition-colors duration-300
                ${isExpanded ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-300'}`} />
            </div>
            <div>
              <h3 className={`text-xl font-bold transition-colors duration-300
                ${isExpanded ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'}`}>
                {algorithm.title}
              </h3>
              <p className="text-slate-400 text-sm">{algorithm.category}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full transition-all duration-300
              ${isExpanded ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500 group-hover:bg-cyan-400'}`}>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300
              ${isExpanded ? 'rotate-180' : 'group-hover:text-cyan-300'}`} />
          </div>
        </div>
        
        {/* Brief Description */}
        <p className={`text-slate-300 mb-4 transition-all duration-300
          ${isExpanded ? 'text-base' : 'text-sm'}`}>
          {algorithm.description}
        </p>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {algorithm.metrics.map((metric, i) => (
            <div key={i} className="text-center">
              <div className={`text-lg font-bold transition-colors duration-300
                ${isExpanded ? 'text-cyan-300' : 'text-white'}`}>
                {metric.value}
              </div>
              <div className="text-xs text-slate-400">{metric.label}</div>
            </div>
          ))}
        </div>
        
        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-8 mt-8 border-t border-slate-700 pt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Technical Deep Dive */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-cyan-300 flex items-center">
                  <Cpu className="w-5 h-5 mr-2" />
                  Technical Implementation
                </h4>
                
                <div className="space-y-4">
                  {algorithm.technical.map((point, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      </div>
                      <div>
                        <h5 className="text-white font-medium mb-1">{point.title}</h5>
                        <p className="text-slate-400 text-sm">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Code Example */}
                <div className="mt-6">
                  <h5 className="text-sm font-medium text-cyan-300 mb-2">Quantum Circuit</h5>
                  <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm text-green-300 border border-slate-700">
                    <div className="text-slate-500"># {algorithm.title} Implementation</div>
                    <div className="mt-2">
                      {algorithm.code.map((line, i) => (
                        <div key={i} className="hover:bg-slate-800/50 px-2 py-0.5 rounded">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Visualization */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-cyan-300 flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Live Visualization
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaying(!isPlaying);
                    }}
                    className="px-3 py-1 bg-cyan-500/20 rounded-lg text-cyan-300 hover:bg-cyan-500/30 transition-colors text-sm flex items-center"
                  >
                    {isPlaying ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
                    {isPlaying ? 'Pause' : 'Run'}
                  </button>
                </div>
                
                <QuantumVisualization isActive={isPlaying} algorithm={algorithm} />
                
                {/* Impact Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {algorithm.impacts.map((impact, i) => (
                    <div key={i} className="p-4 bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-xl">
                      <div className="text-2xl font-bold text-green-300 mb-1">{impact.value}</div>
                      <div className="text-sm text-slate-400">{impact.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Applications */}
            <div className="border-t border-slate-700 pt-6">
              <h4 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Real-World Applications
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {algorithm.applications.map((app, i) => (
                  <div key={i} className="p-4 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-xl border border-purple-500/20">
                    <h5 className="font-medium text-white mb-2">{app.title}</h5>
                    <p className="text-slate-400 text-sm">{app.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- MAIN PAGE ----------
export default function AboutPage() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('overview');

  const algorithms: AlgorithmType[] = [
    {
      title: "Quantum Superposition Modeling",
      category: "Core Algorithm",
      type: "superposition",
      description: "Leverages quantum superposition to simultaneously model multiple environmental scenarios, enabling parallel computation of thousands of potential outcomes.",
      metrics: [
        { value: "10,000x", label: "Parallel States" },
        { value: "99.7%", label: "Accuracy" },
        { value: "0.3ms", label: "Processing Time" }
      ],
      technical: [
        {
          title: "Quantum State Preparation",
          description: "Initialize qubits in superposition states representing different environmental parameters simultaneously."
        },
        {
          title: "Entanglement Networks",
          description: "Create quantum entanglements between related environmental factors for correlated modeling."
        },
        {
          title: "Measurement Protocols",
          description: "Implement quantum measurement strategies that preserve coherence while extracting meaningful results."
        }
      ],
      code: [
        "qc = QuantumCircuit(8, 8)",
        "qc.h(range(8))  # Superposition",
        "qc.cx(0, 1)     # Entanglement",
        "qc.measure_all()",
        "job = execute(qc, backend)"
      ],
      impacts: [
        { value: "300%", label: "Speed Increase" },
        { value: "45%", label: "Accuracy Gain" }
      ],
      applications: [
        {
          title: "Climate Pattern Recognition",
          description: "Identify complex weather patterns across multiple time horizons simultaneously."
        },
        {
          title: "Pollution Dispersion Modeling",
          description: "Model how pollutants spread through different atmospheric conditions in parallel."
        },
        {
          title: "Resource Allocation",
          description: "Optimize environmental resource distribution across multiple scenarios."
        }
      ]
    },
    {
      title: "Quantum Machine Learning Integration",
      category: "AI Enhancement",
      type: "ml",
      description: "Combines quantum computing with classical machine learning to identify complex environmental patterns that traditional methods miss.",
      metrics: [
        { value: "95%", label: "Pattern Detection" },
        { value: "2.3M", label: "Data Points/sec" },
        { value: "78%", label: "Noise Reduction" }
      ],
      technical: [
        {
          title: "Quantum Feature Maps",
          description: "Map classical environmental data into high-dimensional quantum feature spaces for enhanced pattern recognition."
        },
        {
          title: "Variational Quantum Classifiers",
          description: "Use parameterized quantum circuits to classify environmental conditions with quantum advantage."
        },
        {
          title: "Quantum Kernel Methods",
          description: "Implement quantum kernels that can detect non-linear relationships in environmental data."
        }
      ],
      code: [
        "feature_map = ZZFeatureMap(4)",
        "ansatz = RealAmplitudes(4)",
        "vqc = VQC(feature_map, ansatz)",
        "vqc.fit(X_train, y_train)",
        "predictions = vqc.predict(X_test)"
      ],
      impacts: [
        { value: "67%", label: "Better Predictions" },
        { value: "89%", label: "False Positive Reduction" }
      ],
      applications: [
        {
          title: "Species Migration Prediction",
          description: "Predict wildlife migration patterns based on changing environmental conditions."
        },
        {
          title: "Ecosystem Health Assessment",
          description: "Evaluate ecosystem stability using quantum-enhanced pattern recognition."
        },
        {
          title: "Pollution Source Identification",
          description: "Trace pollution back to sources using quantum machine learning techniques."
        }
      ]
    },
    {
      title: "Real-Time Quantum Processing",
      category: "Data Processing",
      type: "realtime",
      description: "Processes massive environmental datasets in real-time using quantum algorithms optimized for continuous data streams.",
      metrics: [
        { value: "1.2TB/s", label: "Data Throughput" },
        { value: "<100ms", label: "Latency" },
        { value: "99.9%", label: "Uptime" }
      ],
      technical: [
        {
          title: "Quantum Data Streaming",
          description: "Implement quantum algorithms that can process continuous data streams without interruption."
        },
        {
          title: "Adaptive Quantum Gates",
          description: "Use dynamically adjusting quantum gates that adapt to changing data characteristics."
        },
        {
          title: "Quantum Error Correction",
          description: "Real-time error correction to maintain data integrity in noisy quantum environments."
        }
      ],
      code: [
        "stream = QuantumDataStream()",
        "processor = AdaptiveQProcessor()",
        "while stream.has_data():",
        "  data = stream.get_batch()",
        "  result = processor.process(data)"
      ],
      impacts: [
        { value: "50x", label: "Faster Processing" },
        { value: "92%", label: "Resource Efficiency" }
      ],
      applications: [
        {
          title: "Emergency Response Systems",
          description: "Provide real-time environmental alerts for natural disasters and pollution events."
        },
        {
          title: "Smart City Integration",
          description: "Process urban environmental data streams for immediate air quality and traffic optimization."
        },
        {
          title: "Agricultural Monitoring",
          description: "Real-time crop and soil condition monitoring for precision agriculture."
        }
      ]
    },
    {
      title: "Predictive Climate Modeling",
      category: "Forecasting",
      type: "prediction",
      description: "Uses quantum algorithms to model climate systems with unprecedented accuracy, predicting environmental changes months ahead.",
      metrics: [
        { value: "18mo", label: "Forecast Range" },
        { value: "94.2%", label: "Accuracy" },
        { value: "0.1°C", label: "Temperature Precision" }
      ],
      technical: [
        {
          title: "Quantum Fourier Transform",
          description: "Use QFT to analyze cyclical patterns in climate data across multiple timescales."
        },
        {
          title: "Quantum Phase Estimation",
          description: "Estimate phase relationships between different climate variables for better predictions."
        },
        {
          title: "Quantum Amplitude Amplification",
          description: "Amplify the probability of accurate predictions while suppressing noise."
        }
      ],
      code: [
        "climate_qft = QuantumFourierTransform()",
        "phase_est = PhaseEstimation()",
        "predictor = QuantumPredictor()",
        "forecast = predictor.predict(climate_data)",
        "confidence = predictor.get_confidence()"
      ],
      impacts: [
        { value: "45%", label: "Longer Forecasts" },
        { value: "73%", label: "Better Accuracy" }
      ],
      applications: [
        {
          title: "Hurricane Path Prediction",
          description: "Predict hurricane trajectories with quantum-enhanced atmospheric modeling."
        },
        {
          title: "Drought Early Warning",
          description: "Identify drought conditions months before they occur for agricultural planning."
        },
        {
          title: "Sea Level Rise Modeling",
          description: "Model ice sheet dynamics and thermal expansion with quantum precision."
        }
      ]
    },
    {
      title: "Quantum Resource Optimization",
      category: "Optimization",
      type: "optimization",
      description: "Optimizes environmental resource allocation using quantum annealing and variational algorithms for maximum efficiency.",
      metrics: [
        { value: "87%", label: "Efficiency Gain" },
        { value: "€2.3M", label: "Cost Savings" },
        { value: "43%", label: "Waste Reduction" }
      ],
      technical: [
        {
          title: "Quantum Approximate Optimization",
          description: "Use QAOA to solve complex environmental resource allocation problems."
        },
        {
          title: "Variational Quantum Eigensolver",
          description: "Find optimal configurations for renewable energy distribution networks."
        },
        {
          title: "Quantum Annealing",
          description: "Use quantum annealing for large-scale environmental optimization problems."
        }
      ],
      code: [
        "qaoa = QAOA(optimizer='COBYLA')",
        "problem = QuadraticProgram()",
        "problem.from_ising(h, J)",
        "result = qaoa.solve(problem)",
        "optimal_solution = result.x"
      ],
      impacts: [
        { value: "60%", label: "Resource Savings" },
        { value: "35%", label: "Emissions Reduction" }
      ],
      applications: [
        {
          title: "Renewable Energy Grid",
          description: "Optimize renewable energy distribution across smart grids for maximum efficiency."
        },
        {
          title: "Waste Management Routes",
          description: "Find optimal waste collection and recycling routes to minimize environmental impact."
        },
        {
          title: "Water Resource Distribution",
          description: "Optimize water distribution networks considering environmental and economic factors."
        }
      ]
    }
  ];

  const sections: SectionType[] = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'algorithms', label: 'Quantum Algorithms', icon: Atom },
    { id: 'architecture', label: 'System Architecture', icon: Layers },
    { id: 'performance', label: 'Performance Metrics', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,212,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-500/30 mb-8">
            <Atom className="w-5 h-5 text-cyan-300 mr-3 animate-spin" style={{animationDuration: '8s'}} />
            <span className="text-cyan-300 font-semibold">Quantum Environmental Intelligence</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-green-300 bg-clip-text text-transparent">
              Deep Dive into
            </span>
            <br />
            <span className="text-white">Quantum Algorithms</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Explore the cutting-edge quantum computing techniques that power EnviroCast's environmental intelligence. 
            From superposition-based modeling to quantum machine learning, discover how we're revolutionizing climate science.
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {sections.map(section => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30' 
                      : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {activeSection === 'overview' && (
            <div className="space-y-16">
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  The Quantum Advantage
                </h2>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                  Traditional environmental modeling hits computational limits when dealing with the complexity of climate systems. 
                  Our quantum approach breaks through these barriers.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white">Why Quantum Computing?</h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Exponential Scaling",
                          description: "Quantum systems can represent exponentially more states than classical computers, perfect for complex environmental modeling."
                        },
                        {
                          title: "Parallel Processing",
                          description: "Quantum superposition allows simultaneous exploration of multiple solution paths, dramatically speeding up optimization."
                        },
                        {
                          title: "Natural Correlation",
                          description: "Quantum entanglement naturally models the interconnected relationships in environmental systems."
                        }
                      ].map((benefit, i) => (
                        <div key={i} className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mt-1">
                            <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-cyan-300 mb-2">{benefit.title}</h4>
                            <p className="text-slate-400">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="relative z-10">
                    <QuantumVisualization isActive={true} algorithm={algorithms[0]} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-3xl -z-10"></div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'algorithms' && (
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  Our Quantum Algorithm Suite
                </h2>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                  Five revolutionary quantum algorithms working in harmony to solve environmental challenges. 
                  Click on any algorithm to explore its technical implementation and real-world applications.
                </p>
              </div>
              
              <div className={`grid gap-8 transition-all duration-500 
                ${expandedCard !== null ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
                {algorithms.map((algorithm, index) => (
                  <AlgorithmCard
                    key={index}
                    algorithm={algorithm}
                    index={index}
                    isExpanded={expandedCard === index}
                    onToggle={() => setExpandedCard(expandedCard === index ? null : index)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeSection === 'architecture' && (
            <div className="space-y-16">
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  System Architecture
                </h2>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                  A hybrid quantum-classical architecture designed for scalability, reliability, and real-world deployment.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Quantum Processing Layer",
                    icon: Atom,
                    color: "cyan",
                    components: [
                      "Quantum Processing Units (QPUs)",
                      "Quantum Error Correction",
                      "Quantum State Management",
                      "Entanglement Controllers"
                    ]
                  },
                  {
                    title: "Classical Integration Layer",
                    icon: Cpu,
                    color: "purple",
                    components: [
                      "High-Performance Computing Clusters",
                      "Machine Learning Accelerators",
                      "Data Preprocessing Pipelines",
                      "Result Optimization Engines"
                    ]
                  },
                  {
                    title: "Application Interface Layer",
                    icon: Globe,
                    color: "green",
                    components: [
                      "Real-time API Endpoints",
                      "Visualization Engines",
                      "Alert and Notification Systems",
                      "Third-party Integrations"
                    ]
                  }
                ].map((layer, i) => {
                  const Icon = layer.icon;
                  return (
                    <div key={i} className="space-y-6">
                      <div className={`p-8 rounded-2xl bg-gradient-to-br from-${layer.color}-500/10 to-${layer.color}-600/10 border border-${layer.color}-500/30`}>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className={`w-12 h-12 rounded-xl bg-${layer.color}-500/20 flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 text-${layer.color}-300`} />
                          </div>
                          <h3 className={`text-xl font-bold text-${layer.color}-300`}>{layer.title}</h3>
                        </div>
                        
                        <div className="space-y-3">
                          {layer.components.map((component, j) => (
                            <div key={j} className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full bg-${layer.color}-400`}></div>
                              <span className="text-slate-300 text-sm">{component}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Data Flow Diagram */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Data Flow Architecture</h3>
                <div className="relative p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                    {[
                      { title: "Environmental\nSensors", icon: Database, color: "blue" },
                      { title: "Data\nIngestion", icon: ArrowRight, color: "gray" },
                      { title: "Quantum\nProcessing", icon: Atom, color: "cyan" },
                      { title: "Classical\nAnalysis", icon: Brain, color: "purple" },
                      { title: "Insights &\nAlerts", icon: Target, color: "green" }
                    ].map((step, i) => {
                      const Icon = step.icon;
                      return (
                        <div key={i} className="text-center space-y-3">
                          <div className={`w-16 h-16 mx-auto rounded-xl bg-${step.color}-500/20 flex items-center justify-center border border-${step.color}-500/30`}>
                            <Icon className={`w-8 h-8 text-${step.color}-300`} />
                          </div>
                          <div className={`text-sm font-medium text-${step.color}-300 whitespace-pre-line`}>
                            {step.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'performance' && (
            <div className="space-y-16">
              <div className="text-center space-y-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  Performance Metrics
                </h2>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                  Real-world performance data demonstrating the quantum advantage in environmental computing.
                </p>
              </div>

              {/* Key Performance Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    title: "Processing Speed", 
                    value: "50,000x", 
                    subtitle: "Faster than classical", 
                    icon: Zap, 
                    color: "yellow",
                    trend: "+340% this year"
                  },
                  { 
                    title: "Prediction Accuracy", 
                    value: "99.7%", 
                    subtitle: "Environmental forecasts", 
                    icon: Target, 
                    color: "green",
                    trend: "+12% improvement"
                  },
                  { 
                    title: "Data Throughput", 
                    value: "2.3TB/s", 
                    subtitle: "Real-time processing", 
                    icon: Activity, 
                    color: "cyan",
                    trend: "Consistent performance"
                  },
                  { 
                    title: "Energy Efficiency", 
                    value: "87%", 
                    subtitle: "Less power consumption", 
                    icon: Lightbulb, 
                    color: "purple",
                    trend: "+23% efficiency gain"
                  }
                ].map((metric, i) => {
                  const Icon = metric.icon;
                  return (
                    <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br from-${metric.color}-500/10 to-${metric.color}-600/10 border border-${metric.color}-500/30 hover:scale-105 transition-tra`}>
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={`w-8 h-8 text-${metric.color}-400`} />
                        <div className={`text-xs px-2 py-1 rounded-full bg-${metric.color}-500/20 text-${metric.color}-300`}>
                          {metric.trend}
                        </div>
                      </div>
                      <div className={`text-3xl font-bold text-${metric.color}-300 mb-2`}>{metric.value}</div>
                      <div className="text-sm text-slate-400">{metric.subtitle}</div>
                      <div className="text-xs text-slate-500 mt-2">{metric.title}</div>
                    </div>
                  );
                })}
              </div>

              {/* Performance Comparison */}
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Quantum vs Classical Performance</h3>
                  <div className="space-y-4">
                    {[
                      { 
                        task: "Climate Model Simulation", 
                        classical: "72 hours", 
                        quantum: "4.3 minutes", 
                        improvement: "1000x faster" 
                      },
                      { 
                        task: "Pollution Spread Analysis", 
                        classical: "45 minutes", 
                        quantum: "1.2 seconds", 
                        improvement: "2250x faster" 
                      },
                      { 
                        task: "Resource Optimization", 
                        classical: "3.2 hours", 
                        quantum: "12 seconds", 
                        improvement: "960x faster" 
                      },
                      { 
                        task: "Pattern Recognition", 
                        classical: "15 minutes", 
                        quantum: "0.8 seconds", 
                        improvement: "1125x faster" 
                      }
                    ].map((comparison, i) => (
                      <div key={i} className="p-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-white">{comparison.task}</h4>
                          <span className="text-green-400 text-sm font-bold">{comparison.improvement}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Classical: </span>
                            <span className="text-red-300">{comparison.classical}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Quantum: </span>
                            <span className="text-cyan-300">{comparison.quantum}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Environmental Impact</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      {
                        title: "Carbon Footprint Reduction",
                        value: "87%",
                        description: "Lower energy consumption compared to classical supercomputers",
                        icon: Globe,
                        color: "green"
                      },
                      {
                        title: "Computational Efficiency",
                        value: "99.2%",
                        description: "Resource utilization efficiency in quantum processing",
                        icon: Cpu,
                        color: "cyan"
                      },
                      {
                        title: "Prediction Reliability",
                        value: "94.8%",
                        description: "Accuracy in 30-day environmental forecasts",
                        icon: BarChart3,
                        color: "purple"
                      }
                    ].map((impact, i) => {
                      const Icon = impact.icon;
                      return (
                        <div key={i} className={`p-6 bg-gradient-to-br from-${impact.color}-500/10 to-${impact.color}-600/10 border border-${impact.color}-500/30 rounded-xl`}>
                          <div className="flex items-center space-x-4 mb-3">
                            <Icon className={`w-6 h-6 text-${impact.color}-400`} />
                            <span className={`text-2xl font-bold text-${impact.color}-300`}>{impact.value}</span>
                          </div>
                          <h4 className="font-semibold text-white mb-2">{impact.title}</h4>
                          <p className="text-slate-400 text-sm">{impact.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Experience the Quantum Advantage
          </h2>
          <p className="text-xl text-slate-400">
            Ready to see these algorithms in action? Explore our interactive models and simulations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-white hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform group flex items-center justify-center">
              Try Interactive Models
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="px-8 py-4 bg-slate-800/50 backdrop-blur-md border border-slate-600 rounded-xl font-semibold text-white hover:bg-slate-700/50 transition-all duration-300 flex items-center justify-center">
              Download Technical Paper
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

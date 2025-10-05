// Pollution data for visualizations
export const pollutionData = [
  { name: 'PM2.5', value: 15.2, danger: 'moderate', color: '#fbbf24' },
  { name: 'PM10', value: 28.7, danger: 'moderate', color: '#f59e0b' },
  { name: 'O3', value: 42.1, danger: 'unhealthy', color: '#ef4444' },
  { name: 'NO2', value: 18.9, danger: 'good', color: '#22c55e' },
  { name: 'SO2', value: 8.3, danger: 'good', color: '#22c55e' },
  { name: 'CO', value: 1.2, danger: 'good', color: '#22c55e' }
];

// Time series data for charts
export const timeSeriesData = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  pm25: Math.sin(i * 0.3) * 10 + 15 + Math.random() * 5,
  o3: Math.cos(i * 0.2) * 15 + 30 + Math.random() * 8,
  no2: Math.sin(i * 0.4) * 8 + 20 + Math.random() * 4
}));

// Algorithm steps
export const algorithmSteps = [
  {
    id: 1,
    title: "Data Ingestion & Preprocessing",
    description: "Real-time collection of atmospheric data from satellites, ground sensors, and weather stations",
    icon: "Database",
    details: "Advanced preprocessing pipelines normalize and validate multi-source environmental data streams"
  },
  {
    id: 2,
    title: "Quantum Feature Mapping",
    description: "Transform classical environmental data into quantum state representations",
    icon: "Zap",
    details: "Utilize quantum feature maps to encode complex atmospheric patterns into quantum circuits"
  },
  {
    id: 3,
    title: "Hybrid Model Training",
    description: "Combine quantum variational circuits with classical neural networks",
    icon: "Brain",
    details: "Train hybrid models that leverage quantum superposition for enhanced pattern recognition"
  },
  {
    id: 4,
    title: "Quantum-Enhanced Optimization",
    description: "Use quantum algorithms for hyperparameter optimization and feature selection",
    icon: "Settings",
    details: "Quantum annealing techniques optimize model parameters faster than classical methods"
  },
  {
    id: 5,
    title: "Ensemble Prediction",
    description: "Generate multiple forecasts using quantum-classical ensemble methods",
    icon: "Layers",
    details: "Combine predictions from multiple quantum-enhanced models for improved accuracy"
  },
  {
    id: 6,
    title: "Uncertainty Quantification",
    description: "Quantum-inspired methods to estimate prediction confidence intervals",
    icon: "Target",
    details: "Probabilistic forecasting with quantum-enhanced uncertainty estimation"
  },
  {
    id: 7,
    title: "Real-time Deployment",
    description: "Deploy optimized models for continuous air quality forecasting",
    icon: "Rocket",
    details: "Scalable infrastructure for real-time predictions with sub-second response times"
  }
];

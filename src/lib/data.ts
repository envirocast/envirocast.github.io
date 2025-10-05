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

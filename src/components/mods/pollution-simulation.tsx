'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PollutionSimulationProps {
  isPlaying: boolean;
  speed: number;
}

export const PollutionSimulation = ({ isPlaying, speed }: PollutionSimulationProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>([]);
  const [windDirection, setWindDirection] = useState(45);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setParticles(prev => prev.map(particle => ({
          ...particle,
          x: (particle.x + Math.cos(windDirection * Math.PI / 180) * speed) % 100,
          y: (particle.y + Math.sin(windDirection * Math.PI / 180) * speed * 0.5) % 100
        })));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, speed, windDirection]);

  useEffect(() => {
    // Initialize particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6'][Math.floor(Math.random() * 4)]
    }));
    setParticles(newParticles);
  }, []);

  const sources = [
    { id: 'factory', name: 'Industrial', x: 20, y: 30, intensity: 'high' },
    { id: 'traffic', name: 'Traffic', x: 60, y: 60, intensity: 'medium' },
    { id: 'residential', name: 'Residential', x: 80, y: 20, intensity: 'low' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Wind Direction:</span>
          <input
            type="range"
            min="0"
            max="360"
            value={windDirection}
            onChange={(e) => setWindDirection(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-sm text-gray-500">{windDirection}°</span>
        </div>
        <div className="flex space-x-2">
          {sources.map(source => (
            <Button
              key={source.id}
              variant={selectedSource === source.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSource(source.id === selectedSource ? null : source.id)}
            >
              {source.name}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative w-full h-96 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg overflow-hidden">
            {/* Pollution sources */}
            {sources.map(source => (
              <div
                key={source.id}
                className={`absolute w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-300 ${
                  selectedSource === source.id ? 'scale-150 border-white' : 'border-gray-400'
                } ${
                  source.intensity === 'high' ? 'bg-red-500' :
                  source.intensity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ left: `${source.x}%`, top: `${source.y}%` }}
                onClick={() => setSelectedSource(source.id === selectedSource ? null : source.id)}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary" className="text-xs">
                    {source.name}
                  </Badge>
                </div>
              </div>
            ))}

            {/* Particles */}
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full opacity-70"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}

            {/* Wind indicator */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/80 rounded-lg p-2">
              <div 
                className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center transform"
                style={{ rotate: `${windDirection}deg` }}
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <span className="text-sm font-medium">Wind</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">PM2.5 Level</h3>
            <div className="text-2xl font-bold text-red-500">42 μg/m³</div>
            <Badge variant="destructive">Unhealthy</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Wind Speed</h3>
            <div className="text-2xl font-bold text-blue-500">12 km/h</div>
            <Badge variant="secondary">Moderate</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Prediction Accuracy</h3>
            <div className="text-2xl font-bold text-green-500">95.2%</div>
            <Badge variant="default">Excellent</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

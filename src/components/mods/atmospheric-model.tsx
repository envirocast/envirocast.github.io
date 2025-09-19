'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';
import { useState } from 'react';

interface AtmosphericModelProps {
  isPlaying: boolean;
  speed: number;
}

const AtmosphericLayers = ({ isPlaying, speed }: { isPlaying: boolean; speed: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && isPlaying) {
      groupRef.current.rotation.y += 0.005 * speed;
    }
  });

  const layers = [
    { name: 'Troposphere', height: 0, radius: 5, color: '#3b82f6', opacity: 0.3 },
    { name: 'Stratosphere', height: 2, radius: 5.5, color: '#8b5cf6', opacity: 0.2 },
    { name: 'Mesosphere', height: 4, radius: 6, color: '#06b6d4', opacity: 0.15 },
    { name: 'Thermosphere', height: 6, radius: 6.5, color: '#f59e0b', opacity: 0.1 }
  ];

  return (
    <group ref={groupRef}>
      {layers.map((layer, index) => (
        <Sphere key={index} args={[layer.radius, 32, 32]} position={[0, layer.height, 0]}>
          <meshStandardMaterial 
            color={layer.color} 
            transparent 
            opacity={layer.opacity}
            wireframe={index > 0}
          />
        </Sphere>
      ))}
      
      {/* Pollution particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <Sphere key={`particle-${i}`} args={[0.1]} position={[
          (Math.random() - 0.5) * 8,
          Math.random() * 3,
          (Math.random() - 0.5) * 8
        ]}>
          <meshStandardMaterial color="#ef4444" />
        </Sphere>
      ))}

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} />
    </group>
  );
};

export const AtmosphericModel = ({ isPlaying, speed }: AtmosphericModelProps) => {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  
  const layers = [
    { 
      name: 'Troposphere', 
      description: 'Where weather occurs and most pollution accumulates',
      height: '0-12 km',
      characteristics: ['Contains 75% of atmospheric mass', 'Temperature decreases with altitude', 'Most air pollution found here']
    },
    { 
      name: 'Stratosphere', 
      description: 'Contains the ozone layer that protects from UV radiation',
      height: '12-50 km', 
      characteristics: ['Ozone layer location', 'Temperature increases with altitude', 'Limited air mixing with troposphere']
    },
    { 
      name: 'Mesosphere', 
      description: 'Coldest layer where meteors burn up',
      height: '50-85 km',
      characteristics: ['Coldest temperatures (-90°C)', 'Meteor combustion occurs', 'Very thin air']
    },
    { 
      name: 'Thermosphere', 
      description: 'Extremely hot but very thin air',
      height: '85-600 km',
      characteristics: ['Extremely high temperatures', 'Aurora formation', 'International Space Station orbits here']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {layers.map(layer => (
          <Button
            key={layer.name}
            variant={selectedLayer === layer.name ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedLayer(selectedLayer === layer.name ? null : layer.name)}
          >
            {layer.name}
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="h-96 w-full">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              <AtmosphericLayers isPlaying={isPlaying} speed={speed} />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      {selectedLayer && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            {(() => {
              const layer = layers.find(l => l.name === selectedLayer);
              return layer ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-blue-900">{layer.name}</h3>
                    <Badge variant="secondary">{layer.height}</Badge>
                  </div>
                  <p className="text-blue-800 mb-4">{layer.description}</p>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Key Characteristics:</h4>
                    <ul className="space-y-1">
                      {layer.characteristics.map((char, index) => (
                        <li key={index} className="text-blue-800 text-sm">• {char}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null;
            })()}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Current Layer</h3>
            <div className="text-2xl font-bold text-blue-500">Troposphere</div>
            <Badge variant="default">Active Monitoring</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Pollution Density</h3>
            <div className="text-2xl font-bold text-red-500">High</div>
            <Badge variant="destructive">Alert Level</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Model Accuracy</h3>
            <div className="text-2xl font-bold text-green-500">94.8%</div>
            <Badge variant="default">Excellent</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

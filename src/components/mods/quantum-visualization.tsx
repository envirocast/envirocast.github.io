'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

interface QuantumVisualizationProps {
  isPlaying: boolean;
  speed: number;
}

const QuantumCircuit = ({ isPlaying, speed }: { isPlaying: boolean; speed: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [activeStep, setActiveStep] = useState(0);

  useFrame((state) => {
    if (groupRef.current && isPlaying) {
      groupRef.current.rotation.y += 0.01 * speed;
      setActiveStep(Math.floor(state.clock.elapsedTime * speed) % 7);
    }
  });

  const qubits = Array.from({ length: 5 }, (_, i) => (
    <group key={i} position={[0, i * 2 - 4, 0]}>
      <Sphere args={[0.2]} position={[-6, 0, 0]}>
        <meshStandardMaterial color={activeStep === i ? "#3b82f6" : "#64748b"} />
      </Sphere>
      <Box args={[10, 0.1, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#374151" />
      </Box>
      <Sphere args={[0.2]} position={[6, 0, 0]}>
        <meshStandardMaterial color={activeStep === i ? "#3b82f6" : "#64748b"} />
      </Sphere>
    </group>
  ));

  const gates = Array.from({ length: 7 }, (_, i) => (
    <group key={i} position={[i * 1.5 - 4.5, 0, 0]}>
      <Box args={[0.8, 1.5, 0.3]}>
        <meshStandardMaterial 
          color={activeStep === i ? "#10b981" : "#6b7280"}
          emissive={activeStep === i ? "#10b981" : "#000000"}
          emissiveIntensity={activeStep === i ? 0.3 : 0}
        />
      </Box>
      <Text
        position={[0, 0, 0.2]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {i + 1}
      </Text>
    </group>
  ));

  return (
    <group ref={groupRef}>
      {qubits}
      {gates}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </group>
  );
};

export const QuantumVisualization = ({ isPlaying, speed }: QuantumVisualizationProps) => {
  const [viewMode, setViewMode] = useState<'circuit' | 'bloch' | 'entanglement'>('circuit');

  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        <Button
          variant={viewMode === 'circuit' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('circuit')}
        >
          Quantum Circuit
        </Button>
        <Button
          variant={viewMode === 'bloch' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('bloch')}
        >
          Bloch Sphere
        </Button>
        <Button
          variant={viewMode === 'entanglement' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('entanglement')}
        >
          Entanglement
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="h-96 w-full">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              <QuantumCircuit isPlaying={isPlaying} speed={speed} />
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Quantum States</h3>
            <div className="text-2xl font-bold text-purple-500">5</div>
            <Badge variant="secondary">Active Qubits</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Entanglement</h3>
            <div className="text-2xl font-bold text-blue-500">0.87</div>
            <Badge variant="default">High</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Coherence Time</h3>
            <div className="text-2xl font-bold text-green-500">100μs</div>
            <Badge variant="default">Good</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Gate Fidelity</h3>
            <div className="text-2xl font-bold text-teal-500">99.2%</div>
            <Badge variant="default">Excellent</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

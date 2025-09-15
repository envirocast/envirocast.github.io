// src/types/quantum.ts

export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  energy: number;
  isEntangled: boolean;
  entangledWith: string | null;
  hasTunneled: boolean;
  tunnelCount: number;
  uncertainty: number;
  superposition: boolean;
  qubitState: {
    alpha: number;
    beta: number;
    probability: number;
  };
  trail: TrailPoint[];
  lastUpdate: number;
  flickerPhase: number;
  visible: boolean;
}

export interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
  opacity: number;
}

export interface EntanglementPair {
  particle1: string;
  particle2: string;
  strength: number;
  createdAt: number;
}

export interface ParticleProperties {
  id: string;
  position: { x: number; y: number };
  velocity: { vx: number; vy: number };
  energy: number;
  isEntangled: boolean;
  entangledWith: string | null;
  tunnelCount: number;
  uncertainty: number;
  superposition: boolean;
  qubitProbabilities: {
    state0: number;
    state1: number;
  };
  errorMargins: {
    position: number;
    momentum: number;
  };
}

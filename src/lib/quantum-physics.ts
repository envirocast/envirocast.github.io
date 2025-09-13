// src/lib/quantum-physics.ts

import { Particle, TrailPoint, EntanglementPair } from '@/types/quantum';

export class QuantumPhysicsEngine {
  private particles: Map<string, Particle> = new Map();
  private entanglements: EntanglementPair[] = [];
  private canvas: { width: number; height: number };

  constructor(canvasSize: { width: number; height: number }) {
    this.canvas = canvasSize;
  }

  generateParticleId(): string {
    return `Q${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }

  createParticle(x?: number, y?: number): Particle {
    const id = this.generateParticleId();
    const particle: Particle = {
      id,
      x: x ?? Math.random() * this.canvas.width,
      y: y ?? Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      energy: Math.random() * 100 + 50,
      isEntangled: false,
      entangledWith: null,
      hasTunneled: false,
      tunnelCount: 0,
      uncertainty: Math.random() * 20 + 10,
      superposition: Math.random() < 0.3,
      qubitState: this.generateQubitState(),
      trail: [],
      lastUpdate: Date.now(),
      flickerPhase: Math.random() * Math.PI * 2,
      visible: true
    };

    this.particles.set(id, particle);
    return particle;
  }

  private generateQubitState() {
    const alpha = Math.random();
    const beta = Math.sqrt(1 - alpha * alpha);
    return {
      alpha,
      beta,
      probability: alpha * alpha
    };
  }

  updateParticle(particle: Particle, deltaTime: number, speed: number): void {
    const now = Date.now();
    
    // Update qubit state over time
    this.updateQubitState(particle, deltaTime);
    
    // Handle superposition flickering
    if (particle.superposition) {
      particle.flickerPhase += deltaTime * 0.01 * speed;
      particle.visible = Math.sin(particle.flickerPhase) > -0.5;
    } else {
      particle.visible = true;
    }

    // Random tunneling
    if (Math.random() < 0.001 * speed) {
      this.tunnelParticle(particle);
    }

    // Update position
    particle.x += particle.vx * deltaTime * speed * 0.1;
    particle.y += particle.vy * deltaTime * speed * 0.1;

    // Boundary conditions with quantum effects
    this.handleBoundaries(particle);

    // Update trail
    this.updateTrail(particle, now);

    // Update uncertainty based on velocity (Heisenberg principle)
    const momentum = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
    particle.uncertainty = Math.max(5, 30 - momentum * 2);

    particle.lastUpdate = now;
  }

  private updateQubitState(particle: Particle, deltaTime: number): void {
    // Simulate quantum state evolution
    const phase = Math.sin(Date.now() * 0.001) * 0.1;
    particle.qubitState.alpha = Math.max(0, Math.min(1, particle.qubitState.alpha + phase));
    particle.qubitState.beta = Math.sqrt(1 - particle.qubitState.alpha * particle.qubitState.alpha);
    particle.qubitState.probability = particle.qubitState.alpha * particle.qubitState.alpha;
  }

  private tunnelParticle(particle: Particle): void {
    particle.hasTunneled = true;
    particle.tunnelCount++;
    
    // Quantum tunneling - teleport to random location
    particle.x = Math.random() * this.canvas.width;
    particle.y = Math.random() * this.canvas.height;
    
    // Clear trail after tunneling
    particle.trail = [];
    
    // Reset tunneling flag after a delay
    setTimeout(() => {
      particle.hasTunneled = false;
    }, 1000);
  }

  private handleBoundaries(particle: Particle): void {
    if (particle.x < 0 || particle.x > this.canvas.width) {
      particle.vx *= -1;
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
    }
    if (particle.y < 0 || particle.y > this.canvas.height) {
      particle.vy *= -1;
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
    }
  }

  private updateTrail(particle: Particle, now: number): void {
    // Add current position to trail
    particle.trail.push({
      x: particle.x,
      y: particle.y,
      timestamp: now,
      opacity: 1
    });

    // Update trail opacity and remove old points
    particle.trail = particle.trail
      .map(point => ({
        ...point,
        opacity: Math.max(0, 1 - (now - point.timestamp) / 2000)
      }))
      .filter(point => point.opacity > 0.1);

    // Limit trail length
    if (particle.trail.length > 50) {
      particle.trail = particle.trail.slice(-50);
    }
  }

  checkCollisions(): void {
    const particleArray = Array.from(this.particles.values());
    
    for (let i = 0; i < particleArray.length; i++) {
      for (let j = i + 1; j < particleArray.length; j++) {
        const p1 = particleArray[i];
        const p2 = particleArray[j];
        
        if (this.areColliding(p1, p2)) {
          this.createEntanglement(p1, p2);
        }
      }
    }
  }

  private areColliding(p1: Particle, p2: Particle): boolean {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 20; // Collision radius
  }

  private createEntanglement(p1: Particle, p2: Particle): void {
    if (!p1.isEntangled && !p2.isEntangled) {
      p1.isEntangled = true;
      p1.entangledWith = p2.id;
      p2.isEntangled = true;
      p2.entangledWith = p1.id;

      const entanglement: EntanglementPair = {
        particle1: p1.id,
        particle2: p2.id,
        strength: Math.random() * 0.5 + 0.5,
        createdAt: Date.now()
      };

      this.entanglements.push(entanglement);

      // Synchronize quantum states
      p1.qubitState.alpha = p2.qubitState.alpha;
      p1.qubitState.beta = p2.qubitState.beta;
      p1.qubitState.probability = p2.qubitState.probability;
    }
  }

  getParticle(id: string): Particle | undefined {
    return this.particles.get(id);
  }

  getAllParticles(): Particle[] {
    return Array.from(this.particles.values());
  }

  getEntanglements(): EntanglementPair[] {
    return this.entanglements;
  }

  getParticleProperties(id: string) {
    const particle = this.particles.get(id);
    if (!particle) return null;

    return {
      id: particle.id,
      position: { x: Math.round(particle.x), y: Math.round(particle.y) },
      velocity: { 
        vx: Math.round(particle.vx * 100) / 100, 
        vy: Math.round(particle.vy * 100) / 100 
      },
      energy: Math.round(particle.energy * 10) / 10,
      isEntangled: particle.isEntangled,
      entangledWith: particle.entangledWith,
      tunnelCount: particle.tunnelCount,
      uncertainty: Math.round(particle.uncertainty * 10) / 10,
      superposition: particle.superposition,
      qubitProbabilities: {
        state0: Math.round(particle.qubitState.probability * 1000) / 1000,
        state1: Math.round((1 - particle.qubitState.probability) * 1000) / 1000
      },
      errorMargins: {
        position: Math.round(particle.uncertainty * 10) / 10,
        momentum: Math.round((particle.uncertainty * 0.1) * 100) / 100
      }
    };
  }
}

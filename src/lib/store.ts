'use client';

import { create } from 'zustand';

interface SimulationState {
  isPlaying: boolean;
  speed: number;
  selectedPollutant: string;
  showQuantumLayer: boolean;
  setPlaying: (playing: boolean) => void;
  setSpeed: (speed: number) => void;
  setSelectedPollutant: (pollutant: string) => void;
  setShowQuantumLayer: (show: boolean) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  isPlaying: false,
  speed: 1,
  selectedPollutant: 'PM2.5',
  showQuantumLayer: false,
  setPlaying: (playing) => set({ isPlaying: playing }),
  setSpeed: (speed) => set({ speed }),
  setSelectedPollutant: (pollutant) => set({ selectedPollutant: pollutant }),
  setShowQuantumLayer: (show) => set({ showQuantumLayer: show })
}));

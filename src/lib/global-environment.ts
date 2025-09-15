// src/lib/global-environment.ts

export interface Region {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  pollution: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  population: number;
  biodiversity: number;
  waterQuality: number;
  co2Emissions: number;
  healthRisk: number;
  economicImpact: number;
  species: number;
  habitatLoss: number;
  urbanization: number;
  seaLevel: number;
  iceCoverage: number;
  foodSecurity: number;
  displacement: number;
}

export interface AtmosphericLayer {
  id: string;
  name: string;
  height: string;
  altitude: number;
  temperature: number;
  pressure: number;
  composition: { [key: string]: number };
  visible: boolean;
  color: string;
  opacity: number;
}

export interface EnvironmentalEvent {
  id: string;
  type: 'wildfire' | 'hurricane' | 'drought' | 'flood' | 'volcanic' | 'industrial';
  x: number;
  y: number;
  intensity: number;
  radius: number;
  duration: number;
  startTime: number;
  active: boolean;
  effects: {
    pollution: number;
    temperature: number;
    species: number;
    health: number;
  };
}

export interface ClimateData {
  globalTemp: number;
  seaLevelRise: number;
  co2Concentration: number;
  ozoneDepletion: number;
  deforestation: number;
  extinctionRate: number;
  globalHealthImpact: number;
  economicLoss: number;
}

export interface ScenarioPreset {
  id: string;
  name: string;
  description: string;
  settings: {
    industrialization: number;
    deforestation: number;
    renewableEnergy: number;
    conservation: number;
    population: number;
    emissions: number;
  };
}

export class GlobalEnvironmentEngine {
  private regions: Map<string, Region> = new Map();
  private atmosphericLayers: AtmosphericLayer[] = [];
  private events: EnvironmentalEvent[] = [];
  private climateData: ClimateData;
  private timeScale: number = 1;
  private currentYear: number = 2024;
  private canvas: { width: number; height: number };

  // Control parameters
  public controls = {
    industrialization: 50,
    deforestation: 30,
    renewableEnergy: 25,
    conservation: 35,
    emissions: 45,
    population: 60,
    temperature: 15.2,
    windIntensity: 25,
    precipitation: 50,
    oceanCurrent: 40
  };

  constructor(canvasSize: { width: number; height: number }) {
    this.canvas = canvasSize;
    this.initializeRegions();
    this.initializeAtmosphericLayers();
    this.initializeClimateData();
  }

  private initializeRegions(): void {
    const regionData = [
      { id: 'north_america', name: 'North America', x: 100, y: 100, width: 150, height: 120 },
      { id: 'south_america', name: 'South America', x: 120, y: 300, width: 100, height: 180 },
      { id: 'europe', name: 'Europe', x: 300, y: 120, width: 100, height: 80 },
      { id: 'africa', name: 'Africa', x: 320, y: 200, width: 120, height: 200 },
      { id: 'asia', name: 'Asia', x: 400, y: 80, width: 180, height: 160 },
      { id: 'oceania', name: 'Oceania', x: 520, y: 320, width: 100, height: 80 },
      { id: 'antarctica', name: 'Antarctica', x: 300, y: 450, width: 200, height: 80 },
      { id: 'arctic', name: 'Arctic', x: 200, y: 20, width: 300, height: 60 }
    ];

    regionData.forEach(data => {
      const region: Region = {
        ...data,
        pollution: Math.random() * 100,
        temperature: Math.random() * 30 + 5,
        humidity: Math.random() * 100,
        windSpeed: Math.random() * 50,
        windDirection: Math.random() * 360,
        population: Math.random() * 1000 + 100,
        biodiversity: Math.random() * 100,
        waterQuality: Math.random() * 100,
        co2Emissions: Math.random() * 100,
        healthRisk: Math.random() * 100,
        economicImpact: Math.random() * 100,
        species: Math.random() * 10000 + 1000,
        habitatLoss: Math.random() * 50,
        urbanization: Math.random() * 80,
        seaLevel: Math.random() * 2,
        iceCoverage: Math.random() * 100,
        foodSecurity: Math.random() * 100,
        displacement: Math.random() * 10
      };
      this.regions.set(data.id, region);
    });
  }

  private initializeAtmosphericLayers(): void {
    this.atmosphericLayers = [
      {
        id: 'troposphere',
        name: 'Troposphere',
        height: '0-12 km',
        altitude: 12000,
        temperature: 15,
        pressure: 1013,
        composition: { nitrogen: 78, oxygen: 21, co2: 0.04, water: 0.96 },
        visible: true,
        color: '#3b82f6',
        opacity: 0.3
      },
      {
        id: 'stratosphere',
        name: 'Stratosphere',
        height: '12-50 km',
        altitude: 50000,
        temperature: -55,
        pressure: 1,
        composition: { ozone: 10, nitrogen: 80, oxygen: 10 },
        visible: true,
        color: '#8b5cf6',
        opacity: 0.25
      },
      {
        id: 'mesosphere',
        name: 'Mesosphere',
        height: '50-85 km',
        altitude: 85000,
        temperature: -85,
        pressure: 0.001,
        composition: { nitrogen: 78, oxygen: 21, co2: 1 },
        visible: true,
        color: '#06b6d4',
        opacity: 0.2
      },
      {
        id: 'thermosphere',
        name: 'Thermosphere',
        height: '85-600 km',
        altitude: 600000,
        temperature: 1200,
        pressure: 0.0001,
        composition: { atomic_oxygen: 50, helium: 30, hydrogen: 20 },
        visible: true,
        color: '#f59e0b',
        opacity: 0.15
      }
    ];
  }

  private initializeClimateData(): void {
    this.climateData = {
      globalTemp: 15.2,
      seaLevelRise: 0.33,
      co2Concentration: 421,
      ozoneDepletion: 12,
      deforestation: 18.5,
      extinctionRate: 1000,
      globalHealthImpact: 65,
      economicLoss: 2.3
    };
  }

  updateEnvironment(deltaTime: number, isPlaying: boolean, speed: number): void {
    if (!isPlaying) return;

    const timeStep = deltaTime * speed * 0.001;
    
    // Update global climate based on controls
    this.updateClimate(timeStep);
    
    // Update regions based on controls and climate
    this.updateRegions(timeStep);
    
    // Update atmospheric layers
    this.updateAtmosphericLayers(timeStep);
    
    // Process environmental events
    this.updateEvents(timeStep);
    
    // Update interconnected systems
    this.updateInterconnections();
  }

  private updateClimate(timeStep: number): void {
    const { industrialization, deforestation, renewableEnergy, emissions } = this.controls;
    
    // Global temperature change based on emissions and renewable energy
    const tempChange = (emissions - renewableEnergy) * 0.001 * timeStep;
    this.climateData.globalTemp += tempChange;
    this.climateData.globalTemp = Math.max(12, Math.min(25, this.climateData.globalTemp));
    
    // CO2 concentration
    const co2Change = (industrialization + deforestation - renewableEnergy * 0.5) * 0.01 * timeStep;
    this.climateData.co2Concentration += co2Change;
    this.climateData.co2Concentration = Math.max(350, Math.min(500, this.climateData.co2Concentration));
    
    // Sea level rise
    const seaLevelChange = (this.climateData.globalTemp - 14) * 0.001 * timeStep;
    this.climateData.seaLevelRise += seaLevelChange;
    this.climateData.seaLevelRise = Math.max(0, Math.min(2, this.climateData.seaLevelRise));
    
    // Deforestation rate
    this.climateData.deforestation += (industrialization - this.controls.conservation) * 0.01 * timeStep;
    this.climateData.deforestation = Math.max(0, Math.min(50, this.climateData.deforestation));
  }

  private updateRegions(timeStep: number): void {
    this.regions.forEach(region => {
      // Temperature influenced by global climate
      const targetTemp = this.climateData.globalTemp + (Math.random() - 0.5) * 10;
      region.temperature += (targetTemp - region.temperature) * 0.1 * timeStep;
      
      // Pollution based on industrialization and wind
      const pollutionChange = (this.controls.industrialization - this.controls.renewableEnergy) * 0.1 * timeStep;
      region.pollution += pollutionChange;
      region.pollution = Math.max(0, Math.min(100, region.pollution));
      
      // Biodiversity affected by habitat loss and conservation
      const biodiversityChange = (this.controls.conservation - this.controls.deforestation) * 0.05 * timeStep;
      region.biodiversity += biodiversityChange;
      region.biodiversity = Math.max(0, Math.min(100, region.biodiversity));
      
      // Health risk based on pollution and temperature extremes
      const tempRisk = Math.abs(region.temperature - 20) * 2;
      region.healthRisk = (region.pollution + tempRisk) * 0.5;
      
      // Species count based on biodiversity
      region.species = Math.floor(region.biodiversity * 100) + 1000;
      
      // Economic impact based on environmental factors
      region.economicImpact = (region.pollution * 0.5 + region.healthRisk * 0.3 + region.habitatLoss * 0.2);
      
      // Update other metrics
      region.co2Emissions = region.pollution * 1.2;
      region.waterQuality = 100 - region.pollution * 0.8;
      region.foodSecurity = Math.max(0, 100 - region.pollution * 0.3 - Math.abs(region.temperature - 18) * 2);
    });
  }

  private updateAtmosphericLayers(timeStep: number): void {
    this.atmosphericLayers.forEach(layer => {
      if (layer.id === 'troposphere') {
        // Update troposphere CO2
        layer.composition.co2 = this.climateData.co2Concentration / 10000;
      }
      
      if (layer.id === 'stratosphere') {
        // Update ozone levels
        layer.composition.ozone = Math.max(5, 10 - this.climateData.ozoneDepletion);
      }
    });
  }

  private updateEvents(timeStep: number): void {
    // Remove expired events
    this.events = this.events.filter(event => {
      const age = Date.now() - event.startTime;
      return age < event.duration;
    });
    
    // Randomly spawn new events based on environmental conditions
    if (Math.random() < 0.001) {
      this.spawnRandomEvent();
    }
    
    // Update existing events
    this.events.forEach(event => {
      const age = (Date.now() - event.startTime) / event.duration;
      event.intensity = Math.max(0, 1 - age);
    });
  }

  private updateInterconnections(): void {
    // Ocean currents affect regional temperatures
    this.regions.forEach((region, id) => {
      if (['north_america', 'europe'].includes(id)) {
        // Gulf Stream effect
        const oceanEffect = this.controls.oceanCurrent * 0.05;
        region.temperature += oceanEffect;
      }
    });
    
    // Wind patterns disperse pollution
    const windEffect = this.controls.windIntensity * 0.1;
    this.regions.forEach(region => {
      const neighborPollution = Array.from(this.regions.values())
        .filter(r => r.id !== region.id)
        .reduce((sum, r) => sum + r.pollution, 0) / this.regions.size;
      
      region.pollution += (neighborPollution - region.pollution) * windEffect * 0.01;
    });
  }

  private spawnRandomEvent(): void {
    const eventTypes: EnvironmentalEvent['type'][] = ['wildfire', 'hurricane', 'drought', 'flood', 'industrial'];
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    const event: EnvironmentalEvent = {
      id: `event_${Date.now()}`,
      type,
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      intensity: Math.random() * 0.5 + 0.5,
      radius: Math.random() * 50 + 25,
      duration: (Math.random() * 30000) + 10000, // 10-40 seconds
      startTime: Date.now(),
      active: true,
      effects: this.getEventEffects(type)
    };
    
    this.events.push(event);
  }

  private getEventEffects(type: EnvironmentalEvent['type']) {
    const effects = {
      wildfire: { pollution: 30, temperature: 5, species: -20, health: 25 },
      hurricane: { pollution: -10, temperature: -2, species: -15, health: 30 },
      drought: { pollution: 5, temperature: 8, species: -25, health: 20 },
      flood: { pollution: -15, temperature: -3, species: -10, health: 15 },
      volcanic: { pollution: 50, temperature: -1, species: -30, health: 40 },
      industrial: { pollution: 40, temperature: 2, species: -5, health: 30 }
    };
    
    return effects[type] || { pollution: 0, temperature: 0, species: 0, health: 0 };
  }

  applyScenarioPreset(preset: ScenarioPreset): void {
    Object.assign(this.controls, preset.settings);
  }

  getEnvironmentalHealth(): number {
    const regions = Array.from(this.regions.values());
    const avgPollution = regions.reduce((sum, r) => sum + r.pollution, 0) / regions.length;
    const avgBiodiversity = regions.reduce((sum, r) => sum + r.biodiversity, 0) / regions.length;
    const tempDeviation = Math.abs(this.climateData.globalTemp - 15);
    
    return Math.max(0, 100 - (avgPollution * 0.4 + (100 - avgBiodiversity) * 0.4 + tempDeviation * 5));
  }

  getRegions(): Map<string, Region> {
    return this.regions;
  }

  getAtmosphericLayers(): AtmosphericLayer[] {
    return this.atmosphericLayers;
  }

  getEvents(): EnvironmentalEvent[] {
    return this.events;
  }

  getClimateData(): ClimateData {
    return this.climateData;
  }

  toggleLayer(layerId: string): void {
    const layer = this.atmosphericLayers.find(l => l.id === layerId);
    if (layer) {
      layer.visible = !layer.visible;
    }
  }

  getCurrentYear(): number {
    return this.currentYear;
  }

  updateControl(key: keyof typeof this.controls, value: number): void {
    this.controls[key] = value;
  }
}

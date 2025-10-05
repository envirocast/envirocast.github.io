// src/components/mods/policy-recommendation-model.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Factory,
  Car,
  TreePine,
  Wind,
  Droplet,
  Sun,
  Building,
  Users,
  ShieldCheck,
  Activity,
  BarChart3,
  Sparkles,
  Target,
  AlertTriangle,
  ArrowRight,
  XCircle,
  Flame,
  Truck,
  Home,
  Leaf,
  Recycle,
  CircleDollarSign,
  Lightbulb,
  Wifi,
  Bike,
  Train,
  ShoppingCart,
  Briefcase,
  Battery,
  CloudRain,
  Mountain,
  Fish,
  Wheat,
  Plane,
  Ship,
  Cigarette,
  Trash2,
  Award,
  BookOpen
} from 'lucide-react';

interface PolicyRecommendationModelProps {
  isPlaying: boolean;
  speed: number;
}

interface Policy {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  shortTermImpact: number;
  longTermImpact: number;
  implementationCost: number;
  timeToEffect: number;
  enacted: boolean;
  enactedAt?: number;
  longTermTriggered: boolean;
  sentiment: 'positive' | 'negative' | 'neutral';
}

interface EnvironmentStats {
  health: number;
  airQuality: number;
  carbonEmissions: number;
  publicHealth: number;
  economicImpact: number;
}

const regions = [
  { id: 'houston', name: 'Houston, TX', aqi: 89, population: 2.3 },
  { id: 'la', name: 'Los Angeles, CA', aqi: 156, population: 4.0 },
  { id: 'nyc', name: 'New York, NY', aqi: 67, population: 8.3 },
  { id: 'chicago', name: 'Chicago, IL', aqi: 78, population: 2.7 },
  { id: 'phoenix', name: 'Phoenix, AZ', aqi: 134, population: 1.7 },
  { id: 'dallas', name: 'Dallas, TX', aqi: 92, population: 1.3 }
];

const allPolicyTemplates: Omit<Policy, 'enacted' | 'longTermTriggered'>[] = [
  // POSITIVE POLICIES
  {
    id: 'ev-incentive',
    name: 'Electric Vehicle Incentives',
    category: 'Transportation',
    description: 'Tax credits and rebates for EV purchases, charging infrastructure expansion',
    icon: Car,
    shortTermImpact: -2,
    longTermImpact: 18,
    implementationCost: 3,
    timeToEffect: 5,
    sentiment: 'positive'
  },
  {
    id: 'renewable-mandate',
    name: 'Renewable Energy Mandate',
    category: 'Energy',
    description: 'Require 40% of energy from renewable sources by 2030',
    icon: Sun,
    shortTermImpact: -3,
    longTermImpact: 25,
    implementationCost: 4,
    timeToEffect: 7,
    sentiment: 'positive'
  },
  {
    id: 'industrial-cap',
    name: 'Industrial Emission Caps',
    category: 'Industry',
    description: 'Strict emission limits for manufacturing facilities',
    icon: Factory,
    shortTermImpact: 8,
    longTermImpact: 15,
    implementationCost: 2,
    timeToEffect: 3,
    sentiment: 'positive'
  },
  {
    id: 'green-spaces',
    name: 'Urban Green Space Initiative',
    category: 'Urban Planning',
    description: 'Create parks and green corridors throughout the city',
    icon: TreePine,
    shortTermImpact: 4,
    longTermImpact: 12,
    implementationCost: 3,
    timeToEffect: 4,
    sentiment: 'positive'
  },
  {
    id: 'public-transit',
    name: 'Public Transit Expansion',
    category: 'Transportation',
    description: 'Expand metro and bus networks, reduce car dependency',
    icon: Train,
    shortTermImpact: -1,
    longTermImpact: 20,
    implementationCost: 5,
    timeToEffect: 6,
    sentiment: 'positive'
  },
  {
    id: 'clean-air-zones',
    name: 'Clean Air Zones',
    category: 'Regulation',
    description: 'Low-emission zones in city centers with vehicle restrictions',
    icon: Wind,
    shortTermImpact: 6,
    longTermImpact: 16,
    implementationCost: 2,
    timeToEffect: 2,
    sentiment: 'positive'
  },
  {
    id: 'water-quality',
    name: 'Water Quality Protection',
    category: 'Environment',
    description: 'Enhanced monitoring and treatment of water sources',
    icon: Droplet,
    shortTermImpact: 3,
    longTermImpact: 10,
    implementationCost: 3,
    timeToEffect: 4,
    sentiment: 'positive'
  },
  {
    id: 'building-efficiency',
    name: 'Building Efficiency Standards',
    category: 'Building',
    description: 'Mandatory energy efficiency upgrades for commercial buildings',
    icon: Building,
    shortTermImpact: -2,
    longTermImpact: 14,
    implementationCost: 3,
    timeToEffect: 5,
    sentiment: 'positive'
  },
  {
    id: 'solar-subsidy',
    name: 'Solar Panel Subsidies',
    category: 'Energy',
    description: 'Financial incentives for residential and commercial solar installations',
    icon: Sun,
    shortTermImpact: -1,
    longTermImpact: 16,
    implementationCost: 4,
    timeToEffect: 4,
    sentiment: 'positive'
  },
  {
    id: 'bike-infrastructure',
    name: 'Bike Lane Network',
    category: 'Transportation',
    description: 'Protected bike lanes and bike-sharing programs',
    icon: Bike,
    shortTermImpact: 2,
    longTermImpact: 11,
    implementationCost: 2,
    timeToEffect: 3,
    sentiment: 'positive'
  },
  {
    id: 'recycling-program',
    name: 'Comprehensive Recycling Program',
    category: 'Waste',
    description: 'Mandatory recycling with penalties for non-compliance',
    icon: Recycle,
    shortTermImpact: 3,
    longTermImpact: 9,
    implementationCost: 2,
    timeToEffect: 2,
    sentiment: 'positive'
  },
  {
    id: 'led-streetlights',
    name: 'LED Streetlight Conversion',
    category: 'Infrastructure',
    description: 'Replace all streetlights with energy-efficient LEDs',
    icon: Lightbulb,
    shortTermImpact: 1,
    longTermImpact: 8,
    implementationCost: 2,
    timeToEffect: 2,
    sentiment: 'positive'
  },
  {
    id: 'reforestation',
    name: 'Urban Reforestation Project',
    category: 'Environment',
    description: 'Plant 1 million trees in urban and suburban areas',
    icon: TreePine,
    shortTermImpact: 2,
    longTermImpact: 19,
    implementationCost: 3,
    timeToEffect: 6,
    sentiment: 'positive'
  },
  {
    id: 'smart-grid',
    name: 'Smart Grid Implementation',
    category: 'Energy',
    description: 'Modernize electrical grid with smart technology',
    icon: Wifi,
    shortTermImpact: -1,
    longTermImpact: 13,
    implementationCost: 5,
    timeToEffect: 5,
    sentiment: 'positive'
  },
  {
    id: 'composting',
    name: 'City-Wide Composting Program',
    category: 'Waste',
    description: 'Organic waste collection and composting facilities',
    icon: Leaf,
    shortTermImpact: 2,
    longTermImpact: 7,
    implementationCost: 2,
    timeToEffect: 3,
    sentiment: 'positive'
  },
  {
    id: 'green-roofs',
    name: 'Green Roof Incentives',
    category: 'Building',
    description: 'Tax breaks for installing vegetation on building rooftops',
    icon: Home,
    shortTermImpact: 1,
    longTermImpact: 9,
    implementationCost: 2,
    timeToEffect: 4,
    sentiment: 'positive'
  },
  {
    id: 'water-conservation',
    name: 'Water Conservation Mandate',
    category: 'Environment',
    description: 'Mandatory low-flow fixtures and water-efficient landscaping',
    icon: Droplet,
    shortTermImpact: 2,
    longTermImpact: 10,
    implementationCost: 2,
    timeToEffect: 3,
    sentiment: 'positive'
  },
  {
    id: 'ev-buses',
    name: 'Electric Bus Fleet',
    category: 'Transportation',
    description: 'Replace diesel buses with electric alternatives',
    icon: Truck,
    shortTermImpact: -1,
    longTermImpact: 17,
    implementationCost: 4,
    timeToEffect: 5,
    sentiment: 'positive'
  },
  {
    id: 'plastic-ban',
    name: 'Single-Use Plastic Ban',
    category: 'Regulation',
    description: 'Ban single-use plastics in retail and restaurants',
    icon: ShoppingCart,
    shortTermImpact: 4,
    longTermImpact: 11,
    implementationCost: 1,
    timeToEffect: 2,
    sentiment: 'positive'
  },
  {
    id: 'carbon-tax',
    name: 'Carbon Emission Tax',
    category: 'Economic',
    description: 'Tax on carbon emissions to incentivize reduction',
    icon: CircleDollarSign,
    shortTermImpact: 7,
    longTermImpact: 22,
    implementationCost: 2,
    timeToEffect: 4,
    sentiment: 'positive'
  },
  {
    id: 'wetland-restoration',
    name: 'Wetland Restoration',
    category: 'Environment',
    description: 'Restore natural wetlands to filter water and absorb carbon',
    icon: Fish,
    shortTermImpact: 1,
    longTermImpact: 14,
    implementationCost: 3,
    timeToEffect: 6,
    sentiment: 'positive'
  },
  {
    id: 'energy-audit',
    name: 'Mandatory Energy Audits',
    category: 'Building',
    description: 'Required energy efficiency assessments for large buildings',
    icon: Briefcase,
    shortTermImpact: 2,
    longTermImpact: 8,
    implementationCost: 1,
    timeToEffect: 2,
    sentiment: 'positive'
  },
  {
    id: 'wind-farms',
    name: 'Offshore Wind Farm Development',
    category: 'Energy',
    description: 'Invest in offshore wind energy generation',
    icon: Wind,
    shortTermImpact: -2,
    longTermImpact: 21,
    implementationCost: 5,
    timeToEffect: 7,
    sentiment: 'positive'
  },
  {
    id: 'education-program',
    name: 'Environmental Education Program',
    category: 'Social',
    description: 'School curriculum focused on environmental awareness',
    icon: BookOpen,
    shortTermImpact: 0,
    longTermImpact: 15,
    implementationCost: 2,
    timeToEffect: 8,
    sentiment: 'positive'
  },

  // NEGATIVE POLICIES
  {
    id: 'coal-expansion',
    name: 'Coal Power Plant Expansion',
    category: 'Energy',
    description: 'Approve new coal-fired power plants to meet energy demand',
    icon: Factory,
    shortTermImpact: -12,
    longTermImpact: -25,
    implementationCost: -3,
    timeToEffect: 4,
    sentiment: 'negative'
  },
  {
    id: 'deregulation',
    name: 'Environmental Deregulation',
    category: 'Regulation',
    description: 'Remove emission restrictions to reduce business costs',
    icon: XCircle,
    shortTermImpact: -15,
    longTermImpact: -32,
    implementationCost: -2,
    timeToEffect: 2,
    sentiment: 'negative'
  },
  {
    id: 'highway-expansion',
    name: 'Highway Expansion Project',
    category: 'Transportation',
    description: 'Build new highways encouraging car dependency',
    icon: Car,
    shortTermImpact: -8,
    longTermImpact: -18,
    implementationCost: 4,
    timeToEffect: 5,
    sentiment: 'negative'
  },
  {
    id: 'logging-permits',
    name: 'Increased Logging Permits',
    category: 'Environment',
    description: 'Allow expanded commercial logging in protected areas',
    icon: TreePine,
    shortTermImpact: -10,
    longTermImpact: -22,
    implementationCost: -2,
    timeToEffect: 3,
    sentiment: 'negative'
  },
  {
    id: 'waste-incineration',
    name: 'Waste Incineration Plants',
    category: 'Waste',
    description: 'Build waste-to-energy incinerators without proper filters',
    icon: Flame,
    shortTermImpact: -9,
    longTermImpact: -16,
    implementationCost: 3,
    timeToEffect: 4,
    sentiment: 'negative'
  },
  {
    id: 'airport-expansion',
    name: 'Airport Expansion',
    category: 'Transportation',
    description: 'Expand airport capacity increasing air traffic emissions',
    icon: Plane,
    shortTermImpact: -7,
    longTermImpact: -14,
    implementationCost: 5,
    timeToEffect: 5,
    sentiment: 'negative'
  },
  {
    id: 'industrial-subsidies',
    name: 'Heavy Industry Subsidies',
    category: 'Economic',
    description: 'Tax breaks for polluting industries to boost economy',
    icon: Factory,
    shortTermImpact: -11,
    longTermImpact: -20,
    implementationCost: -3,
    timeToEffect: 3,
    sentiment: 'negative'
  },
  {
    id: 'wetland-development',
    name: 'Wetland Commercial Development',
    category: 'Urban Planning',
    description: 'Convert wetlands into commercial real estate',
    icon: Building,
    shortTermImpact: -8,
    longTermImpact: -19,
    implementationCost: -2,
    timeToEffect: 4,
    sentiment: 'negative'
  },
  {
    id: 'diesel-subsidies',
    name: 'Diesel Fuel Subsidies',
    category: 'Transportation',
    description: 'Reduce diesel prices encouraging heavy vehicle use',
    icon: Truck,
    shortTermImpact: -6,
    longTermImpact: -13,
    implementationCost: -2,
    timeToEffect: 2,
    sentiment: 'negative'
  },
  {
    id: 'pesticide-relaxation',
    name: 'Pesticide Regulation Relaxation',
    category: 'Agriculture',
    description: 'Allow more toxic pesticides to increase crop yields',
    icon: Wheat,
    shortTermImpact: -7,
    longTermImpact: -15,
    implementationCost: -1,
    timeToEffect: 3,
    sentiment: 'negative'
  },

  // NEUTRAL POLICIES
  {
    id: 'awareness-campaign',
    name: 'Public Awareness Campaign',
    category: 'Social',
    description: 'Informational campaign about environmental issues',
    icon: Users,
    shortTermImpact: 1,
    longTermImpact: 5,
    implementationCost: 1,
    timeToEffect: 4,
    sentiment: 'neutral'
  },
  {
    id: 'monitoring-system',
    name: 'Environmental Monitoring System',
    category: 'Technology',
    description: 'Install sensors to track pollution levels',
    icon: Activity,
    shortTermImpact: 0,
    longTermImpact: 3,
    implementationCost: 2,
    timeToEffect: 3,
    sentiment: 'neutral'
  },
  {
    id: 'research-funding',
    name: 'Clean Tech Research Grants',
    category: 'Technology',
    description: 'Fund university research into clean technologies',
    icon: Sparkles,
    shortTermImpact: 0,
    longTermImpact: 8,
    implementationCost: 2,
    timeToEffect: 6,
    sentiment: 'neutral'
  },
  {
    id: 'voluntary-program',
    name: 'Voluntary Emission Reduction',
    category: 'Regulation',
    description: 'Optional program for businesses to reduce emissions',
    icon: Award,
    shortTermImpact: 1,
    longTermImpact: 4,
    implementationCost: 1,
    timeToEffect: 3,
    sentiment: 'neutral'
  },
  {
    id: 'pilot-program',
    name: 'Green Technology Pilot',
    category: 'Technology',
    description: 'Small-scale test of new environmental technologies',
    icon: Lightbulb,
    shortTermImpact: 0,
    longTermImpact: 6,
    implementationCost: 2,
    timeToEffect: 5,
    sentiment: 'neutral'
  },
  {
    id: 'community-gardens',
    name: 'Community Garden Initiative',
    category: 'Social',
    description: 'Support local community gardens and urban farming',
    icon: Leaf,
    shortTermImpact: 1,
    longTermImpact: 4,
    implementationCost: 1,
    timeToEffect: 2,
    sentiment: 'neutral'
  }
];

export const PolicyRecommendationModel: React.FC<PolicyRecommendationModelProps> = ({
  isPlaying,
  speed
}) => {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [availablePolicies, setAvailablePolicies] = useState<Policy[]>([]);
  const [enactedPolicies, setEnactedPolicies] = useState<Policy[]>([]);
  const [environmentStats, setEnvironmentStats] = useState<EnvironmentStats>({
    health: 65,
    airQuality: 60,
    carbonEmissions: 75,
    publicHealth: 70,
    economicImpact: 80
  });
  const [simulationTime, setSimulationTime] = useState(0);
  const [events, setEvents] = useState<Array<{ id: string; message: string; type: string; timestamp: number }>>([]);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState<any>(null);

  // Initialize available policies
  useEffect(() => {
    const shuffled = [...allPolicyTemplates]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)  // Start with fewer policies
      .map(p => ({ ...p, enacted: false, longTermTriggered: false }));
    setAvailablePolicies(shuffled);
  }, [selectedRegion]);

  // Update simulation time
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      setSimulationTime(prev => prev + (0.1 * speed));
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, speed, gameOver]);

  // Apply gradual long-term effects over time
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      enactedPolicies.forEach(policy => {
        if (!policy.enactedAt) return;
        
        const timeElapsed = simulationTime - policy.enactedAt;
        
        if (timeElapsed > 0 && timeElapsed <= policy.timeToEffect) {
          // Gradually apply long-term effects
          const progressRatio = timeElapsed / policy.timeToEffect;
          const longTermMultiplier = policy.sentiment === 'negative' ? 1.5 : 1.0;
          const effectPerTick = (policy.longTermImpact / policy.timeToEffect) * 0.1 * speed * longTermMultiplier;
          
          const impactMultiplier = policy.sentiment === 'negative' ? 1.5 : 1.0; // Make negative policies hit harder
          setEnvironmentStats(prev => ({
            health: Math.min(100, Math.max(0, prev.health + policy.shortTermImpact * 0.6 * impactMultiplier)),
            airQuality: Math.min(100, Math.max(0, prev.airQuality + policy.shortTermImpact * 0.7 * impactMultiplier)),
            carbonEmissions: Math.min(100, Math.max(0, prev.carbonEmissions - policy.shortTermImpact * 0.5 * impactMultiplier)),
            publicHealth: Math.min(100, Math.max(0, prev.publicHealth + policy.shortTermImpact * 0.6 * impactMultiplier)),
            economicImpact: Math.min(100, Math.max(0, prev.economicImpact - policy.implementationCost * 2 + (policy.sentiment === 'negative' ? 8 : 0)))
          }));
        }
        
        if (timeElapsed >= policy.timeToEffect && !policy.longTermTriggered) {
          setEnactedPolicies(prev => prev.map(p => 
            p.id === policy.id ? { ...p, longTermTriggered: true } : p
          ));

          const eventId = `event-${Date.now()}-${Math.random()}`;
          setEvents(prev => [...prev, {
            id: eventId,
            message: `Long-term effects of "${policy.name}" are now fully realized!`,
            type: 'success',
            timestamp: Date.now()
          }]);

          setTimeout(() => {
            setEvents(prev => prev.filter(e => e.id !== eventId));
          }, 5000);
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, speed, simulationTime, enactedPolicies, gameOver]);

  // Add new policies periodically
  useEffect(() => {
    if (!isPlaying || gameOver || availablePolicies.length >= 10) return;
  
    const interval = setInterval(() => {
      const remaining = allPolicyTemplates.filter(
        template => !availablePolicies.some(p => p.id === template.id) &&
                    !enactedPolicies.some(p => p.id === template.id)
      );
      
      if (remaining.length > 0 && availablePolicies.length < 10) {
        const newPolicy = remaining[Math.floor(Math.random() * remaining.length)];
        setAvailablePolicies(prev => [...prev, { 
          ...newPolicy, 
          enacted: false, 
          longTermTriggered: false 
        }]);
        
        const eventId = `event-${Date.now()}-${Math.random()}`;
        setEvents(prev => [...prev, {
          id: eventId,
          message: `New policy available: "${newPolicy.name}"`,
          type: 'info',
          timestamp: Date.now()
        }]);
        
        setTimeout(() => setEvents(prev => prev.filter(e => e.id !== eventId)), 5000);
      }
    }, 4000 / speed); // New policy every 8 seconds adjusted by speed
  
    return () => clearInterval(interval);
  }, [isPlaying, speed, availablePolicies, enactedPolicies, gameOver]);

  const handleRegionChange = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    if (region) {
      setSelectedRegion(region);
      const shuffled = [...allPolicyTemplates]
        .sort(() => Math.random() - 0.5)
        .slice(0, 20)
        .map(p => ({ ...p, enacted: false, longTermTriggered: false }));
      setAvailablePolicies(shuffled);
      setEnactedPolicies([]);
      setSimulationTime(0);
      setEnvironmentStats({
        health: 100 - region.aqi * 0.4,
        airQuality: 100 - region.aqi * 0.5,
        carbonEmissions: region.aqi * 0.6,
        publicHealth: 100 - region.aqi * 0.3,
        economicImpact: 80
      });
      setEvents([]);
      setGameOver(false);
      setFinalScore(null);
    }
  };

  const handleEnactPolicy = (policyId: string) => {
    const policy = availablePolicies.find(p => p.id === policyId);
    if (!policy || policy.enacted) return;

    // Apply short-term impact immediately with stronger effects
    setEnvironmentStats(prev => ({
      health: Math.min(100, Math.max(0, prev.health + policy.shortTermImpact * 0.6)),
      airQuality: Math.min(100, Math.max(0, prev.airQuality + policy.shortTermImpact * 0.7)),
      carbonEmissions: Math.min(100, Math.max(0, prev.carbonEmissions - policy.shortTermImpact * 0.5)),
      publicHealth: Math.min(100, Math.max(0, prev.publicHealth + policy.shortTermImpact * 0.6)),
      economicImpact: Math.min(100, Math.max(0, prev.economicImpact - policy.implementationCost * 2))
    }));

    // Move to enacted and remove from available
    const enactedPolicy = { ...policy, enacted: true, enactedAt: simulationTime };
    setEnactedPolicies(prev => [...prev, enactedPolicy]);
    setAvailablePolicies(prev => prev.filter(p => p.id !== policyId));

    // Add event
    const eventId = `event-${Date.now()}-${Math.random()}`;
    setEvents(prev => [...prev, {
      id: eventId,
      message: `"${policy.name}" has been enacted! ${policy.shortTermImpact >= 0 ? 'Positive' : 'Negative'} short-term effects applied.`,
      type: policy.sentiment === 'positive' ? 'success' : policy.sentiment === 'negative' ? 'warning' : 'info',
      timestamp: Date.now()
    }]);

    setTimeout(() => {
      setEvents(prev => prev.filter(e => e.id !== eventId));
    }, 5000);

    // Check if game is over
    if (availablePolicies.length <= 1) {
      setTimeout(() => {
        endSimulation();
      }, 1000);
    }
  };

  const endSimulation = () => {
    setGameOver(true);
    
    const finalHealth = environmentStats.health;
    let performance = '';
    let performanceColor = '';
    
    if (finalHealth >= 85) {
      performance = 'Exceptional';
      performanceColor = 'text-green-400';
    } else if (finalHealth >= 70) {
      performance = 'Good';
      performanceColor = 'text-cyan-400';
    } else if (finalHealth >= 50) {
      performance = 'Fair';
      performanceColor = 'text-yellow-400';
    } else if (finalHealth >= 30) {
      performance = 'Poor';
      performanceColor = 'text-orange-400';
    } else {
      performance = 'Critical';
      performanceColor = 'text-red-400';
    }

    setFinalScore({
      performance,
      performanceColor,
      finalHealth: Math.round(finalHealth),
      stats: {
        airQuality: Math.round(environmentStats.airQuality),
        carbonEmissions: Math.round(environmentStats.carbonEmissions),
        publicHealth: Math.round(environmentStats.publicHealth),
        economicImpact: Math.round(environmentStats.economicImpact)
      },
      policiesEnacted: enactedPolicies.length,
      simulationTime: simulationTime.toFixed(1)
    });
  };

  const getHealthColor = (value: number) => {
    if (value >= 80) return 'from-green-500 to-emerald-500';
    if (value >= 60) return 'from-yellow-500 to-orange-400';
    if (value >= 40) return 'from-orange-500 to-red-400';
    return 'from-red-500 to-pink-500';
  };

  const getHealthLabel = (value: number) => {
    if (value >= 80) return 'Excellent';
    if (value >= 60) return 'Good';
    if (value >= 40) return 'Fair';
    return 'Poor';
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === 'positive') return 'border-green-500/50 bg-green-500/5';
    if (sentiment === 'negative') return 'border-red-500/50 bg-red-500/5';
    return 'border-slate-600 bg-slate-900/50';
  };

  const getSentimentIcon = (sentiment: string) => {
    if (sentiment === 'positive') return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (sentiment === 'negative') return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Activity className="w-4 h-4 text-slate-400" />;
  };

  if (gameOver && finalScore) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-12 border-2 border-cyan-500/30 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Simulation Complete!</h2>
          <p className="text-xl text-slate-300 mb-8">Final Environmental Assessment for {selectedRegion.name}</p>
          
          <div className="bg-slate-900 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Performance: <span className={finalScore.performanceColor}>{finalScore.performance}</span>
            </h3>
            <div className="text-6xl font-bold mb-2">
              <span className={`bg-gradient-to-r ${getHealthColor(finalScore.finalHealth)} bg-clip-text text-transparent`}>
                {finalScore.finalHealth}%
              </span>
            </div>
            <p className="text-slate-400">Overall Environmental Health Score</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-800 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Wind className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-slate-400">Air Quality</span>
              </div>
              <div className="text-3xl font-bold text-cyan-300">{finalScore.stats.airQuality}%</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Factory className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-slate-400">Emissions</span>
              </div>
              <div className="text-3xl font-bold text-orange-300">{finalScore.stats.carbonEmissions}%</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                <span className="text-sm text-slate-400">Public Health</span>
              </div>
              <div className="text-3xl font-bold text-green-300">{finalScore.stats.publicHealth}%</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-slate-400">Economy</span>
              </div>
              <div className="text-3xl font-bold text-purple-300">{finalScore.stats.economicImpact}%</div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 mb-8">
            <h4 className="text-lg font-bold text-white mb-4">Simulation Summary</h4>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Policies Enacted:</span>
                <span className="text-white font-semibold">{finalScore.policiesEnacted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Simulation Duration:</span>
                <span className="text-white font-semibold">{finalScore.simulationTime} months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Starting AQI:</span>
                <span className="text-white font-semibold">{selectedRegion.aqi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Region:</span>
                <span className="text-white font-semibold">{selectedRegion.name}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleRegionChange(selectedRegion.id)}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
          >
            Run New Simulation
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Region Selection */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Environmental Policy Simulator</h3>
              <p className="text-sm text-slate-400">AI-powered policy recommendations and impact analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-300 font-semibold">Powered by EnviroCast AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Region Selector */}
        <div className="bg-slate-900 rounded-xl p-4">
          <label className="text-sm text-slate-300 mb-2 block">Select Region</label>
          <select
            value={selectedRegion.id}
            onChange={(e) => handleRegionChange(e.target.value)}
            className="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
          >
            {regions.map(region => (
              <option key={region.id} value={region.id}>
                {region.name} - AQI: {region.aqi} | Pop: {region.population}M
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">
              Simulation Time: <span className="text-white font-semibold">{simulationTime.toFixed(1)} months</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Policies Remaining:</span>
            <span className="text-cyan-300 font-semibold">{availablePolicies.length}</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN: AI-Recommended Policies */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-400" />
              AI-Recommended Policies
            </h4>
            <div className="px-3 py-1 bg-slate-900 rounded-lg border border-slate-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-400">Live Analysis</span>
              </div>
            </div>
          </div>

          {/* Scrollable Policy List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {availablePolicies.map((policy) => {
              const Icon = policy.icon;
              
              return (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`bg-slate-900 rounded-xl p-4 border-2 cursor-pointer transition-all ${getSentimentColor(policy.sentiment)} hover:border-cyan-500/50`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        policy.sentiment === 'positive' ? 'bg-green-500/20' : 
                        policy.sentiment === 'negative' ? 'bg-red-500/20' : 'bg-slate-700'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          policy.sentiment === 'positive' ? 'text-green-400' : 
                          policy.sentiment === 'negative' ? 'text-red-400' : 'text-slate-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-white text-sm truncate">{policy.name}</h5>
                        <p className="text-xs text-slate-400">{policy.category}</p>
                      </div>
                    </div>
                    {getSentimentIcon(policy.sentiment)}
                  </div>

                  <p className="text-xs text-slate-300 mb-3 line-clamp-2">{policy.description}</p>

                  {/* Compact Impact Display */}
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>Immediate:</span>
                      </span>
                      <span className={`font-bold ${
                        policy.shortTermImpact >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {policy.shortTermImpact > 0 ? '+' : ''}{policy.shortTermImpact}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Long-term ({policy.timeToEffect}mo):</span>
                      </span>
                      <span className={`font-bold ${
                        policy.longTermImpact >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {policy.longTermImpact > 0 ? '+' : ''}{policy.longTermImpact}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Cost:</span>
                      <span className="text-orange-400 font-semibold">
                        {policy.implementationCost > 0
                        ? '$'.repeat(policy.implementationCost)
                        : policy.implementationCost < 0
                          ? `+${Math.abs(policy.implementationCost)}`
                          : 'Free'}

                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleEnactPolicy(policy.id)}
                    className={`w-full py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center space-x-2 ${
                      policy.sentiment === 'positive' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        : policy.sentiment === 'negative'
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    <span>Enact Policy</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}

            {availablePolicies.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">All policies have been enacted!</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Environment Health Dashboard */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 lg:sticky lg:top-4">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-400" />
              Environmental Health
            </h4>
            <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
          </div>

          {/* Overall Health Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold text-white">Overall Score</span>
              <div className="text-right">
                <div className={`text-3xl font-bold bg-gradient-to-r ${getHealthColor(environmentStats.health)} bg-clip-text text-transparent`}>
                  {Math.round(environmentStats.health)}%
                </div>
                <span className="text-sm text-slate-400">({getHealthLabel(environmentStats.health)})</span>
              </div>
            </div>
            <div className="w-full h-6 bg-slate-900 rounded-full overflow-hidden border-2 border-slate-700">
              <motion.div
                className={`h-full bg-gradient-to-r ${getHealthColor(environmentStats.health)} relative`}
                animate={{ width: `${environmentStats.health}%` }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </motion.div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="space-y-4">
            <motion.div className="bg-slate-900 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Wind className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-medium text-white">Air Quality Index</span>
                </div>
                <span className="text-2xl font-bold text-cyan-300">{Math.round(environmentStats.airQuality)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  animate={{ width: `${environmentStats.airQuality}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            <motion.div className="bg-slate-900 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Factory className="w-5 h-5 text-orange-400" />
                  <span className="text-sm font-medium text-white">Carbon Emissions</span>
                </div>
                <span className="text-2xl font-bold text-orange-300">{Math.round(environmentStats.carbonEmissions)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                  animate={{ width: `${environmentStats.carbonEmissions}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            <motion.div className="bg-slate-900 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium text-white">Public Health</span>
                </div>
                <span className="text-2xl font-bold text-green-300">{Math.round(environmentStats.publicHealth)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  animate={{ width: `${environmentStats.publicHealth}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            <motion.div className="bg-slate-900 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium text-white">Economic Impact</span>
                </div>
                <span className="text-2xl font-bold text-purple-300">{Math.round(environmentStats.economicImpact)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  animate={{ width: `${environmentStats.economicImpact}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Active Policies */}
          {enactedPolicies.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-700">
              <h5 className="text-sm font-semibold text-white mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Active Policies ({enactedPolicies.length})
              </h5>
              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                {enactedPolicies.map(policy => {
                  const timeElapsed = simulationTime - (policy.enactedAt || 0);
                  const progress = Math.min(100, (timeElapsed / policy.timeToEffect) * 100);
                  
                  return (
                    <div key={policy.id} className="bg-slate-900 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-white truncate">{policy.name}</span>
                        <span className="text-xs text-slate-400">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${policy.longTermTriggered ? 'bg-green-500' : 'bg-cyan-500'}`}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Event Log */}
      <AnimatePresence>
        {events.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 right-8 space-y-2 z-50 max-w-md"
          >
            {events.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className={`bg-slate-800 border-2 rounded-xl p-4 shadow-lg ${
                  event.type === 'success'
                    ? 'border-green-500/50'
                    : event.type === 'warning'
                    ? 'border-red-500/50'
                    : 'border-blue-500/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {event.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : event.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{event.message}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
};

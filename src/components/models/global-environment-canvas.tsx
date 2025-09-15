// src/components/models/global-environment-canvas.tsx

'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GlobalEnvironmentEngine, Region, EnvironmentalEvent } from '@/lib/global-environment';

interface GlobalEnvironmentCanvasProps {
  isPlaying: boolean;
  speed: number;
  selectedRegion: string | null;
  onRegionClick: (regionId: string | null) => void;
  engine: GlobalEnvironmentEngine;
  viewMode: 'pollution' | 'temperature' | 'biodiversity' | 'health' | 'population';
  showAtmosphere: boolean;
}

export const GlobalEnvironmentCanvas: React.FC<GlobalEnvironmentCanvasProps> = ({
  isPlaying,
  speed,
  selectedRegion,
  onRegionClick,
  engine,
  viewMode,
  showAtmosphere
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Update engine
      engine.updateEnvironment(deltaTime, isPlaying, speed);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background (ocean)
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1e40af');
      gradient.addColorStop(1, '#1e3a8a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw atmospheric layers if enabled
      if (showAtmosphere) {
        drawAtmosphericLayers(ctx, canvas, engine);
      }

      // Draw regions
      drawRegions(ctx, engine, viewMode, selectedRegion);

      // Draw environmental events
      drawEvents(ctx, engine);

      // Draw wind patterns
      drawWindPatterns(ctx, canvas, engine);

      // Draw pollution dispersion
      if (viewMode === 'pollution') {
        drawPollutionDispersion(ctx, engine);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speed, viewMode, selectedRegion, showAtmosphere, engine]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if click is on a region
    const regions = engine.getRegions();
    let clickedRegion: string | null = null;

    regions.forEach((region, id) => {
      if (x >= region.x && x <= region.x + region.width &&
          y >= region.y && y <= region.y + region.height) {
        clickedRegion = id;
      }
    });

    onRegionClick(clickedRegion === selectedRegion ? null : clickedRegion);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="border border-slate-600 rounded-lg cursor-pointer"
        onClick={handleCanvasClick}
        style={{ background: 'linear-gradient(to bottom, #1e40af, #1e3a8a)' }}
      />
      
      {/* Legend */}
      <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur rounded-lg p-3 text-xs">
        <div className="text-white font-semibold mb-2">Legend - {viewMode}</div>
        <div className="space-y-1">
          {getLegendItems(viewMode).map((item, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-slate-200">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Year Display */}
      <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur rounded-lg px-3 py-2">
        <div className="text-cyan-300 text-sm font-semibold">
          Year: {engine.getCurrentYear()}
        </div>
      </div>
    </div>
  );
};

function drawAtmosphericLayers(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, engine: GlobalEnvironmentEngine) {
  const layers = engine.getAtmosphericLayers();
  
  layers.forEach((layer, index) => {
    if (!layer.visible) return;
    
    const layerHeight = 30 + index * 25;
    
    ctx.save();
    ctx.globalAlpha = layer.opacity;
    ctx.fillStyle = layer.color;
    
    // Draw as a curved layer above the earth
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height + 100, canvas.width / 2 + 50, layerHeight, 0, Math.PI, 0);
    ctx.fill();
    
    ctx.restore();
  });
}

function drawRegions(ctx: CanvasRenderingContext2D, engine: GlobalEnvironmentEngine, viewMode: string, selectedRegion: string | null) {
  const regions = engine.getRegions();
  
  regions.forEach((region, id) => {
    const isSelected = selectedRegion === id;
    const color = getRegionColor(region, viewMode);
    
    // Draw region background
    ctx.fillStyle = color;
    ctx.fillRect(region.x, region.y, region.width, region.height);
    
    // Draw border
    ctx.strokeStyle = isSelected ? '#06b6d4' : '#374151';
    ctx.lineWidth = isSelected ? 3 : 1;
    ctx.strokeRect(region.x, region.y, region.width, region.height);
    
    // Draw region name
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      region.name,
      region.x + region.width / 2,
      region.y + region.height / 2
    );
    
    // Draw value indicator
    const value = getRegionValue(region, viewMode);
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.fillText(
      `${value.toFixed(1)}`,
      region.x + region.width / 2,
      region.y + region.height / 2 + 15
    );
    
    // Pulse effect for selected region
    if (isSelected) {
      ctx.save();
      ctx.globalAlpha = 0.3 + 0.3 * Math.sin(Date.now() * 0.005);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(region.x, region.y, region.width, region.height);
      ctx.restore();
    }
  });
}

function drawEvents(ctx: CanvasRenderingContext2D, engine: GlobalEnvironmentEngine) {
  const events = engine.getEvents();
  
  events.forEach(event => {
    const { x, y, radius, intensity, type } = event;
    const color = getEventColor(type);
    const alpha = intensity * 0.7;
    
    // Draw event circle
    ctx.save();
    ctx.globalAlpha = alpha;
    
    // Outer glow
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner core
    ctx.globalAlpha = alpha + 0.3;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
    
    // Event label
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(type.toUpperCase(), x, y - radius - 5);
  });
}

function drawWindPatterns(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, engine: GlobalEnvironmentEngine) {
  const regions = engine.getRegions();
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  
  regions.forEach(region => {
    const centerX = region.x + region.width / 2;
    const centerY = region.y + region.height / 2;
    const windLength = region.windSpeed * 0.5;
    const angle = (region.windDirection * Math.PI) / 180;
    
    // Draw wind arrow
    const endX = centerX + Math.cos(angle) * windLength;
    const endY = centerY + Math.sin(angle) * windLength;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    
    // Arrow head
    const arrowSize = 3;
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - arrowSize * Math.cos(angle - Math.PI / 6),
      endY - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - arrowSize * Math.cos(angle + Math.PI / 6),
      endY - arrowSize * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
  });
}

function drawPollutionDispersion(ctx: CanvasRenderingContext2D, engine: GlobalEnvironmentEngine) {
  const regions = engine.getRegions();
  
  regions.forEach(region => {
    if (region.pollution > 20) {
      const centerX = region.x + region.width / 2;
      const centerY = region.y + region.height / 2;
      const pollutionRadius = (region.pollution / 100) * 50;
      
      ctx.save();
      ctx.globalAlpha = 0.2;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pollutionRadius);
      gradient.addColorStop(0, '#ef4444');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pollutionRadius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
  });
}

function getRegionColor(region: Region, viewMode: string): string {
  let value: number;
  let colorScale: string[];
  
  switch (viewMode) {
    case 'pollution':
      value = region.pollution / 100;
      colorScale = ['#10b981', '#f59e0b', '#ef4444'];
      break;
    case 'temperature':
      value = Math.max(0, Math.min(1, (region.temperature - 5) / 25));
      colorScale = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
      break;
    case 'biodiversity':
      value = region.biodiversity / 100;
      colorScale = ['#ef4444', '#f59e0b', '#10b981'];
      break;
    case 'health':
      value = region.healthRisk / 100;
      colorScale = ['#10b981', '#f59e0b', '#ef4444'];
      break;
    case 'population':
      value = Math.min(1, region.population / 1000);
      colorScale = ['#1e293b', '#475569', '#64748b', '#94a3b8'];
      break;
    default:
      value = 0.5;
      colorScale = ['#64748b', '#64748b'];
  }
  
  return interpolateColor(colorScale, value);
}

function getRegionValue(region: Region, viewMode: string): number {
  switch (viewMode) {
    case 'pollution':
      return region.pollution;
    case 'temperature':
      return region.temperature;
    case 'biodiversity':
      return region.biodiversity;
    case 'health':
      return region.healthRisk;
    case 'population':
      return region.population;
    default:
      return 0;
  }
}

function getEventColor(type: EnvironmentalEvent['type']): string {
  const colors = {
    wildfire: '#ff6b35',
    hurricane: '#4a90e2',
    drought: '#f5a623',
    flood: '#50e3c2',
    volcanic: '#d0021b',
    industrial: '#9013fe'
  };
  return colors[type] || '#ffffff';
}

function getLegendItems(viewMode: string) {
  switch (viewMode) {
    case 'pollution':
      return [
        { color: '#10b981', label: 'Low (0-30)' },
        { color: '#f59e0b', label: 'Moderate (30-70)' },
        { color: '#ef4444', label: 'High (70-100)' }
      ];
    case 'temperature':
      return [
        { color: '#3b82f6', label: 'Cold (<10°C)' },
        { color: '#10b981', label: 'Moderate (10-20°C)' },
        { color: '#f59e0b', label: 'Warm (20-30°C)' },
        { color: '#ef4444', label: 'Hot (>30°C)' }
      ];
    case 'biodiversity':
      return [
        { color: '#ef4444', label: 'Low (0-30)' },
        { color: '#f59e0b', label: 'Moderate (30-70)' },
        { color: '#10b981', label: 'High (70-100)' }
      ];
    case 'health':
      return [
        { color: '#10b981', label: 'Low Risk (0-30)' },
        { color: '#f59e0b', label: 'Moderate Risk (30-70)' },
        { color: '#ef4444', label: 'High Risk (70-100)' }
      ];
    case 'population':
      return [
        { color: '#1e293b', label: 'Low (<200)' },
        { color: '#475569', label: 'Medium (200-500)' },
        { color: '#64748b', label: 'High (500-800)' },
        { color: '#94a3b8', label: 'Very High (>800)' }
      ];
    default:
      return [];
  }
}

function interpolateColor(colors: string[], value: number): string {
  if (colors.length === 0) return '#64748b';
  if (colors.length === 1) return colors[0];
  
  const scaledValue = Math.max(0, Math.min(1, value));
  const index = scaledValue * (colors.length - 1);
  const lowerIndex = Math.floor(index);
  const upperIndex = Math.ceil(index);
  
  if (lowerIndex === upperIndex) {
    return colors[lowerIndex];
  }
  
  const fraction = index - lowerIndex;
  const lowerColor = hexToRgb(colors[lowerIndex]);
  const upperColor = hexToRgb(colors[upperIndex]);
  
  if (!lowerColor || !upperColor) return colors[lowerIndex];
  
  const r = Math.round(lowerColor.r + (upperColor.r - lowerColor.r) * fraction);
  const g = Math.round(lowerColor.g + (upperColor.g - lowerColor.g) * fraction);
  const b = Math.round(lowerColor.b + (upperColor.b - lowerColor.b) * fraction);
  
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

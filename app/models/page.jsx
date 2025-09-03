// app/models/page.jsx
'use client'
import React, { useState } from 'react'
import Card from "@/components/cards/Card"
import SimulationAQI from '@/components/SimulationAQI'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const history = Array.from({ length: 24 }, (_, i) => ({ hour: i, aqi: Math.round(50 + 40 * Math.sin(i/3)) }))

export default function Models() {
  return (
    <div className="section">
      <div className="container mx-auto px-4 max-w-6xl space-y-10">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">Models & Simulations</h1>
          <p className="text-slate-300 mt-3 max-w-3xl mx-auto">Explore interactive tools demonstrating pollution dynamics and our hybrid prediction flow.</p>
        </header>

        <Card>
          <h2 className="text-2xl font-semibold mb-4">Daily AQI Pattern (Demo)</h2>
          <div className="w-full h-72">
            <ResponsiveContainer>
              <LineChart data={history} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" tickFormatter={(v) => `${v}:00`} />
                <YAxis domain={[0, 200]} />
                <Tooltip />
                <Line type="monotone" dataKey="aqi" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <SimulationAQI />

        <Card>
          <h2 className="text-2xl font-semibold mb-2">Energy Choices Mini-Game</h2>
          <p className="text-slate-300 mb-3">Toggle sources and watch estimated emissions change. Try to keep AQI below 100!</p>
          <EnergyGame />
        </Card>
      </div>
    </div>
  )
}

function EnergyGame() {
  const options = [
    { id: 'coal', label: 'Coal Plants', impact: 40 },
    { id: 'gas', label: 'Gas Turbines', impact: 20 },
    { id: 'traffic', label: 'Traffic', impact: 30 },
    { id: 'wildfire', label: 'Wildfire Smoke', impact: 50 },
    { id: 'renew', label: 'Renewables Boost', impact: -30 },
  ]
  const [state, setState] = useState({ coal: true, gas: true, traffic: true, wildfire: false, renew: false })
  const aqi = Math.max(0, options.reduce((s, o) => s + (state[o.id] ? o.impact : 0), 0))

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        {options.map(o => (
          <label key={o.id} className="flex items-center gap-3">
            <input type="checkbox" checked={state[o.id] || false} onChange={() => setState({ ...state, [o.id]: !state[o.id] })} />
            <span className="text-slate-200">{o.label}</span>
          </label>
        ))}
      </div>
      <div className="rounded-2xl p-6 border border-white/10 bg-white/5 flex flex-col items-center justify-center">
        <div className="text-6xl font-black mb-2" style={{ color: aqi > 150 ? '#ef4444' : aqi > 100 ? '#f59e0b' : '#10b981' }}>{aqi}</div>
        <div className="text-slate-300">Estimated AQI</div>
      </div>
    </div>
  )
}

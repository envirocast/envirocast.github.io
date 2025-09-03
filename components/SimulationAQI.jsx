// components/SimulationAQI.jsx
'use client'
import { useMemo, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import Card from "@/components/cards/Card"

export default function SimulationAQI() {
  const [pm25, setPm25] = useState(15)
  const [o3, setO3] = useState(60)
  const [no2, setNo2] = useState(20)
  const [temp, setTemp] = useState(24)
  const [humidity, setHumidity] = useState(45)

  const kernel = (a, b) => {
    // mock quantum RBF-style similarity
    const diff = a.map((v, i) => v - b[i])
    const d2 = diff.reduce((s, v) => s + v*v, 0)
    return Math.exp(-d2 / 500)
  }

  const series = useMemo(() => {
    const base = [pm25, o3, no2, temp, humidity]
    return Array.from({ length: 24 }, (_, h) => {
      const env = [pm25 + Math.sin(h/3)*5, o3 + Math.cos(h/4)*4, no2 + Math.sin(h/5)*3, temp + Math.sin(h/6)*1.5, humidity + Math.cos(h/7)*2]
      const sim = kernel(base, env)
      const aqi = Math.min(200, Math.round(50 + (pm25*2 + o3*0.6 + no2*1.2) * (1.2 - sim)))
      return { hour: h, aqi }
    })
  }, [pm25, o3, no2, temp, humidity])

  return (
    <Card>
      <h2 className="text-2xl font-semibold mb-2">Interactive AQI Simulator</h2>
      <p className="text-slate-300 mb-4">Adjust pollutant & weather sliders. A mock quantum-kernel similarity influences predicted AQI.</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Slider label="PM2.5 (µg/m³)" value={pm25} setValue={setPm25} min={0} max={150} />
          <Slider label="O₃ (ppb)" value={o3} setValue={setO3} min={0} max={300} />
          <Slider label="NO₂ (ppb)" value={no2} setValue={setNo2} min={0} max={200} />
          <Slider label="Temp (°C)" value={temp} setValue={setTemp} min={-10} max={45} />
          <Slider label="Humidity (%)" value={humidity} setValue={setHumidity} min={0} max={100} />
        </div>
        <div className="w-full h-72">
          <ResponsiveContainer>
            <LineChart data={series} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" tickFormatter={(v) => `${v}:00`} />
              <YAxis domain={[0, 200]} />
              <Tooltip />
              <Line type="monotone" dataKey="aqi" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}

function Slider({ label, value, setValue, min, max }) {
  return (
    <div>
      <div className="flex justify-between text-sm text-slate-300">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e)=>setValue(Number(e.target.value))}
        className="w-full accent-brand" />
    </div>
  )
}

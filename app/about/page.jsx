// app/about/page.jsx
'use client'
import Card from "@/components/cards/Card"
import QuantumExplainer from '@/components/QuantumExplainer'
import Quantum3D from '@/components/Quantum3D'

export default function About() {
  return (
    <div className="section">
      <div className="container mx-auto px-4 max-w-6xl space-y-10">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">What EnviroCast Does</h1>
          <p className="text-slate-300 mt-3 max-w-3xl mx-auto">
            We combine NASA, weather, and air-quality data with a hybrid quantum-classical model.
            Below is a visual walkthrough of our 7-part approach.
          </p>
        </header>

        <Quantum3D />
        <QuantumExplainer />

        <section className="grid md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-xl font-semibold mb-2">Data Sources</h3>
            <ul className="list-disc pl-5 text-slate-300 space-y-1">
              <li>Air quality: PM2.5, O₃, NO₂, AQI</li>
              <li>Weather: temp, humidity, wind, pressure</li>
              <li>NASA Earth data (remote sensing proxies)</li>
            </ul>
          </Cqrd>
          <Card>
            <h3 className="text-xl font-semibold mb-2">Why It Matters</h3>
            <p className="text-slate-300">Better forecasts empower cities to reduce exposure and plan interventions—smart routing, alerts, and cleaner energy incentives.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold mb-2">Instagram</h3>
            <p className="text-slate-300">Follow our outreach: <a className="link" href="https://instagram.com/envirocast_tech" target="_blank" rel="noreferrer">@envirocast_tech</a></p>
          </Card>
        </section>
      </div>
    </div>
  )
}

// app/page.jsx
'use client'
import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import Team from '@/components/Team'
import Card from "@/components/cards/Card"
import QuantumExplainer from '@/components/QuantumExplainer'
import SimulationAQI from '@/components/SimulationAQI'

export default function Home() {
  return (
    <>
      <Hero />

      {/* Problem & Mission */}
      <section className="section">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
            <Card>
              <h2 className="text-3xl font-semibold mb-3">The Problem: Pollution</h2>
              <p className="text-slate-300 leading-relaxed">
                Pollution—from traffic, industry, wildfires, and more—threatens our health and climate.
                Tiny particles (PM2.5), ozone (O₃), and nitrogen dioxide (NO₂) can worsen asthma, heart disease,
                and shorten lifespans. EnviroCast turns complex data into clear, actionable insights.
              </p>
              <ul className="list-disc pl-5 mt-4 text-slate-300 space-y-2">
                <li>Sources: vehicles, power plants, factories, wildfires, dust, and urban heat.</li>
                <li>Why it’s dangerous: elevated AQI, respiratory and cardiovascular risks, economic costs.</li>
                <li>What we do: predict, visualize, and nudge communities toward cleaner choices.</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-slate-300 mb-4">
                EnviroCast saves the environment by promoting action and leveraging new technology.
                We blend quantum and classical AI to forecast air quality and guide interventions.
              </p>
              <div className="flex gap-3">
                <a className="btn" href="/about">Learn how it works</a>
                <a className="btn btn-outline" href="/models">Try simulations</a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Quantum teaser */}
      <section className="section">
        <div className="container mx-auto px-4 max-w-6xl">
          <QuantumExplainer compact />
        </div>
      </section>

      {/* Interactive AQI mini-sim */}
      <section className="section">
        <div className="container mx-auto px-4 max-w-6xl">
          <SimulationAQI />
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section bg-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <Team />
        </div>
      </section>
    </>
  )
}

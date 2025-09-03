// components/QuantumExplainer.jsx
'use client'
import { motion } from 'framer-motion'

const steps = [
  {
    title: '1) Smart Hybrid Algorithm',
    body: 'We mix quantum and classical computing. Quantum circuits compute similarity scores; classical algorithms turn those into predictions.'
  },
  {
    title: '2) Data & Features',
    body: 'We use PM2.5, O₃, NO₂, weather, and NASA data, looking across a recent time window (e.g., last 24h) to capture patterns.'
  },
  {
    title: '3) Quantum Encoding',
    body: 'Each data point becomes “angles” for qubits. Entanglement lets qubits share information and model complex relations.'
  },
  {
    title: '4) Quantum Similarity',
    body: 'A quantum kernel measures similarity (0–1). We average many runs to stabilize the signal.'
  },
  {
    title: '5) Classical Regression',
    body: 'We feed the kernel matrix to ridge regression (or XGBoost) to predict AQI and pollutant levels.'
  },
  {
    title: '6) Hybrid Boost for Stability',
    body: 'We fuse quantum scores with classical features to offset noise and sharpen predictions.'
  },
  {
    title: '7) Fast & Efficient',
    body: 'We precompute heavy parts so new readings evaluate instantly, using simulators or real IBM Quantum backends.'
  }
]

export default function QuantumExplainer({ compact }) {
  return (
    <div className={`grid ${compact ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
      {steps.map((s, i) => (
        <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: i * 0.03 }} className="card-base">
          <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
          <p className="text-slate-300">{s.body}</p>
        </motion.div>
      ))}
    </div>
  )
}

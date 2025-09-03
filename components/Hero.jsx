// components/Hero.jsx
'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40">
        <img src="/hero-bg.jpg" alt="Earth" className="w-full h-full object-cover" />
      </div>
      <div className="container mx-auto max-w-6xl px-4 pt-20 pb-24">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight">
          Quantum Insights for a <span className="gradient-text">Cleaner Planet</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-4 text-lg md:text-xl text-slate-200 max-w-3xl">
          EnviroCast blends IBM Quantum-inspired kernels with classical AI to forecast air quality and drive real-world action.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-3">
          <a className="btn" href="/about">How it works</a>
          <a className="btn btn-outline" href="/models">Explore models</a>
        </motion.div>
      </div>
    </section>
  )
}

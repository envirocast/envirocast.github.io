'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { algorithmSteps } from '@/lib/data';
import { Database, Zap, Brain, Settings, Layers, Target, Rocket } from 'lucide-react';

const iconMap = {
  Database,
  Zap,
  Brain,
  Settings,
  Layers,
  Target,
  Rocket
};

const QuantumAlgorithm = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
            Quantum Technology
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Smart Hybrid Quantum Algorithm
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our revolutionary 7-step process combines quantum computing with classical machine learning 
            to deliver unprecedented accuracy in air quality forecasting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {algorithmSteps.map((step, index) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-300">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className="text-sm">
                        Step {step.id}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{step.details}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Quantum-Enhanced Forecasting?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Exponential Speedup</h4>
                  <p className="text-gray-700 text-sm">
                    Quantum algorithms process atmospheric data exponentially faster than classical methods.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600 mb-2">Enhanced Accuracy</h4>
                  <p className="text-gray-700 text-sm">
                    Quantum superposition enables modeling of complex atmospheric interactions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-teal-600 mb-2">Real-time Processing</h4>
                  <p className="text-gray-700 text-sm">
                    Hybrid approach provides immediate results for time-critical decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default QuantumAlgorithm;

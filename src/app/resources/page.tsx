'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, BookOpen, Database, Code, GitBranch, ArrowRight, Rss } from 'lucide-react';

// Self-contained data, tailored to the NASA TEMPO mission
const resourcesData = [
  {
    id: 1,
    title: "TEMPO Level 2 Data Products",
    category: "Dataset",
    description: "Official repository for TEMPO's calibrated NO2, O3, and HCHO data.",
    url: "https://earthdata.nasa.gov/",
    icon: Database,
  },
  {
    id: 2,
    title: "Panoply Data Viewer",
    category: "Tool",
    description: "NASA's cross-platform application for plotting geo-referenced and other data.",
    url: "https://www.giss.nasa.gov/tools/panoply/",
    icon: Code,
  },
  {
    id: 3,
    title: "The TEMPO Mission: A New Era for Air Quality",
    category: "Paper",
    description: "The foundational paper outlining the TEMPO mission's objectives and technology.",
    url: "https://www.spiedigitallibrary.org/",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "GEOS-Chem Model",
    category: "Tool",
    description: "A global 3-D chemical transport model for atmospheric composition.",
    url: "http://wiki.seas.harvard.edu/geos-chem/",
    icon: Code,
  },
  {
    id: 5,
    title: "NOAA Weather Data API",
    category: "Dataset",
    description: "Real-time access to weather data for integration with air quality models.",
    url: "https://www.weather.gov/documentation/services-web-api",
    icon: Database,
  },
  {
    id: 6,
    title: "Fusing Satellite and Ground Data",
    category: "Paper",
    description: "Methodologies for improving forecast accuracy by combining sensor types.",
    url: "https://www.sciencedirect.com/",
    icon: BookOpen,
  },
];

const publications = [
    {
        title: "High-Resolution Air Quality Forecasting with TEMPO Data",
        authors: "Sharma, A., Carter, B., et al. (2025). Journal of Geophysical Research.",
        url: "#",
    },
    {
        title: "Scalable Cloud Architectures for Real-Time Geospatial Data Processing",
        authors: "Carter, B., et al. (2024). IEEE Transactions on Cloud Computing.",
        url: "#",
    }
]

export default function Resources() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Dataset', 'Paper', 'Tool'];

  const filteredResources = activeFilter === 'All' 
    ? resourcesData 
    : resourcesData.filter(r => r.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
            Knowledge Hub
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent mb-6 tracking-tight">
            Data, Tools & Research
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Explore the curated datasets, scientific papers, and open-source tools that form the foundation of the EnviroCast platform.
          </p>
        </motion.div>
        
        <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-12">
            {filters.map(filter => (
                <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`relative px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-colors duration-300 ${
                        activeFilter === filter 
                        ? 'text-white' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                >
                    {activeFilter === filter && (
                        <motion.div
                            layoutId="activeFilterTab"
                            className="absolute inset-0 bg-cyan-600/50 rounded-full"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">{filter}</span>
                </button>
            ))}
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredResources.map((item) => {
                const Icon = item.icon;
                return (
                    <motion.div 
                        key={item.id} 
                        variants={itemVariants}
                        exit="exit"
                        layout
                    >
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                           <div className="h-full bg-slate-800/50 rounded-2xl border border-slate-700 p-6 flex flex-col justify-between group transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-400/10 hover:-translate-y-1">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600">
                                            <Icon className="h-6 w-6 text-cyan-300" />
                                        </div>
                                        <ExternalLink className="h-5 w-5 text-slate-500 group-hover:text-cyan-300 transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                                </div>
                                <span className="mt-4 px-2 py-0.5 bg-slate-700 text-slate-300 text-xs font-medium rounded-full w-fit">{item.category}</span>
                           </div>
                        </a>
                    </motion.div>
                )
            })}
          </AnimatePresence>
        </motion.div>
        
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 sm:p-12">
             <h2 className="text-3xl font-extrabold text-center text-white mb-8">Key Publications</h2>
             <div className="space-y-6">
                {publications.map(pub => (
                    <a key={pub.title} href={pub.url} target="_blank" rel="noopener noreferrer" className="block p-6 bg-slate-800 rounded-lg group hover:bg-slate-700/50 transition-colors duration-300">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                            <div>
                                <h3 className="font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">{pub.title}</h3>
                                <p className="text-sm text-slate-400 mt-1">{pub.authors}</p>
                            </div>
                            <Download className="h-5 w-5 text-slate-500 group-hover:text-cyan-300 transition-colors mt-4 sm:mt-0 ml-0 sm:ml-4 flex-shrink-0" />
                        </div>
                    </a>
                ))}
             </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
            <div className="relative rounded-2xl p-8 sm:p-12 overflow-hidden bg-slate-800/50 border border-slate-700 text-center">
                <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(circle_400px_at_50%_200px,#1e40af33,#0f172a)]"></div>
                <GitBranch className="h-10 w-10 text-purple-400 mx-auto mb-4"/>
                <h2 className="text-3xl font-extrabold text-white mb-4">Commitment to Open Science</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                    Our models, tools, and research are built on open-source principles. We invite collaboration to accelerate progress in environmental monitoring.
                </p>
                <a href="#" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full overflow-hidden transition-all duration-300 hover:from-cyan-600 hover:to-purple-600 hover:shadow-lg hover:shadow-cyan-500/30">
                    <span className="relative">Explore on GitHub</span>
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </motion.div>

      </div>
    </div>
  );
}

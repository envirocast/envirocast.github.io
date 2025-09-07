'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart, Layers, Target, Users, Calendar, Star, Briefcase, BrainCircuit, Sparkles, Send, MapPin } from 'lucide-react';

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Anya Sharma",
      role: "Lead Atmospheric Scientist",
      image: "https://placehold.co/400x400/60a5fa/ffffff?text=AS&font=inter",
      bio: "An atmospheric scientist dedicated to translating complex satellite data into actionable public health insights. My work focuses on integrating NASA's TEMPO mission data with ground-based sensors to create high-fidelity air quality forecasts.",
      expertise: [
        "Atmospheric Chemistry", "Satellite Data Fusion", "Geospatial Analysis", "Weather Modeling (WRF)", "Pollutant Dispersion", "Python (Pandas, xarray)",
      ],
      achievements: [
        "Published 15+ papers on tropospheric ozone and NO2 monitoring", "Developed novel algorithms for TEMPO data calibration", "Led a multi-institutional team for a NOAA grant on air quality", "Presented findings at the American Geophysical Union (AGU) annual meeting",
      ],
      location: "Houston, TX",
      joinedYear: "2024",
      email: "anya.sharma@envirocast.tech",
      personalNote: "The air we breathe connects us all. My goal is to make the invisible visible, using cutting-edge satellite technology to empower communities with the knowledge to protect their health from air pollution."
    },
    {
      id: 2,
      name: "Ben Carter",
      role: "Cloud & Data Architect",
      image: "https://placehold.co/400x400/a78bfa/ffffff?text=BC&font=inter",
      bio: "I architect the scalable cloud infrastructure that powers EnviroCast. My focus is on building robust, efficient data pipelines to process terabytes of real-time TEMPO, weather, and ground sensor data seamlessly.",
      expertise: [
        "Cloud Computing (AWS/GCP)", "Big Data Technologies (Spark, Dask)", "Kubernetes & Docker", "Data Pipeline Orchestration (Airflow)", "CI/CD & DevOps", "Infrastructure as Code (Terraform)"
      ],
      achievements: [
        "Designed a serverless architecture processing 1TB of data daily", "Reduced data ingestion latency by 60% for a major geospatial project", "Certified Kubernetes Application Developer (CKAD)", "Engineered a collaborative cloud environment for seamless team scaling and research"
      ],
      location: "Houston, TX",
      joinedYear: "2024",
      email: "ben.carter@envirocast.tech",
      personalNote: "For me, the ultimate challenge is building a system that is not only powerful but also elegant and efficient. I'm driven to create the computational backbone that allows science to happen at scale, instantly."
    }
  ];

  const stats = [
    { label: "Data Points Processed Daily", value: "5B+", icon: Layers },
    { label: "Forecast Accuracy", value: "97.5%", icon: Target },
    { label: "Population Covered", value: "300M+", icon: Users },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent mb-6 tracking-tight">
            The EnviroCast Team
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Meet the dedicated scientists and engineers leveraging NASA's TEMPO mission to build the next generation of air quality forecasting and protect public health.
          </p>
        </motion.div>

        <motion.div 
          className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-start sm:items-center">
            <Heart className="w-8 h-8 text-purple-400 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-xl text-slate-100 mb-2">Our Mission with TEMPO</h3>
              <p className="text-slate-400">
               Our mission is to harness the revolutionary data from NASA's TEMPO satellite, integrating it with ground and weather data to provide timely, accurate air quality alerts that help communities and individuals reduce their exposure to pollutants.
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center">
              <div className="p-3 rounded-full bg-cyan-900/50 mx-auto w-fit mb-3 border border-cyan-700">
                <stat.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {teamMembers.map(member => (
            <motion.div 
              key={member.id} 
              className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-400/10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <div className="p-8">
                <div className="flex flex-col sm:flex-row items-center mb-6">
                  <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mr-0 sm:mr-6 mb-4 sm:mb-0 border-4 border-slate-700" />
                  <div>
                    <h3 className="text-2xl font-bold text-white text-center sm:text-left">{member.name}</h3>
                    <p className="text-purple-400 font-medium text-center sm:text-left">{member.role}</p>
                    <div className="flex items-center justify-center sm:justify-start text-sm text-slate-500 mt-2">
                      <MapPin className="w-4 h-4 mr-1.5" /> {member.location}
                      <Calendar className="w-4 h-4 ml-4 mr-1.5" /> Since {member.joinedYear}
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{member.bio}</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-100 mb-3 flex items-center"><BrainCircuit className="w-5 h-5 mr-2 text-cyan-400"/>Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-cyan-900/50 text-cyan-300 text-xs font-medium rounded-full border border-cyan-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-100 mb-3 flex items-center"><Sparkles className="w-5 h-5 mr-2 text-yellow-400"/>Key Achievements</h4>
                    <ul className="space-y-2">
                      {member.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start">
                          <Star className="w-3.5 h-3.5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-xs text-slate-400">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="text-sm text-slate-300 italic">{member.personalNote}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative rounded-2xl p-8 sm:p-12 overflow-hidden bg-slate-800/50 border border-slate-700">
             <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(circle_400px_at_50%_200px,#581c8744,#0f172a)]"></div>
             <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent mb-6">
                    Collaborate With Us
                </h2>
                <p className="text-lg text-slate-400 mb-8 max-w-3xl mx-auto">
                   We partner with public health agencies, research institutions, and community organizations. If you're interested in leveraging our data and technology, let's connect.
                </p>
                <a href="mailto:partners@envirocast.tech" className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full overflow-hidden transition-all duration-300 hover:from-cyan-600 hover:to-purple-600 hover:shadow-lg hover:shadow-cyan-500/30">
                    <span className="relative">Contact for Partnerships</span>
                    <Send className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </a>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

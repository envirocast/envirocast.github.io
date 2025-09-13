'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import { Mail, Heart, Layers, Target, Users, Calendar, Star, Briefcase, BrainCircuit, Sparkles, Send, MapPin } from 'lucide-react';

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Arnav Nemade",
      role: "Lead Quantum Developer",
      image: "/arnav.png",
      bio: "A passionate student with the goal of making the world a cleaner place using machine learning models and advanced quantum algorithms. Built the main web application with interactive globe and satellite integration powered by custom hybrid quantum-classical integration.",
      expertise: [
        "Quantum Engineering", "Geospatial Analysis", "Machine Learning Algorithms", "Satellite Data Fusion", "Artificial Intelligence", "Weather Modeling (WRF)", "Python",
      ],
      achievements: [
        "Co-president of a non-profit to help marginalized farmers in third-world countries", "Founder of an AI web application for exploration of student career choices", "Ranked 16th in the country in PicoCTF Cybersecurity", "Won local NASA Space Apps Hackathon in the Data Analysis category", "First place in school wide GT expo for developing an environmental & agricultural service application", "HUDL City Championship finalist",
      ],
      location: "Houston, TX",
      joinedYear: "2025",
      email: "arnavnemade1@gmail.com",
      personalNote: "If we all do our part, we can make the world a better place."
    },
    {
      id: 2,
      name: "Kavin Elangovan",
      role: "Web Applications and Graphics Developer",
      image: "/kavin.png",
      bio: "A data-driven student with the goal of using the powers of innovation, creativity, and technology to improve connection and engagement using interactive interfaces. Created this informative and engaging website for EnviroCast and developed user interfaces and graphics for ML models and applications.",
      expertise: [
        "Web Development", "Software Applications", "Graphic Design", "Artificial Intelligence", "Machine Learning", "Image Editing", "API Interfaces",
      ],
      achievements: [
        "Recipient of the United States Navy and Marine Corps' Office of Naval Research Gold Medal", "Developed an AI-powered application for scalable multicancer classification and diagnosis", "Finalist at TXSEF in Biomedical Engineering", "Presenter at SAIL2025, ENDO2025, and ISBI2025 international conferences", "AP and CollegeBoard-certified Computer Science & Mathematics tutor", "UNICEF Youth Training Advocate",
      ],
      location: "Houston, TX",
      joinedYear: "2025",
      email: "ketechwiz@gmail.com",
      personalNote: "Nature is too amazing to lose, so let's protect it however we can."
    },
    {
      id: 3,
      name: "Vir Sanghavi",
      role: "Lead Presenter and AI Systems Engineer",
      image: "https://placehold.co/400x400/60a5fa/ffffff?text=VS&font=inter",
      bio: "A student innovator applying AI and data-driven systems to solve environmental and societal challenges. Constructed resilient artificial intelligence and machine learning systems and algorithms complemented with scalable platforms to enhance real-world impact.",
      expertise: [
        "Machine Learning", "Artificial Intelligence", "Full-Stack Development", "Data Visualization", "Leadership", "Public Speaking", "STEM Outreach",
      ],
      achievements: [
        "Founder of an AI-powered debate platform with 2300+ users across 3 continents", "Executive director of a scaled nonprofit distributing $500K+ in robotics hardware", "Led an AI-powered bird strike prevention system using computer vision and bioacoustic deterrents", "Developed a machine learning tool for real-world contextual awareness using LAB color models", "2023 Texas State Champion in Congressional Debate & National Finalist", "Launched a global coding educational initiative, teaching 100+ students in India basic programming skills",
      ],
      location: "Houston, TX",
      joinedYear: "2025",
      email: "vir.sanghavi@gmail.com",
      personalNote: "Innovation should scale beyond people. It should serve the planet too."
    },
    {
      id: 4,
      name: "Divin Giddaluru",
      role: "Front-End Web Developer",
      image: "https://placehold.co/400x400/60a5fa/ffffff?text=DG&font=inter",
      bio: "A developer and AI enthusiast passionate about using technology to break down barriers to education and information. Assisted in creating the EnviroCast website, integrating full-stack functionality, interactivity, and data management systems to deliver insightful user experiences.",
      expertise: [
        "Artificial Intelligence", "Full-Stack Development", "Web Programming", "Machine Learning", "Computer Vision", "Digital Learning Tools", "Cloud Integration",
      ],
      achievements: [
        "PCAP™ Certified Associate in Python Programming", "Developed accessible tools for legal, financial, and digital literacy", "Led full-stack development of resource discovery platforms", "Deployed AI apps using Streamlit, SQL, and PyTorch", "Designed cloud-based tools with Azure authentication integration", "Executive SWE of a startup with +300K valuation",
      ],
      location: "Houston, TX",
      joinedYear: "2025",
      email: "divin.giddaluru@gmail.com",
      personalNote: "Technology should be used to help people, especially those who often get overlooked."
    },
    {
      id: 5,
      name: "Ahaan Thota",
      role: "Role",
      image: "https://placehold.co/400x400/60a5fa/ffffff?text=AT&font=inter",
      bio: "Bio",
      expertise: [
        "Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6", "Skill 7",
      ],
      achievements: [
        "Achivement 1", "Achievement 2", "Achievement 3", "Achievement 4", "Achivement 5", "Achievement 6",
      ],
      location: "Houston, TX",
      joinedYear: "2025",
      email: "ahaan.thota@gmail.com",
      personalNote: "Quote by you"
    },
    {
      id: 6,
      name: "Sathyan Gopal",
      role: "Social Media and Promotional Content Manager",
      image: "https://placehold.co/400x400/60a5fa/ffffff?text=SG&font=inter",
      bio: "A hard-working student with the goal of making the world a better place through the use of technology and machine learning. Organized social media compaigns and promotional multimedia to support the environment aligned with EnviroCast's mission and objectives.",
      expertise: [
        "Python", "Java", "Artificial Intelligence", "API Integration", "Web Development", "Software Applications", "Data Management",
      ],
      achievements: [
        "Created a user-friendly LLM application for student learning and educational assistance across school districts", "Finalist in SEFH in Physics & Astronomy Division", "2nd place in local NASA Space Apps state-wide hackathon", "Deployed integrated applications using Streamlit and Render", "Designed a career search application as an online intern for the STEM·E Youth Career Development Program", "Vice President of the Programming & Web Development Club at Carnegie Vanguard High School",
      ],
      location: "Houston, TX",
      joinedYear: "2025",
      email: "sathyangopal4@gmail.com",
      personalNote: "Technology is our foremost weapon in the battle against pollution."
    }
  ];

  const stats = [
    { label: "Data Points Processed Daily", value: "5B+", icon: Layers },
    { label: "Forecast Accuracy", value: "95.4%", icon: Target },
    { label: "Population Covered", value: "7.5B+", icon: Users },
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
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full mr-0 sm:mr-6 mb-4 sm:mb-0 border-4 border-slate-700 object-cover"
                  />
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
      </div>
    </div>
  );
}

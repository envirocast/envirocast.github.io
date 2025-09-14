'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import { Mail, Heart, Layers, Target, Users, Calendar, Star, Briefcase, BrainCircuit, Sparkles, Send, MapPin, Crown } from 'lucide-react';

// Quantum Particles Component
const QuantumParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
      trail: { x: number; y: number; opacity: number }[];
    }

    const particles: Particle[] = [];
    const numParticles = 8;

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.2 + 0.05,
        hue: Math.random() * 60 + 30, // Yellow to orange range
        trail: []
      });
    }

    const animate = () => {
      // More aggressive clear for trail erasure
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Add current position to trail
        particle.trail.push({
          x: particle.x,
          y: particle.y,
          opacity: particle.opacity
        });

        // Limit trail length
        if (particle.trail.length > 20) {
          particle.trail.shift();
        }

        // Update position with quantum tunneling effect
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Quantum tunneling - particles can "tunnel" through boundaries
        if (Math.random() < 0.02) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }

        // Bounce off edges with some randomness
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.vx += (Math.random() - 0.5) * 0.2;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.vy += (Math.random() - 0.5) * 0.2;
        }

        // Draw trail
        particle.trail.forEach((point, index) => {
          const trailOpacity = (index / particle.trail.length) * point.opacity * 0.3;
          const trailSize = particle.size * (index / particle.trail.length) * 0.5;
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${trailOpacity})`;
          ctx.fill();
        });

        // Draw main particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 70%, ${particle.opacity})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 70%, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Quantum glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 90%, 80%, ${particle.opacity * 0.8})`;
        ctx.fill();

        // Random quantum fluctuations
        if (Math.random() < 0.05) {
          particle.vx += (Math.random() - 0.5) * 0.1;
          particle.vy += (Math.random() - 0.5) * 0.1;
          particle.opacity = Math.random() * 0.3 + 0.1;
        }

        // Ensure velocities don't get too high
        particle.vx = Math.max(-1, Math.min(1, particle.vx));
        particle.vy = Math.max(-1, Math.min(1, particle.vy));
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Arnav Nemade",
      role: "Lead Quantum Developer",
      leadRole: "Lead",
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
      personalNote: "If we all do our part, we can make the world a better place.",
      isLeadership: true
    },
    {
      id: 2,
      name: "Kavin Elangovan",
      role: "Web Applications and Graphics Developer",
      leadRole: "Co-Lead",
      image: "/kavin.png",
      bio: "A data-driven student with the goal of using the powers of innovation, creativity, and technology to improve connection and engagement using interactive interfaces. Created the informative and engaging EnviroCast website and Enviro AI. Developed ML models and web applications with interactive interfaces.",
      expertise: [
        "Web Development", "Software Applications", "Graphic Design", "Artificial Intelligence", "Machine Learning", "Image Editing", "API Interfaces",
      ],
      achievements: [
        "Recipient of the United States Navy and Marine Corps' Office of Naval Research Gold Medal", "Developed an AI-powered application for scalable multicancer classification and diagnosis", "Finalist at TXSEF in Biomedical Engineering", "Presenter at SAIL2025, ENDO2025, and ISBI2025 international conferences", "AP and CollegeBoard-certified Computer Science & Mathematics tutor", "UNICEF Youth Training Advocate",
      ],
      location: "Houston, TX",
      joinedYear: "2025",
      email: "ketechwiz@gmail.com",
      personalNote: "Nature is too amazing to lose, so let's protect it however we can.",
      isLeadership: true
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
      personalNote: "Innovation should scale beyond people. It should serve the planet too.",
      isLeadership: false
    },
    {
      id: 4,
      name: "Ahaan Thota",
      role: "Model Systems Developer & Analyst",
      image: "/ahaan.png",
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
      personalNote: "Quote by you",
      isLeadership: false
    },
    {
      id: 5,
      name: "Divin Giddaluru",
      role: "Front-End Web Developer",
      image: "https://placehold.co/400x400/60a5fa/ffffff?text=DG&font=inter",
      bio: "A developer and AI enthusiast passionate about using technology to break down barriers to education and information. Assisted in creating the EnviroCast website, integrating full-stack functionality, interactivity, and data management systems to deliver insightful user experiences.",
      expertise: [
        "Full-Stack Development", "Web Programming", "Data Systems", "Computer Vision", "Digital Learning Tools", "Cloud Integration",
      ],
      achievements: [
        "PCAP™ Certified Associate in Python Programming", "Developed accessible tools for legal, financial, and digital literacy", "Led full-stack development of resource discovery platforms", "Deployed AI apps using Streamlit, SQL, and PyTorch", "Designed cloud-based tools with Azure authentication integration", "Executive SWE of a startup with +300K valuation",
      ],
      location: "Houston, TX",
      joinedYear: "2025",
      email: "divin.giddaluru@gmail.com",
      personalNote: "Technology should be used to help people, especially those who often get overlooked.",
      isLeadership: false
    },
    {
      id: 6,
      name: "Sathyan Gopal",
      role: "Social Media and Promotional Content Manager",
      image: "/sathyan.png",
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
      personalNote: "Technology is our foremost weapon in the battle against pollution.",
      isLeadership: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // Separate leadership members from regular team members
  const leadershipMembers = teamMembers.filter(member => member.isLeadership);
  const regularMembers = teamMembers.filter(member => !member.isLeadership);

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

        {/* All Team Members in One Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leadership Members First */}
          {leadershipMembers.map(member => (
            <motion.div 
              key={member.id} 
              className="relative group h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-amber-400/20 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-lg"></div>
              
              <div className="relative h-full bg-gradient-to-br from-slate-800/90 via-slate-800/60 to-slate-900/90 rounded-2xl border border-slate-700 group-hover:border-yellow-400/50 overflow-hidden transition-all duration-300 hover:shadow-2xl backdrop-blur-sm">
                {/* Enhanced translucent gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/12 via-orange-500/8 to-amber-500/4"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-400/8 via-orange-400/4 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-500/8 via-amber-500/4 to-transparent rounded-tr-full"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent"></div>
                
                {/* Quantum Particles */}
                <QuantumParticles />
                
                <div className="relative p-8 h-full flex flex-col z-10">
                  {/* Leadership badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-yellow-400/15 to-orange-400/15 border border-yellow-400/30 rounded-full">
                      <Crown className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs font-semibold text-yellow-300">LEADER</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-full mr-0 sm:mr-6 mb-4 sm:mb-0 border-4 border-slate-700 group-hover:border-yellow-400/50 object-cover ring-2 ring-yellow-400/20 transition-all duration-300"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-white text-center sm:text-left">{member.name}</h3>
                      {/* Special role styling for leadership */}
                      <p className="text-center sm:text-left">
                        <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-400 bg-clip-text text-transparent font-bold text-lg">
                          {member.leadRole},
                        </span>
                        <span className="text-blue-300 font-medium ml-1">
                          {member.role}
                        </span>
                      </p>
                      <div className="flex items-center justify-center sm:justify-start text-sm text-slate-300 mt-2">
                        <MapPin className="w-4 h-4 mr-1.5" /> {member.location}
                        <Calendar className="w-4 h-4 ml-4 mr-1.5" /> Since {member.joinedYear}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">{member.bio}</p>
                  
                  <div className="space-y-6 flex-grow">
                    <div>
                      <h4 className="font-semibold text-slate-100 mb-3 flex items-center"><BrainCircuit className="w-5 h-5 mr-2 text-yellow-400"/>Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 text-yellow-300 text-xs font-medium rounded-full border border-yellow-600/50">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-100 mb-3 flex items-center"><Sparkles className="w-5 h-5 mr-2 text-blue-300"/>Key Achievements</h4>
                      <ul className="space-y-2">
                        {member.achievements.map((achievement) => (
                          <li key={achievement} className="flex items-start">
                            <Star className="w-3.5 h-3.5 text-blue-300 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-xs text-slate-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border-l-4 border-gradient-to-b from-yellow-500 to-orange-500 pl-4 bg-gradient-to-r from-yellow-500/3 to-orange-500/3 rounded-r-lg py-2">
                      <p className="text-sm text-slate-300 italic font-medium">{member.personalNote}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Regular Team Members */}
          {regularMembers.map(member => (
            <motion.div 
              key={member.id} 
              className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-400/10 hover:shadow-xl h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <div className="p-8 h-full flex flex-col">
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
                    <div className="flex items-center justify-center sm:justify-start text-sm text-slate-300 mt-2">
                      <MapPin className="w-4 h-4 mr-1.5" /> {member.location}
                      <Calendar className="w-4 h-4 ml-4 mr-1.5" /> Since {member.joinedYear}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">{member.bio}</p>
                
                <div className="space-y-6 flex-grow">
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
                          <Star className="w-3.5 h-3.5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-xs text-slate-300">{achievement}</span>
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

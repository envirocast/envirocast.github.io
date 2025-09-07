'use client';

import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, MapPin, Send, Linkedin, Github, Rss, CheckCircle 
} from 'lucide-react';

// Custom Input component for dark theme
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input: React.FC<InputProps> = (props) => (
  <input 
    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
    {...props} 
  />
);

// Custom Textarea component for dark theme
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
const Textarea: React.FC<TextareaProps> = (props) => (
  <textarea 
    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
    {...props}
  />
);

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would handle form submission here.
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
            Connect With Us
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent mb-6 tracking-tight">
            Contact EnviroCast
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Have a question, a partnership proposal, or feedback on our platform? We're here to listen. Let's connect and work towards a clearer future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Contact Form Section */}
          <motion.div 
            className="lg:col-span-7 bg-slate-800/50 border border-slate-700 rounded-2xl p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {formSubmitted ? (
              <motion.div 
                className="flex flex-col items-center justify-center h-full text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <CheckCircle className="w-16 h-16 text-green-400 mb-6"/>
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-slate-400">Your message has been sent successfully. We'll be in touch shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input required placeholder="First Name" name="firstName" />
                  <Input required placeholder="Last Name" name="lastName" />
                </div>
                <Input required type="email" placeholder="Your Email Address" name="email" />
                <Input placeholder="Organization (Optional)" name="organization" />
                <Textarea required placeholder="Your message..." name="message" />
                <button 
                  type="submit" 
                  className="w-full group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg transition"
                >
                  <span className="relative">Send Message</span>
                  <Send className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info Section */}
          <div className="lg:col-span-5 space-y-8">
            
            <motion.div 
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-cyan-300 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-100">General Inquiries</p>
                    <a href="mailto:contact@envirocast.tech" className="text-slate-400 hover:text-cyan-300 transition-colors">contact@envirocast.tech</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-cyan-300 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-100">Partnerships</p>
                    <a href="mailto:partners@envirocast.tech" className="text-slate-400 hover:text-cyan-300 transition-colors">partners@envirocast.tech</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-cyan-300 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-100">Our Lab</p>
                    <p className="text-slate-400">123 Quantum Street<br/>Houston, TX 77002</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Follow Our Mission</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/Divin2009/Envirocast" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-slate-700/50 text-slate-300 rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-slate-700/50 text-slate-300 rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-slate-700/50 text-slate-300 rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300"
                >
                  <Rss className="w-6 h-6" />
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

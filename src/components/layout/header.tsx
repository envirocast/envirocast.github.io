'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom, Globe } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/mods', label: 'Models' },
    { href: '/ai', label: "AI"},
    // { href: '/team', label: 'Team' },
    { href: '/nex', label: 'EnviroNex', icon: Globe, special: true },
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
    exit: { opacity: 0, y: -20 }
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.header
        className="fixed top-0 w-full bg-slate-900 backdrop-blur-md z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto p-6">
          {/* Logo and Brand Name */}
          <a href="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Atom className="w-6 h-6 text-white animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              EnviroCast
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`transition-colors duration-300 relative group flex items-center space-x-2 ${
                    item.special 
                      ? 'text-blue-400 font-bold hover:text-blue-300' 
                      : 'text-slate-300 hover:text-cyan-300'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                    item.special 
                      ? 'bg-gradient-to-r from-blue-400 to-blue-500' 
                      : 'bg-gradient-to-r from-cyan-400 to-purple-400'
                  } group-hover:w-full transition-all duration-300`}></span>
                </a>
              );
            })}
          </nav>

          {/* Mobile menu button with animation */}
          <button
            className="md:hidden p-2 rounded-lg z-50 text-slate-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.div
                className="w-6 h-0.5 bg-current rounded-full"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 2.5 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              ></motion.div>
              <motion.div
                className="w-6 h-0.5 bg-current rounded-full my-1.5"
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              ></motion.div>
              <motion.div
                className="w-6 h-0.5 bg-current rounded-full"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -2.5 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              ></motion.div>
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-slate-900 pt-24 md:hidden z-40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <motion.nav 
              className="flex flex-col items-center space-y-8"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.href} variants={mobileLinkVariants}>
                    <a
                      href={item.href}
                      className={`text-3xl font-semibold transition-colors flex items-center space-x-3 ${
                        item.special 
                          ? 'text-blue-400 font-bold hover:text-blue-300' 
                          : 'text-slate-200 hover:text-cyan-300'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {Icon && <Icon className="w-8 h-8" />}
                      <span>{item.label}</span>
                    </a>
                  </motion.div>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

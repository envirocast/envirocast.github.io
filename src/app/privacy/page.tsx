'use client'
import React from 'react';
import { Shield, Eye, Database, Lock, Users, Globe, Mail, Calendar } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 rounded-full border border-cyan-500/30 mb-8">
            <Shield className="w-5 h-5 mr-3 text-cyan-400" />
            <span className="text-cyan-300 font-medium">Privacy Policy</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Your Privacy
            </span>
            <br />
            <span className="text-white">Our Commitment</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            EnviroCast is committed to protecting your privacy and ensuring transparency in how we collect, 
            use, and protect your information.
          </p>
          
          <div className="text-slate-400">
            <p>Last Updated: January 15, 2025</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Information We Collect */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <Database className="w-6 h-6 text-cyan-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">Personal Information</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Email addresses when you contact us or subscribe to updates</li>
                  <li>• Names and professional information when voluntarily provided</li>
                  <li>• Communication preferences and feedback</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">Usage Information</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Website usage patterns and interaction data</li>
                  <li>• Device information and browser type</li>
                  <li>• IP addresses and geographic location (general area only)</li>
                  <li>• API usage statistics for service improvement</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">Environmental Data</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Public environmental and atmospheric data</li>
                  <li>• Aggregated air quality measurements</li>
                  <li>• Weather pattern information</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-300">Service Provision</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Provide accurate air quality forecasts</li>
                  <li>• Deliver quantum-enhanced environmental predictions</li>
                  <li>• Maintain and improve our platform</li>
                  <li>• Respond to user inquiries and support requests</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-300">Research & Development</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Enhance quantum algorithm accuracy</li>
                  <li>• Develop new environmental models</li>
                  <li>• Contribute to climate science research</li>
                  <li>• Improve user experience and accessibility</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Lock className="w-6 h-6 text-purple-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Data Security & Protection</h2>
            </div>
            
            <div className="space-y-4 text-slate-300">
              <p>
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Encrypted data transmission using HTTPS/TLS protocols</li>
                <li>• Secure cloud infrastructure with regular security audits</li>
                <li>• Access controls limiting data access to authorized personnel only</li>
                <li>• Regular backups and disaster recovery procedures</li>
                <li>• Compliance with data protection regulations</li>
              </ul>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Information Sharing</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-2">We DO Share:</h3>
                <ul className="space-y-1 text-slate-300 text-sm">
                  <li>• Aggregated, anonymized environmental data for research</li>
                  <li>• Public air quality information through our API</li>
                  <li>• Statistical usage data (without personal identifiers)</li>
                </ul>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-300 mb-2">We DO NOT Share:</h3>
                <ul className="space-y-1 text-slate-300 text-sm">
                  <li>• Personal information with third parties for marketing</li>
                  <li>• Individual user data without explicit consent</li>
                  <li>• Private communications or personal preferences</li>
                  <li>• Any data that could identify specific users</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Your Rights</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-white">Access</h4>
                    <p className="text-slate-400 text-sm">Request information about data we have about you</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-white">Correction</h4>
                    <p className="text-slate-400 text-sm">Update or correct any inaccurate information</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-white">Deletion</h4>
                    <p className="text-slate-400 text-sm">Request removal of your personal information</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-white">Opt-out</h4>
                    <p className="text-slate-400 text-sm">Unsubscribe from communications at any time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border border-cyan-500/30">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6 text-cyan-300" />
                <h2 className="text-2xl font-bold text-white">Questions About Privacy?</h2>
              </div>
              
              <p className="text-slate-300 max-w-2xl mx-auto">
                If you have questions about this Privacy Policy or how we handle your information, 
                please don't hesitate to contact us.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="mailto:ketechwiz@gmail.com" 
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-300 inline-flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </a>
                <p className="text-slate-400 text-sm">ketechwiz@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;

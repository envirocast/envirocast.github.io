'use client'
import React from 'react';
import { FileText, Scale, Shield, AlertTriangle, Users, Code, Globe, Mail, Calendar } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 rounded-full border border-purple-500/30 mb-8">
            <Scale className="w-5 h-5 mr-3 text-purple-400" />
            <span className="text-purple-300 font-medium">Terms of Service</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Terms of
            </span>
            <br />
            <span className="text-white">Service</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Please read these Terms of Service carefully before using EnviroCast's platform, 
            API, and related services.
          </p>
          
          <div className="text-slate-400">
            <p>Last Updated: October 5, 2025</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Acceptance of Terms */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
            </div>
            
            <div className="space-y-4 text-slate-300">
              <p>
                By accessing or using EnviroCast's website, API, EnviroNex platform, or any related services, 
                you agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
              <p>
                If you do not agree to these terms, please do not use our services. We reserve the right 
                to modify these terms at any time, and continued use constitutes acceptance of any changes.
              </p>
            </div>
          </div>

          {/* Service Description */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-cyan-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Services</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-300">Platform Services</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Quantum-enhanced air quality forecasting</li>
                  <li>• Environmental data visualization</li>
                  <li>• Interactive 3D globe and mapping tools</li>
                  <li>• Health impact analysis and predictions</li>
                  <li>• Natural disaster environmental tracking</li>
                  <li>• AI-powered environmental assistance</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-300">API Services</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Real-time environmental data access</li>
                  <li>• Predictive forecasting endpoints</li>
                  <li>• Historical environmental data</li>
                  <li>• Health risk assessment APIs</li>
                  <li>• Disaster response data feeds</li>
                  <li>• Integration support and documentation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Acceptable Use */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Acceptable Use Policy</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-300 mb-3">Permitted Uses</h3>
                <ul className="space-y-1 text-slate-300 text-sm">
                  <li>• Research and educational purposes</li>
                  <li>• Environmental monitoring and analysis</li>
                  <li>• Public health and safety applications</li>
                  <li>• Academic and scientific research</li>
                  <li>• Government and non-profit environmental initiatives</li>
                  <li>• Commercial applications that benefit environmental protection</li>
                </ul>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-300 mb-3">Prohibited Uses</h3>
                <ul className="space-y-1 text-slate-300 text-sm">
                  <li>• Any illegal or unauthorized activities</li>
                  <li>• Attempting to reverse engineer our algorithms</li>
                  <li>• Excessive API requests that may impact service availability</li>
                  <li>• Redistribution of our data without proper attribution</li>
                  <li>• Using our services to harm the environment or public health</li>
                  <li>• Interfering with or disrupting our services</li>
                </ul>
              </div>
            </div>
          </div>

          {/* API Terms */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center">
                <Code className="w-6 h-6 text-orange-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">API Usage Terms</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Rate Limits & Access</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Free tier: Up to 1,000 requests per day</li>
                  <li>• Research tier: Up to 10,000 requests per day (by application)</li>
                  <li>• Commercial tier: Custom limits based on agreement</li>
                  <li>• Rate limits reset daily at midnight UTC</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">API Key Management</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Keep your API keys secure and confidential</li>
                  <li>• Do not share API keys in public repositories</li>
                  <li>• Report any suspected key compromise immediately</li>
                  <li>• We may revoke keys for policy violations</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-orange-300">Data Attribution</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li>• Credit "EnviroCast" when using our data in publications</li>
                  <li>• Include a link to our platform when possible</li>
                  <li>• Acknowledge quantum-enhanced processing where applicable</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimers & Limitations */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Disclaimers & Limitations</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-300 mb-3">Service Availability</h3>
                <p className="text-slate-300 text-sm">
                  While we strive for 99.9% uptime, environmental forecasting services are provided "as-is" 
                  without warranties. We cannot guarantee uninterrupted service availability.
                </p>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-300 mb-3">Prediction Accuracy</h3>
                <p className="text-slate-300 text-sm">
                  Our quantum-enhanced models provide highly accurate predictions, but environmental 
                  forecasting inherently involves uncertainty. Use predictions as guidance, not absolute certainty.
                </p>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-300 mb-3">Health Information</h3>
                <p className="text-slate-300 text-sm">
                  Health impact analyses are for informational purposes only and do not constitute medical advice. 
                  Consult healthcare professionals for personal health decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Intellectual Property</h2>
            </div>
            
            <div className="space-y-4 text-slate-300">
              <p>
                EnviroCast retains all rights to our proprietary quantum algorithms, software, models, 
                and platform design. Users are granted a limited, non-exclusive license to use our services.
              </p>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-300">Open Data Commitment</h3>
                <p>
                  While our algorithms are proprietary, we believe in open access to environmental data. 
                  Data provided through our API is available for research and public benefit purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Compliance */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border border-cyan-500/30">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6 text-cyan-300" />
                <h2 className="text-2xl font-bold text-white">Questions or Concerns?</h2>
              </div>
              
              <p className="text-slate-300 max-w-2xl mx-auto">
                If you have questions about these Terms of Service, need to report a violation, 
                or require clarification on our policies, please contact us.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <h3 className="font-semibold text-cyan-300 mb-2">General Inquiries</h3>
                  <a 
                    href="mailto:envirocast.tech@gmail.com" 
                    className="text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    envirocast.tech@gmail.com
                  </a>
                </div>
                
                <div className="text-center">
                  <h3 className="font-semibold text-purple-300 mb-2">API Support</h3>
                  <a 
                    href="https://quantum-sky-probe.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-purple-300 transition-colors"
                  >
                    API Documentation
                  </a>
                </div>
              </div>
              
              <div className="pt-4">
                <a 
                  href="mailto:envirocast.tech@gmail.com" 
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-300 inline-flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;

import Link from 'next/link';
import { Instagram, Github, Mail, Zap, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">EnviroCast</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Revolutionizing air quality forecasting through hybrid quantum-classical algorithms. 
              Accurate predictions for a cleaner future.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/envirocast_tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://github.com/envirocast" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="mailto:envirocast.tech@gmail.com"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/mods" className="hover:text-white transition-colors">Models</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">&nbsp;</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/ai" className="hover:text-white transition-colors">AI Chatbot</Link></li>
              {/* <li><Link href="/team" className="hover:text-white transition-colors">Team</Link></li> */}
              <li>
                <Link 
                  href="/nex" 
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border border-green-500/30 hover:border-green-400/50 transition-all font-bold text-green-400 hover:text-green-300 shadow-md shadow-green-500/20 hover:shadow-green-500/40"
                >
                  <Globe className="w-4 h-4 mr-2 animate-pulse" />
                  EnviroNex
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="https://github.com/envirocast" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://instagram.com/envirocast_tech" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 EnviroCast. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

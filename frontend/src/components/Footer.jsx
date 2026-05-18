import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Globe, 
  ShieldCheck 
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    setEmail("");
  };

  return (
    <footer className="bg-[#070B14] border-t border-white/5 text-gray-400 pt-16 pb-8 mt-auto relative overflow-hidden">
      {/* Subtle Background Glow Accent */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-600/5 rounded-full filter blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Branding, Links, and Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Column 1: Branding & Intro */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="w-fit">
              <h1 className="text-2xl font-bold text-white flex items-center gap-1 hover:opacity-90 transition-opacity">
                Job<span className="text-[#6366f1]">Hunt</span>
                <span className="text-sm text-cyan-400 ml-1">
                  <FontAwesomeIcon icon={faSuitcase} />
                </span>
              </h1>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              The next-generation, AI-driven job searching ecosystem engineered to seamlessly match elite talent directly with global enterprise tech offers.
            </p>
            {/* Live Infrastructure System Status Dot */}
            <div className="flex items-center gap-2 mt-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-400 tracking-wide">
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Column 2: For Candidates */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">For Talents</h4>
            <Link to="/jobs" className="text-sm hover:text-white transition-colors w-fit">Explore Jobs</Link>
            <Link to="/browse" className="text-sm hover:text-white transition-colors w-fit">Browse Categories</Link>
            <Link to="/profile" className="text-sm hover:text-white transition-colors w-fit">Candidate Dashboard</Link>
            <a href="#" className="text-sm hover:text-white transition-colors w-fit">Resume Builder <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-bold px-1.5 py-0.5 rounded ml-1 uppercase">New</span></a>
          </div>

          {/* Column 3: For Recruiters */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">For Employers</h4>
            <Link to="/admin/companies" className="text-sm hover:text-white transition-colors w-fit">Post a Vacancy</Link>
            <Link to="/admin/jobs" className="text-sm hover:text-white transition-colors w-fit">Talent Sourcing</Link>
            <a href="#" className="text-sm hover:text-white transition-colors w-fit">Enterprise Solutions</a>
            <a href="#" className="text-sm hover:text-white transition-colors w-fit">Hiring API</a>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Stay Updated</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Get weekly curated digests of newly posted premium remote tech positions.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center bg-white/5 border border-white/10 p-1 rounded-xl focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20 transition-all duration-300 mt-1">
              <input 
                type="email" 
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent text-xs text-white placeholder-gray-500 outline-none px-3 py-2 w-full"
              />
              <button 
                type="submit" 
                className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-300"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Section: Copyright, Socials, and Disclaimers */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">
          
          {/* Left: Author credits and Legal info */}
          <div className="text-center md:text-left">
            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} JobHunt Corp. All rights reserved.</p>
            <p className="text-xs mt-1.5 text-gray-500 flex items-center justify-center md:justify-start gap-1">
              Crafted with <span className="text-red-500 text-[10px]"><FontAwesomeIcon icon={faHeart} /></span> by Siddharth
            </p>
          </div>

          {/* Center: Extra Micro Legal Links */}
          <div className="flex items-center gap-5 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <span className="text-white/5">•</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <span className="text-white/5">•</span>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Settings</a>
          </div>
          
          {/* Right: Modern Vector Social Badges */}
          <div className="flex items-center gap-3">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white hover:bg-white/5 p-2 rounded-xl border border-white/5 transition-all duration-300" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white hover:bg-white/5 p-2 rounded-xl border border-white/5 transition-all duration-300" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white hover:bg-white/5 p-2 rounded-xl border border-white/5 transition-all duration-300" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white hover:bg-white/5 p-2 rounded-xl border border-white/5 transition-all duration-300" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
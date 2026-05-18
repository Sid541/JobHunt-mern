import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  Zap, 
  Cpu, 
  UserPlus, 
  FileText, 
  CheckCircle2, 
  Building2,
  ExternalLink
} from "lucide-react";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  // Dataset mapping top brands to their official corporate web domains
  const partnerCompanies = [
    { name: "Google", url: "https://careers.google.com" },
    { name: "Microsoft", url: "https://careers.microsoft.com" },
    { name: "Meta", url: "https://about.meta.com/careers" },
    { name: "Amazon", url: "https://www.amazon.jobs" },
    { name: "Netflix", url: "https://jobs.netflix.com" },
    { name: "Stripe", url: "https://stripe.com/jobs" },
    { name: "Airbnb", url: "https://careers.airbnb.com" },
    { name: "Uber", url: "https://www.uber.com/careers" },
    { name: "OpenAI", url: "https://openai.com/careers" },
    { name: "Coinbase", url: "https://www.coinbase.com/careers" }
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0F1C] text-gray-200 overflow-x-hidden flex flex-col justify-between">
      
      {/* Animated Ambient Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] opacity-15 animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-15 animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite_1.5s]"></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-5 animate-[pulse_8s_cubic-bezier(0.4,0,0.6,1)_infinite_3s]"></div>
      </div>

      {/* Subtle Tech Cyber Grid Overlay */}
      <div 
        className="fixed inset-0 opacity-[0.12] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='white' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Main Container Core */}
      <div 
        className="relative z-10 flex flex-col min-h-screen"
        style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero Header Area */}
          <HeroSection />

          {/* Platform Real-time Metrics Roll */}
          <div className="max-w-6xl mx-auto px-6 mb-20 -mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-md shadow-xl text-center">
              <div className="p-2">
                <div className="text-2xl md:text-3xl font-extrabold text-white flex items-center justify-center gap-1">
                  14k<span className="text-indigo-400">+</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 uppercase font-medium tracking-wider">Live Openings</p>
              </div>
              <div className="p-2 border-l border-white/5">
                <div className="text-2xl md:text-3xl font-extrabold text-white flex items-center justify-center gap-1">
                  450<span className="text-cyan-400">+</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 uppercase font-medium tracking-wider">Verified Companies</p>
              </div>
              <div className="p-2 border-l border-white/5">
                <div className="text-2xl md:text-3xl font-extrabold text-white flex items-center justify-center gap-1">
                  89k<span className="text-purple-400">+</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 uppercase font-medium tracking-wider">Active Talents</p>
              </div>
              <div className="p-2 border-l border-white/5">
                <div className="text-2xl md:text-3xl font-extrabold text-white flex items-center justify-center gap-1">
                  $4.2M<span className="text-emerald-400"></span>
                </div>
                <p className="text-xs text-gray-400 mt-1 uppercase font-medium tracking-wider">Payouts Facilitated</p>
              </div>
            </div>
          </div>

          {/* Category Carousel Area */}
          <CategoryCarousel />

          {/* Premium Enterprise Infinite Marquee Segment (With Website Hyperlinks) */}
          <div className="w-full bg-[#0E1424]/40 border-y border-white/5 py-10 overflow-hidden my-16">
            <p className="text-center text-xs uppercase font-bold tracking-widest text-gray-500 mb-6">
              Top Global Brands Hiring Directly From Our Pool
            </p>
            <div className="relative flex max-w-7xl mx-auto items-center">
              {/* Fade masks for visual seamlessness */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0F1C] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0F1C] to-transparent z-10 pointer-events-none" />
              
              <div className="flex space-x-12 animate-marquee-scroll whitespace-nowrap">
                {/* Duplicated array content prevents layout jumping mid-infinite animation */}
                {[...partnerCompanies, ...partnerCompanies].map((company, index) => (
                  <a 
                    key={index} 
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-gray-400 font-semibold text-lg tracking-wide hover:text-white transition-all duration-300 bg-white/5 px-6 py-2.5 rounded-xl border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 shadow-md"
                  >
                    <Building2 className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                    <span>{company.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feed Listing */}
          <LatestJobs />

          {/* Interactive Strategic Value Cards (Why Choose Us) */}
          <div className="max-w-7xl mx-auto px-6 my-24">
            <div className="text-center mb-12">
              <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2">Platform Perks</h2>
              <h3 className="text-3xl font-extrabold text-white">Streamlined Job Hunting, Upgraded</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-gradient-to-b from-[#131930] to-[#0F1424] p-8 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all duration-300 shadow-xl hover:shadow-indigo-500/5">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">AI-Powered Profiling</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Our clever neural pipeline maps metrics accurately, ensuring alignment with relevant technical stacks effortlessly.</p>
              </div>

              <div className="group bg-gradient-to-b from-[#131930] to-[#0F1424] p-8 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 shadow-xl hover:shadow-cyan-500/5">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Instant Smart Alerts</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Skip the endless manual searching. Receive clean desktop push alerts the exact millisecond matching applications open.</p>
              </div>

              <div className="group bg-gradient-to-b from-[#131930] to-[#0F1424] p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all duration-300 shadow-xl hover:shadow-purple-500/5">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">100% Vetted Positions</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Zero ghost jobs or hidden agencies. Talk face-to-face directly with legitimate corporate technical hiring executives.</p>
              </div>
            </div>
          </div>

          {/* Fluid Interactive Roadmap Timeline Step-Guide */}
          <div className="max-w-6xl mx-auto px-6 my-28 py-12 rounded-3xl bg-gradient-to-r from-[#11162b] to-[#0d1222] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="text-center mb-14">
              <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">Onboarding Flow</h2>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">Your Path To Landing The Dream Offer</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-indigo-500/20 via-cyan-500/20 to-transparent z-0" />

              <div className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-14 h-14 rounded-full bg-[#18203c] border-2 border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-lg shadow-lg group-hover:border-indigo-400 transition-all duration-300">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mt-4 mb-1">1. Setup Account</h4>
                <p className="text-xs text-gray-400 max-w-xs">Create your student profile and detail your targeted industry specializations.</p>
              </div>

              <div className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-14 h-14 rounded-full bg-[#18203c] border-2 border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-lg shadow-lg group-hover:border-cyan-400 transition-all duration-300">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mt-4 mb-1">2. Match & Apply</h4>
                <p className="text-xs text-gray-400 max-w-xs">Filter through thousands of active verified job vacancies based on skills.</p>
              </div>

              <div className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-14 h-14 rounded-full bg-[#18203c] border-2 border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-lg shadow-lg group-hover:border-emerald-400 transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mt-4 mb-1">3. Secure Placement</h4>
                <p className="text-xs text-gray-400 max-w-xs">Interview directly and close premium job offers with clear contracts.</p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Modern High-End Inline CSS Animations Block */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(24px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-scroll {
            display: flex;
            width: max-content;
            animation: marquee 25s linear infinite;
          }
          .animate-marquee-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Mic, Scan, ShieldCheck, Zap, Smartphone, MapPin, Compass, Bot, CheckCircle2, Upload, Search, Bell, FileSearch, Send } from 'lucide-react';

// Import all assets
import voiceImg from '../assets/feature_voice.png';
import scanImg from '../assets/feature_scan.png';
import benefitsImg from '../assets/feature_benefits.png';
import advocateImg from '../assets/advocate_banner.png';
import farmerImg from '../assets/farmer.jpg';
import studentsImg from '../assets/students.png';
import youthImg from '../assets/youth.jpg';
import oldImg from '../assets/old.jpg';


const MarqueeColumn = ({ items, reverse = false, duration = 40, isHovered }) => {
  const duplicatedItems = [...items, ...items, ...items]; // Triple for smooth loop

  return (
    <div className="flex flex-col gap-5 w-full">
      <motion.div
        className="flex flex-col gap-5"
        animate={{
          y: reverse ? ["-66.66%", "0%"] : ["0%", "-66.66%"],
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duration,
            ease: "linear",
          },
        }}
        style={{
          animationPlayState: isHovered ? 'paused' : 'running'
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="w-full bg-white rounded-3xl p-4 shadow-lg border border-black/[0.03] group hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className={`w-7 h-7 ${item.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
              <span className="text-indian-navy">{item.icon}</span>
            </div>
            <h4 className="text-xs font-bold text-indian-navy mb-1 leading-tight">{item.title}</h4>
            <p className="text-[9px] text-slate-500 mb-2 line-clamp-2">{item.desc}</p>
            <div className="rounded-xl overflow-hidden bg-slate-50 h-28 relative">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  const column1 = [
    { title: "Voice AI Integration", desc: "Talk in your mother tongue. Supports 22+ Indian languages.", icon: <Mic size={16} />, image: voiceImg, color: "bg-orange-50" },
    { title: "Smart Document Scan", desc: "Scan Aadhaar or Ration Card. AI extracts data instantly.", icon: <Scan size={16} />, image: scanImg, color: "bg-blue-50" },
    { title: "Instant Eligibility", desc: "Real-time matching against 3000+ government schemes.", icon: <CheckCircle2 size={16} />, image: benefitsImg, color: "bg-green-50" },
    { title: "24/7 AI Tracking", desc: "WhatsApp alerts for new schemes & application status.", icon: <Bell size={16} />, image: oldImg, color: "bg-yellow-50" },
  ];

  const column2 = [
    { title: "Farmer Benefits", desc: "Special schemes for agricultural growth and insurance.", icon: <Zap size={16} />, image: farmerImg, color: "bg-emerald-50" },
    { title: "Student Scholarships", desc: "Education grants and study-abroad opportunities simplified.", icon: <Smartphone size={16} />, image: studentsImg, color: "bg-purple-50" },
    { title: "Auto Form Filling", desc: "No more complex paperwork. AI handles applications for you.", icon: <Send size={16} />, image: advocateImg, color: "bg-indigo-50" },
    { title: "Hyper-local Search", desc: "Find benefits specific to your Taluk or Gram Panchayat.", icon: <MapPin size={16} />, image: youthImg, color: "bg-rose-50" },
  ];

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen pt-40 pb-20 overflow-hidden bg-indian-offwhite flex items-center">
      {/* Background Floating Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-indian-saffron_soft rounded-full blur-[120px] animate-float opacity-30"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-indian-indigo_soft rounded-full blur-[150px] animate-float-delayed opacity-20"></div>
        <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-indian-green_soft rounded-full blur-[100px] animate-float-slow opacity-15"></div>
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
        {/* Left Side: Content */}
        <div className="max-w-xl z-20 ml-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-5 py-1 rounded-full bg-white shadow-sm border border-black/5 text-indian-navy text-[10px] font-bold mb-6 tracking-widest uppercase"
          >
            <Sparkles className="w-3 h-3 text-indian-saffron" />
            Digital India’s Smarter Assistant
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-7xl font-bold leading-[1.05] text-indian-navy mb-6 tracking-tight"
          >
            Unlock Every <span className="text-indian-saffron">Benefit</span> You Deserve.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 mb-10 leading-relaxed font-medium max-w-lg"
          >
            Akashvaani AI helps you discover and apply for 3,000+ government schemes using just your voice. Fast, simple, and 100% secure.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button className="btn-primary !py-4 !px-8 text-base shadow-xl shadow-indian-saffron/20 group">
              Get Started Now
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-indian-navy hover:bg-white hover:shadow-lg transition-all border border-black/5">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              How it works
            </button>
          </motion.div>
        </div>

        {/* Right Side: 3D Tilted Grid */}
        <div 
          className="relative h-[550px] w-full mt-10 lg:mt-0 flex items-center justify-center lg:justify-end overflow-hidden rounded-[3rem] border border-black/[0.03] bg-white/5 backdrop-blur-[2px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Masking for the 3D effect edges */}
          <div className="absolute inset-x-0 inset-y-0 z-20 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-indian-offwhite via-indian-offwhite/5 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-indian-offwhite via-indian-offwhite/5 to-transparent"></div>
          </div>

          <div 
            className="h-full w-full"
            style={{
              perspective: '2000px',
            }}
          >
            <div 
              className="flex gap-4 lg:gap-6 justify-center lg:justify-end transition-transform duration-1000 ease-out py-10 px-6"
              style={{
                transform: `rotateX(5deg) rotateY(-2deg) rotateZ(2deg) scale(1.0)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="w-1/2 min-w-[180px] lg:min-w-[220px]">
                <MarqueeColumn items={column1} reverse duration={45} isHovered={isHovered} />
              </div>
              <div className="w-1/2 min-w-[180px] lg:min-w-[220px]">
                <MarqueeColumn items={column2} duration={55} isHovered={isHovered} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

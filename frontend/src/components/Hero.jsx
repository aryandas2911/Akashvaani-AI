import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Mic, Scan, ShieldCheck, Zap, Smartphone, MapPin, Compass, Bot, CheckCircle2 } from 'lucide-react';
import voiceImg from '../assets/feature_voice.png';
import scanImg from '../assets/feature_scan.png';
import benefitsImg from '../assets/feature_benefits.png';

const Hero = () => {
  const carouselItems = [
    { 
      main: "“Just speak. No typing needed.”", 
      sub: "AI understands your language, even local dialects",
      icon: <Mic className="w-5 h-5" />,
      image: voiceImg,
      color: "bg-orange-50"
    },
    { 
      main: "“Scan once. Done forever.”", 
      sub: "Upload Aadhaar, marksheets, income proof once",
      icon: <Scan className="w-5 h-5" />,
      image: scanImg,
      color: "bg-blue-50"
    },
    { 
      main: "“Know your eligibility instantly”", 
      sub: "No more guessing or asking around",
      icon: <CheckCircle2 className="w-5 h-5" />,
      image: benefitsImg,
      color: "bg-green-50"
    },
    { 
      main: "“Find schemes made for you”", 
      sub: "500+ government benefits matched to your profile",
      icon: <Sparkles className="w-5 h-5" />,
      image: voiceImg,
      color: "bg-purple-50"
    },
    { 
      main: "“Forms? Already filled.”", 
      sub: "AI auto-fills applications in seconds",
      icon: <Zap className="w-5 h-5" />,
      image: scanImg,
      color: "bg-yellow-50"
    },
    { 
      main: "“No more cyber café visits”", 
      sub: "Apply from your phone, anytime",
      icon: <Smartphone className="w-5 h-5" />,
      image: benefitsImg,
      color: "bg-red-50"
    },
    { 
      main: "“Track everything automatically”", 
      sub: "Status updates without chasing offices",
      icon: <ShieldCheck className="w-5 h-5" />,
      image: voiceImg,
      color: "bg-indigo-50"
    },
    { 
      main: "“Built for every Indian”", 
      sub: "Works in multiple languages, simple to use",
      icon: <Bot className="w-5 h-5" />,
      image: scanImg,
      color: "bg-teal-50"
    },
    { 
      main: "“Hyper-local recommendations”", 
      sub: "Schemes specific to your state, district, even village",
      icon: <MapPin className="w-5 h-5" />,
      image: benefitsImg,
      color: "bg-pink-50"
    },
    { 
      main: "“Your personal govt assistant”", 
      sub: "Guiding you step-by-step",
      icon: <Compass className="w-5 h-5" />,
      image: voiceImg,
      color: "bg-cyan-50"
    }
  ];

  // Double items for infinite loop
  const allItems = [...carouselItems, ...carouselItems];

  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative min-h-screen pt-40 pb-20 overflow-hidden bg-indian-offwhite">
      {/* Background Floating Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-indian-saffron_soft rounded-full blur-[120px] animate-float opacity-40"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-indian-indigo_soft rounded-full blur-[150px] animate-float-delayed opacity-30"></div>
        <div className="absolute top-[30%] right-[15%] w-[350px] h-[350px] bg-indian-green_soft rounded-full blur-[100px] animate-float-slow opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left Side: Content */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-black/5 text-indian-navy text-[10px] font-bold mb-8 tracking-[0.2em] uppercase"
          >
            <Sparkles className="w-3 h-3 text-indian-saffron" />
            Empowering Every Citizen
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-7xl font-bold leading-[1.1] text-indian-navy mb-8 tracking-tight"
          >
            Unlock Government <span className="text-indian-saffron">Benefits</span> — Without the Confusion
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 mb-12 leading-relaxed font-normal"
          >
            Speak, scan, and discover schemes tailored for you. <br className="hidden md:block" /> No forms. No stress.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-5"
          >
            <button className="btn-primary !py-4 !px-10 text-lg shadow-xl shadow-indian-saffron/20">
              Check My Eligibility
            </button>
            <button className="flex items-center gap-4 px-10 py-4 rounded-full font-bold text-indian-navy hover:bg-white hover:shadow-xl transition-all border border-black/5">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              See How It Works
            </button>
          </motion.div>
        </div>

        {/* Right Side: Horizontal Carousel Integrated */}
        <div 
          className="relative h-[600px] w-full overflow-hidden group select-none py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Mask for fading edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-indian-offwhite to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-indian-offwhite to-transparent z-10 pointer-events-none"></div>

          <motion.div
            className="flex gap-6 h-full items-center"
            drag="x"
            dragConstraints={{ left: -5000, right: 0 }}
            animate={{
              x: isHovered ? undefined : [0, -3500]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear"
              }
            }}
          >
            {allItems.map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[380px] bg-white rounded-[2.5rem] shadow-xl border border-black/5 transition-all duration-500 group overflow-hidden"
              >
                <div className="p-6 pb-2">
                  <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-indian-navy">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-indian-navy mb-1 leading-tight">
                    {item.main}
                  </h3>
                </div>
                
                <div className="px-6 pb-6">
                  <p className="text-xs text-slate-500 font-medium mb-4">
                    {item.sub}
                  </p>
                  <div className="rounded-[1.5rem] overflow-hidden bg-slate-100 h-[180px] relative">
                    <img 
                      src={item.image} 
                      alt={item.main} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

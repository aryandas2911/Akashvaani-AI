import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Fingerprint } from 'lucide-react';
import bannerImg from '../assets/advocate_banner.png';

const AdvocateSection = () => {
  return (
    <section className="section-padding">
      <div className="bg-indian-navy rounded-[3rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center text-white">
        <div className="p-10 md:p-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-8"
          >
            Your Personal <span className="text-indian-saffron">Advocate</span> In the Digital Era
          </motion.h2>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed">
            Akashvaani AI uses Law from a citizen's perspective, to ensure no citizen of India is left behind because of a language barrier or complex paperwork. We are building the world's most inclusive AI layer for governance.
          </p>
          
          <ul className="space-y-6">
            {[
              { icon: <Shield className="w-5 h-5 text-indian-green" />, text: "Primary-first architecture: Your data is encrypted" },
              { icon: <Sparkles className="w-5 h-5 text-indian-saffron" />, text: "Inclusive by design: 22+ languages" },
              { icon: <Fingerprint className="w-5 h-5 text-blue-400" />, text: "Citizen-centric approach: No forms" },
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 text-sm font-medium"
              >
                <div className="p-2 rounded-lg bg-white/5">{item.icon}</div>
                {item.text}
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className="h-full min-h-[400px] relative">
          <img src={bannerImg} alt="Advocacy Banner" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-indian-navy via-transparent to-transparent lg:block hidden"></div>
        </div>
      </div>
    </section>
  );
};

export default AdvocateSection;

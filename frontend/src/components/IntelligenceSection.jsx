import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, TrendingUp, AlertCircle } from 'lucide-react';

const IntelligenceSection = () => {
  return (
    <section className="section-padding overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Visuals */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Main Card 1: Score */}
          <div className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-sm mb-6 relative z-20">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Eligibility Score</span>
              <span className="text-indian-green text-xs font-bold px-2 py-1 bg-green-50 rounded-full">High</span>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-bold text-indian-navy">92</span>
              <span className="text-slate-400">/ 100</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "92%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="bg-indian-green h-full"
              />
            </div>
          </div>

          {/* Main Card 2: Value */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 30 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-sm ml-auto -mt-12 relative z-30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-indian-saffron" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Benefit Value</span>
            </div>
            <div className="text-3xl font-bold text-indian-navy mb-1">₹ 42,500</div>
            <p className="text-[10px] text-slate-400">Estimated monthly digital payment available</p>
          </motion.div>

          {/* Main Card 3: Status */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 max-w-xs mt-6 px-8 relative z-10"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold text-slate-400">DOCUMENT READINESS</span>
              <span className="text-[10px] font-bold text-indian-green uppercase">Verified</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-indian-green" />
                <span className="text-xs font-medium text-indian-navy">Aadhaar Linked</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-indian-green" />
                <span className="text-xs font-medium text-indian-navy">Income Certificate Active</span>
              </div>
            </div>
          </motion.div>
          
          {/* Decorative blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-indian-navy mb-6">
            3-Layer Intelligence for <span className="text-blue-600">Complete Security</span>
          </h2>
          <p className="text-premium mb-8">
            We don't just list schemes. We calculate your exact fit, quantify the financial benefit, and verify your paperwork before you even apply.
          </p>
          
          <div className="p-6 bg-orange-50/50 border-l-4 border-indian-saffron rounded-r-2xl italic text-indian-navy mb-8">
            "All these together = complete citizen security."
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="user" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-indian-navy">Trusted by 2M+ citizens</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <TrendingUp key={s} className="w-3 h-3 text-indian-saffron fill-indian-saffron" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntelligenceSection;

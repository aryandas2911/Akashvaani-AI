import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Search, CheckCircle2 } from 'lucide-react';

const ProcessSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Upload or Scan",
      desc: "Take a photo of your ID documents. Our AI extracts everything securely.",
      icon: <Upload className="w-10 h-10 text-white" />,
      color: "bg-orange-600",
    },
    {
      number: 2,
      title: "Get Matches",
      desc: "See a personalized list of schemes you are 100% eligible for right now.",
      icon: <Search className="w-10 h-10 text-white" />,
      color: "bg-orange-600",
    },
    {
      number: 3,
      title: "Apply Instantly",
      desc: "The voice and text-based AI handles the application submission.",
      icon: <CheckCircle2 className="w-10 h-10 text-white" />,
      color: "bg-orange-600",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-indian-navy mb-4"
        >
          Simple. Fast. <span className="italic">Seamless.</span>
        </motion.h2>
        <p className="text-slate-500">Your journey to benefits in three steps.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Connector Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -z-10 -translate-y-8"></div>
        
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="text-center"
          >
            <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl relative`}>
              {step.icon}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-indian-navy rounded-full flex items-center justify-center font-bold shadow-md border border-slate-100">
                {step.number}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-indian-navy mb-4">{step.title}</h3>
            <p className="text-slate-500 max-w-[200px] mx-auto text-sm leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSteps;

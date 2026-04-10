import React from 'react';
import { motion } from 'framer-motion';
import { Mic, FileSearch, Zap, Send, MapPin, Bell } from 'lucide-react';

const FeaturesGrid = () => {
  const features = [
    {
      title: "Multilingual Voice AI",
      desc: "Talk to our AI in your mother tongue. Supports 22+ Indian languages natively.",
      icon: <Mic className="w-6 h-6 text-orange-500" />,
      color: "bg-orange-50",
    },
    {
      title: "Smart Document Agent",
      desc: "Scan Aadhaar, Ration Card, or certificates. AI extracts data with 99% accuracy.",
      icon: <FileSearch className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      title: "Instant Eligibility",
      desc: "Real-time matching against 3000+ Central and State government schemes.",
      icon: <Zap className="w-6 h-6 text-green-500" />,
      color: "bg-green-50",
    },
    {
      title: "Auto Form Filling",
      desc: "Say goodbye to complex paperwork. AI handles technical applications for you.",
      icon: <Send className="w-6 h-6 text-purple-500" />,
      color: "bg-purple-50",
    },
    {
      title: "Hyper-local Search",
      desc: "Find benefits specific to your Taluk, Gram Panchayat, or District instantly.",
      icon: <MapPin className="w-6 h-6 text-red-500" />,
      color: "bg-red-50",
    },
    {
      title: "24/7 AI Tracking",
      desc: "Get WhatsApp alerts for new schemes and live application status updates.",
      icon: <Bell className="w-6 h-6 text-yellow-500" />,
      color: "bg-yellow-50",
    },
  ];

  return (
    <section id="about" className="section-padding bg-slate-50/50">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-indian-navy mb-4"
        >
          Designed for <span className="text-indian-saffron italic">Every</span> Indian
        </motion.h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Six core technologies working together to ensure you never miss a benefit you're entitled to.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
          >
            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-indian-navy mb-3">{feature.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;

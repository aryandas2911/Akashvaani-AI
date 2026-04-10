import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      text: "I didn't know my father was eligible for the Old-Age Pension. Akashvaani told us in 2 minutes and helped us apply from home.",
      author: "Ramesh Sharma",
      location: "Bikaner, Rajasthan",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh",
    },
    {
      text: "As a student, finding scholarship used to be a nightmare. The AI matched me with three state grants I'd never heard of!",
      author: "Priya Maurya",
      location: "Lucknow, Uttar Pradesh",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      text: "The voice feature in Hindi is excellent. I don't have to type anything. It's like talking to a helpful government office at home.",
      author: "Sunil Soni",
      location: "Gopalpur, Madhya Pradesh",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sunil",
    },
  ];

  return (
    <section className="section-padding bg-slate-50/30">
      <div className="flex justify-between items-end mb-16">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-indian-navy mb-4"
          >
            Real Impact, <span className="text-indian-green">Real Lives</span>
          </motion.h2>
          <p className="text-slate-500">Hear from citizens whose lives changed through timely benefit discovery.</p>
        </div>
        <div className="flex gap-4 hidden md:flex">
          <button className="p-4 rounded-full border border-slate-200 hover:bg-white hover:shadow-md transition-all">
            <ChevronLeft className="w-6 h-6 text-slate-400" />
          </button>
          <button className="p-4 rounded-full border border-slate-200 hover:bg-white hover:shadow-md transition-all">
            <ChevronRight className="w-6 h-6 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group"
          >
            <Quote className="w-10 h-10 text-slate-100 group-hover:text-indian-saffron/20 transition-colors mb-6" />
            <p className="text-indian-navy text-lg leading-relaxed mb-8 italic">
              "{item.text}"
            </p>
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.author} className="w-12 h-12 rounded-full bg-slate-100" />
              <div>
                <h4 className="font-bold text-indian-navy">{item.author}</h4>
                <p className="text-xs text-slate-400">{item.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-slate-50/50">
      <div className="max-w-4xl mx-auto glass-card rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indian-saffron/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indian-green/5 rounded-full blur-3xl -z-10"></div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-indian-navy mb-4">
            Need help getting started?
          </h2>
          <p className="text-slate-500">Drop us a message and our team will guide you through the setup.</p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 ml-4 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                placeholder="Akash Singh"
                className="w-full bg-white border border-slate-100 px-6 py-4 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indian-saffron/20 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 ml-4 uppercase tracking-wider">Phone Number</label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                className="w-full bg-white border border-slate-100 px-6 py-4 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indian-saffron/20 transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 ml-4 uppercase tracking-wider">Message</label>
            <textarea
              rows="4"
              placeholder="How can we help you today?"
              className="w-full bg-white border border-slate-100 px-6 py-4 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indian-saffron/20 transition-all resize-none"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-primary text-xl py-5 shadow-2xl shadow-indian-saffron/30"
          >
            Send Message
          </motion.button>
          
          <p className="text-[10px] text-center text-slate-400 mt-4">
            We usually respond within less than 24 business hours.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;

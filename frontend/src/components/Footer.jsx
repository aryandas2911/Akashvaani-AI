import React from 'react';
import logo from '../assets/logo.png';
import { Globe, MessageSquare, Code, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const links = {
    Company: ['About', 'Careers', 'Contact', 'Support Report'],
    Resources: ['Privacy Policy', 'Terms', 'FAQ'],
    Language: ['English', 'Hindi', 'Marathi', 'Tamil'],
  };

  return (
    <footer className="bg-white pt-20 pb-10 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Akashvaani AI" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Empowering every Indian with the power of AI to bridge the gap between policy and prosperity.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageSquare, Code].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-slate-50 hover:bg-indian-saffron/10 hover:text-indian-saffron transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="space-y-6">
              <h4 className="font-bold text-indian-navy">{title}</h4>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-500 hover:text-indian-saffron flex items-center gap-1 group">
                      {item}
                      {title === 'Language' && <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-[10px] text-slate-400 font-medium">
            © 2026 Akashvaani AI Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-2 grayscale opacity-50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Built for India</span>
            <span className="flex gap-1 h-3 w-5">
              <span className="flex-1 bg-orange-500"></span>
              <span className="flex-1 bg-white border border-slate-100"></span>
              <span className="flex-1 bg-green-600"></span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = ({ onLoginClick, onGetStartedClick, onDemoLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState('English');
  const [showLang, setShowLang] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Schemes', href: '/schemes' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className={`mx-auto max-w-7xl px-6 flex items-center justify-between transition-all duration-500 ${
        isScrolled ? 'glass-card rounded-full py-2 shadow-2xl border-white/40 backdrop-blur-xl' : ''
      }`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <img src={logo} alt="Akashvaani AI" className="h-10 w-auto transition-transform group-hover:scale-110" />
        </Link>

        {/* Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-md font-semibold text-indian-navy/70 hover:text-indian-saffron transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indian-saffron transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Language Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowLang(!showLang)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-black/5 transition-colors text-sm font-medium text-indian-navy"
            >
              <Globe className="w-4 h-4 text-indian-saffron" />
              {lang}
              <ChevronDown className={`w-3 h-3 transition-transform ${showLang ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showLang && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl p-2 border border-black/5 overflow-hidden"
                >
                  {['English', 'Hindi'].map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setShowLang(false); }}
                      className={`w-full text-left px-4 py-2 text-sm rounded-xl transition-colors ${
                        lang === l ? 'bg-indian-saffron/10 text-indian-saffron font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={onDemoLogin}
            className="hidden xl:block text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 px-4 py-2 rounded-full transition-colors"
          >
            Try Demo User
          </button>
          
          <button 
            onClick={onLoginClick}
            className="hidden sm:block text-sm font-bold text-indian-navy/60 hover:text-indian-navy transition-colors ml-2"
          >
            Login
          </button>
          
          <button 
            onClick={onGetStartedClick}
            className="btn-primary !py-2.5 !px-6 text-sm flex items-center gap-2 group"
          >
            Get Started
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ChevronDown className="-rotate-90 w-3 h-3" />
            </div>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

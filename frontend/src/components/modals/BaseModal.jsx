import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const BaseModal = ({ isOpen, onClose, children, title, subtitle, size = 'md' }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-indian-navy/20 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${sizeClasses[size]} bg-[#FAF9F6] rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/40 flex flex-col max-h-[90vh]`}
          >
            {/* Header */}
            <div className="p-8 pb-0 flex justify-between items-start relative z-10">
              <div>
                <h2 className="text-3xl font-bold text-indian-navy tracking-tight">{title}</h2>
                {subtitle && <p className="text-slate-500 mt-2 font-medium">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 transition-colors group"
              >
                <X className="w-6 h-6 text-slate-400 group-hover:text-indian-navy transition-colors" />
              </button>
            </div>

            {/* Content - Scrollable if needed, but designed not to be as per request */}
            <div className="p-8 pt-6 overflow-y-auto custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BaseModal;

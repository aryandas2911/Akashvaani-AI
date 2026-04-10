import React, { useState } from 'react';
import BaseModal from './BaseModal';
import { Mail, ArrowRight } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      onSuccess();
      onClose();
    }
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Welcome Back" 
      subtitle="Login to continue your journey"
      size="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-6 py-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-indian-navy/70 ml-1">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indian-saffron transition-colors" />
            <input 
              type="email" 
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-black/5 focus:border-indian-saffron outline-none transition-all text-indian-navy placeholder:text-slate-400 font-medium"
            />
          </div>
          <p className="text-xs text-slate-400 ml-1">We'll send you a secure login link</p>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-indian-navy text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-indian-navy/20 active:scale-[0.98] transition-all group"
        >
          Continue
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </form>
    </BaseModal>
  );
};

export default LoginModal;

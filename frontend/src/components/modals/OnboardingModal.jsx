import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BaseModal from './BaseModal';
import { User, Mail, Briefcase, MapPin, GraduationCap, Banknote, Calendar, Upload, FileText, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

const OnboardingModal = ({ isOpen, onClose, onSuccess }) => {
  const [activeTab, setActiveTab] = useState('manual');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAiFill = () => {
    setIsExtracting(true);
    // Simulate AI extraction
    setTimeout(() => {
      setIsExtracting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    }, 2500);
  };

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Create Your Profile" 
      subtitle="Help us find the best government schemes for you"
      size="md"
    >
      {/* Tabs */}
      <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
        <button
          onClick={() => setActiveTab('manual')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'manual' ? 'bg-white shadow-sm text-indian-navy' : 'text-slate-500 hover:text-indian-navy'
          }`}
        >
          <FileText className="w-4 h-4" />
          Fill Manually
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'ai' ? 'bg-white shadow-sm text-indian-navy' : 'text-slate-500 hover:text-indian-navy'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indian-saffron" />
          AI Auto-Fill
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'manual' ? (
          <motion.div
            key="manual"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <InputField icon={<User />} label="Full Name" placeholder="Rajesh Kumar" />
            <InputField icon={<Mail />} label="Email Address" placeholder="rajesh@example.com" type="email" />
            <div className="space-y-2">
              <label className="text-xs font-bold text-indian-navy/60 ml-1">Occupation</label>
              <select className="w-full px-4 py-3.5 rounded-xl bg-white border border-black/5 focus:border-indian-saffron outline-none transition-all font-medium appearance-none">
                <option>Farmer</option>
                <option>Student</option>
                <option>Small Business Owner</option>
                <option>Artisan</option>
              </select>
            </div>
            <InputField icon={<MapPin />} label="State" placeholder="Uttar Pradesh" />
            <InputField icon={<MapPin />} label="District" placeholder="Varanasi" />
            <InputField icon={<GraduationCap />} label="Education" placeholder="Secondary School" />
            <InputField icon={<Banknote />} label="Annual Income" placeholder="₹2,50,000" type="number" />
            <InputField icon={<Calendar />} label="Age" placeholder="28" type="number" />
            
            <div className="md:col-span-2 pt-4">
              <button 
                onClick={onSuccess}
                className="w-full py-4 bg-indian-navy text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-indian-navy/20 active:scale-[0.98] transition-all"
              >
                Find My Schemes
              </button>
              <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-indian-green" />
                Your data is सुरक्षित and private
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ai"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-6"
          >
            <div className="group relative border-2 border-dashed border-slate-200 hover:border-indian-saffron rounded-3xl p-12 flex flex-col items-center justify-center transition-all bg-slate-50/50">
              <div className="w-16 h-16 rounded-3xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-indian-saffron" />
              </div>
              <h3 className="text-xl font-bold text-indian-navy mb-2">Upload your document</h3>
              <p className="text-slate-500 text-sm text-center max-w-xs">
                Drag & drop your Aadhaar, PAN Card, or Income Certificate. Supported: PDF, JPG, PNG
              </p>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-indian-navy/60 ml-1">Document Type</label>
              <input 
                placeholder="e.g. Aadhaar, PAN Card" 
                className="w-full px-4 py-4 rounded-xl bg-white border border-black/5 focus:border-indian-saffron outline-none transition-all font-medium"
              />
            </div>

            <div className="pt-2">
              <button 
                onClick={handleAiFill}
                disabled={isExtracting || isSuccess}
                className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  isSuccess ? 'bg-indian-green text-white' : 'bg-indian-navy text-white hover:shadow-xl'
                }`}
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Extracting your details...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Profile auto-filled successfully ✓
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Auto-Fill My Profile
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-400 mt-4">
                Upload once — we’ll auto-fill everything for you securely.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
};

const InputField = ({ icon, label, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-indian-navy/60 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indian-saffron transition-colors">
        {React.cloneElement(icon, { size: 16 })}
      </div>
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-black/5 focus:border-indian-saffron outline-none transition-all font-medium text-sm text-indian-navy placeholder:text-slate-300"
      />
    </div>
  </div>
);

export default OnboardingModal;

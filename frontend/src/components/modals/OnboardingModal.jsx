import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BaseModal from './BaseModal';
import { 
  User, Mail, Briefcase, MapPin, GraduationCap, 
  Banknote, Calendar, Upload, FileText, CheckCircle2, 
  Loader2, Sparkles, AlertCircle 
} from 'lucide-react';
import { useCitizen } from '../../context/CitizenContext';
import { createUser } from '../../services/api';

import { extractProfile } from '../../services/aiApi';

const OnboardingModal = ({ isOpen, onClose, onSuccess }) => {
  const navigate = useNavigate();
  const { setCitizen, citizenData, addDocument } = useCitizen();
  const [activeTab, setActiveTab] = useState('manual');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionStep, setExtractionStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDocType, setSelectedDocType] = useState('Aadhaar Card');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occupation: 'Farmer',
    state: '',
    district: '',
    education: '',
    income: '',
    age: '',
    gender: 'male'
  });

  const extractionSteps = [
    "Upload received",
    "Document type detected",
    "OCR pipeline initialized",
    "Identity details parsed",
    "Data validated",
    "Citizen profile generated"
  ];

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsExtracting(true);
    setError('');
    setExtractionStep(0);

    // Start progress simulation for the first few steps
    const timer = setInterval(() => {
      setExtractionStep(prev => {
        if (prev < 2) return prev + 1;
        return prev;
      });
    }, 800);

    try {
      const extractedData = await extractProfile(file, null, selectedDocType);
      
      // Fast forward the remaining steps for better UX
      setExtractionStep(3);
      await new Promise(r => setTimeout(r, 600));
      setExtractionStep(4);
      await new Promise(r => setTimeout(r, 600));
      setExtractionStep(5);
      await new Promise(r => setTimeout(r, 800));

      const finalProfile = {
        name: extractedData.full_name || extractedData.name || '',
        email: extractedData.email || '',
        age: extractedData.age || '',
        occupation: extractedData.occupation || 'Farmer',
        gender: extractedData.gender || 'Male',
        income: extractedData.annual_income || extractedData.income || '',
        state: extractedData.state || '',
        district: extractedData.district || '',
        education: extractedData.education || '',
        id: extractedData.id,
        // Include any boolean document flags
        aadhaar_card: extractedData.aadhaar_card,
        pan_card: extractedData.pan_card,
        passport: extractedData.passport,
        voter_id: extractedData.voter_id,
        driving_license: extractedData.driving_license,
        ration_card: extractedData.ration_card,
        birth_certificate: extractedData.birth_certificate,
        death_certificate: extractedData.death_certificate,
        marriage_certificate: extractedData.marriage_certificate,
        caste_status_certificate: extractedData.caste_status_certificate,
        income_certificate: extractedData.income_certificate
      };

      // Also save the document used for extraction to the vault
      addDocument({
        name: selectedDocType,
        status: 'verified',
        type: selectedDocType,
        date: new Date().toLocaleDateString()
      });

      // Set global context without saving to DB yet (verification mode)
      setCitizen(finalProfile, { isTemp: true }); 
      
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        navigate('/dashboard/profile?verify=true');
      }, 1000);
      
    } catch (err) {
      setError(err.message || 'AI Extraction failed. Please try manual entry.');
      setIsExtracting(false);
    } finally {
      clearInterval(timer);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!formData.name || !formData.email || !formData.state || !formData.district) {
        throw new Error('Please fill all required fields');
      }

      const userData = {
        ...formData,
        age: parseInt(formData.age),
        income: parseInt(String(formData.income).replace(/[^\d]/g, '')) || 0,
        gender: formData.gender.toLowerCase().replace('-', '_')
      };

      const response = await createUser(userData);
      
      if (response) {
        setCitizen(response);
        setIsSuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
          navigate('/matching');
        }, 1500);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
      <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
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

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {activeTab === 'manual' ? (
          <motion.form
            key="manual"
            onSubmit={handleManualSubmit}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            <InputField 
              icon={<User />} 
              label="Full Name" 
              name="name"
              placeholder="Rajesh Kumar" 
              value={formData.name}
              onChange={handleChange}
              required
            />
            <InputField 
              icon={<Mail />} 
              label="Email Address" 
              name="email"
              placeholder="rajesh@example.com" 
              type="email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="space-y-2">
              <label className="text-xs font-bold text-indian-navy/60 ml-1">Occupation</label>
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indian-saffron transition-colors" />
                <select 
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-black/5 focus:border-indian-saffron outline-none transition-all font-medium appearance-none text-sm"
                >
                  <option>Farmer</option>
                  <option>Student</option>
                  <option>Small Business Owner</option>
                  <option>Artisan</option>
                </select>
              </div>
            </div>
            <InputField 
              icon={<MapPin />} 
              label="State" 
              name="state"
              placeholder="Uttar Pradesh" 
              value={formData.state}
              onChange={handleChange}
              required
            />
            <InputField 
              icon={<MapPin />} 
              label="District" 
              name="district"
              placeholder="Varanasi" 
              value={formData.district}
              onChange={handleChange}
              required
            />
            <InputField 
              icon={<GraduationCap />} 
              label="Education" 
              name="education"
              placeholder="Secondary School" 
              value={formData.education}
              onChange={handleChange}
            />
            <InputField 
              icon={<Banknote />} 
              label="Annual Income" 
              name="income"
              placeholder="₹2,50,000" 
              type="text" 
              value={formData.income}
              onChange={handleChange}
            />
            <InputField 
              icon={<Calendar />} 
              label="Age" 
              name="age"
              placeholder="28" 
              type="number" 
              value={formData.age}
              onChange={handleChange}
            />
            <div className="space-y-2">
              <label className="text-xs font-bold text-indian-navy/60 ml-1">Gender</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indian-saffron transition-colors" />
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-black/5 focus:border-indian-saffron outline-none transition-all font-medium appearance-none text-sm"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non_binary">Non-Binary</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 pt-4">
              <button 
                type="submit"
                disabled={isLoading || isSuccess}
                className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  isSuccess ? 'bg-indian-green text-white' : 'bg-indian-navy text-white hover:shadow-xl hover:shadow-indian-navy/20 active:scale-[0.98]'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Registering...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Profile Created!
                  </>
                ) : (
                  'Find My Schemes'
                )}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="ai"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-6"
          >
            {!isExtracting ? (
              <>
                <div className="group relative border-2 border-dashed border-slate-200 hover:border-indian-saffron rounded-3xl p-10 flex flex-col items-center justify-center transition-all bg-slate-50/50">
                  <div className="w-16 h-16 rounded-3xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-indian-saffron" />
                  </div>
                  <h3 className="text-xl font-bold text-indian-navy mb-2">Upload your document</h3>
                  <p className="text-slate-500 text-sm text-center max-w-xs mb-4">
                    Supported: Aadhaar Card, PAN Card, Passport, Voter ID, Driving License, Birth/Death/Caste Certificate
                  </p>
                  <label className="px-6 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold cursor-pointer hover:bg-slate-50 transition-colors">
                    Browse Files
                    <input type="file" onChange={handleFileChange} className="hidden" accept="image/*,.pdf" />
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-indian-navy/60 ml-1">Document Type</label>
                  <select 
                    value={selectedDocType}
                    onChange={(e) => setSelectedDocType(e.target.value)}
                    className="w-full px-4 py-4 rounded-xl bg-white border border-black/5 focus:border-indian-saffron outline-none transition-all font-medium appearance-none"
                  >
                    {[
                      'Aadhaar Card', 'PAN Card', 'Passport', 'Voter ID', 'Driving License', 'Ration Card',
                      'Birth Certificate', 'Death Certificate', 'Marriage Certificate', 'Caste Status Certificate'
                    ].map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div className="py-8 space-y-6">
                <div className="flex flex-col items-center justify-center mb-8">
                  <div className="relative">
                     <Loader2 className="w-16 h-16 text-indian-saffron animate-spin opacity-20" />
                     <Sparkles className="w-8 h-8 text-indian-saffron absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-indian-navy mt-4">AI Processing...</h3>
                </div>
                
                <div className="space-y-4">
                  {extractionSteps.map((step, idx) => (
                    <motion.div 
                      key={step} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: idx <= extractionStep ? 1 : 0.3,
                        x: 0,
                        color: idx <= extractionStep ? '#059669' : '#64748b'
                      }}
                      className="flex items-center gap-3 font-semibold text-sm"
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${idx <= extractionStep ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                        {idx <= extractionStep ? <CheckCircle2 className="w-3 h-3" /> : (idx === extractionStep ? <Loader2 className="w-3 h-3 animate-spin" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />)}
                      </div>
                      {step}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {!isExtracting && (
              <p className="text-center text-xs text-slate-400">
                Upload once — we’ll auto-fill everything for you securely.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </BaseModal>
  );
};


const InputField = ({ icon, label, placeholder, type = "text", name, value, onChange, required = false }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-indian-navy/60 ml-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indian-saffron transition-colors">
        {React.cloneElement(icon, { size: 16 })}
      </div>
      <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-black/5 focus:border-indian-saffron outline-none transition-all font-medium text-sm text-indian-navy placeholder:text-slate-300"
      />
    </div>
  </div>
);

export default OnboardingModal;


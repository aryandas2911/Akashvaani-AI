import React from 'react';
import { useCitizen } from '../context/CitizenContext';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, MapPin, Briefcase, GraduationCap, DollarSign, ShieldCheck } from 'lucide-react';

const ProfileField = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
    <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-slate-700 font-semibold">{value || 'Not provided'}</p>
    </div>
  </div>
);

const ProfilePage = () => {
  const { citizenData } = useCitizen();
  const profile = citizenData?.profile;

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <User className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">No Profile Found</h2>
        <p className="text-slate-500 max-w-md">Please complete your onboarding or use the "Try Demo Citizen" feature to load user data.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Citizen Profile</h1>
          <p className="text-slate-500 mt-1">Manage and view your identity and professional details.</p>
        </div>
        <div className="px-4 py-2 bg-green-50 border border-green-100 rounded-full flex items-center gap-2 text-green-700 text-sm font-bold">
          <ShieldCheck className="w-4 h-4" />
          Verified Account
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileField icon={User} label="Full Name" value={profile.name} />
        <ProfileField icon={Mail} label="Email Address" value={profile.email || "user@gmail.com"} />
        <ProfileField icon={Calendar} label="Age" value={profile.age} />
        <ProfileField icon={MapPin} label="State / Location" value={profile.state} />
        <ProfileField icon={Briefcase} label="Occupation" value={profile.occupation} />
        <ProfileField icon={GraduationCap} label="Education" value={profile.education} />
        <ProfileField icon={DollarSign} label="Annual Income" value={`₹${profile.income?.toLocaleString()}`} />
        <ProfileField icon={MapPin} label="District" value={profile.district || "Default District"} />
      </div>

      <div className="bg-blue-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-500/20">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Smart Benefit Matching</h3>
          <p className="text-blue-100 text-sm opacity-90">Your profile details are being used to automatically scan for new government schemes you might be eligible for.</p>
        </div>
        <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors whitespace-nowrap">
          Update Profile
        </button>
      </div>
    </motion.div>
  );
};

export default ProfilePage;

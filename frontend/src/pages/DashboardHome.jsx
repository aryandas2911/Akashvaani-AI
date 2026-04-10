import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  Upload, 
  MessageSquare,
  Search,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCitizen } from '../context/CitizenContext';
import { topSchemes, documentStatus, applicationSnapshot } from '../data/mockData';

const BenefitSummaryCard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-600/20">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-md rounded-full text-sm font-semibold mb-4 border border-white/20 cursor-pointer">
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span className="text-blue-50">Profile Analysis Complete</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">₹1,45,000</h2>
          <p className="text-blue-100 font-medium text-lg flex items-center gap-2">
            Available across <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-md">3 schemes</span> matched
          </p>
          <p className="text-sm text-blue-200 mt-4 max-w-sm">
            "These are benefits you are most likely eligible for right now based on your profile."
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/dashboard/schemes')}
          className="px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
        >
          Explore Schemes
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const QuickActions = () => {
  const navigate = useNavigate();
  const actions = [
    { label: "Check Eligibility", icon: Search, color: "bg-purple-100 text-purple-600", path: "/dashboard/schemes" },
    { label: "Upload Documents", icon: Upload, color: "bg-blue-100 text-blue-600", path: "/dashboard/documents" },
    { label: "Ask AI Assistant", icon: MessageSquare, color: "bg-orange-100 text-orange-600", path: "/dashboard/voice-assistant" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {actions.map((action, i) => (
        <button 
          key={i}
          onClick={() => navigate(action.path)}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center gap-4 group"
        >
          <div className={`p-3 rounded-xl ${action.color} group-hover:scale-110 transition-transform`}>
            <action.icon className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-700 group-hover:text-indian-navy">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

const TopSchemesPreview = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Top Scheme Matches
          </h3>
          <p className="text-sm text-slate-500 mt-1">"Top matches based on your current profile."</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/schemes')}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
        >
          View All
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {topSchemes.map(scheme => (
          <div key={scheme.id} className="p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{scheme.name}</h4>
              <span className="font-bold text-green-600 text-sm bg-green-50 px-2.5 py-1 rounded-lg border border-green-100/50">
                {scheme.benefit}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" 
                  style={{ width: `${scheme.score}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-slate-500">{scheme.score}% Match</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AgentActivity = () => {
  // Simulate active agent steps
  const steps = [
    { title: "Scanning your documents...", active: false, done: true },
    { title: "Analyzing eligibility...", active: false, done: true },
    { title: "Matching relevant schemes...", active: true, done: false },
    { title: "Preparing application suggestions...", active: false, done: false },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden h-full flex flex-col">
       {/* Glow effect */}
       <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/30 blur-3xl rounded-full pointer-events-none"></div>

       <div className="mb-6 relative z-10">
         <h3 className="text-xl font-bold text-white flex items-center gap-2">
           <Layers className="w-5 h-5 text-blue-400" />
           Agent Activity
         </h3>
         <p className="text-sm text-slate-400 mt-1">"Your AI assistant is working in the background to optimize your benefits."</p>
       </div>

       <div className="space-y-6 relative z-10 flex-1">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col gap-1 relative">
              {idx !== steps.length - 1 && (
                <div className={`absolute top-6 left-2.5 w-0.5 h-[calc(100%+0.5rem)] ${step.done ? 'bg-blue-500' : 'bg-slate-800'}`}></div>
              )}
              <div className="flex items-center gap-4">
                <div className="relative">
                  {step.done ? (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center p-0.5">
                      <CheckCircle2 className="w-full h-full text-white" />
                    </div>
                  ) : step.active ? (
                    <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center relative bg-slate-900">
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} 
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-700 bg-slate-900"></div>
                  )}
                </div>
                <span className={`text-sm font-medium ${step.active ? 'text-white' : step.done ? 'text-slate-300' : 'text-slate-600'}`}>
                  {step.title}
                </span>
              </div>
            </div>
          ))}
       </div>
    </div>
  );
};

const DocumentSnapshot = () => {
  const navigate = useNavigate();
  return (
     <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
       <div className="flex justify-between items-center mb-6">
         <h3 className="text-lg font-bold text-slate-800">Document Status</h3>
         <button onClick={() => navigate('/dashboard/documents')} className="text-sm text-blue-600 font-semibold hover:underline">Manage</button>
       </div>
       <p className="text-xs text-slate-500 mb-4 tracking-wide">"Complete your profile to unlock more schemes."</p>
       
       <div className="space-y-3">
         {documentStatus.slice(0,3).map(doc => (
           <div key={doc.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
             <div className="flex items-center gap-3">
               {doc.status === 'verified' ? (
                 <CheckCircle2 className="w-5 h-5 text-green-500" />
               ) : (
                 <AlertCircle className="w-5 h-5 text-orange-500" />
               )}
               <span className="font-semibold text-slate-700 text-sm">{doc.name}</span>
             </div>
             <span className={`text-xs font-bold px-2 py-1 rounded-md ${doc.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
               {doc.message}
             </span>
           </div>
         ))}
       </div>
     </div>
  );
};

const ApplicationSnapshot = () => {
  const navigate = useNavigate();
  return (
     <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
       <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800">Applications</h3>
          <button onClick={() => navigate('/dashboard/applications')} className="text-sm text-blue-600 font-semibold hover:underline">View All</button>
        </div>
        <p className="text-xs text-slate-500 mb-4 tracking-wide">"Track your applications and stay updated on their progress."</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
            <span className="block text-2xl font-bold text-orange-600">1</span>
            <span className="text-xs font-semibold text-orange-800 uppercase tracking-wider">Pending</span>
          </div>
          <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
            <span className="block text-2xl font-bold text-green-600">1</span>
            <span className="text-xs font-semibold text-green-800 uppercase tracking-wider">Approved</span>
          </div>
        </div>
       </div>
       
       <button onClick={() => navigate('/dashboard/applications')} className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl transition-colors border border-slate-200 flex items-center justify-center gap-2">
         <FileText className="w-4 h-4" />
         View Application Status
       </button>
     </div>
  );
};


const DashboardHome = () => {
  const { citizenData } = useCitizen();
  const userProfile = citizenData?.profile || null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto space-y-8 pb-10"
    >
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl tracking-tight font-extrabold text-indian-navy">
          Welcome back, {userProfile?.name ? userProfile.name.split(' ')[0] : 'Citizen'}
        </h1>
        <p className="text-slate-500 mt-1 text-lg">
          Your AI assistant has analyzed your profile and identified new opportunities.
        </p>
      </div>

      {/* Hero Widget & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <BenefitSummaryCard />
          <QuickActions />
        </div>
        <div className="lg:col-span-4">
           <AgentActivity />
        </div>
      </div>

      {/* Secondary Row Mosaics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 border-none">
          <TopSchemesPreview />
        </div>
        <div className="xl:col-span-1">
          <DocumentSnapshot />
        </div>
        <div className="xl:col-span-1">
          <ApplicationSnapshot />
        </div>
      </div>

    </motion.div>
  );
};

export default DashboardHome;

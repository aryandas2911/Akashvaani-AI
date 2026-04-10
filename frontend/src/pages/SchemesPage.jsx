import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SchemeCard from '../components/SchemeCard';
import SchemeFilters from '../components/SchemeFilters';
import AgentTimeline from '../components/AgentTimeline';
import { useSchemes } from '../hooks/useSchemes';
import { useCitizen } from '../context/CitizenContext';

const evaluateEligibilityRaw = (scheme, profile) => {
  if (!profile) return false;
  const rules = scheme.eligibility_rules;
  if (!rules) return true;

  let matches = true;
  if (rules.income_max && profile.income > rules.income_max) matches = false;
  if (rules.student !== undefined && rules.student && profile.occupation?.toLowerCase() !== 'student') matches = false;

  return matches;
};

const SchemesPage = () => {
  const { schemes, loading, error } = useSchemes();
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  
  // Directly pull contextual live payloads dynamically instantiated
  const { citizenData, clearCitizen } = useCitizen();

  useEffect(() => {
    if (schemes.length > 0) {
      setFilteredSchemes(schemes);
    }
  }, [schemes]);

  // Rely purely on dynamic citizen profiling mappings
  const currentProfile = citizenData?.profile || null;
  const eligibleSchemes = currentProfile ? filteredSchemes.filter(s => evaluateEligibilityRaw(s, currentProfile)) : [];
  
  const totalBenefitAmount = eligibleSchemes.reduce((acc, curr) => {
      const numStr = String(curr.benefit).replace(/[^0-9]/g, '');
      const val = parseInt(numStr, 10);
      return isNaN(val) ? acc : acc + val;
  }, 0);

  return (
    <div className="min-h-screen bg-indian-offwhite flex flex-col font-outfit relative">
      <Navbar />

      {/* Demo Notification Wrapper */}
      {citizenData && (
        <div className="fixed top-[88px] left-0 right-0 z-40 flex justify-center pointer-events-none animate-in slide-in-from-top-4 duration-500">
           <div className="bg-indian-green text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 pointer-events-auto border border-indian-green/20">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
             Demo Citizen Loaded Successfully
             <button onClick={clearCitizen} className="ml-4 pl-4 border-l border-white/20 text-white/80 hover:text-white transition-colors text-xs tracking-wider uppercase">
                Clear Profile
             </button>
           </div>
        </div>
      )}

      <main className="flex-1 py-16 px-4 md:px-12 mt-16">
        <div className="w-full mx-auto space-y-8">
          
          {/* Reactive UI Analytics Block */}
          {currentProfile ? (
            <div className="bg-gradient-to-br from-indian-navy to-black p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-indian-saffron/20 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indian-green/20 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="text-white space-y-2">
                    <p className="text-indian-saffron font-black tracking-widest text-sm uppercase flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indian-saffron animate-pulse"></span>
                      Akashvaani AI Engine
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight border-b border-white/10 pb-4 mb-4 pt-2">
                      {eligibleSchemes.length} schemes you qualify for
                    </h2>
                    <div className="flex gap-4">
                      <p className="text-white/70 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-sm"><span className="text-white font-bold block mb-1">Income</span>₹{currentProfile.income?.toLocaleString('en-IN')}</p>
                      <p className="text-white/70 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-sm"><span className="text-white font-bold block mb-1">Status</span>{currentProfile.occupation || currentProfile.student ? 'Student' : 'Citizen'}</p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[32px] text-center min-w-[320px] shadow-2xl">
                    <p className="text-white/80 font-bold uppercase tracking-widest text-xs mb-2">Total benefits available</p>
                    <p className="text-5xl md:text-6xl font-black text-indian-green drop-shadow-md">₹{totalBenefitAmount.toLocaleString('en-IN')}</p>
                    <p className="text-sm font-bold text-indian-green/80 mt-2 tracking-wider">ANNUAL ESTIMATE</p>
                  </div>
              </div>
            </div>
          ) : (
            <div className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-indian-navy tracking-tight mb-3">
                  Government Schemes
                </h1>
                <p className="text-lg text-indian-navy/70 max-w-2xl font-medium">
                  Identify financial aid practically curated to empower Indian scaling workflows. Or launch the AI Demo directly via the Landing Page!
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            <div className={`${currentProfile ? 'lg:w-3/4' : 'w-full'} space-y-8`}>
              <SchemeFilters schemes={schemes} setFilteredSchemes={setFilteredSchemes} />

              {loading && (
                <div className="flex flex-col justify-center items-center py-32 space-y-6">
                  <div className="relative">
                     <div className="w-16 h-16 border-4 border-slate-100 rounded-full"></div>
                     <div className="w-16 h-16 border-4 border-indian-saffron rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                  </div>
                  <p className="text-indian-navy/50 font-bold uppercase tracking-widest text-sm">Querying Knowledge Base...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 text-center font-bold my-12 shadow-sm flex flex-col items-center">
                  <svg className="w-10 h-10 mb-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Backend API Fetch Failed. ({error})
                </div>
              )}

              {!loading && !error && filteredSchemes.length === 0 && (
                <div className="text-center py-32 bg-white rounded-[32px] border border-black/5 shadow-sm mx-2 animate-in fade-in duration-500">
                  <h3 className="text-3xl font-black text-indian-navy mb-3 tracking-tight">No matching schemes</h3>
                  <p className="text-indian-navy/60 text-lg font-medium">Reset your filters or broaden your constraints.</p>
                </div>
              )}

              {!loading && !error && filteredSchemes.length > 0 && (
                <div className={`grid grid-cols-1 ${currentProfile ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8 auto-rows-fr mt-8`}>
                  {filteredSchemes.map((scheme) => (
                    <div key={scheme.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both w-full" style={{ animationDelay: `${(scheme.id % 5) * 75}ms` }}>
                       <SchemeCard scheme={scheme} citizenProfile={currentProfile} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Agent Sidebar only if active citizen triggered context flow */}
            {currentProfile && (
              <div className="lg:w-1/4">
                <div className="sticky top-32">
                    <AgentTimeline userId="demo_user" />
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SchemesPage;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SchemeCard from '../components/SchemeCard';
import SchemeFilters from '../components/SchemeFilters';
import { useSchemes } from '../hooks/useSchemes';
import { useCitizen } from '../context/CitizenContext';
import { getUserById } from '../services/api';
import { Loader2 } from 'lucide-react';

const SchemesPage = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');
  const { citizenData, updateCitizen } = useCitizen();
  const currentProfile = citizenData?.profile || null;
  const { schemes, loading: schemesLoading, error } = useSchemes();
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [freshProfile, setFreshProfile] = useState(citizenData?.profile || null);
  const [filterKey, setFilterKey] = useState(0);

  // On mount: refetch user from DB to get latest income, gender, doc flags
  // SchemeFilters reads freshProfile and auto-applies filters on load
  useEffect(() => {
    const refetchUser = async () => {
      if (currentProfile?.id && !citizenData?.isDemo) {
        try {
          const latest = await getUserById(currentProfile.id);
          if (latest) {
            updateCitizen(latest);
            setFreshProfile(latest);
          } else {
            setFreshProfile(currentProfile);
          }
        } catch {
          setFreshProfile(currentProfile);
        }
      } else {
        setFreshProfile(currentProfile);
      }
    };
    refetchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const totalBenefitAmount = filteredSchemes.reduce((acc, curr) => {
      const numStr = String(curr.benefit).replace(/[^0-9]/g, '');
      const val = parseInt(numStr, 10);
      return isNaN(val) ? acc : acc + val;
  }, 0);

  return (
    <div className={`min-h-screen ${isDashboard ? '' : 'bg-indian-offwhite flex flex-col font-outfit relative pt-20'}`}>
      {!isDashboard && <Navbar />}

      {/* Demo Notification Wrapper */}
      {citizenData && (
        <div className={`fixed ${isDashboard ? 'top-20' : 'top-[88px]'} left-0 right-0 z-40 flex justify-center pointer-events-none animate-in slide-in-from-top-4 duration-500`}>
           <div className="bg-indian-green text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 pointer-events-auto border border-indian-green/20">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
             {citizenData?.isDemo ? 'Demo Citizen Loaded Successfully' : 'Profile Reasoning Active'}
           </div>
        </div>
      )}

      <main className={`flex-1 ${isDashboard ? 'py-4' : 'py-16 px-4 md:px-12 mt-16'}`}>
        <div className="w-full mx-auto space-y-8">
          
          {/* Reactive UI Analytics Block */}
          {currentProfile && (
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
                      {`${filteredSchemes.length} schemes you qualify for`}
                    </h2>
                    <div className="flex gap-4">
                      <p className="text-white/70 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-sm"><span className="text-white font-bold block mb-1">Income</span>₹{currentProfile.income?.toLocaleString('en-IN')}</p>
                      <p className="text-white/70 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-sm"><span className="text-white font-bold block mb-1">Location</span>{currentProfile.district}, {currentProfile.state}</p>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[32px] text-center min-w-[320px] shadow-2xl">
                    <p className="text-white/80 font-bold uppercase tracking-widest text-xs mb-2">Total benefits available</p>
                    <p className="text-5xl md:text-6xl font-black text-indian-green drop-shadow-md">
                      {`₹${totalBenefitAmount.toLocaleString('en-IN')}`}
                    </p>
                    <p className="text-sm font-bold text-indian-green/80 mt-2 tracking-wider uppercase">matched for you</p>
                  </div>
              </div>
            </div>
          )}

          {!currentProfile && (
            <div className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-indian-navy tracking-tight mb-3">
                  Government Schemes
                </h1>
                <p className="text-lg text-indian-navy/70 max-w-2xl font-medium">
                  Identify financial aid practically curated to empower Indian scaling workflows.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-8">
            <SchemeFilters key={filterKey} schemes={schemes} setFilteredSchemes={setFilteredSchemes} userProfile={freshProfile} />

            {schemesLoading && (
              <div className="flex flex-col justify-center items-center py-32 space-y-6">
                <div className="relative">
                   <div className="w-16 h-16 border-4 border-slate-100 rounded-full"></div>
                   <div className="w-16 h-16 border-4 border-indian-saffron rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                   <Loader2 className="w-8 h-8 text-indian-saffron absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <p className="text-indian-navy/50 font-bold uppercase tracking-widest text-sm">Loading Schemes...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 text-center font-bold my-12 shadow-sm flex flex-col items-center">
                <svg className="w-10 h-10 mb-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Backend API Fetch Failed. ({error})
              </div>
            )}

            {!schemesLoading && !error && filteredSchemes.length === 0 && (
              <div className="text-center py-32 bg-white rounded-[32px] border border-black/5 shadow-sm mx-2 animate-in fade-in duration-500">
                <h3 className="text-3xl font-black text-indian-navy mb-3 tracking-tight">No matching schemes</h3>
                <p className="text-indian-navy/60 text-lg font-medium">Reset your filters or adjust your profile details.</p>
              </div>
            )}

            {!schemesLoading && !error && filteredSchemes.length > 0 && (
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr mt-8`}>
                {filteredSchemes.map((scheme, idx) => (
                  <div key={scheme.id || idx} className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both w-full" style={{ animationDelay: `${(idx % 6) * 75}ms` }}>
                     <SchemeCard scheme={scheme} citizenProfile={currentProfile} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};

export default SchemesPage;

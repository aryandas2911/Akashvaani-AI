import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturesGrid from '../components/FeaturesGrid';
import IntelligenceSection from '../components/IntelligenceSection';
import ProcessSteps from '../components/ProcessSteps';
import Testimonials from '../components/Testimonials';
import ReasoningTimeline from '../components/ReasoningTimeline';
import AdvocateSection from '../components/AdvocateSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import LoginModal from '../components/modals/LoginModal';
import OnboardingModal from '../components/modals/OnboardingModal';
import { runDemo } from '../services/api';

const LandingPage = ({ onLoginSuccess, onGetStartedSuccess }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoResult, setDemoResult] = useState(null);
  const [error, setError] = useState(null);

  const handleRunDemo = async () => {
    setLoading(true);
    setError(null);
    try {
      // Create user, fetch schemes directly via our comprehensive demo endpoint
      const response = await runDemo();
      setDemoResult(response);
    } catch (err) {
      console.error(err);
      setError('Failed to run demo. Ensure backend and AI modules are fully executing.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-indian-offwhite">
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)} 
        onGetStartedClick={() => setIsOnboardingOpen(true)} 
      />
      <main>
        <Hero onGetStartedClick={() => setIsOnboardingOpen(true)} />
        
        {/* LIVE DEMO ENGINE */}
        <section className="py-24 bg-gradient-to-b from-white to-blue-50" id="live-demo">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Akashvaani Live Engine</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Trigger our fully automated AI eligibility pipeline in a single click. No manual data entry required.
              </p>
            </div>
            
            <div className="flex justify-center mb-12">
              <button
                onClick={handleRunDemo}
                disabled={loading}
                className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xl shadow-[0_10px_30px_-5px_rgba(37,99,235,0.4)] disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                {loading && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {loading ? 'AI Engine Processing...' : 'Try Demo Citizen'}
              </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl text-center font-medium shadow-sm mb-12">
                    {error}
                </div>
            )}

            {/* DEMO PAYLOAD RESULTS */}
            {demoResult && (
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 flex flex-col lg:flex-row gap-12 mt-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                
                {/* Profile Box */}
                <div className="flex-1">
                  <div className="inline-flex items-center space-x-2 text-blue-600 font-semibold mb-6">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    <span className="text-lg">Extracted Citizen Profile</span>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-100">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-500 font-medium">Full Name</span>
                      <strong className="text-gray-900">{demoResult.citizen_profile?.name}</strong>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-500 font-medium">Age</span>
                      <strong className="text-gray-900">{demoResult.citizen_profile?.age} Years</strong>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-500 font-medium">Occupation</span>
                      <strong className="text-gray-900">{demoResult.citizen_profile?.occupation}</strong>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-500 font-medium">State</span>
                      <strong className="text-gray-900">{demoResult.citizen_profile?.state}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-medium">Est. Income</span>
                      <strong className="text-gray-900">₹{demoResult.citizen_profile?.income?.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <div className="mt-8 bg-green-50 p-6 rounded-2xl border border-green-100">
                    <h4 className="text-sm font-bold text-green-800 uppercase tracking-wider mb-2">Total AI-Calculated Benefits</h4>
                    <p className="text-4xl text-green-600 font-bold">{demoResult.total_benefit_amount || demoResult.total_benefits || '0'}</p>
                  </div>
                </div>

                {/* Scheme Matches */}
                <div className="flex-1">
                  <div className="inline-flex items-center space-x-2 text-indigo-600 font-semibold mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    <span className="text-lg">Matched Schemes</span>
                  </div>
                  
                  {demoResult.eligible_schemes?.length === 0 && (
                      <p className="text-gray-500 italic p-4 bg-gray-50 rounded-xl">No schemes matched based on engine rules.</p>
                  )}
                  
                  <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 rounded-xl">
                    {demoResult.eligible_schemes?.map((scheme, i) => (
                      <div key={i} className="group relative overflow-hidden bg-white border border-gray-200 hover:border-indigo-300 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                        <h4 className="font-bold text-gray-900 text-lg leading-snug pr-8">{scheme.scheme}</h4>
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                          <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg font-semibold text-sm border border-indigo-100">
                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                             Match: {(scheme.score * 100).toFixed(0)}%
                          </span>
                          <span className="font-bold text-gray-800 text-sm">₹ {scheme.benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </section>
        <FeaturesGrid />
        <IntelligenceSection />
        <ProcessSteps />
        <Testimonials />
        <ReasoningTimeline />
        <AdvocateSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSuccess={onLoginSuccess} 
      />
      <OnboardingModal 
        isOpen={isOnboardingOpen} 
        onClose={() => setIsOnboardingOpen(false)} 
        onSuccess={onGetStartedSuccess} 
      />
    </div>
  );
};

export default LandingPage;

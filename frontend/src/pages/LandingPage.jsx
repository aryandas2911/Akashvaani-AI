import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useCitizen } from '../context/CitizenContext';

const LandingPage = ({ onLoginSuccess, onGetStartedSuccess }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { loadDemoCitizen } = useCitizen();

  const handleRunDemo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await runDemo();
      loadDemoCitizen(
         response.citizen_profile,
         response.eligible_schemes,
         response.total_benefit_amount || response.total_benefits
      );
      navigate('/schemes');
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
        <section className="py-24 bg-gradient-to-b from-white to-indian-offwhite" id="live-demo">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold text-indian-navy mb-6 tracking-tight">Akashvaani Live Engine</h2>
              <p className="text-xl text-indian-navy/70 max-w-2xl mx-auto">
                Trigger our fully automated AI eligibility pipeline in a single click. No manual data entry required.
              </p>
            </div>
            
            <div className="flex justify-center mb-12">
              <button
                onClick={handleRunDemo}
                disabled={loading}
                className="px-10 py-5 bg-indian-saffron hover:bg-indian-accent text-white font-bold rounded-2xl text-xl shadow-[0_10px_30px_-5px_rgba(249,115,22,0.4)] disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3"
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
                <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl text-center font-medium shadow-sm mb-12 max-w-2xl mx-auto">
                    {error}
                </div>
            )}
            
          </div>
        </section>
        <FeaturesGrid />
        <IntelligenceSection />
        <ProcessSteps />
        <Testimonials />
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

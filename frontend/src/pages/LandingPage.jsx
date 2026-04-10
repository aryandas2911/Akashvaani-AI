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

const LandingPage = ({ onLoginSuccess, onGetStartedSuccess }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-indian-offwhite">
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)} 
        onGetStartedClick={() => setIsOnboardingOpen(true)} 
      />
      <main>
        <Hero onGetStartedClick={() => setIsOnboardingOpen(true)} />
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

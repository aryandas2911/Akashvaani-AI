import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturesGrid from '../components/FeaturesGrid';
import IntelligenceSection from '../components/IntelligenceSection';
import ProcessSteps from '../components/ProcessSteps';
import Testimonials from '../components/Testimonials';
import AdvocateSection from '../components/AdvocateSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-indian-offwhite">
      <Navbar />
      <main>
        <Hero />
        <FeaturesGrid />
        <IntelligenceSection />
        <ProcessSteps />
        <Testimonials />
        <AdvocateSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

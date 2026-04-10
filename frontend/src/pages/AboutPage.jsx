import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Cpu, Activity, Target } from 'lucide-react';
import logo from '../assets/logo.png';
import LoginModal from '../components/modals/LoginModal';
import OnboardingModal from '../components/modals/OnboardingModal';

const AboutPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-indian-offwhite flex flex-col font-outfit">
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)} 
        onGetStartedClick={() => setIsOnboardingOpen(true)} 
      />

      <main className="flex-1 py-16 px-6 md:px-12 mt-16 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <h1 className="text-4xl md:text-6xl font-black text-indian-navy tracking-tight mb-6">
            About <img src={logo} alt="Akashvaani AI" className="w-120 h-30 inline-block mb-6" />
          </h1>
          <p className="text-xl md:text-2xl text-indian-navy/70 max-w-3xl mx-auto font-medium">
            Empowering every Indian citizen with intelligent, automated access to government schemes and benefits.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-[2.5rem] p-10 md:p-16 border border-black/5 shadow-sm mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: '150ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-indian-navy mb-6">Our Mission</h2>
              <p className="text-lg text-indian-navy/70 leading-relaxed mb-6">
                Navigating government benefits can be complex and time-consuming. We built Akashvaani AI to bridge the gap between citizens and the resources they deserve. 
              </p>
              <p className="text-lg text-indian-navy/70 leading-relaxed">
                By leveraging advanced AI, semantic search, and secure automated profile building, we ensure you never miss out on eligible schemes, removing the friction from discovery to application.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indian-navy to-blue-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indian-saffron/10 rounded-full blur-3xl"></div>
               <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                 <Shield className="w-16 h-16 text-indian-green mb-6" />
                 <h3 className="text-2xl font-bold mb-4">India's First Proactive GovTech Agent</h3>
                 <p className="text-white/80 font-medium">Built for inclusion, designed for scale.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Core Values / Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Cpu,
              title: "AI-Powered Matching",
              desc: "Our engine processes complex eligibility rules instantly to find schemes perfectly suited to your profile.",
              color: "text-blue-500",
              bg: "bg-blue-50"
            },
            {
              icon: Activity,
              title: "Proactive Agents",
              desc: "Akashvaani AI works in the background, continuously tracking your status and alerting you of new opportunities.",
              color: "text-indian-saffron",
              bg: "bg-orange-50"
            },
            {
              icon: Target,
              title: "Seamless Application",
              desc: "We automate data entry and document assembly so you can apply to state and central schemes with a single click.",
              color: "text-indian-green",
              bg: "bg-green-50"
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: `${(i+2)*150}ms` }}>
              <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-indian-navy mb-3">{feature.title}</h3>
              <p className="text-indian-navy/60 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </main>

      <Footer />

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSuccess={() => { setIsLoginOpen(false); navigate('/dashboard'); }} 
      />
      <OnboardingModal 
        isOpen={isOnboardingOpen} 
        onClose={() => setIsOnboardingOpen(false)} 
        onSuccess={() => { setIsOnboardingOpen(false); navigate('/dashboard'); }} 
      />
    </div>
  );
};

export default AboutPage;

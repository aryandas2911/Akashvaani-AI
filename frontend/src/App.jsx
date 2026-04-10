import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SchemesPage from './pages/SchemesPage';
import AboutPage from './pages/AboutPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import ProfilePage from './pages/ProfilePage';
import ApplicationsPage from './pages/ApplicationsPage';
import DocumentsPage from './pages/DocumentsPage';
import VoiceAssistantPage from './pages/VoiceAssistantPage';
import MatchingPage from './pages/MatchingPage';
import { useCitizen, CitizenProvider } from './context/CitizenContext';
import { Navigate } from 'react-router-dom';


const AppRoutes = () => {
  const { citizenData } = useCitizen();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/schemes" element={<SchemesPage />} />
      <Route path="/matching" element={<MatchingPage />} />
      <Route 
        path="/dashboard" 
        element={citizenData ? <DashboardLayout /> : <Navigate to="/" />}
      >
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="schemes" element={<SchemesPage />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="voice-assistant" element={<VoiceAssistantPage />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <CitizenProvider>
      <Router>
        <AppRoutes />
      </Router>
    </CitizenProvider>
  );
}



export default App;

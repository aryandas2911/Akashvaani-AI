import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SchemesPage from './pages/SchemesPage';
import AboutPage from './pages/AboutPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import ApplicationsPage from './pages/ApplicationsPage';
import DocumentsPage from './pages/DocumentsPage';
import VoiceAssistantPage from './pages/VoiceAssistantPage';
import { CitizenProvider } from './context/CitizenContext';

function App() {
  return (
    <CitizenProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/schemes" element={<SchemesPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="voice-assistant" element={<VoiceAssistantPage />} />
            <Route path="schemes" element={<SchemesPage isDashboard={true} />} />
          </Route>
        </Routes>
      </Router>
    </CitizenProvider>
  );
}

export default App;

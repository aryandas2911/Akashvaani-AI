import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SchemesPage from './pages/SchemesPage';
import DashboardHome from './pages/DashboardHome';
import Dashboard from './pages/Dashboard';
import { CitizenProvider } from './context/CitizenContext';

function App() {
  return (
    <CitizenProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/schemes" element={<SchemesPage />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard-dummy" element={<Dashboard />} />
        </Routes>
      </Router>
    </CitizenProvider>
  );
}

export default App;

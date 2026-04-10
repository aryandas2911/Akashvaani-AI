import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const navigateToDashboard = () => setCurrentPage('dashboard');
  const navigateToLanding = () => setCurrentPage('landing');

  return (
    <div className="min-h-screen bg-indian-offwhite">
      {currentPage === 'landing' ? (
        <LandingPage 
          onLoginSuccess={navigateToDashboard} 
          onGetStartedSuccess={navigateToDashboard} 
        />
      ) : (
        <Dashboard onLogout={navigateToLanding} />
      )}
    </div>
  );
}

export default App;

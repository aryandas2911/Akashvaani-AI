import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SchemesPage from './pages/SchemesPage';
import { CitizenProvider } from './context/CitizenContext';

function App() {
  return (
    <CitizenProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/schemes" element={<SchemesPage />} />
        </Routes>
      </Router>
    </CitizenProvider>
  );
}

export default App;

import React from 'react';

const Dashboard = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-indian-offwhite p-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-indian-navy mb-4">Welcome to Your Dashboard</h1>
      <p className="text-slate-500 mb-8">This is where you'll find your personal government schemes.</p>
      <button 
        onClick={onLogout}
        className="px-6 py-2 bg-indian-navy text-white rounded-full font-bold hover:shadow-lg transition-all"
      >
        Logout to Landing Page
      </button>
    </div>
  );
};

export default Dashboard;

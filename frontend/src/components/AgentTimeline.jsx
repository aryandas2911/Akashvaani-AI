import React, { useState, useEffect } from 'react';
import { getReasoning } from '../services/api';

const AgentTimeline = ({ userId = 'demo_user' }) => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchTimeline = async () => {
      try {
        setLoading(true);
        // Returns the string array array directly
        const timeline = await getReasoning(userId);
        if (active) setSteps(timeline || []);
      } catch (err) {
        if (active) setError(err.message || 'Failed to fetch timeline.');
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchTimeline();
    return () => { active = false; };
  }, [userId]);

  if (loading) {
     return (
        <div className="bg-white p-8 rounded-3xl border border-black/5 flex flex-col items-center justify-center space-y-4">
           <div className="flex space-x-2">
             <div className="w-3 h-3 bg-indian-saffron rounded-full animate-bounce"></div>
             <div className="w-3 h-3 bg-indian-saffron rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
             <div className="w-3 h-3 bg-indian-saffron rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
           </div>
           <p className="text-indian-navy/50 font-bold uppercase tracking-widest text-xs">Agent thinking...</p>
        </div>
     );
  }

  if (error) {
     return (
       <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm font-bold border border-red-100">
         Reasoning Agent offline: {error}
       </div>
     );
  }

  if (!steps.length) return null;

  return (
    <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indian-saffron/10 rounded-xl">
           <svg className="w-5 h-5 text-indian-saffron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h3 className="text-xl font-black text-indian-navy uppercase tracking-widest">Live Agent Timeline</h3>
      </div>
      
      <div className="relative border-l-2 border-indian-saffron/20 ml-3 space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative pl-8">
            <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-indian-green flex items-center justify-center ring-4 ring-white">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </span>
            <div className="bg-slate-50 border border-black/5 p-4 rounded-xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-indian-saffron/30 group">
              <h4 className="text-indian-navy font-bold">{step}</h4>
              <p className="text-xs font-semibold text-indian-navy/40 mt-1">Step 0{index + 1} • Executed successfully</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentTimeline;

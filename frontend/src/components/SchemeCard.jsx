import React from 'react';

const evaluateEligibility = (scheme, profile) => {
  if (!profile) return { status: 'Unknown', color: 'bg-slate-100 text-indian-navy/60 border-black/5' };
  
  const rules = scheme.eligibility_rules;
  if (!rules || Object.keys(rules).length === 0) 
    return { status: 'Possibly Eligible', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };

  let matches = true;
  let missingData = false;

  if (rules.income_max) {
    if (!profile.income) missingData = true;
    else if (profile.income > rules.income_max) matches = false;
  }

  if (rules.student !== undefined) {
    if (!profile.occupation) missingData = true;
    else if (rules.student && profile.occupation.toLowerCase() !== 'student') matches = false;
  }

  if (!matches) return { status: 'Not Eligible', color: 'bg-red-100 text-red-800 border-red-200' };
  if (missingData) return { status: 'Possibly Eligible', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
  
  return { status: 'Eligible', color: 'bg-indian-green/10 text-indian-green border-indian-green/20' };
};


const SchemeCard = ({ scheme, citizenProfile }) => {
  const { scheme_name, description, benefit, eligibility_rules, documents_required } = scheme;
  
  const eligibility = evaluateEligibility(scheme, citizenProfile);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group relative">
      
      {/* Dynamic Badge Header */}
      {citizenProfile && (
        <div className="absolute top-6 right-6">
          <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg border shadow-sm ${eligibility.color}`}>
            {eligibility.status}
          </span>
        </div>
      )}

      {/* Title & Desc */}
      <div className="flex-1 mt-3">
        <h3 className="text-2xl font-extrabold text-indian-navy mb-4 group-hover:text-indian-saffron transition-colors tracking-tight line-clamp-2 pr-24">
          {scheme_name}
        </h3>
        
        <p className="text-indian-navy/70 mb-6 leading-relaxed line-clamp-3 text-sm">
          {description}
        </p>

        <div className="mb-6">
          <span className="inline-block bg-indian-green/10 text-indian-green text-sm font-black uppercase tracking-wider px-4 py-2 rounded-xl border border-indian-green/20 whitespace-nowrap">
             {benefit}
          </span>
        </div>

        {/* Eligibility Details */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-indian-navy/50 uppercase tracking-widest mb-3">Eligibility Summary</h4>
          <ul className="text-sm text-indian-navy/80 space-y-2">
             {eligibility_rules && Object.keys(eligibility_rules).length > 0 ? (
                 Object.entries(eligibility_rules).map(([key, value]) => (
                   <li key={key} className="flex items-center space-x-2 bg-slate-50/50 p-2 rounded-lg border border-black/5">
                     <svg className="w-4 h-4 text-indian-saffron shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                     <span className="capitalize text-indian-navy/70">{key.replace('_', ' ')}:</span> 
                     <span className="font-bold text-indian-navy">{typeof value === 'boolean' ? (value ? 'Required' : 'No requirement') : `${value.toLocaleString('en-IN')}`}</span>
                   </li>
                 ))
             ) : (
                <li className="text-indian-navy/40 italic text-xs">No rigid internal bounds discovered.</li>
             )}
          </ul>
        </div>

        {/* Docs */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-indian-navy/50 uppercase tracking-widest mb-3">Documents Required</h4>
          <div className="flex flex-wrap gap-2">
            {documents_required && documents_required.length > 0 ? (
              documents_required.map((doc, idx) => (
                <span key={idx} className="bg-indian-saffron/10 text-indian-saffron text-xs font-bold px-3 py-1.5 rounded-lg border border-indian-saffron/20">
                  {doc}
                </span>
              ))
            ) : (
              <span className="text-xs text-indian-navy/40 bg-slate-50 px-2 py-1 rounded">No documents strictly listed</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Action Button */}
      <div className="mt-auto pt-5 border-t border-black/5">
        <button className="w-full py-3.5 text-center bg-indian-saffron/10 hover:bg-indian-saffron text-indian-saffron hover:text-white font-black rounded-xl transition-all duration-300 uppercase tracking-wider text-sm shadow-sm group-hover:shadow-md">
          Check Eligibility
        </button>
      </div>
    </div>
  );
};

export default SchemeCard;

import React from 'react';

const SchemeCard = ({ scheme }) => {
  const { scheme_name, description, benefit, eligibility_rules, documents_required } = scheme;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col h-full group">
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors tracking-tight">
          {scheme_name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm">
          {description}
        </p>

        <div className="mb-5">
          <span className="inline-block bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-green-200">
             Benefit: {benefit}
          </span>
        </div>

        {/* Eligibility Rules Block */}
        <div className="mb-5 bg-blue-50/40 p-4 rounded-xl border border-blue-50/80">
          <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-3">Eligibility Rules</h4>
          <ul className="text-sm text-gray-700 space-y-2">
             {eligibility_rules && Object.keys(eligibility_rules).length > 0 ? (
                 Object.entries(eligibility_rules).map(([key, value]) => (
                   <li key={key} className="flex items-center space-x-2">
                     <svg className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                     <span className="capitalize">{key.replace('_', ' ')}:</span> 
                     <span className="font-semibold text-gray-900">{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value.toLocaleString('en-IN')}</span>
                   </li>
                 ))
             ) : (
                <li className="text-gray-500 italic text-xs">No specific eligibility listed.</li>
             )}
          </ul>
        </div>
      </div>

      <div className="mt-auto">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Required Documents</h4>
        <div className="flex flex-wrap gap-2">
          {documents_required && documents_required.length > 0 ? (
            documents_required.map((doc, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md border border-gray-200">
                {doc}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">None specified</span>
          )}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
        <button className="text-blue-600 font-bold text-sm flex items-center hover:text-blue-800 transition-colors">
          View Details
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default SchemeCard;

import React, { useState, useEffect } from 'react';
import { documentStatus } from '../data/mockData';

const SchemeFilters = ({ schemes, setFilteredSchemes, userProfile }) => {
  const [incomeRange, setIncomeRange] = useState('');
  const [maxBenefit, setMaxBenefit] = useState(250000);
  const [selectedDocs, setSelectedDocs] = useState([]);
  
  // Scrape distinct documents natively across array to render dynamic selects
  const allDocs = Array.from(new Set(
    schemes.flatMap(s => s.documents_required || [])
  )).filter(Boolean).slice(0, 10);

  useEffect(() => {
    if (userProfile) {
      // 1. Auto-select the income bucket the user belongs to
      const income = Number(userProfile.income);
      if (income <= 100000) setIncomeRange('100000');
      else if (income <= 250000) setIncomeRange('250000');
      else if (income <= 500000) setIncomeRange('500000');
      else if (income <= 800000) setIncomeRange('800000');

      // 2. Set max benefit slider to maximum by default to explore all options
      setMaxBenefit(250000);

      // 3. Auto-select documents they have uploaded (verified)
      const verifiedDocs = documentStatus
        .filter(d => d.status === 'verified')
        .map(d => d.name);
      
      // Combine with any profile specific docs if they exist
      const profileDocs = userProfile.documents || [];
      const allPossessed = Array.from(new Set([...verifiedDocs, ...profileDocs]));
      
      setSelectedDocs(allPossessed);
    }
  }, [userProfile]);

  useEffect(() => {
    let result = [...schemes];

    // 1. Income parsing & Eligibility map
    if (userProfile && userProfile.income) {
      const uIncome = Number(userProfile.income);
      result = result.filter(scheme => {
        const rules = scheme.eligibility_rules;
        if (!rules || !rules.income_max) return true;
        // User is eligible if their income is less than or equal to the scheme's max limit
        return uIncome <= rules.income_max;
      });
    } else if (incomeRange) {
      const maxIncomeNum = parseInt(incomeRange);
      result = result.filter(scheme => {
        if (!scheme.eligibility_rules?.income_max) return true; 
        return scheme.eligibility_rules.income_max >= maxIncomeNum;
      });
    }

    // 2. Strict Document checking
    if (selectedDocs.length > 0) {
      result = result.filter(scheme => {
        const reqDocs = scheme.documents_required || [];
        return selectedDocs.some(doc => reqDocs.includes(doc));
      });
    }

    // 3. Benefit slider logic. Parse numeric equivalents dynamically out of strings like '₹50,000/year'.
    result = result.filter(scheme => {
      const numStr = String(scheme.benefit).replace(/[^0-9]/g, '');
      const val = parseInt(numStr, 10);
      if (isNaN(val)) return true; // Ignored if the metric format differs
      return val <= maxBenefit;
    });

    // 4. Student status logic (if profile present)
    if (userProfile) {
      const isStudent = userProfile.occupation?.toLowerCase() === 'student' || userProfile.student === true;
      result = result.filter(scheme => {
        const rules = scheme.eligibility_rules;
        if (!rules || rules.student === undefined) return true;
        return rules.student === isStudent;
      });
    }

    setFilteredSchemes(result);
  }, [schemes, incomeRange, selectedDocs, maxBenefit, setFilteredSchemes, userProfile]);

  const toggleDoc = (doc) => {
    if (selectedDocs.includes(doc)) {
      setSelectedDocs(selectedDocs.filter(d => d !== doc));
    } else {
      setSelectedDocs([...selectedDocs, doc]);
    }
  };

  const handleReset = () => {
    setIncomeRange('');
    setMaxBenefit(250000);
    setSelectedDocs([]);
    setFilteredSchemes(schemes);
  };

  return (
    <div className="bg-white p-8 rounded-[32px] shadow-[0_4px_30px_-10px_rgba(0,0,0,0.05)] border border-black/5 mb-12 w-full animate-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Income Range Config */}
        <div className="flex-1 space-y-3">
          <label className="text-sm font-bold text-indian-navy uppercase tracking-widest block">Income Bound</label>
          <div className="relative">
            <select 
              value={incomeRange}
              onChange={(e) => setIncomeRange(e.target.value)}
              className="w-full bg-slate-50 border border-black/5 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-indian-saffron/10 focus:border-indian-saffron outline-none transition-all appearance-none text-indian-navy cursor-pointer"
            >
              <option value="">No Strict Income Bounds</option>
              <option value="100000">{'Less than ₹1,000,000/yr'}</option>
              <option value="250000">{'Less than ₹250,000/yr'}</option>
              <option value="500000">{'Less than ₹500,000/yr'}</option>
              <option value="800000">{'Less than ₹800,000/yr'}</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-indian-navy/40">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Benefits Range */}
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-center text-sm font-bold text-indian-navy uppercase tracking-widest">
            <label>Max Benefit Size</label>
            <span className="text-white bg-indian-saffron px-3 py-1 rounded-lg font-black tracking-widest shadow-sm">₹{maxBenefit.toLocaleString()}</span>
          </div>
          <div className="pt-2">
            <input 
                type="range" 
                min="10000" 
                max="250000" 
                step="10000"
                value={maxBenefit} 
                onChange={(e) => setMaxBenefit(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indian-saffron transition-all focus:outline-none focus:ring-4 focus:ring-indian-saffron/20"
            />
          </div>
          <div className="flex justify-between text-xs text-indian-navy/40 font-bold px-1">
            <span>₹10K</span>
            <span>₹250K+</span>
          </div>
        </div>

        {/* Documents Toggles */}
        <div className="flex-[1.5] space-y-3">
           <label className="text-sm font-bold text-indian-navy uppercase tracking-widest block mb-3">Possessed Documents</label>
           <div className="flex flex-wrap gap-2">
              {allDocs.map(doc => (
                <button
                  key={doc}
                  type="button"
                  onClick={() => toggleDoc(doc)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                    selectedDocs.includes(doc)
                      ? 'bg-indian-saffron text-white border-indian-saffron shadow-md shadow-indian-saffron/20 translate-y-[-2px]'
                      : 'bg-white text-indian-navy/70 border-black/5 hover:border-indian-saffron/30 hover:bg-indian-saffron/5'
                  }`}
                >
                  {doc}
                </button>
              ))}
              {allDocs.length === 0 && <span className="text-sm text-indian-navy/40 italic py-2">Loading documents index...</span>}
           </div>
        </div>

      </div>

      <div className="mt-8 pt-6 border-t border-black/5 flex justify-end">
         <button 
           onClick={handleReset}
           className="px-8 py-3 bg-white border border-black/5 hover:bg-slate-50 text-indian-navy/80 rounded-xl font-black transition-all text-sm uppercase tracking-wider hover:shadow-sm"
         >
           Reset Filters
         </button>
      </div>

    </div>
  );
};

export default SchemeFilters;

import React, { useState, useEffect } from 'react';

const docTypeToField = {
  'Aadhaar Card': 'aadhaar_card',
  'PAN Card': 'pan_card',
  'Passport': 'passport',
  'Voter ID': 'voter_id',
  'Driving License': 'driving_license',
  'Ration Card': 'ration_card',
  'Birth Certificate': 'birth_certificate',
  'Death Certificate': 'death_certificate',
  'Marriage Certificate': 'marriage_certificate',
  'Caste Status Certificate': 'caste_status_certificate',
  'Income Certificate': 'income_certificate'
};

const SchemeFilters = ({ schemes, setFilteredSchemes, userProfile, search = '' }) => {
  const [incomeRange, setIncomeRange] = useState('');
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [genderFilter, setGenderFilter] = useState('');
  // Track whether the user has manually overridden a filter
  const [incomeOverride, setIncomeOverride] = useState(false);
  const [genderOverride, setGenderOverride] = useState(false);

  // Use canonical document list (matches DB boolean columns exactly)
  const allDocs = Object.keys(docTypeToField);

  useEffect(() => {
    if (userProfile) {
      // 1. Auto-select the income bucket the user belongs to (only if user hasn't overridden)
      if (!incomeOverride) {
        const income = Number(userProfile.income);
        if (income <= 100000) setIncomeRange('100000');
        else if (income <= 250000) setIncomeRange('250000');
        else if (income <= 500000) setIncomeRange('500000');
        else if (income <= 800000) setIncomeRange('800000');
        else setIncomeRange('');
      }

      // 2. Auto-select documents they have verified in the database
      const possessedFromDb = Object.keys(docTypeToField).filter(typeName => {
        const fieldName = docTypeToField[typeName];
        return userProfile[fieldName] === true;
      });
      setSelectedDocs(possessedFromDb);

      // 3. Auto-select gender filter (only if user hasn't overridden)
      if (!genderOverride && userProfile.gender) {
        setGenderFilter(userProfile.gender);
      }
    }
  }, [userProfile]); // eslint-disable-line react-hooks/exhaustive-deps

  // Helper: check if userGender matches a scheme's gender rule (string OR array)
  const genderMatches = (ruleGender, userGender) => {
    if (!ruleGender) return true; // no restriction
    const g = userGender.toLowerCase();
    // normalize db value: non_binary → non-binary for comparison
    const normalize = v => v.toLowerCase().replace('_', '-');
    const gNorm = normalize(g);
    if (Array.isArray(ruleGender)) {
      return ruleGender.some(r => normalize(r) === gNorm);
    }
    const rNorm = normalize(String(ruleGender));
    return rNorm === 'all' || rNorm === gNorm;
  };

  useEffect(() => {
    let result = [...schemes];

    // 1. Initial Search/Keyword filtering (takes precedence if provided via props/AI)
    let searchMatches = [];
    if (search) {
      const s = search.toLowerCase();
      searchMatches = schemes.filter(scheme => 
        scheme.scheme_name?.toLowerCase().includes(s) ||
        scheme.description?.toLowerCase().includes(s) ||
        scheme.state?.toLowerCase().includes(s)
      );
    }

    // 2. Profile-based Filtering
    let profileFiltered = [...schemes];
    
    // Income filter
    const effectiveIncome = userProfile?.income ? Number(userProfile.income) : null;
    if (effectiveIncome) {
      profileFiltered = profileFiltered.filter(scheme => {
        const rules = scheme.eligibility_rules;
        if (!rules || !rules.income_max) return true;
        return profileIncome <= rules.income_max;
      });
    } else if (incomeRange) {
      const maxIncomeNum = parseInt(incomeRange);
      profileFiltered = profileFiltered.filter(scheme => {
        if (!scheme.eligibility_rules?.income_max) return true;
        return scheme.eligibility_rules.income_max >= maxIncomeNum;
      });
    }

    // 2. Gender filter: user dropdown wins when overridden, else use profile gender
    const effectiveGender = genderFilter || (!genderOverride ? userProfile?.gender : '');
    if (effectiveGender) {
      profileFiltered = profileFiltered.filter(scheme => {
        const rules = scheme.eligibility_rules;
        if (!rules || !rules.gender) return true;
        return genderMatches(rules.gender, effectiveGender);
      });
    }

    // Age filter 
    if (userProfile?.age) {
      const age = Number(userProfile.age);
      profileFiltered = profileFiltered.filter(scheme => {
        const rules = scheme.eligibility_rules;
        if (!rules) return true;
        if (rules.min_age && age < rules.min_age) return false;
        if (rules.max_age && age > rules.max_age) return false;
        if (rules.founder_age_max && age > rules.founder_age_max) return false;
        return true;
      });
    }

    // Occupation-based filtering
    if (userProfile?.occupation) {
      const occ = userProfile.occupation.toLowerCase();
      const isStudent = occ === 'student';

      profileFiltered = profileFiltered.filter(scheme => {
        const rules = scheme.eligibility_rules;
        if (!rules) return true;
        if (rules.student !== undefined && rules.student !== isStudent) return false;
        if (rules.occupation && rules.occupation.toLowerCase() !== occ) return false;
        return true;
      });
    }

    // Document checking
    if (selectedDocs.length > 0) {
      profileFiltered = profileFiltered.filter(scheme => {
        const reqDocs = scheme.documents_required || [];
        if (reqDocs.length === 0) return true;
        return reqDocs.some(reqDoc =>
          selectedDocs.some(sel => {
            const r = reqDoc.toLowerCase();
            const s = sel.toLowerCase();
            return r.includes(s.split(' ')[0]) || s.includes(r.split(' ')[0]);
          })
        );
      });
    }

    // Combine: If search exists, we show schemes that match search. 
    // If no search, we show profile filtered.
    // If both exist, we show search matches, BUT we could prioritize them.
    if (search) {
      result = searchMatches;
    } else {
      result = profileFiltered;
    }

    setFilteredSchemes(result);
  }, [schemes, incomeRange, selectedDocs, genderFilter, incomeOverride, genderOverride, setFilteredSchemes, userProfile, search]);

  const toggleDoc = (doc) => {
    if (selectedDocs.includes(doc)) {
      setSelectedDocs(selectedDocs.filter(d => d !== doc));
    } else {
      setSelectedDocs([...selectedDocs, doc]);
    }
  };

  const handleIncomeChange = (e) => {
    setIncomeOverride(true);
    setIncomeRange(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGenderOverride(true);
    setGenderFilter(e.target.value);
  };

  const handleReset = () => {
    setIncomeOverride(false);
    setGenderOverride(false);
    setIncomeRange('');
    setGenderFilter('');
    setSelectedDocs([]);
  };

  return (
    <div className="bg-white p-8 rounded-[32px] shadow-[0_4px_30px_-10px_rgba(0,0,0,0.05)] border border-black/5 mb-12 w-full animate-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Income Range Config */}
        <div className="flex-1 space-y-3 font-outfit">
          <label className="text-sm font-bold text-indian-navy uppercase tracking-widest block">Income Bound</label>
          <div className="relative">
            <select 
              value={incomeRange}
              onChange={handleIncomeChange}
              className="w-full bg-slate-50 border border-black/5 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-indian-saffron/10 focus:border-indian-saffron outline-none transition-all appearance-none text-indian-navy cursor-pointer"
            >
              <option value="">No Strict Income Bounds</option>
              <option value="100000">{'Less than ₹100,000/yr'}</option>
              <option value="250000">{'Less than ₹250,000/yr'}</option>
              <option value="500000">{'Less than ₹500,000/yr'}</option>
              <option value="800000">{'Less than ₹800,000/yr'}</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-indian-navy/40">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Gender Filter Config */}
        <div className="flex-1 space-y-3 font-outfit">
          <label className="text-sm font-bold text-indian-navy uppercase tracking-widest block">Gender Basis</label>
          <div className="relative">
            <select 
              value={genderFilter}
              onChange={handleGenderChange}
              className="w-full bg-slate-50 border border-black/5 rounded-2xl px-5 py-4 text-sm font-semibold focus:ring-4 focus:ring-indian-saffron/10 focus:border-indian-saffron outline-none transition-all appearance-none text-indian-navy cursor-pointer"
            >
              <option value="">Show All Genders</option>
              <option value="male">Male Specific</option>
              <option value="female">Female Specific</option>
              <option value="non_binary">Non-Binary Specific</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-indian-navy/40">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Documents Toggles */}
        <div className="flex-[2] space-y-3 font-outfit">
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
              {allDocs.length === 0 && <span className="text-sm text-indian-navy/40 italic py-2">Scanning schemas for requirements...</span>}
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

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SchemeCard from '../components/SchemeCard';
import SchemeFilters from '../components/SchemeFilters';
import { useSchemes } from '../hooks/useSchemes';

const SchemesPage = () => {
  const { schemes, loading, error } = useSchemes();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchemes = schemes.filter(scheme => {
    const query = searchQuery.toLowerCase();
    const nameMatch = scheme.scheme_name?.toLowerCase().includes(query);
    const descMatch = scheme.description?.toLowerCase().includes(query);
    return nameMatch || descMatch;
  });

  return (
    <div className="min-h-screen bg-indian-offwhite flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-12 text-center md:text-left mx-2">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
              Government Schemes
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Discover and apply for financial aid, scholarships, and initiatives practically tailored to your demographic profile.
            </p>
          </div>

          <SchemeFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {loading && (
            <div className="flex flex-col justify-center items-center py-24 space-y-4">
              <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-500 font-medium">Fetching active schemes...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center font-bold my-12 shadow-sm max-w-2xl mx-auto">
              Warning: Could not fetch schemes via backend. ({error})
            </div>
          )}

          {!loading && !error && filteredSchemes.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm mx-2">
              <span className="text-5xl mb-6 block">🔍</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No matching schemes found</h3>
              <p className="text-gray-500 text-lg">Try adjusting your filters or search keywords.</p>
            </div>
          )}

          {!loading && !error && filteredSchemes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {filteredSchemes.map((scheme) => (
                <div key={scheme.id} className="animate-in fade-in zoom-in-95 duration-700 fill-mode-both" style={{ animationDelay: `${(scheme.id % 10) * 50}ms` }}>
                  <SchemeCard scheme={scheme} />
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SchemesPage;

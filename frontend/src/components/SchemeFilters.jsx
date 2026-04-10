import React from 'react';

const SchemeFilters = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="bg-white p-4 mx-2 rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-center transition-all hover:shadow-md">
      <div className="relative flex-1 w-full group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input
          type="text"
          placeholder="Search schemes by name or description..."
          className="pl-11 w-full rounded-xl border-none outline-none bg-gray-50 text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-100 py-3.5 transition-all font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <button className="px-5 py-3.5 bg-gray-50 text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors font-semibold flex-1 md:flex-none">
          Category
        </button>
        <button className="px-5 py-3.5 bg-gray-50 text-gray-600 rounded-xl border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-colors font-semibold flex-1 md:flex-none">
          Eligibility
        </button>
      </div>
    </div>
  );
};

export default SchemeFilters;

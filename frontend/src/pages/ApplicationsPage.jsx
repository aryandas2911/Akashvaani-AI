import React from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { applicationSnapshot } from '../data/mockData';

const ApplicationStatusBadge = ({ status }) => {
  if (status === 'Approved') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 font-bold text-xs rounded-lg border border-green-200">
        <CheckCircle2 className="w-3.5 h-3.5" /> Approved
      </span>
    );
  }
  if (status === 'Rejected') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 font-bold text-xs rounded-lg border border-red-200">
        <XCircle className="w-3.5 h-3.5" /> Rejected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 font-bold text-xs rounded-lg border border-orange-200">
      <Clock className="w-3.5 h-3.5" /> Pending
    </span>
  );
};

const ApplicationsPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto pb-10 space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-indian-navy tracking-tight">Your Applications</h1>
          <p className="text-slate-500 mt-1">Your applications are tracked here in real time.</p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search applications ID or scheme..." 
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold">
                <th className="p-4 pl-6 whitespace-nowrap">Application ID</th>
                <th className="p-4 whitespace-nowrap">Scheme Name</th>
                <th className="p-4 whitespace-nowrap">Status</th>
                <th className="p-4 pr-6 whitespace-nowrap">Last Updated</th>
                <th className="p-4 pr-6 text-right whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applicationSnapshot.length > 0 ? applicationSnapshot.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="p-4 pl-6 font-mono text-sm text-slate-600 font-medium">#{app.id.split('-')[1]}</td>
                  <td className="p-4 font-bold text-indian-navy">{app.schemeName}</td>
                  <td className="p-4">
                    <ApplicationStatusBadge status={app.status} />
                  </td>
                  <td className="p-4 text-slate-500 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" /> {app.date}
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-500">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-lg font-medium text-slate-700">No applications found</p>
                    <p className="text-sm">You haven't submitted any applications yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicationsPage;

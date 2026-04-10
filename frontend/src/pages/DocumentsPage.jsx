import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, CheckCircle2, AlertCircle, File, Plus } from 'lucide-react';
import { documentStatus } from '../data/mockData';

const DocumentCard = ({ doc }) => {
  const isVerified = doc.status === 'verified';
  const isMissing = doc.status === 'missing';
  
  return (
    <div className={`p-6 rounded-3xl border ${isVerified ? 'border-green-100 bg-green-50/30' : isMissing ? 'border-red-100 bg-red-50/30' : 'border-slate-200 bg-white'} shadow-sm flex flex-col justify-between h-full group hover:shadow-md transition-all`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isVerified ? 'bg-green-100 text-green-600' : isMissing ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
          <File className="w-6 h-6" />
        </div>
        <div>
          {isVerified && <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold"><CheckCircle2 className="w-3.5 h-3.5" /> Verified</span>}
          {isMissing && <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-bold"><AlertCircle className="w-3.5 h-3.5" /> Required</span>}
          {doc.status === 'pending' && <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-bold">Pending Setup</span>}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-bold text-slate-800 text-lg mb-1">{doc.name}</h3>
        <p className="text-sm text-slate-500">
          {isVerified ? 'Automatically verified via DigiLocker or manual upload.' : 'Required for most scholarship schemes.'}
        </p>
      </div>
      
      {!isVerified && (
        <button className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 font-bold text-sm flex items-center justify-center gap-2 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors group-hover:bg-white">
          <UploadCloud className="w-4 h-4" />
          Upload Document
        </button>
      )}
      {isVerified && (
         <button className="w-full py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
          View Document
        </button>
      )}
    </div>
  );
};

const DocumentsPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto pb-10 space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-r from-indian-navy to-blue-900 rounded-3xl p-8 text-white shadow-xl shadow-indian-navy/20">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Digital Document Vault</h1>
          <p className="text-blue-100 text-lg max-w-xl">Upload once. Apply anywhere. Your AI assistant securely uses these to pre-fill eligibility forms.</p>
        </div>
        <button className="whitespace-nowrap px-6 py-4 bg-white text-indian-navy hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg">
          <Plus className="w-5 h-5" />
          Upload New Document
        </button>
      </div>

      <div className="mt-8">
         <h2 className="text-xl font-bold text-indian-navy mb-6">Your Profile Documents</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {documentStatus.map(doc => (
             <DocumentCard key={doc.id} doc={doc} />
           ))}
         </div>
      </div>
    </motion.div>
  );
};

export default DocumentsPage;

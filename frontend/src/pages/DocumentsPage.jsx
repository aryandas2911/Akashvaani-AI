import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle2, AlertCircle, File, Loader2, ExternalLink } from 'lucide-react';
import { useCitizen } from '../context/CitizenContext';
import { extractProfile, fetchDocumentUrl } from '../services/aiApi';
import { updateUser, getUserById } from '../services/api';

const DocumentCard = ({ doc }) => {
  const { addDocument, citizenData, updateCitizen } = useCitizen();
  const [isUploading, setIsUploading] = useState(false);
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const fileInputRef = useRef(null);

  const isVerified = doc.status === 'verified';
  const isMissing = doc.status === 'missing';
  
  const handleView = async () => {
    if (doc.url) {
      window.open(doc.url, '_blank');
      return;
    }

    // If no URL in context, fetch from storage
    if (citizenData?.profile?.id) {
       setIsFetchingUrl(true);
       try {
         const res = await fetchDocumentUrl(citizenData.profile.id, doc.name);
         if (res.url) {
           window.open(res.url, '_blank');
         }
       } catch (err) {
         console.error(err);
         alert("Could not fetch document from storage.");
       } finally {
         setIsFetchingUrl(false);
       }
    }
  };
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // 1. OCR Extraction + DB boolean flag update (backend handles via doc_type param)
      const extractedData = await extractProfile(file, citizenData?.profile?.id, doc.name);
      
      // 2. Add to local vault context
      addDocument({
        name: doc.name,
        status: 'verified',
        type: doc.name,
        date: new Date().toLocaleDateString(),
        url: extractedData.file_url || URL.createObjectURL(file)
      });

      // 3. Map document name to the DB boolean column
      const DOC_FIELD_MAP = {
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
      const flagField = DOC_FIELD_MAP[doc.name];

      // 4. Merge the doc flag with any newly extracted profile fields
      const profileUpdates = {
        name: extractedData.name !== 'Unknown' ? extractedData.name : undefined,
        age: extractedData.age,
        gender: extractedData.gender,
        state: extractedData.state,
        district: extractedData.district,
        occupation: extractedData.occupation,
        income: extractedData.annual_income,
        education: extractedData.education,
        email: extractedData.email,
        // Always mark this doc as verified in context
        ...(flagField ? { [flagField]: true } : {})
      };
      
      const cleanUpdates = Object.fromEntries(
        Object.entries(profileUpdates).filter(([_, v]) => v != null)
      );
      
      if (Object.keys(cleanUpdates).length > 0) {
        updateCitizen(cleanUpdates);
      }

      // 5. Explicitly write the doc boolean flag to DB as a guaranteed save
      if (flagField && citizenData?.profile?.id) {
        try {
          await updateUser(citizenData.profile.id, { [flagField]: true });
          // 6. Re-fetch the full user record from DB to sync context
          const freshUser = await getUserById(citizenData.profile.id);
          if (freshUser) {
            updateCitizen(freshUser);
          }
        } catch (dbErr) {
          console.error('DB flag update failed:', dbErr);
        }
      }

    } catch (err) {
      console.error(err);
      alert("Failed to process document. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`p-6 rounded-3xl border ${isVerified ? 'border-green-100 bg-green-50/30' : isMissing ? 'border-red-100 bg-red-50/30' : 'border-slate-200 bg-white'} shadow-sm flex flex-col justify-between h-full group hover:shadow-md transition-all relative overflow-hidden`}>
      <AnimatePresence>
        {isUploading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center"
          >
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
            <p className="text-xs font-bold text-blue-900 uppercase tracking-widest">AI Scanning...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isVerified ? 'bg-green-100 text-green-600' : isMissing ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
          <File className="w-6 h-6" />
        </div>
        <div>
          {isVerified && <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold"><CheckCircle2 className="w-3.5 h-3.5" /> Verified</span>}
          {isMissing && <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-bold"><AlertCircle className="w-3.5 h-3.5" /> Missing</span>}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-bold text-slate-800 text-lg mb-1">{doc.name}</h3>
        <p className="text-sm text-slate-500">
          {isVerified ? `Automatically verified on ${doc.date || 'unknown date'}.` : `Required for scheme eligibility verification.`}
        </p>
      </div>
      
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*,.pdf"
      />

      {!isVerified ? (
        <button 
          onClick={() => fileInputRef.current.click()}
          className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 font-bold text-sm flex items-center justify-center gap-2 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors group-hover:bg-white"
        >
          <UploadCloud className="w-4 h-4" />
          Upload & Verify
        </button>
      ) : (
         <button 
           onClick={handleView}
           disabled={isFetchingUrl}
           className="w-full py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors disabled:opacity-50"
         >
          {isFetchingUrl ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
          View Document
        </button>
      )}
    </div>
  );
};

const DocumentsPage = () => {
  const { userDocuments, citizenData } = useCitizen();
  const profile = citizenData?.profile || {};

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

  const allDocTypes = Object.keys(docTypeToField);

  // Map all document types to their current status
  const allDocs = allDocTypes.map(typeName => {
    const uploaded = userDocuments.find(ud => ud.type === typeName || ud.name === typeName);
    const dbVerified = profile[docTypeToField[typeName]] === true;

    if (uploaded) return { ...uploaded, status: 'verified' };
    if (dbVerified) return { name: typeName, status: 'verified', date: 'verified in profile' };
    return { name: typeName, status: 'missing' };
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto pb-10 space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Citizen Document Vault</h1>
          <p className="text-slate-500 mt-1">Upload and manage your documents. AI will extract and verify details automatically.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allDocs.map((doc, idx) => (
          <DocumentCard key={idx} doc={doc} />
        ))}
      </div>
    </motion.div>
  );
};

export default DocumentsPage;

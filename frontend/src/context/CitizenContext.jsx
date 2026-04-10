import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserById } from '../services/api';

const CitizenContext = createContext();

export const CitizenProvider = ({ children }) => {
  const [citizenData, setCitizenData] = useState(() => {
    const saved = localStorage.getItem('citizenData');
    return saved ? JSON.parse(saved) : null;
  });

  const [userDocuments, setUserDocuments] = useState(() => {
    const saved = localStorage.getItem('userDocuments');
    return saved ? JSON.parse(saved) : [];
  });

  // Background refresh on load
  useEffect(() => {
    const refreshUser = async () => {
      if (citizenData?.profile?.id && !citizenData.isDemo) {
        try {
          const freshUser = await getUserById(citizenData.profile.id);
          if (freshUser) {
            setCitizenData(prev => ({
              ...prev,
              profile: freshUser
            }));
          }
        } catch (err) {
          console.error("Failed to refresh user from DB", err);
        }
      }
    };
    refreshUser();
  }, []);

  useEffect(() => {
    if (citizenData) {
      localStorage.setItem('citizenData', JSON.stringify(citizenData));
    } else {
      localStorage.removeItem('citizenData');
    }
  }, [citizenData]);

  useEffect(() => {
    localStorage.setItem('userDocuments', JSON.stringify(userDocuments));
  }, [userDocuments]);

  const setCitizen = (userData, extraFlags = {}) => {
    // Detect if this is the demo user
    const isDemo = userData.email === 'user@gmail.com';
    const data = { 
      profile: userData, 
      eligibleSchemes: userData.eligibleSchemes || [], 
      totalBenefits: userData.totalBenefits || "₹0", 
      isDemo,
      ...extraFlags
    };
    setCitizenData(data);
  };


  const loadDemoCitizen = (profile, eligibleSchemes, totalBenefits) => {
    const data = { 
      profile, 
      eligibleSchemes: eligibleSchemes || [], 
      totalBenefits: totalBenefits || "₹0", 
      isDemo: true 
    };
    setCitizenData(data);
  };

  const addDocument = (doc) => {
    setUserDocuments(prev => [...prev, { ...doc, id: Date.now() }]);
  };

  const updateCitizen = (updates) => {
    const data = { ...citizenData, profile: { ...citizenData.profile, ...updates } };
    setCitizenData(data);
  };

  const clearCitizen = () => {
    setCitizenData(null);
    setUserDocuments([]);
    localStorage.removeItem('citizenData');
    localStorage.removeItem('userDocuments');
  };

  return (
    <CitizenContext.Provider value={{ 
      citizenData, 
      setCitizen, 
      updateCitizen, 
      loadDemoCitizen, 
      clearCitizen,
      userDocuments,
      addDocument,
      setUserDocuments
    }}>
      {children}
    </CitizenContext.Provider>
  );
};

export const useCitizen = () => useContext(CitizenContext);


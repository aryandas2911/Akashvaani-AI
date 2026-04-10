import React, { createContext, useState, useContext } from 'react';

const CitizenContext = createContext();

export const CitizenProvider = ({ children }) => {
  const [citizenData, setCitizenData] = useState(null);

  const loadDemoCitizen = (profile, eligibleSchemes, totalBenefits) => {
    setCitizenData({ profile, eligibleSchemes, totalBenefits });
  };

  const clearCitizen = () => setCitizenData(null);

  return (
    <CitizenContext.Provider value={{ citizenData, loadDemoCitizen, clearCitizen }}>
      {children}
    </CitizenContext.Provider>
  );
};

export const useCitizen = () => useContext(CitizenContext);

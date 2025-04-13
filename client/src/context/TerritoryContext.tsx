import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Territory {
  id: string;
  name: string;
  coordinates: [number, number][][];
  color: string;
  population: number;
  resources: string[];
}

interface TerritoryContextType {
  territories: Territory[];
  setTerritories: (territories: Territory[]) => void;
  selectedTerritory: Territory | null;
  setSelectedTerritory: (territory: Territory | null) => void;
  hoveredTerritory: Territory | null;
  setHoveredTerritory: (territory: Territory | null) => void;
}

const TerritoryContext = createContext<TerritoryContextType | undefined>(undefined);

export const TerritoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [territories, setTerritories] = useState<Territory[]>([]);
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);
  const [hoveredTerritory, setHoveredTerritory] = useState<Territory | null>(null);

  return (
    <TerritoryContext.Provider
      value={{
        territories,
        setTerritories,
        selectedTerritory,
        setSelectedTerritory,
        hoveredTerritory,
        setHoveredTerritory,
      }}
    >
      {children}
    </TerritoryContext.Provider>
  );
};

export const useTerritory = () => {
  const context = useContext(TerritoryContext);
  if (context === undefined) {
    throw new Error('useTerritory must be used within a TerritoryProvider');
  }
  return context;
}; 
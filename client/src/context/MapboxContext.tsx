import React, { createContext, useContext, useState, ReactNode } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapboxContextType {
  map: mapboxgl.Map | null;
  setMap: (map: mapboxgl.Map | null) => void;
  mapStyle: string;
  setMapStyle: (style: string) => void;
}

const MapboxContext = createContext<MapboxContextType | undefined>(undefined);

export const MapboxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [mapStyle, setMapStyle] = useState<string>('mapbox://styles/mapbox/light-v11');

  return (
    <MapboxContext.Provider value={{ map, setMap, mapStyle, setMapStyle }}>
      {children}
    </MapboxContext.Provider>
  );
};

export const useMapbox = () => {
  const context = useContext(MapboxContext);
  if (context === undefined) {
    throw new Error('useMapbox must be used within a MapboxProvider');
  }
  return context;
}; 
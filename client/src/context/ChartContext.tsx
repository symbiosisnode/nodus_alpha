import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChartContextType {
  chartData: any;
  setChartData: (data: any) => void;
  chartType: string;
  setChartType: (type: string) => void;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export const ChartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [chartType, setChartType] = useState<string>('line');

  return (
    <ChartContext.Provider
      value={{
        chartData,
        setChartData,
        chartType,
        setChartType,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export const useChart = () => {
  const context = useContext(ChartContext);
  if (context === undefined) {
    throw new Error('useChart must be used within a ChartProvider');
  }
  return context;
}; 
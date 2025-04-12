import React from 'react';

interface SANetworkTreeProps {
  networkData: {
    directCount: number;
    totalCount: number;
    recentGrowth: number;
    // Add more specific data structure later if needed for visualization
  };
}

const SANetworkTree: React.FC<SANetworkTreeProps> = ({ networkData }) => {
  return (
    <div className="bg-gray-50 p-4 rounded border border-dashed border-gray-300 h-48 flex flex-col justify-center items-center">
      <p className="text-lg font-semibold text-gray-700">SA Network Tree</p>
      <p className="text-sm text-gray-500 mt-1">Visualization Placeholder</p>
      <p className="text-sm text-gray-600 mt-4">Direct SAs: {networkData.directCount}</p>
      <p className="text-sm text-gray-600">Total SAs: {networkData.totalCount}</p>
    </div>
  );
};

export default SANetworkTree; 
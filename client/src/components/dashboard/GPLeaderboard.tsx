import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid'; // Example icon

// Define the type for a single leaderboard entry based on mto.json
interface LeaderboardEntry {
  gpId: string;
  name: string;
  rank: number;
  performance: number;
}

interface GPLeaderboardProps {
  leaderboardData: LeaderboardEntry[];
}

const GPLeaderboard: React.FC<GPLeaderboardProps> = ({ leaderboardData }) => {
  if (!leaderboardData || leaderboardData.length === 0) {
    return <p className="text-gray-500 italic">No leaderboard data available.</p>;
  }

  // Sort by rank
  const sortedData = [...leaderboardData].sort((a, b) => a.rank - b.rank);

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {sortedData.map((entry, entryIdx) => (
          <li key={entry.gpId}>
            <div className="relative pb-8">
              {/* Connecting line (except for last item) */}
              {entryIdx !== sortedData.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3 items-center">
                <div>
                  {/* Rank Indicator */}
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ${entry.rank === 1 ? 'ring-yellow-400 bg-yellow-400' : entry.rank === 2 ? 'ring-gray-300 bg-gray-300' : entry.rank === 3 ? 'ring-yellow-700 bg-yellow-700' : 'ring-gray-200 bg-gray-200' }`}>
                    {entry.rank <= 3 ? (
                         <StarIcon className={`h-5 w-5 ${entry.rank === 1 ? 'text-white' : 'text-white' }`} aria-hidden="true" />
                    ) : (
                        <span className="text-xs font-medium text-gray-600">{entry.rank}</span>
                    )}
                   </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  {/* GP Info */}
                  <div>
                    <p className="text-sm text-gray-900">
                      {entry.name}
                    </p>
                    <p className="text-xs text-gray-500">ID: {entry.gpId}</p>
                  </div>
                  {/* Performance */}
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <span className="font-medium text-gray-700">Perf: {entry.performance}%</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GPLeaderboard; 
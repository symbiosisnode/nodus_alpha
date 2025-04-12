import React from 'react';

interface Milestone {
  id: string;
  name: string;
  completed: boolean;
  progress?: number; // Optional progress for incomplete milestones
}

interface MilestoneTrackerProps {
  milestones: Milestone[];
}

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ milestones }) => {
  if (!milestones || milestones.length === 0) {
    return <p className="text-gray-500 italic">No milestones defined.</p>;
  }

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <div key={milestone.id} className="p-3 bg-white rounded border border-gray-200">
          <div className="flex justify-between items-center mb-1">
            <p className={`text-sm font-medium ${milestone.completed ? 'text-green-600' : 'text-gray-800'}`}>
              {milestone.name}
            </p>
            {milestone.completed ? (
              <span className="text-xs font-semibold text-white bg-growthGreen px-2 py-0.5 rounded-full">Completed</span>
            ) : (
              milestone.progress !== undefined && (
                <span className="text-xs text-gray-500">{milestone.progress}%</span>
              )
            )}
          </div>
          {!milestone.completed && milestone.progress !== undefined && (
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-auroraOrange h-1.5 rounded-full"
                style={{ width: `${milestone.progress}%` }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MilestoneTracker; 
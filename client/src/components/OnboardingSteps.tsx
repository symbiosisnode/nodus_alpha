import React from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface OnboardingStepsProps {
  steps: Step[];
}

export default function OnboardingSteps({ steps }: OnboardingStepsProps) {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  {step.number}
                </div>
                <h3 className="ml-4 text-lg leading-6 font-medium text-gray-900">
                  {step.title}
                </h3>
              </div>
              <p className="mt-2 text-base text-gray-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
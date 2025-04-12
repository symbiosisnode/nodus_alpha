import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, UserGroupIcon, BuildingOfficeIcon, ScaleIcon } from '@heroicons/react/24/solid'; // Assuming solid icons

const roles = [
  { name: 'Starter Agent (SA)', description: 'Build your portfolio, earn commissions.', icon: BuildingOfficeIcon, value: 'SA' },
  { name: 'Growth Partner (GP)', description: 'Recruit agents, scale your network.', icon: UserGroupIcon, value: 'GP' },
  { name: 'Market Operator (MTO)', description: 'Manage territories, drive market growth.', icon: ScaleIcon, value: 'MTO' },
];

const steps = [
  { id: 1, name: 'Select Your Role' },
  { id: 2, name: 'Account Setup' }, // Placeholder for role-specific steps
  { id: 3, name: 'Connect Wallet' }, // Generic placeholder
  { id: 4, name: 'Agree to Terms' }, // Generic placeholder
  { id: 5, name: 'Launch Dashboard' },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Simulate successful onboarding and navigate
      // In a real app, you'd save data and then navigate
      localStorage.setItem('nodus_user_role', selectedRole.value); // Simple role persistence for demo
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const ProgressBar = () => (
    <nav aria-label="Progress" className="mb-12">
      <ol role="list" className="flex items-center justify-center space-x-2 sm:space-x-4">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="flex-1">
            {currentStep > step.id ? (
              <div className="group flex w-full flex-col border-l-4 border-empireBlue py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-empireBlue transition-colors">
                  Step {step.id}
                </span>
                <span className="text-sm font-medium text-gray-700">{step.name}</span>
              </div>
            ) : currentStep === step.id ? (
              <div
                className="flex w-full flex-col border-l-4 border-auroraOrange py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                aria-current="step"
              >
                <span className="text-sm font-medium text-auroraOrange">Step {step.id}</span>
                <span className="text-sm font-medium text-gray-700">{step.name}</span>
              </div>
            ) : (
              <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-gray-500 transition-colors">
                  Step {step.id}
                </span>
                <span className="text-sm font-medium text-gray-500">{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );

  const StepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <RadioGroup value={selectedRole} onChange={setSelectedRole}>
            <RadioGroup.Label className="sr-only">Select Your Role</RadioGroup.Label>
            <div className="space-y-4">
              {roles.map((role) => (
                <RadioGroup.Option
                  key={role.name}
                  value={role}
                  className={({ active, checked }) =>
                    `${active ? 'ring-2 ring-offset-2 ring-offset-skyCanvas ring-empireBlue' : ''}
                    ${checked ? 'bg-empireBlue/10 border-empireBlue' : 'bg-white border-gray-200'}
                    relative block cursor-pointer rounded-lg border px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between transition`
                  }
                >
                  {({ checked }) => (
                    <>
                      <span className="flex items-center">
                        <span className="flex flex-col text-sm">
                          <RadioGroup.Label as="span" className="font-medium text-gray-900">
                            <role.icon className="inline h-5 w-5 mr-2 text-empireBlue" aria-hidden="true" />
                            {role.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description as="span" className="text-gray-500 mt-1">
                            {role.description}
                          </RadioGroup.Description>
                        </span>
                      </span>
                      {checked && (
                        <CheckCircleIcon className="h-6 w-6 text-empireBlue mt-2 sm:mt-0 sm:ml-4" aria-hidden="true" />
                      )}
                      <span
                        className={`${checked ? 'border-empireBlue' : 'border-transparent'}
                          absolute -inset-px rounded-lg border-2 pointer-events-none`}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        );
      case 2:
        return <div><h3 className="text-xl font-semibold mb-4 text-empireBlue">Account Setup ({selectedRole.name})</h3><p className="text-gray-600">Enter your details here (role-specific form placeholder).</p><input type="text" placeholder="Full Name" className="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-empireBlue focus:ring-empireBlue sm:text-sm" /></div>;
      case 3:
        return <div><h3 className="text-xl font-semibold mb-4 text-empireBlue">Connect Wallet</h3><p className="text-gray-600">Placeholder for wallet connection (e.g., MetaMask).</p><button className="mt-4 px-4 py-2 bg-auroraOrange text-white rounded hover:bg-auroraOrange/90">Connect Wallet</button></div>;
      case 4:
        return <div><h3 className="text-xl font-semibold mb-4 text-empireBlue">Terms & Conditions</h3><p className="text-gray-600">Review and agree to the terms.</p><label className="flex items-center mt-4"><input type="checkbox" className="rounded border-gray-300 text-empireBlue shadow-sm focus:border-empireBlue focus:ring focus:ring-offset-0 focus:ring-empireBlue focus:ring-opacity-50"/> <span className="ml-2 text-gray-700">I agree to the terms</span></label></div>;
      case 5:
        return <div><h3 className="text-xl font-semibold mb-4 text-empireBlue">Ready to Launch!</h3><p className="text-gray-600">You're all set. Click finish to enter your NODUS dashboard.</p></div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-skyCanvas to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <ProgressBar />
        <div className="mt-8">
          <StepContent />
        </div>
        <div className="mt-10 flex justify-between border-t pt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-growthGreen hover:bg-growthGreen/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-growthGreen"
          >
            {currentStep === steps.length ? 'Finish & Launch' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
}
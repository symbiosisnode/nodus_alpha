import React from 'react';
import { ClipboardDocumentIcon, ShareIcon } from '@heroicons/react/24/outline';

interface ReferralToolsProps {
  referralData: {
    code: string;
    link: string;
    conversions: number;
  };
}

const ReferralTools: React.FC<ReferralToolsProps> = ({ referralData }) => {

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Optional: Show a temporary success message
        console.log('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">Referral Code</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="referralCode"
            id="referralCode"
            readOnly
            value={referralData.code}
            className="block w-full flex-1 rounded-none rounded-l-md border-gray-300 bg-gray-100 px-3 py-2 focus:border-empireBlue focus:ring-empireBlue sm:text-sm"
          />
          <button
            type="button"
            onClick={() => copyToClipboard(referralData.code)}
            className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-empireBlue focus:outline-none focus:ring-1 focus:ring-empireBlue"
          >
            <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span>Copy</span>
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="referralLink" className="block text-sm font-medium text-gray-700">Referral Link</label>
        <div className="mt-1 flex rounded-md shadow-sm">
           <input
            type="text"
            name="referralLink"
            id="referralLink"
            readOnly
            value={referralData.link}
            className="block w-full flex-1 rounded-none rounded-l-md border-gray-300 bg-gray-100 px-3 py-2 focus:border-empireBlue focus:ring-empireBlue sm:text-sm"
          />
          <button
            type="button"
             onClick={() => copyToClipboard(referralData.link)}
            className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-empireBlue focus:outline-none focus:ring-1 focus:ring-empireBlue"
          >
             <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
             <span>Copy</span>
          </button>
        </div>
      </div>
       <div className="pt-2">
            <p className="text-sm text-gray-600">Successful Conversions: <span className="font-semibold text-empireBlue">{referralData.conversions}</span></p>
            {/* Optional: Add share button for social media */}
            {/* <button className="mt-2 ..."><ShareIcon/> Share Now</button> */}
       </div>
    </div>
  );
};

export default ReferralTools; 
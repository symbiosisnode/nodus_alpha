import React, { useState, useRef } from 'react';
import { NODUS_STYLE_GUIDE } from '../../styles/NodusStyleGuide';
import { useDesignGuard } from '../../hooks/useDesignGuard';

interface ReferralLinkGeneratorProps {
  baseUrl?: string;
  customCode?: string;
  onGenerate?: (code: string) => void;
  maxReferrals?: number;
  currentReferrals?: number;
}

const ReferralLinkGenerator: React.FC<ReferralLinkGeneratorProps> = ({
  baseUrl = 'https://nodus-now.net/join',
  customCode = '',
  onGenerate,
  maxReferrals = 10,
  currentReferrals = 0,
}) => {
  const [referralCode, setReferralCode] = useState(customCode);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showCustomCodeInput, setShowCustomCodeInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Check design compliance with NODUS Style Guide
  useDesignGuard('ReferralLinkGenerator', {
    cardRadius: NODUS_STYLE_GUIDE.components.cardRadius,
    cardPadding: NODUS_STYLE_GUIDE.components.cardPadding,
    buttonRadius: NODUS_STYLE_GUIDE.components.buttonRadius,
    primaryColor: NODUS_STYLE_GUIDE.colors.primary,
  });
  
  // Generate a random code if not provided
  const generateRandomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Omitting similar looking characters
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setReferralCode(result);
    if (onGenerate) onGenerate(result);
    setCopySuccess(false);
  };
  
  // If no custom code provided initially, generate one
  React.useEffect(() => {
    if (!customCode) {
      generateRandomCode();
    }
  }, [customCode]);
  
  // Handle copy to clipboard
  const copyToClipboard = () => {
    const fullUrl = `${baseUrl}/${referralCode}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };
  
  // Handle custom code input
  const handleCustomCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      // Clean input (alphanumeric only)
      const cleanCode = inputRef.current.value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
      setReferralCode(cleanCode);
      if (onGenerate) onGenerate(cleanCode);
      setShowCustomCodeInput(false);
      setCopySuccess(false);
    }
  };
  
  // Calculate remaining referrals
  const remainingReferrals = maxReferrals - currentReferrals;
  const referralPercentage = (currentReferrals / maxReferrals) * 100;
  
  return (
    <div className="w-full bg-card rounded-xl shadow-card p-6">
      <h3 className="font-semibold text-xl text-strong-text mb-2">Invite Your Network</h3>
      <p className="text-sm text-subtle mb-6">Share your unique referral link to invite others to join NODUS.</p>
      
      {/* Link Generation Area */}
      <div className="mb-6">
        {showCustomCodeInput ? (
          <form onSubmit={handleCustomCodeSubmit} className="flex flex-col gap-3">
            <label className="text-xs text-subtle">Create a custom referral code (letters & numbers only)</label>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                className="flex-1 px-3 py-2 border border-line-soft rounded-lg text-strong-text bg-card focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. NODUS2025"
                maxLength={12}
                defaultValue={referralCode}
              />
              <button 
                type="submit"
                className="button button-primary whitespace-nowrap"
              >
                Set Code
              </button>
              <button 
                type="button"
                className="button button-secondary"
                onClick={() => setShowCustomCodeInput(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <label className="text-xs text-subtle mb-1 block">Your referral link</label>
            <div className="flex gap-3 flex-wrap md:flex-nowrap">
              <div className="w-full relative">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-line-soft rounded-lg text-strong-text bg-background focus:outline-none"
                  value={`${baseUrl}/${referralCode}`}
                  readOnly
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <span className="text-xs bg-primary text-foreground px-1.5 py-0.5 rounded">
                    {referralCode}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  className={`button ${copySuccess ? 'button-secondary' : 'button-primary'}`}
                  onClick={copyToClipboard}
                >
                  {copySuccess ? 'Copied!' : 'Copy Link'}
                </button>
                <button 
                  className="button button-secondary"
                  onClick={generateRandomCode}
                >
                  New Code
                </button>
              </div>
            </div>
            
            <button
              className="text-xs text-primary underline mt-2"
              onClick={() => setShowCustomCodeInput(true)}
            >
              Create a custom code
            </button>
          </>
        )}
      </div>
      
      {/* Referral Stats */}
      <div className="bg-background rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-strong-text">Referral Uses</span>
          <span className="text-sm text-strong-text">{currentReferrals} of {maxReferrals}</span>
        </div>
        
        <div className="w-full h-2 bg-line-soft rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary"
            style={{ 
              width: `${referralPercentage}%`,
              backgroundColor: 'var(--primary)' 
            }}
          ></div>
        </div>
        
        <p className="text-xs text-subtle mt-2">
          {remainingReferrals > 0 
            ? `You have ${remainingReferrals} invites remaining.` 
            : 'You have used all your invites.'}
        </p>
      </div>
      
      {/* Social Sharing */}
      <div className="mt-6 pt-4 border-t border-line-soft">
        <p className="text-sm font-medium text-strong-text mb-3">Share via</p>
        <div className="flex gap-3">
          <button className="button button-secondary">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            Facebook
          </button>
          <button className="button button-secondary">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
            Twitter
          </button>
          <button className="button button-secondary">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralLinkGenerator; 
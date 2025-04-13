import React, { useState, useEffect } from 'react';
import { NODUS_STYLE_GUIDE } from '../../styles/NodusStyleGuide';
import { useDesignGuard } from '../../hooks/useDesignGuard';

// Mock wallet types
type WalletProvider = 'metamask' | 'walletconnect' | 'coinbase' | 'phantom';

interface WalletConnectProps {
  onConnect?: (address: string, provider: WalletProvider) => void;
  onDisconnect?: () => void;
  buttonText?: string;
  buttonVariant?: 'primary' | 'secondary' | 'minimal';
  showBalance?: boolean;
}

const WalletConnect: React.FC<WalletConnectProps> = ({
  onConnect,
  onDisconnect,
  buttonText = 'Connect Wallet',
  buttonVariant = 'primary',
  showBalance = true,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showProviders, setShowProviders] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('0.00');
  const [provider, setProvider] = useState<WalletProvider | null>(null);
  
  // Check design compliance with NODUS Style Guide
  useDesignGuard('WalletConnect', {
    buttonRadius: NODUS_STYLE_GUIDE.components.buttonRadius,
    cardRadius: NODUS_STYLE_GUIDE.components.cardRadius,
    primaryColor: NODUS_STYLE_GUIDE.colors.primary,
  });
  
  // Check if wallet was previously connected
  useEffect(() => {
    const savedWallet = localStorage.getItem('nodus_wallet');
    const savedProvider = localStorage.getItem('nodus_provider') as WalletProvider;
    
    if (savedWallet && savedProvider) {
      setWalletAddress(savedWallet);
      setProvider(savedProvider);
      setIsConnected(true);
      
      // Generate a mock balance
      const mockBalance = (Math.random() * 10).toFixed(2);
      setBalance(mockBalance);
      
      // Notify parent component
      if (onConnect) {
        onConnect(savedWallet, savedProvider);
      }
    }
  }, [onConnect]);
  
  // Handle wallet connection
  const connectWallet = (selectedProvider: WalletProvider) => {
    setIsConnecting(true);
    setShowProviders(false);
    
    // Simulate connection delay
    setTimeout(() => {
      // Generate a mock wallet address
      const mockAddress = '0x' + Array(40).fill(0).map(() => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      
      // Generate a mock balance
      const mockBalance = (Math.random() * 10).toFixed(2);
      
      // Save to state and localStorage
      setWalletAddress(mockAddress);
      setBalance(mockBalance);
      setProvider(selectedProvider);
      setIsConnected(true);
      setIsConnecting(false);
      
      localStorage.setItem('nodus_wallet', mockAddress);
      localStorage.setItem('nodus_provider', selectedProvider);
      
      // Notify parent component
      if (onConnect) {
        onConnect(mockAddress, selectedProvider);
      }
    }, 1500);
  };
  
  // Handle wallet disconnection
  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setBalance('0.00');
    setProvider(null);
    
    localStorage.removeItem('nodus_wallet');
    localStorage.removeItem('nodus_provider');
    
    // Notify parent component
    if (onDisconnect) {
      onDisconnect();
    }
  };
  
  // Format address for display
  const formatAddress = (address: string): string => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  // Get provider icon
  const getProviderIcon = (providerName: WalletProvider) => {
    switch (providerName) {
      case 'metamask':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.2566 2L13.3321 8.4658L14.7938 4.74904L21.2566 2Z" fill="#E17726"/>
            <path d="M2.74316 2L10.59 8.53424L9.20595 4.74904L2.74316 2Z" fill="#E27625"/>
            <path d="M18.3321 16.3826L16.2146 19.8333L20.6566 21.1428L21.9321 16.4605L18.3321 16.3826Z" fill="#E27625"/>
            <path d="M2.08344 16.4605L3.34947 21.1428L7.78214 19.8333L5.67406 16.3826L2.08344 16.4605Z" fill="#E27625"/>
            <path d="M7.55984 10.7068L6.32689 12.7465L10.7077 12.9632L10.5559 8.13135L7.55984 10.7068Z" fill="#E27625"/>
            <path d="M16.4399 10.7067L13.3921 8.0641L13.3321 12.9632L17.7129 12.7465L16.4399 10.7067Z" fill="#E27625"/>
            <path d="M7.78223 19.8333L10.4381 18.4461L8.12849 16.4994L7.78223 19.8333Z" fill="#E27625"/>
            <path d="M13.5621 18.4461L16.2147 19.8333L15.8717 16.4994L13.5621 18.4461Z" fill="#E27625"/>
          </svg>
        );
      case 'coinbase':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="#0052FF"/>
            <path d="M12.0001 6.25C8.82737 6.25 6.25006 8.8273 6.25006 12C6.25006 15.1727 8.82737 17.75 12.0001 17.75C15.1728 17.75 17.7501 15.1727 17.7501 12C17.7501 8.8273 15.1728 6.25 12.0001 6.25ZM14.4306 12C14.4306 13.3366 13.3473 14.4306 12.0001 14.4306C10.6529 14.4306 9.56952 13.3366 9.56952 12C9.56952 10.6635 10.6529 9.56946 12.0001 9.56946C13.3473 9.56946 14.4306 10.6635 14.4306 12Z" fill="white"/>
          </svg>
        );
      case 'walletconnect':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="#3B99FC"/>
            <path d="M8.7501 9.75C10.8502 7.75 14.1498 7.75 16.2499 9.75L16.5001 9.98744C16.6224 10.1083 16.6224 10.3084 16.5001 10.4293L15.75 11.1484C15.6889 11.2089 15.5897 11.2089 15.5285 11.1484L15.1747 10.8077C13.7151 9.39586 11.2849 9.39586 9.82534 10.8077L9.44708 11.1723C9.38599 11.2328 9.28675 11.2328 9.22566 11.1723L8.47555 10.4532C8.3533 10.3323 8.3533 10.1322 8.47554 10.0113L8.7501 9.75ZM17.8749 11.3138L18.5625 11.9806C18.6847 12.1014 18.6847 12.3016 18.5625 12.4225L14.746 16.1168C14.6238 16.2378 14.4254 16.2378 14.3032 16.1168L11.6969 13.5851C11.6664 13.5548 11.6162 13.5548 11.5856 13.5851L8.97932 16.1168C8.85708 16.2378 8.65865 16.2378 8.53641 16.1168L4.73749 12.4225C4.61525 12.3016 4.61525 12.1014 4.73749 11.9806L5.42508 11.3138C5.54733 11.1929 5.74575 11.1929 5.86799 11.3138L8.47433 13.8455C8.5049 13.8757 8.55508 13.8757 8.58565 13.8455L11.1919 11.3138C11.3142 11.1929 11.5126 11.1929 11.6348 11.3138L14.2411 13.8455C14.2717 13.8757 14.3219 13.8757 14.3525 13.8455L16.9588 11.3138C17.081 11.1929 17.2795 11.1929 17.4017 11.3138H17.8749Z" fill="white"/>
          </svg>
        );
      case 'phantom':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#AB9FF2"/>
            <path d="M15.0323 8H9.42616C8.35976 8 7.5 8.78233 7.5 9.74767V12.7523H16.9585V9.74767C16.9585 8.78233 16.0987 8 15.0323 8Z" fill="white"/>
            <path d="M16.9584 16.2538C16.9584 16.3363 16.9401 16.418 16.905 16.4931C16.8698 16.5683 16.8187 16.6351 16.7553 16.6887C16.6919 16.7423 16.6176 16.7815 16.5382 16.8035C16.4587 16.8255 16.3759 16.8299 16.2949 16.8165C15.2248 16.6347 13.2467 16.3071 13.2467 16.3071V14.5127H16.9584V16.2538Z" fill="white"/>
            <path d="M7.5 13H16.9585V14.5128H7.5V13Z" fill="white"/>
            <path d="M9.65308 16.3071C9.65308 16.3071 7.78851 16.6048 6.76553 16.7782C6.6855 16.7931 6.60323 16.7901 6.52397 16.7694C6.44472 16.7487 6.37033 16.7109 6.30631 16.6587C6.24229 16.6066 6.1902 16.5414 6.15415 16.4675C6.1181 16.3937 6.09907 16.3133 6.09851 16.232V14.5127H9.65308V16.3071Z" fill="white"/>
          </svg>
        );
      default:
        return null;
    }
  };
  
  // Get button classes based on variant
  const getButtonClasses = () => {
    const baseClasses = 'flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all';
    
    switch (buttonVariant) {
      case 'primary':
        return `${baseClasses} bg-primary text-foreground hover:opacity-90`;
      case 'secondary':
        return `${baseClasses} bg-card border border-line-soft text-strong-text hover:bg-background`;
      case 'minimal':
        return `${baseClasses} text-strong-text hover:bg-background`;
      default:
        return `${baseClasses} bg-primary text-foreground hover:opacity-90`;
    }
  };
  
  // Display connected state
  if (isConnected) {
    return (
      <div className="relative inline-block">
        <button 
          className="flex items-center gap-2 bg-card py-2 px-4 rounded-lg border border-line-soft hover:bg-background"
          onClick={() => setShowProviders(!showProviders)}
        >
          {provider && getProviderIcon(provider)}
          <span className="text-sm font-medium">{formatAddress(walletAddress)}</span>
          {showBalance && (
            <>
              <span className="mx-1 text-subtle">|</span>
              <span className="text-sm">{balance} ETH</span>
            </>
          )}
          <svg className="w-4 h-4 text-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {showProviders && (
          <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-card border border-line-soft p-2 z-10">
            <div className="px-3 py-2">
              <p className="text-xs text-subtle mb-1">Connected with {provider}</p>
              <p className="text-sm font-medium text-strong-text break-all mb-2">{walletAddress}</p>
              <div className="flex justify-between items-center pt-2 border-t border-line-soft">
                <span className="text-sm text-subtle">{balance} ETH</span>
                <button 
                  className="text-xs text-primary hover:underline"
                  onClick={disconnectWallet}
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Display connecting state
  if (isConnecting) {
    return (
      <button 
        className={getButtonClasses()}
        disabled
      >
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Connecting...
      </button>
    );
  }
  
  // Display initial state
  return (
    <div className="relative inline-block">
      <button 
        className={getButtonClasses()}
        onClick={() => setShowProviders(!showProviders)}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.0002 7.99998C18.0002 8.79698 17.7952 9.54998 17.4422 10.205C16.6941 11.688 16.3072 13.3229 16.3212 14.975C16.3212 15.263 16.3332 15.549 16.3582 15.834C16.4422 16.85 15.5722 17.5 14.7082 17.871C13.6783 18.3104 12.594 18.5283 11.5002 18.516C10.4111 18.53 9.33212 18.3124 8.30724 17.871C7.44324 17.5 6.57724 16.85 6.65024 15.834C6.67415 15.5495 6.68479 15.264 6.68224 14.978C6.69624 13.326 6.30924 11.691 5.56224 10.208C5.20833 9.55279 5.00106 8.79917 5.00024 8.00098C5.00024 6.68198 5.52823 5.46798 6.46424 4.57398C7.40024 3.67898 8.65424 3.16998 10.0002 3.16998H13.0002C14.3462 3.16998 15.6002 3.67898 16.5362 4.57398C17.4722 5.46798 18.0002 6.68198 18.0002 7.99998Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 21C11.145 21.8037 12.8555 21.8037 14 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {buttonText}
      </button>
      
      {showProviders && (
        <div className="absolute right-0 mt-2 w-72 bg-card rounded-xl shadow-card border border-line-soft p-2 z-10">
          <div className="py-2 px-3 border-b border-line-soft">
            <h3 className="text-sm font-medium text-strong-text">Connect Wallet</h3>
            <p className="text-xs text-subtle mt-1">Choose a wallet to connect to NODUS</p>
          </div>
          <div className="py-2">
            <button 
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-background rounded-lg transition-colors"
              onClick={() => connectWallet('metamask')}
            >
              {getProviderIcon('metamask')}
              <span className="text-sm font-medium text-strong-text">MetaMask</span>
            </button>
            <button 
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-background rounded-lg transition-colors"
              onClick={() => connectWallet('coinbase')}
            >
              {getProviderIcon('coinbase')}
              <span className="text-sm font-medium text-strong-text">Coinbase Wallet</span>
            </button>
            <button 
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-background rounded-lg transition-colors"
              onClick={() => connectWallet('walletconnect')}
            >
              {getProviderIcon('walletconnect')}
              <span className="text-sm font-medium text-strong-text">WalletConnect</span>
            </button>
            <button 
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-background rounded-lg transition-colors"
              onClick={() => connectWallet('phantom')}
            >
              {getProviderIcon('phantom')}
              <span className="text-sm font-medium text-strong-text">Phantom</span>
            </button>
          </div>
          <div className="pt-2 pb-1 px-3 border-t border-line-soft">
            <p className="text-xs text-subtle text-center">
              By connecting, you agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect; 
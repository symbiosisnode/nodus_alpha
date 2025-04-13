import React, { useState, useEffect } from 'react';
import { NODUS_STYLE_GUIDE } from '../../styles/NodusStyleGuide';
import { useDesignGuard } from '../../hooks/useDesignGuard';
import WalletConnect from './WalletConnect';

// Mock equity token types
interface Token {
  id: string;
  name: string;
  ticker: string;
  amount: number;
  dollarValue: number;
  iconUrl?: string;
  changePercent: number; // 24h percent change
}

interface EquityDashboardProps {
  title?: string;
  subTitle?: string;
}

const EquityDashboard: React.FC<EquityDashboardProps> = ({
  title = 'Your Equity',
  subTitle = 'Track your NODUS token ownership',
}) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check design compliance with NODUS Style Guide
  useDesignGuard('EquityDashboard', {
    cardRadius: NODUS_STYLE_GUIDE.components.cardRadius,
    cardPadding: NODUS_STYLE_GUIDE.components.cardPadding,
    backgroundColor: NODUS_STYLE_GUIDE.colors.background,
    primaryColor: NODUS_STYLE_GUIDE.colors.primary,
  });
  
  // Handle wallet connection
  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    setIsWalletConnected(true);
    loadTokenData();
  };
  
  // Handle wallet disconnection
  const handleWalletDisconnect = () => {
    setWalletAddress('');
    setIsWalletConnected(false);
    setTokens([]);
    setTotalValue(0);
  };
  
  // Load mock token data
  const loadTokenData = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockTokens: Token[] = [
        {
          id: 'nodus',
          name: 'NODUS Governance',
          ticker: 'NODUS',
          amount: Math.floor(Math.random() * 1000) + 100,
          dollarValue: Math.floor(Math.random() * 5000) + 1000,
          changePercent: Math.random() * 10 - 2, // -2% to +8%
        },
        {
          id: 'territory',
          name: 'Territory Share',
          ticker: 'tNODUS',
          amount: Math.floor(Math.random() * 50) + 5,
          dollarValue: Math.floor(Math.random() * 2000) + 500,
          changePercent: Math.random() * 15 - 5, // -5% to +10%
        },
        {
          id: 'reputation',
          name: 'Reputation Points',
          ticker: 'rNODUS',
          amount: Math.floor(Math.random() * 5000) + 1000,
          dollarValue: Math.floor(Math.random() * 1000) + 200,
          changePercent: Math.random() * 5 + 1, // +1% to +6%
        },
      ];
      
      setTokens(mockTokens);
      
      // Calculate total value
      const total = mockTokens.reduce((sum, token) => sum + token.dollarValue, 0);
      setTotalValue(total);
      
      setIsLoading(false);
    }, 1500);
  };
  
  // Format dollar value
  const formatDollarValue = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  // Format token amount
  const formatTokenAmount = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  
  // Format percent change
  const formatPercentChange = (percent: number): string => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };
  
  // Get color class based on percent change
  const getPercentChangeColorClass = (percent: number): string => {
    return percent >= 0 ? 'text-green-up' : 'text-red-down';
  };
  
  return (
    <div className="w-full bg-card rounded-xl shadow-card mb-6">
      {/* Header with wallet connection */}
      <div className="p-6 border-b border-line-soft">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-strong-text mb-1">{title}</h2>
            <p className="text-sm text-subtle">{subTitle}</p>
          </div>
          <WalletConnect 
            onConnect={handleWalletConnect}
            onDisconnect={handleWalletDisconnect}
            buttonVariant="primary"
          />
        </div>
      </div>
      
      {/* Token list and summary */}
      <div className="p-6">
        {isWalletConnected ? (
          <>
            {isLoading ? (
              <div className="py-10 flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-sm text-subtle">Loading your equity tokens...</p>
              </div>
            ) : (
              <>
                {/* Total value card */}
                <div className="bg-background rounded-lg p-4 mb-6">
                  <p className="text-sm text-subtle mb-1">Total Portfolio Value</p>
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold text-strong-text">
                      {formatDollarValue(totalValue)}
                    </h3>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="px-2 py-1 rounded bg-primary/10 text-primary">
                        Equity Level: {tokens.length > 0 ? tokens.length : '-'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Token list */}
                <div className="space-y-4">
                  <div className="grid grid-cols-12 text-xs text-subtle px-2 pb-2">
                    <div className="col-span-5 md:col-span-5">Token</div>
                    <div className="col-span-3 md:col-span-2 text-right">Balance</div>
                    <div className="col-span-4 md:col-span-3 text-right">Value</div>
                    <div className="hidden md:block md:col-span-2 text-right">24h Change</div>
                  </div>
                  
                  {tokens.map((token) => (
                    <div 
                      key={token.id}
                      className="grid grid-cols-12 p-3 bg-background rounded-lg items-center hover:bg-background/70 transition-colors"
                    >
                      {/* Token info */}
                      <div className="col-span-5 md:col-span-5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          {token.iconUrl ? (
                            <img src={token.iconUrl} alt={token.name} className="w-6 h-6" />
                          ) : (
                            <span className="text-xs font-bold text-primary">{token.ticker.substring(0, 1)}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-strong-text">{token.name}</div>
                          <div className="text-xs text-subtle">{token.ticker}</div>
                        </div>
                      </div>
                      
                      {/* Token amount */}
                      <div className="col-span-3 md:col-span-2 text-right">
                        <div className="font-medium text-strong-text">{formatTokenAmount(token.amount)}</div>
                        <div className="text-xs text-subtle">{token.ticker}</div>
                      </div>
                      
                      {/* Token value */}
                      <div className="col-span-4 md:col-span-3 text-right">
                        <div className="font-medium text-strong-text">{formatDollarValue(token.dollarValue)}</div>
                        <div className="text-xs text-subtle">${(token.dollarValue / token.amount).toFixed(2)} per token</div>
                      </div>
                      
                      {/* Change percentage (hidden on mobile) */}
                      <div className="hidden md:block md:col-span-2 text-right">
                        <div className={`font-medium ${getPercentChangeColorClass(token.changePercent)}`}>
                          {formatPercentChange(token.changePercent)}
                        </div>
                        <div className="text-xs text-subtle">24h</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-3 mt-6">
                  <button className="button button-secondary text-sm py-2">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4V20M12 4L8 8M12 4L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Send
                  </button>
                  <button className="button button-secondary text-sm py-2">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 20V4M12 20L16 16M12 20L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Receive
                  </button>
                  <button className="button button-secondary text-sm py-2">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 21L3 16.5M3 16.5L7.5 12M3 16.5H16.5M16.5 3L21 7.5M21 7.5L16.5 12M21 7.5H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Swap
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-subtle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.0002 7.99998C18.0002 8.79698 17.7952 9.54998 17.4422 10.205C16.6941 11.688 16.3072 13.3229 16.3212 14.975C16.3212 15.263 16.3332 15.549 16.3582 15.834C16.4422 16.85 15.5722 17.5 14.7082 17.871C13.6783 18.3104 12.594 18.5283 11.5002 18.516C10.4111 18.53 9.33212 18.3124 8.30724 17.871C7.44324 17.5 6.57724 16.85 6.65024 15.834C6.67415 15.5495 6.68479 15.264 6.68224 14.978C6.69624 13.326 6.30924 11.691 5.56224 10.208C5.20833 9.55279 5.00106 8.79917 5.00024 8.00098C5.00024 6.68198 5.52823 5.46798 6.46424 4.57398C7.40024 3.67898 8.65424 3.16998 10.0002 3.16998H13.0002C14.3462 3.16998 15.6002 3.67898 16.5362 4.57398C17.4722 5.46798 18.0002 6.68198 18.0002 7.99998Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 21C11.145 21.8037 12.8555 21.8037 14 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-strong-text mb-2">Connect Your Wallet</h3>
            <p className="text-sm text-subtle text-center max-w-md mb-6">
              Connect your wallet to view your NODUS equity tokens and track your ownership across territories.
            </p>
            <WalletConnect 
              onConnect={handleWalletConnect}
              buttonVariant="primary"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EquityDashboard; 
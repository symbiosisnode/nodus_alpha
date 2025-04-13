import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { NODUS_STYLE_GUIDE } from '../styles/NodusStyleGuide';
import { useDesignGuard } from '../hooks/useDesignGuard';
import EquityDashboard from '../components/equity/EquityDashboard';
import BadgeGrid, { BadgeData } from '../components/gamification/BadgeGrid';
import ReferralLinkGenerator from '../components/referrals/ReferralLinkGenerator';

// Import types from context ONLY if needed, otherwise rely on context value
// import { BaseUserData, Role } from '../context/DemoDataContext';

// Import specific dashboard VIEW components
import MTOView from './MTOView';
import GPView from './GPView';
import SAView from './SAView';

// Import the context hook
import { useDemoData } from '../context/DemoDataContext';

// Type definitions (can be moved to a types file)
interface MTOPropsData { /* ... */ } // Define as before
interface GPPropsData { /* ... */ } // Define as before
interface SAPropsData { /* ... */ } // Define as before
// --- Detailed definitions for casting --- 
interface MTOPropsData {
    userId: string;
    role: string;
    name: string;
    equity: { currentValue: number; tier: string; [key: string]: any };
    territory: { name: string; mapImage: string; [key: string]: any };
    [key: string]: any;
}
interface GPPropsData {
    userId: string;
    role: string;
    name: string;
    equity: { currentValue: number; tier: string; [key: string]: any };
    saNetwork: { totalCount: number; [key: string]: any };
    [key: string]: any;
}
interface SAPropsData {
    userId: string;
    role: string;
    name: string;
    equity: { currentValue: number; tier: string; [key: string]: any };
    commission: { earnedThisMonth: number; [key: string]: any };
    aiNudge: string;
    [key: string]: any;
}

// Define types for chart options and stats
interface ChartOptions {
  series: { name: string; data: number[] }[];
  options: ApexCharts.ApexOptions;
}

interface Stat {
  label: string;
  value: string;
}

// Placeholder components for complex sections
const TotalHoursCard = () => {
  // TODO: Implement clock logic
  return (
    <div className="card project-total-card h-100">
      <div className="card-body">
        <div className="d-flex position-relative">
          <h5 className="text-dark txt-ellipsis-1">Total Hours</h5>
          {/* Add clock element here */}
        </div>
        <div>
          <div className="d-flex">
            <h2 className="text-info-dark hour-display">1H</h2> {/* Placeholder */} 
          </div>
          <div className="progress-labels mg-t-40">
            <span className="text-info">Productive</span>
            <span className="text-info">Middle</span>
            <span className="text-info">Idle</span>
          </div>
          <div className="custom-progress-container info-progress">
            <div className="progress-bar productive" style={{ width: '60%' }}></div> {/* Placeholder */} 
            <div className="progress-bar middle" style={{ width: '25%' }}></div> {/* Placeholder */} 
            <div className="progress-bar idle" style={{ width: '15%' }}></div> {/* Placeholder */} 
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, tags, avatars, status, bgColorClass, textColorClass, badgeColorClass }: any) => (
  <div className={`card ${bgColorClass} project-details-card h-100`}>
    <div className="card-body">
      <div className="d-flex gap-2">
        {tags.map((tag: string, index: number) => (
          <span key={index} className={`badge bg-white-300 ${textColorClass} p-1 b-r-10`}>{tag}</span>
        ))}
      </div>
      <div className="my-4">
        <h5 className={`f-w-600 ${textColorClass} txt-ellipsis-1`}>{title}</h5>
        <p className={`${textColorClass.replace('-dark', '')} f-s-13 txt-ellipsis-1 mb-0`}>{description}</p>
      </div>
      <div className="d-flex align-items-center justify-content-between pt-3">
        <ul className="avatar-group">
          {avatars.map((avatar: string, index: number) => (
            <li key={index} className="h-35 w-35 d-flex-center b-r-50 overflow-hidden bg-light-primary b-2-primary">
              <img alt="avatar" className="img-fluid" src={`/axelit-assets/images/avtar/${avatar}.png`} />
            </li>
          ))}
          {/* Add + indicator if needed */}
        </ul>
        <span className={`badge bg-white-300 ${textColorClass} ms-2`}>{status}</span>
      </div>
    </div>
  </div>
);

const CoreTeamsCard = () => (
   <div className="card core-teams-card h-100">
        <div className="card-body">
            <div className="d-flex">
                <h5 className="text-dark f-w-600 txt-ellipsis-1">💼 Core Teams</h5>
            </div>
            <div>
                <h2 className="text-warning-dark my-4 d-inline-flex align-items-baseline">1k<span className="f-s-12 text-dark">Team Members</span></h2>
                <ul className="avatar-group justify-content-start ">
                    <li className="h-35 w-35 d-flex-center b-r-50 overflow-hidden text-bg-primary b-2-light"><img alt="avtar" className="img-fluid" src="/axelit-assets/images/avtar/4.png" /></li>
                    <li className="h-35 w-35 d-flex-center b-r-50 overflow-hidden text-bg-success b-2-light"><img alt="avtar" className="img-fluid" src="/axelit-assets/images/avtar/5.png" /></li>
                    <li className="h-35 w-35 d-flex-center b-r-50 overflow-hidden text-bg-danger b-2-light"><img alt="avtar" className="img-fluid" src="/axelit-assets/images/avtar/6.png" /></li>
                    <li className="text-bg-secondary h-35 w-35 d-flex-center b-r-50">10+</li>
                </ul>
            </div>
        </div>
    </div>
);

const FileUploaderCard = () => (
  <div className="card h-100">
     <div className="card-body d-flex justify-content-center align-items-center dashed-border">
         {/* Replace with FilePond or other uploader later */}
        <div className="text-center">
           <i className="iconoir-cloud-upload text-primary" style={{fontSize: '4rem'}}></i>
            <h5 className="mt-3">No Files Available!</h5>
            <p className="text-muted">Unfortunately, there's no open files right now</p>
        </div>
     </div>
  </div>
);

const ExpenseChartCard = () => {
   const chartOptions = {
        series: [{
            name: 'Expenses',
            data: [9, 18, 27, 36, 45, 36, 27]
        }, {
            name: 'Income',
            data: [5, 10, 15, 20, 25, 20, 15]
        }],
        options: {
            chart: { type: 'line', height: 200, toolbar: { show: false } },
            stroke: { curve: 'smooth', width: [3, 2], dashArray: [0, 3] },
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'] },
            yaxis: { labels: { formatter: (val: number) => `${val}$` } },
            colors: ['#6633FF', '#34D399'], // Example purple and green
            tooltip: { y: { formatter: (val: number) => `${val}$` } },
            grid: { show: false },
            legend: { show: false }
        } as ApexCharts.ApexOptions
    };
  return (
     <div className="card h-100">
        <div className="card-body">
            <ReactApexChart options={chartOptions.options} series={chartOptions.series} type="line" height={200} />
        </div>
    </div>
  )
}

const ConnectCard = () => (
    <div className="card project-connect-card h-100">
        <div className="card-body pb-0">
            <div className="text-center">
                <h5 className=" mb-2 f-s-24">Get started <span className="text-primary f-w-700">Effortlessly.</span></h5>
                <p className="f-s-14 text-dark pb-0 txt-ellipsis-2">
                    Connect your team's tools and unlock a unified view...
                </p>
            </div>
             {/* Add images/chat elements here */}
            <div className="connect-chat-box text-center py-3">
                 <img alt="Chat illustration" src="/axelit-assets/images/dashboard/project/chat.png" style={{maxWidth: '80%'}} />
            </div>
        </div>
    </div>
);

const TrackerCard = () => {
    // TODO: Implement timer logic
    return (
        <div>
             <div className="p-3 pt-0">
                <h5>Tracker</h5>
            </div>
            <div className="card">
                <div className="card-body position-relative">
                    <div className="time-tracker">
                         {/* Add share dropdown logic */}
                         <h2 className="timer-display f-w-600">00:00:00</h2>
                         <div className="controls">
                            <button className="btn btn-light-primary icon-btn b-r-18"><i className="iconoir-play-solid"></i></button>
                            <button className="btn btn-danger icon-btn b-r-18" disabled><i className="iconoir-square"></i></button>
                            <button className="btn btn-light-info icon-btn b-r-18"><i className="iconoir-refresh"></i></button>
                        </div>
                    </div>
                    <ul className="tracker-history-list app-scroll mt-3" style={{maxHeight: '150px'}}> {/* Limit height */} 
                        <li className="bg-info-300"><div><h6 className="text-info-dark mb-0">Session 1</h6></div><div className="text-dark f-w-600 ms-2">00:01:23</div></li>
                        <li className="bg-primary-300"><div><h6 className="text-primary-dark mb-0">Session 2</h6></div><div className="text-dark f-w-600 ms-2">00:02:45</div></li>
                         {/* Add more sessions */}
                    </ul>
                </div>
            </div>
        </div>
    )
}

const ProjectStatusTable = () => (
    <div>
        <div className="p-3 pt-0">
            <h5>Project Status</h5>
        </div>
        <div className="card mb-0">
            <div className="card-body py-2 px-0 overflow-hidden">
                <div className="table-responsive app-scroll" style={{maxHeight: '300px'}}> {/* Limit height */} 
                    <table className="table align-middle project-status-table mb-0">
                        <thead>
                             <tr><th>Project</th><th>Status</th><th>TeamLead</th><th>priority</th><th>Remarks</th></tr>
                        </thead>
                        <tbody>
                            {/* Add table rows here */}
                            <tr><td><h6 className="mb-0 text-success-dark text-nowrap">Web Redesign</h6></td><td><span className="badge text-light-warning f-s-9 f-w-700">In Progress</span></td><td><a className="h-30 w-30 d-flex-center b-r-50 overflow-hidden"><img alt="avtar" className="img-fluid" src="/axelit-assets/images/avtar/2.png" /></a></td><td className="text-success-dark f-w-600">High</td><td><span className="text-dark f-s-14 f-w-500 text-nowrap"><i className="ti ti-circle-filled me-2 f-s-6"></i> Design phase</span></td></tr>
                            <tr><td><h6 className="mb-0 text-warning-dark text-nowrap">Mobile App</h6></td><td><span className="badge text-light-success f-s-9 f-w-700">Completed</span></td><td><a className="h-30 w-30 d-flex-center b-r-50 overflow-hidden"><img alt="avtar" className="img-fluid" src="/axelit-assets/images/avtar/3.png" /></a></td><td className="text-secondary-dark f-w-600">Medium</td><td><span className="text-dark f-s-14 f-w-500 text-nowrap"><i className="ti ti-circle-filled me-2 f-s-6"></i> Project deplo...</span></td></tr>
                            {/* Add more rows */} 
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {/* Add Pagination */} 
    </div>
);

const TodayTasksCard = () => (
    <div>
        <div className="p-3 pt-0">
            <h5>Today Tasks</h5>
        </div>
        <div className="card">
            <div className="card-body">
                 {/* Use Slick slider or map over tasks */}
                <div className="task-container"> {/* Replace with slider if needed */} 
                    <div className="card task-card bg-warning-300 mb-3">
                        <div className="card-body">
                            <h6 className="text-warning-dark txt-ellipsis-1">Design Homepage...</h6>
                            <ul className="avatar-group justify-content-start my-3">
                                <li className="h-35 w-35"><img alt="avtar" className="img-fluid" src="/axelit-assets/images/avtar/3.png"/></li>
                                <li className="h-35 w-35"><img alt="avtar" className="img-fluid" src="/axelit-assets/images/avtar/7.png"/></li>
                                <li className="h-35 w-35"><img alt="avtar" className="img-fluid" src="/axelit-assets/images/avtar/8.png"/></li>
                            </ul>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="progress w-100" role="progressbar"><div className="progress-bar bg-warning-dark" style={{width: '35%'}}></div></div>
                                <span className="badge bg-white-400 text-secondary-dark ms-2">+ 35%</span>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="d-flex justify-content-between align-items-center rounded p-1 bg-primary-300">
                            <span className="bg-primary h-35 w-35 d-flex-center rounded"><i className="iconoir-group f-s-18"></i></span>
                            <h6 className="mb-0 txt-ellipsis-1">Meeting</h6>
                            <div className="d-flex gap-2">
                                <span className="w-35 h-35 bg-white-300 text-info-dark rounded p-2 d-flex-center"><i className="iconoir-more-horiz f-s-18"></i></span>
                                <span className="w-35 h-35 bg-white-300 text-info-dark rounded p-2 d-flex-center"><i className="iconoir-copy f-s-18"></i></span>
                            </div>
                        </div>
                    </div>
                     {/* Add more tasks/meeting cards */} 
                </div>
            </div>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
  // Check design compliance with NODUS Style Guide
  useDesignGuard('Dashboard', {
    backgroundColor: NODUS_STYLE_GUIDE.colors.background,
    padding: NODUS_STYLE_GUIDE.layout.padding,
    gap: NODUS_STYLE_GUIDE.layout.gap,
  });
  
  // Mock badge data for the demo
  const [badges, setBadges] = useState<BadgeData[]>([
    {
      id: '1',
      name: 'Early Adopter',
      description: 'One of the first to join NODUS',
      level: 'gold',
      status: 'unlocked',
    },
    {
      id: '2',
      name: 'Territory Pioneer',
      description: 'Established presence in a new territory',
      level: 'silver',
      status: 'unlocked',
    },
    {
      id: '3',
      name: 'Network Builder',
      description: 'Connected with 5+ other NODUS members',
      level: 'bronze',
      status: 'new',
      progress: 100,
    },
    {
      id: '4',
      name: 'Growth Expert',
      description: 'Achieved 20% growth in territory value',
      level: 'bronze',
      status: 'locked',
    },
    {
      id: '5',
      name: 'Community Leader',
      description: 'Recognized for leadership within your territory',
      level: 'platinum',
      status: 'locked',
    },
  ]);
  
  // Handle badge unlock
  const handleBadgeUnlock = (id: string) => {
    setBadges(prev => 
      prev.map(badge => 
        badge.id === id 
          ? { ...badge, status: 'unlocked' as const } 
          : badge
      )
    );
  };
  
  // Handle referral generation
  const handleReferralGenerate = (code: string) => {
    console.log(`New referral code generated: ${code}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-strong-text">NODUS Dashboard</h1>
          <p className="text-subtle">Welcome to your personalized dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content (Left 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Equity Dashboard */}
            <EquityDashboard />
            
            {/* Badges */}
            <BadgeGrid 
              badges={badges}
              onBadgeUnlock={handleBadgeUnlock}
            />
          </div>
          
          {/* Sidebar (Right 1/3) */}
          <div className="space-y-6">
            {/* Referral System */}
            <ReferralLinkGenerator 
              onGenerate={handleReferralGenerate}
              maxReferrals={10}
              currentReferrals={3}
            />
            
            {/* Territory Health Card */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h3 className="font-semibold text-xl text-strong-text mb-2">Territory Health</h3>
              <p className="text-sm text-subtle mb-4">Overview of your territory performance</p>
              
              {/* Territory Metrics */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Active Members</span>
                    <span className="text-sm font-medium text-green-up">+12%</span>
                  </div>
                  <div className="w-full h-2 bg-line-soft rounded-full">
                    <div className="h-full w-3/4 bg-green-up rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Resource Utilization</span>
                    <span className="text-sm font-medium text-green-up">+8%</span>
                  </div>
                  <div className="w-full h-2 bg-line-soft rounded-full">
                    <div className="h-full w-2/3 bg-green-up rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Growth Rate</span>
                    <span className="text-sm font-medium text-red-down">-3%</span>
                  </div>
                  <div className="w-full h-2 bg-line-soft rounded-full">
                    <div className="h-full w-1/3 bg-red-down rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Satisfaction Score</span>
                    <span className="text-sm font-medium text-green-up">+15%</span>
                  </div>
                  <div className="w-full h-2 bg-line-soft rounded-full">
                    <div className="h-full w-4/5 bg-green-up rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Territory Actions */}
              <div className="mt-6 pt-4 border-t border-line-soft">
                <button className="w-full button button-primary text-sm mb-2">
                  Manage Territory
                </button>
                <button className="w-full button button-secondary text-sm">
                  View Analytics
                </button>
              </div>
            </div>
            
            {/* Quick Actions Card */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h3 className="font-semibold text-strong-text mb-4">Quick Actions</h3>
              
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-lg flex items-center hover:bg-background transition-colors">
                  <svg className="w-5 h-5 mr-3 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20M12 4L8 8M12 4L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Send Tokens</span>
                </button>
                
                <button className="w-full text-left px-3 py-2 rounded-lg flex items-center hover:bg-background transition-colors">
                  <svg className="w-5 h-5 mr-3 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M12 5L7 10M12 5L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Invite Members</span>
                </button>
                
                <button className="w-full text-left px-3 py-2 rounded-lg flex items-center hover:bg-background transition-colors">
                  <svg className="w-5 h-5 mr-3 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.0004 5V3M12.0004 21V19M5.00039 12H3.00039M21.0004 12H19.0004M18.364 18.364L16.9498 16.9497M18.364 5.63603L16.9498 7.05025M5.63639 5.63603L7.05061 7.05025M5.63639 18.364L7.05061 16.9497" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Explore Opportunities</span>
                </button>
                
                <button className="w-full text-left px-3 py-2 rounded-lg flex items-center hover:bg-background transition-colors">
                  <svg className="w-5 h-5 mr-3 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.3246 4.31731C10.7246 3.79731 11.3246 3.39731 12.0246 3.39731C13.3246 3.39731 14.2246 4.69731 13.8246 5.89731C13.5246 6.89731 12.5246 7.49731 11.4246 7.89731C11.0246 8.09731 10.8246 8.39731 10.8246 8.89731V9.19731" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M11 13H11.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Get Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
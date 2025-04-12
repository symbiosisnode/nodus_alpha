export interface ScriptOverview {
  scriptName: string;
  purpose: string;
  routePath: string;
  techStack: string[];
}

export const scriptOverview: ScriptOverview[] = [
  {
    scriptName: "homePage.js",
    purpose: "Landing page logic: calls, animations, benefits grid, testimonials, CTA transitions",
    routePath: "/",
    techStack: ["React", "GSAP", "Three.js"]
  },
  {
    scriptName: "dashboard_MTO.js",
    purpose: "MTO dashboard UI: equity stats, territory heatmap, GP/SA management",
    routePath: "/mto-dashboard",
    techStack: ["React", "Mapbox", "D3.js"]
  },
  {
    scriptName: "dashboard_GP.js",
    purpose: "GP dashboard: referral tools, team tracking, progression ladder",
    routePath: "/gp-dashboard",
    techStack: ["React", "Chart.js", "Firebase"]
  },
  {
    scriptName: "dashboard_SA.js",
    purpose: "SA dashboard: commission tracker, referral links, onboarding guides",
    routePath: "/sa-dashboard",
    techStack: ["React", "Axios", "Recharts"]
  },
  {
    scriptName: "onboardingFlow.js",
    purpose: "Handles mobile-first onboarding, form logic, AR integration",
    routePath: "/start",
    techStack: ["React", "AR.js", "Firebase"]
  },
  {
    scriptName: "referralEngine.js",
    purpose: "Handles smart links, dashboard attribution, incentive triggers",
    routePath: "/referrals",
    techStack: ["React", "Branch.io", "Firestore"]
  },
  {
    scriptName: "equityEngine.js",
    purpose: "Dynamic equity distribution UI + blockchain ledger integration",
    routePath: "/equity",
    techStack: ["React", "Solidity", "Web3"]
  },
  {
    scriptName: "mentorHub.js",
    purpose: "Community features, live Q&A components, resource library",
    routePath: "/community",
    techStack: ["React", "Socket.io", "Firebase"]
  },
  {
    scriptName: "territoryAnalytics.js",
    purpose: "AI-based insights for market heatmaps, property predictions",
    routePath: "/territory",
    techStack: ["React", "TensorFlow.js", "Mapbox"]
  },
  {
    scriptName: "gamifiedGrowth.js",
    purpose: "Badges, quests, milestones, confetti effects, leaderboard data",
    routePath: "/growth",
    techStack: ["React", "Redux", "SVG Effects"]
  }
]; 
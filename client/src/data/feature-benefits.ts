export interface FeatureBenefit {
  feature: string;
  mtoBenefit: string;
  gpBenefit: string;
  saBenefit: string;
}

export const featureBenefits: FeatureBenefit[] = [
  {
    feature: "Dynamic Equity Engine (DEE)",
    mtoBenefit: "Equity based on territory growth, recruitment, and revenue",
    gpBenefit: "Equity from team growth and retention",
    saBenefit: "Top performers earn equity; clear growth path to GP"
  },
  {
    feature: "Gamified Growth OS",
    mtoBenefit: "Recognition through leaderboards and performance milestones",
    gpBenefit: "Points, badges, and competition with peers",
    saBenefit: "Achievement rewards and status within platform"
  },
  {
    feature: "Viral Loop Referral System (VLRS)",
    mtoBenefit: "Indirect growth from referral cascades",
    gpBenefit: "Referral incentives and equity from referrals' performance",
    saBenefit: "Easy sharing, instant commissions, and social proof"
  },
  {
    feature: "AI Territory Navigator (ATN)",
    mtoBenefit: "Strategic insights into territories and expansion",
    gpBenefit: "Insights into SA deployment and market growth",
    saBenefit: "Lead suggestions and optimal properties to pursue"
  },
  {
    feature: "Empowerment Hub",
    mtoBenefit: "Mentorship access and community leadership",
    gpBenefit: "Training and support from experienced leaders",
    saBenefit: "Newbie support groups and learning tracks"
  },
  {
    feature: "Lightning Onboarding (Mobile-First)",
    mtoBenefit: "Quick scaling through streamlined onboarding of SAs/GPs",
    gpBenefit: "Instant signup and path to leadership",
    saBenefit: "Fast, easy signup and AR onboarding"
  },
  {
    feature: "Crystal Dashboard (Transparency Core)",
    mtoBenefit: "Clear metrics on network and revenue performance",
    gpBenefit: "Real-time view into personal and team metrics",
    saBenefit: "Commission and equity visibility + encouragement"
  }
]; 
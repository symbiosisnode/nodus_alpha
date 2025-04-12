import React from 'react';
import styled from 'styled-components';
import { designSystem } from '../styles/design-system';

interface EquityDashboardCardProps {
  equityPercentage: number;
  totalValue: number;
  growthRate: number;
  achievements: number;
}

interface CircularProgressProps {
  percentage: number;
}

interface GrowthIndicatorProps {
  isPositive: boolean;
}

const Card = styled.div`
  background: ${designSystem.colors.neutral.snow};
  border-radius: 12px;
  padding: ${designSystem.layout.spacing.lg};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all ${designSystem.animations.timing.micro} ${designSystem.animations.easing.easeOut};
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CircularProgress = styled.div<CircularProgressProps>`
  width: 120px;
  height: 120px;
  position: relative;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(
      ${designSystem.colors.primary.equityGold} ${props => props.percentage * 3.6}deg,
      ${designSystem.colors.neutral.mist} 0deg
    );
    animation: ${designSystem.animationClasses.equityGrowth};
  }
`;

const ProgressValue = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${designSystem.typography.fontSize.h2.mobile};
  font-weight: ${designSystem.typography.fontWeight.semiBold};
  color: ${designSystem.colors.primary.empireBlue};
`;

const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${designSystem.layout.spacing.md};
  margin-top: ${designSystem.layout.spacing.lg};
`;

const Metric = styled.div`
  text-align: center;
  
  h4 {
    color: ${designSystem.colors.neutral.slate};
    font-size: ${designSystem.typography.fontSize.small.mobile};
    margin-bottom: ${designSystem.layout.spacing.xs};
  }
  
  p {
    color: ${designSystem.colors.neutral.charcoal};
    font-size: ${designSystem.typography.fontSize.body.mobile};
    font-weight: ${designSystem.typography.fontWeight.medium};
  }
`;

const GrowthIndicator = styled.span<GrowthIndicatorProps>`
  color: ${props => props.isPositive 
    ? designSystem.colors.status.success 
    : designSystem.colors.status.error
  };
  margin-left: ${designSystem.layout.spacing.xs};
`;

const AchievementBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${designSystem.colors.primary.equityGold};
  color: ${designSystem.colors.neutral.snow};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${designSystem.typography.fontSize.micro.mobile};
  font-weight: ${designSystem.typography.fontWeight.semiBold};
  animation: ${designSystem.animationClasses.achievementUnlock};
`;

export const EquityDashboardCard: React.FC<EquityDashboardCardProps> = ({
  equityPercentage,
  totalValue,
  growthRate,
  achievements,
}) => {
  const isGrowthPositive = growthRate >= 0;
  
  return (
    <Card>
      <CircularProgress percentage={equityPercentage}>
        <ProgressValue>{equityPercentage}%</ProgressValue>
      </CircularProgress>
      
      <MetricsContainer>
        <Metric>
          <h4>Total Value</h4>
          <p>${totalValue.toLocaleString()}</p>
        </Metric>
        <Metric>
          <h4>Growth Rate</h4>
          <p>
            {Math.abs(growthRate)}%
            <GrowthIndicator isPositive={isGrowthPositive}>
              {isGrowthPositive ? '↑' : '↓'}
            </GrowthIndicator>
          </p>
        </Metric>
      </MetricsContainer>
      
      {achievements > 0 && (
        <AchievementBadge>
          {achievements}
        </AchievementBadge>
      )}
    </Card>
  );
}; 
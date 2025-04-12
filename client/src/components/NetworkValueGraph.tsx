import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';
import type { TooltipItem, Scale } from 'chart.js';
import { designSystem } from '../styles/design-system';

interface NetworkValueGraphProps {
  data: {
    labels: string[];
    values: number[];
    sources: string[];
  };
}

const GraphContainer = styled.div`
  background: ${designSystem.colors.neutral.snow};
  border-radius: 12px;
  padding: ${designSystem.layout.spacing.lg};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
`;

const GraphTitle = styled.h3`
  color: ${designSystem.colors.neutral.charcoal};
  font-size: ${designSystem.typography.fontSize.h3.mobile};
  margin-bottom: ${designSystem.layout.spacing.md};
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 300px;
`;

export const NetworkValueGraph: React.FC<NetworkValueGraphProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Create gradient for the area fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, `${designSystem.colors.primary.networkPurple}40`);
    gradient.addColorStop(1, `${designSystem.colors.primary.networkPurple}00`);

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Network Value',
            data: data.values,
            borderColor: designSystem.colors.primary.networkPurple,
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: designSystem.colors.primary.networkPurple,
            pointBorderColor: designSystem.colors.neutral.snow,
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 800,
          easing: 'easeInOutQuart',
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: designSystem.colors.neutral.charcoal,
            titleColor: designSystem.colors.neutral.snow,
            bodyColor: designSystem.colors.neutral.snow,
            padding: 12,
            displayColors: false,
            callbacks: {
              title: (items: TooltipItem<'line'>[]) => {
                const index = items[0].dataIndex;
                return data.sources[index] || 'Unknown Source';
              },
              label: (item: TooltipItem<'line'>) => {
                return `Value: $${item.parsed.y.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: designSystem.colors.neutral.slate,
            },
          },
          y: {
            grid: {
              color: `${designSystem.colors.neutral.mist}40`,
            },
            ticks: {
              color: designSystem.colors.neutral.slate,
              callback: (value: string | number) => {
                if (typeof value === 'number') {
                  return `$${value.toLocaleString()}`;
                }
                return value;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <GraphContainer>
      <GraphTitle>Network Value Growth</GraphTitle>
      <Canvas ref={canvasRef} />
    </GraphContainer>
  );
}; 
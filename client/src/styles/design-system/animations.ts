interface AnimationTiming {
  micro: string;
  microLong: string;
  page: string;
  pageLong: string;
  data: string;
  dataLong: string;
  celebration: string;
  celebrationLong: string;
}

interface AnimationEasing {
  easeOut: string;
  easeInOut: string;
  spring: string;
  elastic: string;
}

interface AnimationKeyframes {
  equityGrowth: string;
  networkPulse: string;
  achievementUnlock: string;
  territoryMorph: string;
}

interface AnimationMixins {
  microInteraction: string;
  pageTransition: string;
  dataUpdate: string;
  celebration: string;
}

interface AnimationClasses {
  equityGrowth: string;
  networkPulse: string;
  achievementUnlock: string;
  territoryMorph: string;
}

interface Animations {
  timing: AnimationTiming;
  easing: AnimationEasing;
  keyframes: AnimationKeyframes;
  mixins: AnimationMixins;
}

const timing: AnimationTiming = {
  micro: '150ms',
  microLong: '250ms',
  page: '300ms',
  pageLong: '500ms',
  data: '200ms',
  dataLong: '400ms',
  celebration: '600ms',
  celebrationLong: '800ms',
};

const easing: AnimationEasing = {
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

const keyframes: AnimationKeyframes = {
  equityGrowth: `
    @keyframes equityGrowth {
      0% { transform: scale(0.95); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
  `,
  networkPulse: `
    @keyframes networkPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `,
  achievementUnlock: `
    @keyframes achievementUnlock {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
  `,
  territoryMorph: `
    @keyframes territoryMorph {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
  `,
};

const mixins: AnimationMixins = {
  microInteraction: `
    transition: all ${timing.micro} ${easing.easeOut};
  `,
  pageTransition: `
    transition: all ${timing.page} ${easing.easeInOut};
  `,
  dataUpdate: `
    transition: all ${timing.data} ${easing.spring};
  `,
  celebration: `
    animation: achievementUnlock ${timing.celebration} ${easing.elastic};
  `,
};

export const animations: Animations = {
  timing,
  easing,
  keyframes,
  mixins,
};

export const animationClasses: AnimationClasses = {
  equityGrowth: `
    ${keyframes.equityGrowth}
    animation: equityGrowth ${timing.micro} ${easing.easeOut};
  `,
  networkPulse: `
    ${keyframes.networkPulse}
    animation: networkPulse ${timing.microLong} ${easing.easeInOut};
  `,
  achievementUnlock: `
    ${keyframes.achievementUnlock}
    animation: achievementUnlock ${timing.celebration} ${easing.elastic};
  `,
  territoryMorph: `
    ${keyframes.territoryMorph}
    animation: territoryMorph ${timing.page} ${easing.easeInOut};
  `,
}; 
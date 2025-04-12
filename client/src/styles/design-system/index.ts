import { colors } from './colors';
import { typography } from './typography';
import { layout, media, container, grid } from './layout';
import { animations, animationClasses } from './animations';

export const designSystem = {
  colors,
  typography,
  layout,
  media,
  container,
  grid,
  animations,
  animationClasses,
};

export type DesignSystem = typeof designSystem;

export default designSystem; 
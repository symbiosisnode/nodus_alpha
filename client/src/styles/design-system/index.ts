import { colors } from './colors';
import { typography } from './typography';
import { layout, media, container, grid } from './layout';
import { animations, animationClasses } from './animations';
import { NODUS_STYLE_GUIDE } from '../NodusStyleGuide';

export const designSystem = {
  colors,
  typography,
  layout,
  media,
  container,
  grid,
  animations,
  animationClasses,
  styleGuide: NODUS_STYLE_GUIDE,
};

export type DesignSystem = typeof designSystem;

export { NODUS_STYLE_GUIDE };

export default designSystem; 
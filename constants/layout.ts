/**
 * Layout constants for consistent spacing and sizing across the app
 */

// Grid columns for responsive layouts
export const GRID_COLS = {
  mobile: 2,    // < 640px
  sm: 3,        // >= 640px
  md: 4,        // >= 768px
  lg: 5,        // >= 1024px
  xl: 6,        // >= 1280px
} as const;

// Container max widths and padding
export const CONTAINER = {
  maxWidth: "1440px",
  paddingX: {
    mobile: "1rem",      // 16px
    sm: "1.5rem",        // 24px
    lg: "2rem",          // 32px
  },
} as const;

// Card sizes (width in pixels)
export const CARD_SIZES = {
  mobile: 144,  // w-36
  sm: 176,      // w-44
  md: 208,      // w-52
  lg: 240,      // w-60
} as const;

// Z-index scale for consistent layering
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  navbar: 30,
  modal: 40,
  tooltip: 50,
  toast: 60,
} as const;

// Animation durations (in ms)
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Touch target minimum sizes (for accessibility)
export const TOUCH_TARGET = {
  min: 44,      // Apple's minimum recommendation
  preferred: 48, // Material Design recommendation
} as const;

// RISE & SPEAK Complete Dark Theme Colors
export const Colors = {
  // Primary Brand Colors (Dark Optimized)
  primary: {
    50: '#1A1B3A',
    100: '#2A2D5F',
    200: '#3A3F7F',
    300: '#4A52A0',
    400: '#5A65C0',
    500: '#6366F1', // Main brand color
    600: '#7C7FF5',
    700: '#9599F8',
    800: '#AEB2FB',
    900: '#C7CBFE',
  },
  
  // Secondary Brand Colors (Dark Purple/Pink)
  secondary: {
    50: '#1F1A2E',
    100: '#2F2A4E',
    200: '#3F3A6E',
    300: '#4F4A8E',
    400: '#5F5AAE',
    500: '#7C3AED',
    600: '#8B5CF6',
    700: '#A78BFA',
    800: '#C4B5FD',
    900: '#E0E7FF',
  },
  
  // Accent Colors (Dark Optimized)
  accent: {
    orange: '#FB923C',
    pink: '#F472B6',
    emerald: '#34D399',
    amber: '#FBBF24',
    red: '#F87171',
    blue: '#60A5FA',
    purple: '#A78BFA',
    cyan: '#22D3EE',
  },
  
  // Complete Dark Theme Neutrals
  neutral: {
    50: '#0A0A0A',
    100: '#141414',
    200: '#1F1F1F',
    300: '#2A2A2A',
    400: '#404040',
    500: '#525252',
    600: '#737373',
    700: '#A3A3A3',
    800: '#D4D4D4',
    900: '#F5F5F5',
    950: '#FAFAFA',
  },
  
  // Dark Theme System Colors
  dark: {
    background: '#000000',
    surface: '#0A0A0A',
    card: '#141414',
    cardElevated: '#1F1F1F',
    border: '#2A2A2A',
    borderLight: '#404040',
    text: '#FFFFFF',
    textSecondary: '#D4D4D4',
    textMuted: '#A3A3A3',
    textDisabled: '#737373',
    overlay: 'rgba(0, 0, 0, 0.8)',
    overlayLight: 'rgba(0, 0, 0, 0.6)',
  },
  
  // Status Colors (Dark Optimized)
  status: {
    success: '#22C55E',
    successBg: '#052E16',
    warning: '#EAB308',
    warningBg: '#1F1611',
    error: '#EF4444',
    errorBg: '#1F1315',
    info: '#3B82F6',
    infoBg: '#0F1629',
  },
  
  // Interactive States
  interactive: {
    hover: 'rgba(255, 255, 255, 0.05)',
    pressed: 'rgba(255, 255, 255, 0.1)',
    focus: 'rgba(99, 102, 241, 0.2)',
    disabled: 'rgba(255, 255, 255, 0.3)',
  },
  
  // Live/Active States
  live: '#EF4444',
  online: '#22C55E',
  offline: '#6B7280',
  
  // Dark Gradients
  gradients: {
    primary: ['#1A1B3A', '#6366F1', '#8B5CF6'],
    secondary: ['#1F1A2E', '#7C3AED', '#F472B6'],
    accent: ['#FB923C', '#F472B6', '#A78BFA'],
    dark: ['#000000', '#0A0A0A', '#141414'],
    surface: ['#0A0A0A', '#141414', '#1F1F1F'],
    overlay: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)'],
    brand: ['#6366F1', '#8B5CF6', '#F472B6'],
    glow: ['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)', 'rgba(244, 114, 182, 0.1)'],
  },
  
  // Component Specific Colors
  components: {
    input: {
      background: '#141414',
      border: '#2A2A2A',
      borderFocus: '#6366F1',
      text: '#FFFFFF',
      placeholder: '#737373',
    },
    button: {
      primary: '#6366F1',
      primaryHover: '#5A65C0',
      secondary: '#141414',
      secondaryHover: '#1F1F1F',
      danger: '#EF4444',
      dangerHover: '#DC2626',
    },
    card: {
      background: '#141414',
      backgroundElevated: '#1F1F1F',
      border: '#2A2A2A',
      shadow: 'rgba(0, 0, 0, 0.5)',
    },
  },
};

export const getGradientColors = (type: keyof typeof Colors.gradients) => {
  return Colors.gradients[type];
};

// Dark Theme Utilities
export const DarkTheme = {
  colors: {
    primary: Colors.primary[500],
    background: Colors.dark.background,
    card: Colors.dark.card,
    text: Colors.dark.text,
    border: Colors.dark.border,
    notification: Colors.accent.blue,
  },
};
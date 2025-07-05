// RISE & SPEAK Brand Colors
export const Colors = {
  // Primary Brand Colors
  primary: {
    50: '#F0F4FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1', // Main brand color
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  
  // Secondary Brand Colors (Purple/Pink gradient)
  secondary: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',
    600: '#9333EA',
    700: '#7C3AED',
    800: '#6B21A8',
    900: '#581C87',
  },
  
  // Accent Colors
  accent: {
    orange: '#F97316',
    pink: '#EC4899',
    emerald: '#10B981',
    amber: '#F59E0B',
    red: '#EF4444',
  },
  
  // Neutral Colors
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },
  
  // Dark Theme Colors
  dark: {
    background: '#0F0F23',
    surface: '#1A1A3A',
    card: '#1F2937',
    border: '#374151',
    text: '#FFFFFF',
    textSecondary: '#9CA3AF',
    textMuted: '#6B7280',
  },
  
  // Status Colors
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Live/Active States
  live: '#EF4444',
  online: '#10B981',
  
  // Gradients
  gradients: {
    primary: ['#6366F1', '#8B5CF6'],
    secondary: ['#8B5CF6', '#EC4899'],
    accent: ['#EC4899', '#F97316'],
    dark: ['#0F0F23', '#1A1A3A', '#2D1B69'],
    surface: ['#1F2937', '#111827'],
  },
};

export const getGradientColors = (type: keyof typeof Colors.gradients) => {
  return Colors.gradients[type];
};
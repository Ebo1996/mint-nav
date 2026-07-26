// Admin Dashboard Official Color System
export const colors = {
  // Primary Brand
  primary: '#086976',
  primaryHover: '#06515B',
  primaryLight: '#0B8293',
  
  // Backgrounds
  bodyBg: '#FFFFFF',
  surfaceBg: '#F8FAFC',
  cardBg: '#FFFFFF',
  
  // Text
  primaryText: '#111111',
  secondaryText: '#666666',
  mutedText: '#9CA3AF',
  
  // Borders
  border: '#E5E7EB',
  divider: '#F3F4F6',
  
  // Status Colors
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  information: '#3B82F6',
} as const

export type ColorKey = keyof typeof colors

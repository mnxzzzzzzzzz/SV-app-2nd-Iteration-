export const Colors = {
  // StudentVerse Brand Palette
  navy: "#0A0F1E",
  azure: "#2962FF",
  cyan: "#00F0FF",
  gold: "#FFD700",
  violet: "#7B2CBF",
  
  // Semantic Colors
  background: "#0A0F1E",
  surface: "rgba(255, 255, 255, 0.03)",
  surfaceLight: "rgba(255, 255, 255, 0.06)",
  
  // Primary/Accent
  primary: "#2962FF",
  primaryGradient: ["#1A2139", "#0A0F1E"] as const,
  accentGradient: ["#00F0FF", "#7B2CBF"] as const,
  glowGradient: ["rgba(255, 255, 255, 0.4)", "transparent"] as const,
  primaryDark: "#1E4FCC",
  
  // Status Colors
  success: "#10B981",
  error: "#EF4444",
  destructive: "#EF4444",
  warning: "#FFD700",
  
  // Text Colors
  text: {
    primary: "#FFFFFF",
    secondary: "#A0A4B8",
    tertiary: "#64748B",
  },
  
  // Glassmorphism
  glass: {
    background: "rgba(255, 255, 255, 0.03)",
    border: "rgba(255, 255, 255, 0.1)",
    highlight: "rgba(255, 255, 255, 0.06)",
  },
  
  // Borders
  border: "rgba(255, 255, 255, 0.1)",
  borderLight: "rgba(255, 255, 255, 0.15)",
}

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
}

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  medium: 12,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
}

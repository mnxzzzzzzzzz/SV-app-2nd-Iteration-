# StudentVerse Mobile App

## Overview

StudentVerse is a mobile-first student lifestyle application built with React Native (Expo) for native mobile platforms and React with Vite for web preview. The app provides students with QR-based discount redemptions at merchants, a digital payment wallet (SV Pay), an AI-powered activity planner (Orbit), and profile management features.

The application follows a dark theme design system with a comprehensive StudentVerse brand palette using CSS variables for consistent theming.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### Brand System Refactor (January 2026)
- Implemented comprehensive StudentVerse brand system using CSS variables with `--sv-` prefix
- Updated 30+ components to use CSS variables instead of hardcoded colors
- Applied consistent glassmorphism effects across all components
- Updated color palette: Navy (#0A0F1E), Azure (#2962FF), Cyan (#00F0FF), Gold (#FFD700), Violet (#7B2CBF)

## System Architecture

### Dual Platform Strategy
The project maintains two rendering targets:
1. **Native Mobile (Expo/React Native)** - Primary platform using Expo SDK 54 with React Native 0.81, entry point via `node_modules/expo/AppEntry.js`
2. **Web Preview (Vite/React)** - Design system showcase and rapid prototyping via Vite, entry point at `src/main.tsx`

### Application Structure

**Navigation Pattern**: Bottom tab navigation with 5 main sections:
- Home - Dashboard with stats and recent activity
- QR - Merchant discount QR code generation and redemption flow
- Pay - SV Pay wallet and transaction history
- Orbit - AI-powered activity/plan recommendation chat interface
- Me - User profile and settings

**State Management**: Component-level state with React hooks. No global state management library - flows are self-contained within screen components.

**Component Organization**:
- `/src/screens/` - React Native screen components for Expo builds
- `/src/app/components/screens/` - Web-compatible screen components for Vite builds
- `/src/app/components/ui/` - Shared UI primitives (shadcn/ui based)
- `/src/components/` - React Native specific components

### Key User Flows

**QR Redemption Flow**: Multi-step wizard pattern
1. Merchant list with search/filter
2. Active QR display with 30-second countdown timer
3. Status screen (success/expired/already-used/wrong-device/cap-hit)

**Authentication Flow**: Three-step onboarding
1. Email entry (restricted to .edu/.ac.ae domains)
2. OTP verification with 6-digit code
3. Waitlist with referral system

**SV Pay Flow**: Financial Dashboard with:
1. Animated balance counter with count-up effect
2. Interactive 3D virtual card with tilt/parallax hover effect
3. Quick action grid (Freeze Card, Online Payments, Aani Pay)
4. Transaction history with category icons (food, shopping, transport, utility)
5. Credit/debit transaction styling with color-coded icons

### Design System

Centralized design tokens in:
- `/src/styles/theme.css` - CSS custom properties for web (50+ variables)
- `/src/constants/Colors.ts` - Native color/spacing/typography constants

**Brand Color Palette** (CSS Variables):
- `--sv-navy`: #0A0F1E (Background)
- `--sv-azure`: #2962FF (Primary)
- `--sv-cyan`: #00F0FF (Accent)
- `--sv-gold`: #FFD700 (Warning)
- `--sv-violet`: #7B2CBF (Secondary Accent)
- `--sv-text-main`: #FFFFFF
- `--sv-text-muted`: #A0A4B8

**Typography System** (Google Fonts):
- `--font-heading`: 'Outfit' - Bold headings and display text
- `--font-body`: 'IBM Plex Sans' - Body text and UI elements
- `--font-mono`: 'IBM Plex Mono' - Labels, metadata, uppercase text

**Glassmorphism System**:
- `--sv-glass-bg`: rgba(255,255,255,0.03)
- `--sv-glass-border`: rgba(255,255,255,0.1)
- `--sv-glass-highlight`: rgba(255,255,255,0.06)

**Border Radius System**:
- `--sv-radius-sm`: 8px
- `--sv-radius-md`: 12px
- `--sv-radius-lg`: 16px
- `--sv-radius-xl`: 20px
- `--sv-radius-full`: 9999px

**Typography Utility Classes**:
- `.font-heading`, `.font-body`, `.font-mono` - Font family utilities
- `.text-label` - Mono font, 10px, uppercase, wide tracking (for labels)
- `.text-meta` - Mono font, 12px, uppercase (for metadata)
- `.text-display` - Heading font, 48px, extra bold (for hero text)

**Color Utility Classes** (Tailwind extensions):
- `bg-sv-navy`, `bg-sv-azure`, `bg-sv-cyan`, `bg-sv-gold`, `bg-sv-violet`
- `text-sv-text-main`, `text-sv-text-muted`
- `bg-sv-glass-bg`, `border-sv-glass-border`, `bg-sv-glass-highlight`

UI components use shadcn/ui patterns with Radix primitives for accessibility.

## External Dependencies

### Animation Libraries
- **Framer Motion (motion/react)** - Web animations and transitions
- **React Native Animated API** - Native mobile animations

### UI Component Libraries
- **Radix UI Primitives** - Accessible component foundations (dialogs, dropdowns, accordions, etc.)
- **Lucide React / Expo Vector Icons** - Icon systems for web and native respectively
- **react-qr-code / react-native-qrcode-svg** - QR code generation

### Platform SDKs
- **Expo SDK 54** - Native capabilities (blur, gradients, fonts, assets, status bar)
- **React Navigation v6** - Native navigation with bottom tabs and stack navigators

### Styling
- **Tailwind CSS v4** - Utility-first CSS for web components
- **class-variance-authority** - Component variant management
- **tailwind-merge** - Class deduplication

### Build Tools
- **Vite** - Web development server and bundler
- **Babel with babel-preset-expo** - JavaScript/TypeScript compilation for native
- **TypeScript** - Static type checking across both platforms

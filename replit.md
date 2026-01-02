# StudentVerse Mobile App

## Overview

StudentVerse is a mobile-first student lifestyle application built with React Native (Expo) for native mobile platforms and React with Vite for web preview. The app provides students with QR-based discount redemptions at merchants, a digital payment wallet (SV Pay), an AI-powered activity planner (Orbit), and profile management features.

The application follows a dark theme design system with a consistent color palette centered around deep navy backgrounds (#080C1F) and electric blue accents (#2962FF).

## User Preferences

Preferred communication style: Simple, everyday language.

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
- `/src/constants/Colors.ts` - Native color/spacing/typography constants
- `/src/styles/theme.css` - CSS custom properties for web

Core colors: Background (#080C1F), Primary (#2962FF), Success (#10B981), Error (#EF4444), Neutral (#A0A4B8)

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
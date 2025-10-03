# Overview

This is a sophisticated conversion funnel for the DEUSA18DAY program - an 18-day Pilates aesthetic transformation program for women. The funnel features a magnetic landing page, interactive quiz system, personalized results, and optimized sales page.

# User Preferences

- Design preferences: Clean, minimalist, sophisticated, premium dark theme
- Color scheme: Dark gradient backgrounds (#131313 to #6e5046) with rose gold accents (#d4a490)
- Mobile-first responsive design
- Smooth animations and transitions
- Glassmorphism effects for premium feel

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing  
- **State Management**: TanStack React Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Tool**: Vite with React plugin and development error overlay

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Storage Pattern**: Abstract storage interface with in-memory implementation for development
- **Session Management**: Ready for PostgreSQL session storage with connect-pg-simple

## Development Environment
- **Hot Module Replacement**: Vite development server with Express middleware integration
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Path Aliases**: Configured for clean imports (@/ for client, @shared for shared types)
- **Linting**: ESM modules with strict TypeScript configuration

## Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Definition**: Centralized schema in shared directory with Zod validation
- **Database Connection**: Neon Database serverless PostgreSQL
- **Type Generation**: Automatic TypeScript type inference from database schema

## Component Architecture
- **Design System**: shadcn/ui with "new-york" style variant
- **Component Structure**: Atomic design with ui/, pages/, and hooks/ organization
- **Theming**: CSS custom properties with light/dark mode support
- **Accessibility**: Radix UI primitives ensure WCAG compliance

# Application Features

## Landing Page (/)
- Compelling headline about the 1% of women who can handle the challenge
- Benefits list with emoji icons
- Strong CTA to start the quiz
- Minimalist design with gradient accents

## Quiz System (/quiz)
- 10 strategic questions to identify "DNA de Deusa"
- Progress bar showing completion
- Smooth transitions between questions
- Score calculation based on answers

## Results Page (/resultado)
- Personalized result based on quiz score
- Different messaging for "DNA detected" (score ≥ 6) vs "DNA dormant"
- Immediate offer presentation
- Loading animation for dramatic effect

## Offer Page (/oferta)
- Complete sales page with program details
- What's included section with 6 key features
- Customer testimonials
- Pricing section (R$ 49)
- 30-day guarantee
- FAQ section
- Sticky CTA button

# Design System

## Color Palette
- Background: Dark gradient (#131313 to #6e5046)
- Primary Accent: Rose gold (#d4a490)
- Text Primary: #FFFFFF with 0.95 opacity
- Text Secondary: #FFFFFF with 0.8 opacity
- Text Tertiary: #FFFFFF with 0.6 opacity
- Card Backgrounds: rgba(255, 255, 255, 0.05) with backdrop blur
- Special Accent: Gold (#FFD700) for pricing highlights

## Typography
- Font: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- H1: 32px, weight 800
- H2: 24px, weight 700
- Body: 16-18px, weight 400-500

## Animations
- fadeIn: Page transitions
- scaleIn: Card appearances
- pulse: CTA buttons
- shimmer: Loading states
- Smooth transitions with cubic-bezier easing

## Effects & Styling
- Glassmorphism: Cards with backdrop-filter blur(10px)
- Glow effects: Using #d4a490 for premium feel
- Custom scrollbar with brand colors
- Premium animations: premiumGlow, luxuryShimmer, elegantFloat
- Selection color: rgba(212, 164, 144, 0.3)

# External Dependencies

## Database & ORM
- **@neondatabase/serverless**: Serverless PostgreSQL connection for Neon Database
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **drizzle-kit**: Schema management and migration tooling
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## UI Framework & Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for component styling
- **clsx**: Conditional className utility

## State Management & API
- **@tanstack/react-query**: Server state management with caching and synchronization
- **wouter**: Lightweight React router
- **react-hook-form**: Form state management with validation

## Development Tools
- **vite**: Fast build tool and development server
- **@vitejs/plugin-react**: React support for Vite
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for Replit
- **tsx**: TypeScript execution for Node.js development

## Validation & Utilities
- **zod**: TypeScript-first schema validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod schemas
- **date-fns**: Modern date utility library
- **nanoid**: URL-safe unique string ID generator

# Recent Changes

- 2025-01-17: Complete redesign from adult content to DEUSA18DAY funnel
- 2025-01-17: Implemented quiz system with 10 questions
- 2025-01-17: Created personalized results page with score logic
- 2025-01-17: Built comprehensive offer page with testimonials and FAQs
- 2025-01-17: Added smooth animations and mobile-optimized design
- 2025-01-17: Implemented clean, sophisticated UI with light color scheme
- 2025-01-17: Complete redesign to premium dark theme with rose gold accents
- 2025-01-17: Added DEUSA18DAY logo across all pages
- 2025-01-17: Implemented glassmorphism effects for sophisticated appearance
- 2025-01-17: Enhanced animations with premium glow and shimmer effects
- 2025-01-17: Custom scrollbar and selection styling for cohesive experience
- 2025-01-17: Implemented comprehensive typography refinement across all pages
- 2025-01-17: Reduced font sizes for better visual hierarchy (H1: 28px, H2: 22px, body: 14-16px)
- 2025-01-17: Optimized container max-width from 500px to 420px for better mobile experience
- 2025-01-17: Reduced padding and spacing throughout for more refined appearance
- 2025-01-17: Implemented responsive design adjustments for mobile devices
- 2025-01-17: Refined CTA buttons with max-width of 320px and reduced padding
- 2025-01-17: Adjusted shadow effects to be more subtle across all components
- 2025-01-17: Reduced border-radius from 16-20px to consistent 12px
- 2025-01-17: Optimized quiz page with compact progress bar and refined answer cards
- 2025-01-17: Improved offer page with better proportioned pricing and feature cards
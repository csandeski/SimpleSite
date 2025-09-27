# Overview

This is a full-stack web application built with a React frontend and Express.js backend. The project is a mobile-optimized landing page for adult content promotion featuring geolocation, video section, statistics cards, WhatsApp conversation simulation, and a complete Tinder-style matching page. The site uses sensual background imagery with targeted messaging and includes an interactive user journey from landing page to matching experience.

# User Preferences

- Preferred communication style: Simple, everyday language
- Design preferences: Clean, professional, mobile-first approach with warm craft-appropriate colors
- UI Elements: Squared corners (not rounded), 3D buttons with green gradients
- Payment: PIX-only payment method, no credit card options

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
- Hero section with course presentation
- Pricing card with 3D button effects (R$ 29,90)
- Product showcase with 5 crochet pieces
- Student testimonials carousel
- Bonus section with WhatsApp group (Portuguese interface)
- FAQ section
- Call-to-action buttons throughout

## Checkout Page (/checkout)
- Timer countdown for urgency
- Product card with instructor image and pricing
- Personal information form (name, email, phone, CPF/CNPJ)
- PIX-only payment method
- Three optional upsells with dynamic pricing
- Order summary with real-time total calculation
- Security badges and trust indicators

# Design System

## Color Palette
- Primary: Rose/Pink tones for warmth
- Accent: Emerald green for CTAs
- Highlight: Amber for attention
- Text: Dark grays for readability
- Background: Light cream/beige tones

## Typography
- H1: text-3xl md:text-5xl
- H2: text-2xl md:text-4xl
- Body: text-base md:text-lg
- All buttons: Squared corners with 3D gradient effects

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

- 2025-01-15: Implemented complete UTM tracking system for Facebook Ads with LiraPay integration
- 2025-01-15: UTM format: utm_source=FB&utm_campaign={{campaign.name}}|{{campaign.id}}&utm_medium={{adset.name}}|{{adset.id}}&utm_content={{ad.name}}|{{ad.id}}&utm_term={{placement}}
- 2025-01-14: Updated checkout page with correct product card design (no rounded corners)
- 2025-01-14: Fixed pricing to R$ 47,00 base price for consistency
- 2025-01-14: Implemented PIX-only checkout with upsells functionality
- 2025-01-14: Created Portuguese WhatsApp group mockup for bonus section
- 2025-01-14: Standardized all buttons with 3D green gradient effects
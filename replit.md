# Overview

This is a full-stack web application built with a React frontend and Express.js backend. The project uses a modern TypeScript-based architecture with Vite for build tooling and shadcn/ui for component styling. The application is configured for PostgreSQL database integration using Drizzle ORM and includes a comprehensive UI component library based on Radix UI primitives.

# User Preferences

Preferred communication style: Simple, everyday language.

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
# MaeKung Cafe POS System

A dual-interface Point-of-Sale system for MaeKung Cafe, built with Next.js, Prisma, and Supabase. Features a customer-facing LIFF (LINE Mini App) for mobile ordering and a kitchen dashboard for real-time order management.

## Overview

This project streamlines cafe operations with two distinct interfaces sharing a single codebase:

- **Customer LIFF App**: Mobile-first ordering experience with Apple Design System aesthetics
- **Kitchen Dashboard**: Tablet-optimized, high-contrast interface for kitchen staff with Linear Design System

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase) with Prisma ORM
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand (with persistence)
- **Validation**: Zod
- **Authentication**: LINE LIFF SDK (Phase 4)
- **Realtime**: Supabase Realtime subscriptions (Phase 4)

## Features

### Customer Interface (`/(customer)`)
- Auto-login via LINE LIFF SDK
- Categorized menu catalog with 40+ food images
- Modifier selection (size, sweetness, special notes)
- Persistent shopping cart with Zustand
- Real-time order status tracking

### Kitchen Dashboard (`/(kitchen)`)
- 3-column Kanban board (Pending → Cooking → Completed)
- High-contrast, elderly-friendly UI design
- One-tap status updates
- Real-time order synchronization

## Project Structure

```
src/
├── app/
│   ├── (customer)/          # Customer LIFF App (Apple Style)
│   │   ├── menu/            # Menu browsing page
│   │   ├── cart/            # Shopping cart & checkout
│   │   └── layout.tsx       # Mobile-first layout
│   ├── (kitchen)/           # Kitchen Dashboard (Linear Style)
│   │   ├── dashboard/       # Order Kanban board
│   │   └── layout.tsx       # Tablet-optimized layout
│   └── api/                 # REST API routes
│       ├── menu/            # GET /api/menu
│       └── orders/          # POST /api/orders, PATCH /api/orders/[id]
├── components/
│   ├── ui/                  # shadcn/ui base components
│   ├── customer/            # Customer-specific components
│   │   ├── MenuItemCard.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── FloatingCartBar.tsx
│   │   └── MenuItemModifierDialog.tsx
│   └── kitchen/             # Kitchen-specific components (Phase 4)
├── hooks/
│   └── useCart.ts           # Zustand cart store with persistence
├── lib/
│   ├── prisma.ts            # Prisma client singleton
│   └── mock-data.ts         # Development mock data
└── types.ts                 # Generated Prisma TypeScript types

prisma/
├── schema.prisma            # Database schema
└── seed.ts                  # Database seeding script
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for PostgreSQL database)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/isola513i/POS-MaeKungCafe.git
cd POS-MaeKungCafe
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```env
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
```

### Database Setup

1. Push Prisma schema to database:
```bash
npm run db:push
```

2. Seed the database with menu items:
```bash
npm run db:seed
```

3. (Optional) Explore database with Prisma Studio:
```bash
npm run db:studio
```

### Running the App

```bash
npm run dev
```

Open:
- Customer App: http://localhost:3000/menu
- Kitchen Dashboard: http://localhost:3000/dashboard

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/menu` | Fetch all available menu items |
| POST | `/api/orders` | Create new order (server-side price calculation) |
| PATCH | `/api/orders/[id]` | Update order status |

## Design Systems

### Apple Design System (Customer)
- Clean, spacious layouts with rounded corners (`rounded-2xl`)
- Soft shadows (`shadow-sm`, `shadow-md`)
- Primary blue accent (`#0066cc`)
- SF Pro-inspired typography
- Glassmorphism effects (`backdrop-blur-md`)

### Linear Design System (Kitchen)
- High-contrast dark mode (`bg-zinc-950`, `text-white`)
- Sharp edges, data-dense layout
- Color-coded status indicators
- Massive typography for elderly-friendly readability
- Minimal decorative elements

## Architecture Principles

Following the project's `agent.md` directives:

1. **Type Safety First**: All components use strict TypeScript with Prisma-generated types
2. **UI Component Isolation**: Dumb components in `/components/`, smart logic in pages/hooks
3. **DRY Principle**: Reuse shadcn/ui components before creating custom ones
4. **Security**: Server-side price calculation, Zod validation on all API routes
5. **No Spaghetti Code**: Clear separation between customer and kitchen concerns

## Roadmap

- [x] Phase 1: Prisma Schema & TypeScript types
- [x] Phase 2: Mock Data
- [x] Phase 3: Base UI Components (Customer & Kitchen)
- [ ] Phase 4: Integration (Supabase Realtime & LINE LIFF)

## Contributing

This project follows Conventional Commits:
- `feat:` New features
- `fix:` Bug fixes
- `chore:` Build process, dependencies
- `docs:` Documentation
- `refactor:` Code restructuring
- `style:` Formatting changes

## License

MIT License - MaeKung Cafe Team

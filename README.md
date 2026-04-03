# Contrall Landing

SaaS platform landing page for **Contrall** — a tracking system management platform.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React Compiler)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + CSS variables
- **i18n:** next-intl (EN, UK, RU)
- **Animations:** tailwind-animations + custom CSS keyframes
- **Linting/Formatting:** Biome 2.2
- **Package Manager:** pnpm

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command        | Description                        |
|----------------|------------------------------------|
| `pnpm dev`     | Start development server           |
| `pnpm build`   | Production build                   |
| `pnpm start`   | Start production server            |
| `pnpm lint`    | Run Biome check (lint + format)    |
| `pnpm format`  | Run Biome format with auto-fix     |

## Project Structure

```
src/
├── app/
│   ├── [locale]/              # Localized routes
│   │   ├── auth/              # Authentication pages (login, register, forgot-password)
│   │   ├── profile/           # Profile pages (settings, my-trackers)
│   │   ├── page.tsx           # Landing page
│   │   └── layout.tsx         # Locale layout
│   └── layout.tsx             # Root layout
├── components/
│   ├── auth/                  # Auth form components
│   ├── icons/                 # SVG icon components
│   ├── layout/                # Header, footer, nav, mobile menu
│   ├── sections/              # Landing page sections
│   └── ui/                    # Design system (buttons, inputs, glass effects)
├── hooks/                     # Shared React hooks
├── i18n/                      # next-intl config (routing, navigation)
├── styles/                    # Global CSS, variables, animations
└── proxy.ts                   # Auth middleware
messages/
├── en.json                    # English translations
├── uk.json                    # Ukrainian translations
└── ru.json                    # Russian translations
```

## Internationalization

Three locales supported: **Russian** (default), **English**, **Ukrainian**.

Translations are stored in `messages/*.json` and accessed via `useTranslations` (client) or `getTranslations` (server) from `next-intl`.

## Architecture

- **Server Components** are the default — `"use client"` only on interactive components
- **Header** is a Server Component with client sub-components via Context (`HeaderProvider`)
- **Section reveal animations** are powered by a global IntersectionObserver inline script
- **CSS variables** define the full design token system (colors, shadows, spacing) in `src/styles/variables.css`

## Code Conventions

- **Biome** for all linting and formatting (not ESLint/Prettier)
- **2-space** indentation
- **`import type`** for type-only imports
- **PascalCase** for components, **camelCase** for functions/variables
- Path alias: `@/*` maps to `./src/*`

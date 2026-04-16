# Contrall Landing

SaaS platform frontend for **Contrall** — a tracking system management platform. Includes a public landing page and a private SaaS dashboard (auth, profile settings, tracker management).

## Tech Stack

- **Framework:** Next.js 16 (App Router, React Compiler)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + CSS variables
- **i18n:** next-intl (EN, UK, RU)
- **Data fetching:** SWR (GET) + `useTransition` (mutations)
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

### Environment

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
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
│   ├── [locale]/
│   │   ├── auth/
│   │   │   ├── login/             # actions.ts (login, logout), page.tsx
│   │   │   ├── register/          # actions.ts (register), page.tsx
│   │   │   └── forgot-password/
│   │   ├── profile/
│   │   │   ├── my-trackers/       # actions.ts (getTrackers, createTracker, …), page.tsx
│   │   │   └── settings/          # actions.ts (getProfileInfo, getBillingHistory, …), page.tsx
│   │   ├── page.tsx               # Landing page
│   │   └── layout.tsx
│   └── layout.tsx                 # Root layout
├── components/
│   ├── auth/                      # Auth form components
│   ├── icons/                     # SVG icon components
│   ├── layout/                    # Header, footer, nav, mobile menu
│   ├── sections/                  # Landing page sections
│   └── ui/                        # Design system (buttons, inputs, modal, etc.)
├── hooks/                         # Shared React hooks
├── i18n/                          # next-intl config (routing, navigation)
├── lib/
│   └── api-client.ts              # apiFetch, apiAction, ApiError, ApiResult
├── styles/                        # Global CSS, variables, animations
└── proxy.ts                       # Auth middleware (Edge runtime)
messages/
├── en.json
├── uk.json
└── ru.json
```

## Authentication

Auth state is managed via HttpOnly cookies set by Next.js Server Actions:

| Cookie          | TTL     | HttpOnly | Purpose                        |
|-----------------|---------|----------|--------------------------------|
| `access_token`  | 15 min  | yes      | API authorization              |
| `refresh_token` | 30 days | yes      | Obtain new access token        |
| `auth_email`    | 30 days | no       | Display email client-side      |

**Middleware** (`src/proxy.ts`, Edge runtime) handles route protection on every request:
- `/[locale]/auth/*` — redirects to `/profile/my-trackers` if already authenticated
- `/[locale]/profile/*` — redirects to `/auth/login` if not authenticated; silently refreshes `access_token` if expired

## Data Fetching

All server communication goes through `src/lib/api-client.ts`:

```ts
// GET requests — throws ApiError on non-2xx. Use as SWR fetcher.
apiFetch<T>(path: string): Promise<T>

// Mutations — returns ApiResult, never throws. Use inside useTransition.
apiAction<T = void>(method, path, body?): Promise<ApiResult<T>>
```

`ApiResult<T>` is a discriminated union:
```ts
type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError }
```

Both functions automatically attach `Authorization: Bearer <access_token>` from the HttpOnly cookie.

### Patterns

**Reading data (GET):**
```tsx
const { data, mutate } = useSWR("trackers", getTrackers);
```

**Mutations:**
```tsx
const [isPending, startTransition] = useTransition();

startTransition(async () => {
  const result = await deleteTracker(id);
  if (result.ok) { /* success */ }
});
```

**Optimistic updates:**
```tsx
mutate((prev) => prev?.filter((t) => t.id !== id), { revalidate: false });
```

### Server Actions

Each route has its own `actions.ts` next to the page. All API calls are currently mocked with a 1s delay — replace with `apiFetch`/`apiAction` calls when the backend is ready.

| File | Exports |
|------|---------|
| `auth/login/actions.ts` | `login`, `logout` |
| `auth/register/actions.ts` | `register` |
| `profile/my-trackers/actions.ts` | `getTrackers`, `createTracker`, `deleteTracker`, `pauseTracker` |
| `profile/settings/actions.ts` | `getProfileInfo`, `updateProfileInfo`, `changePassword`, `getBillingHistory` |

## Internationalization

Three locales: **English** (default), **Ukrainian**, **Russian**.

Translations live in `messages/*.json` and are accessed via:
- `useTranslations("Namespace")` — client components
- `getTranslations("Namespace")` — server components

## Architecture

- **Server Components** are the default — `"use client"` only on interactive components
- **Header** is a Server Component with client sub-components via Context (`HeaderProvider`)
- **Section reveal animations** are powered by a global IntersectionObserver inline script
- **CSS variables** define the full design token system (colors, shadows, spacing) in `src/styles/variables.css`
- **Page-specific components** go in `app/[route]/components/` — only truly shared components go in `src/components/`

## Code Conventions

- **Biome** for all linting and formatting (not ESLint/Prettier)
- **2-space** indentation
- **`import type`** for type-only imports
- **PascalCase** for components, **camelCase** for functions/variables
- Path alias: `@/*` maps to `./src/*`

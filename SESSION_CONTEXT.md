# Session Context — Youssof E-Commerce

**Date captured:** 2026-06-08  
**Project path:** `D:\descktop\youssof-ecommerce\youssof-ecommerce`  
**Branch:** `main`  
**Last merged PR:** #16 (login feature branch)

---

## Project Overview

Portfolio e-commerce storefront.  
**Stack:** React 19 + Vite + TypeScript + Tailwind v4 + Zustand v5 + FakeStore API  
**Deployment:** GitHub Pages (gh-pages)

---

## Current File Structure (src/)

```
src/
├── App.tsx                          # Route tree — auth guards wired
├── main.tsx
├── vite-env.d.ts
├── Zustand/
│   ├── store.ts                     # Combined Zustand store
│   └── slices/
│       ├── authSlice.ts             # Auth: register / loginUser / logout
│       └── cartSlice.ts             # Cart with localStorage persist
├── components/
│   ├── common/
│   │   ├── Layout.tsx               # Shell layout (header + outlet)
│   │   └── AuthGuard.tsx            # Route guard — requireAuth prop
│   ├── sections/
│   │   ├── Header.tsx               # Nav + logout button
│   │   └── Sider.tsx
│   ├── HomePage.tsx
│   └── ProductPage.tsx
├── context/
│   ├── ProductsContext.ts
│   └── ProductsProvider.tsx         # Products cached → localStorage key 'products:cache:v1'
├── hooks/
│   └── api.ts                       # Axios instance, base URL: fakestoreapi.com
└── pages/
    ├── Home.tsx
    ├── Product.tsx
    ├── ProductDetails.tsx
    ├── cart.tsx
    ├── Login.tsx
    ├── Signup.tsx
    └── NotFound.tsx
```

---

## Routing Architecture (App.tsx)

```
/login   → Login.tsx      ─┐ AuthGuard requireAuth=false
/signup  → Signup.tsx     ─┘  (redirect to / if already logged in)

/         → Home.tsx        ─┐
/product  → Product.tsx      │ Layout (header+outlet)
/product/:id → ProductDetails│ AuthGuard requireAuth=true
/cart     → Cart.tsx        ─┘  (redirect to /login if not logged in)

*  → NotFound.tsx
```

---

## Auth System (Completed — PR #16)

**Files:** `authSlice.ts`, `AuthGuard.tsx`, `Login.tsx`, `Signup.tsx`, `Header.tsx`

### How it works
- Auth state lives in Zustand store (`isLoggedIn`, `user`, `registeredUsers`)
- `registeredUsers` stores `{ id, name, email, password }` — plain-text passwords, **no backend, no JWT** — this is a portfolio demo
- `register(name, email, password)` → returns error string or null on success; auto-logs in
- `loginUser(email, password)` → returns error string or null on success
- `logout()` → clears user + isLoggedIn
- `AuthGuard` wraps route groups via `<Outlet />` — redirect logic is symmetric:
  - `requireAuth=true` + not logged in → `/login`
  - `requireAuth=false` + logged in → `/`

### Known limitation
- Passwords stored plain-text in Zustand (intentional for portfolio demo; not a real app)
- Auth state is NOT persisted to localStorage — users must re-register on page refresh

---

## Key Architectural Decisions

| Decision | Detail |
|---|---|
| State management | Zustand v5 (replaced Redux — migration complete) |
| API client | `src/hooks/api.ts` — axios, base: `fakestoreapi.com` |
| Cart persistence | Zustand `persist` middleware → localStorage key `'cart'` |
| Products cache | `ProductsProvider` → localStorage key `'products:cache:v1'` |
| Dead code to clean | Redux packages still in `package.json` (remove them) |
| Dead code to clean | `useAxios` / `useFetch` hooks (delete after JSONPlaceholder user section removed) |
| Dead code to clean | JSONPlaceholder user section — entirely dead, delete it |

---

## Roadmap (3 Phases)

| Phase | Status | Goal |
|---|---|---|
| Phase 1 — Stabilization & Cleanup | Partially done | Remove Redux deps, dead hooks, dead user section; TypeScript migration |
| Phase 2 — Core UX Completeness | Not started | Cart UX, product listing polish, responsive layout |
| Phase 3 — Category Filtering | Not started | Filter products by category using FakeStore `/categories` endpoint |

**Completed so far (Phase 1 tasks):**
- TypeScript migration (PR #13 area)
- Zustand migration from Redux (complete)
- Auth system: login, signup, route guards, header logout (PR #16)

**Remaining Phase 1 cleanup:**
- Remove Redux packages from `package.json`
- Delete `useAxios` / `useFetch` dead hooks
- Delete JSONPlaceholder user section dead code

---

## Commit Rules (enforce these)

- **Never commit until ALL tasks in a session are done**
- Ask user how to group changes into commits — never decide unilaterally
- No `Co-Authored-By: Claude` signature
- No conventional commit type prefixes (`feat:`, `fix:`, `chore:`, etc.)

---

## Where Things Live

| Thing | Location |
|---|---|
| Zustand store | `src/Zustand/store.ts` |
| Auth slice | `src/Zustand/slices/authSlice.ts` |
| Cart slice | `src/Zustand/slices/cartSlice.ts` |
| Route guard | `src/components/common/AuthGuard.tsx` |
| API client | `src/hooks/api.ts` |
| Products cache provider | `src/context/ProductsProvider.tsx` |
| Main route tree | `src/App.tsx` |

---

## Open Questions / Next Session Picks

1. Should auth state be persisted (localStorage) so users survive a page refresh?
2. Phase 1 cleanup: remove Redux deps + dead hooks — ready to do, just needs a session
3. Phase 2 scope: what does "Core UX Completeness" mean concretely? (cart quantity controls? loading states? empty states?)

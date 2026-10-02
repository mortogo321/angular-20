# Angular 20 Feature Demo

![CI](https://github.com/mortogo321/angular-20/actions/workflows/ci.yml/badge.svg)

A small Angular application demonstrating modern Angular features: signals, the built-in control-flow syntax, deferrable views, and signal-based component inputs. Originally built on Angular 20, refreshed to Angular 22 (zoneless) with a modern tool-chain.

## What's inside

- Standalone-components app (no NgModules) with lazy-loaded routes per feature
- **Signals** — reactive state demo (`/signals`)
- **Control Flow** — `@if` / `@for` / `@switch` syntax demo (`/control-flow`)
- **Defer** — `@defer` block for declarative lazy loading (`/defer`)
- **Signal Inputs** — `input()` / `output()` component APIs (`/signal-inputs`)

## Stack

- **Frontend** — Angular 22 (standalone components, signals, zoneless), TypeScript 6 strict, bun
- **Tests** — Vitest via `@angular/build:unit-test`
- **Ops** — multi-stage Dockerfile (dev + nginx production), Docker Compose, GitHub Actions CI

## Quickstart

```sh
bun install
bun start                   # dev server on :4200
```

Open http://localhost:4200.

## Other commands

```sh
bun run build                 # production build to dist/
bun run test -- --watch=false # vitest unit tests
bun run typecheck             # tsc --noEmit
bun run lint                  # prettier --check
```

## Docker

```sh
docker build --target production -t angular-20:local .
docker compose -f compose.dev.yml up --build    # dev server on :4200
docker compose -f compose.prod.yml up --build   # nginx on :8080
```

## Structure

```
src/app/
├── app.ts / app.routes.ts   # Root component and route table
└── pages/
    ├── home/                # Landing page with links to each demo
    ├── signals/
    ├── control-flow/
    ├── defer/
    └── signal-inputs/
```

## Design notes

- Zoneless change detection (no `zone.js`): `provideZoneChangeDetection` removed, relying on Angular 22 signals-based reactivity.
- Strict TypeScript with `noUncheckedIndexedAccess` — indexed access is guarded (e.g. random-role fallback in the control-flow demo).
- Karma/Jasmine replaced with Vitest (`@angular/build:unit-test` builder, `vitest/globals` types).
- Bun-first workflow (`packageManager: bun@1.4.2`); `ng build` runs on real Node 26 in Docker/CI via the bun-installed CLI.
- Documented pins: TypeScript stays on `~6.0.3` (Angular 22 requires `>=6.0.0 <6.1.0`; TypeScript 7 has no Angular support story yet).

## Tests

```sh
bun run test -- --watch=false   # 2 vitest specs (app creation + title render)
```

CI runs lint + typecheck + tests + production build on every push, plus a production Docker build and compose validation.

## License

[MIT](LICENSE)

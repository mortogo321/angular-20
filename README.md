# Angular 20 Feature Demo

A small Angular application demonstrating the key features introduced in Angular 20: signals, the built-in control-flow syntax, deferrable views, and signal-based component inputs.

## What's inside

- Standalone-components app (no NgModules) with lazy-loaded routes per feature
- **Signals** — reactive state demo (`/signals`)
- **Control Flow** — `@if` / `@for` / `@switch` syntax demo (`/control-flow`)
- **Defer** — `@defer` block for declarative lazy loading (`/defer`)
- **Signal Inputs** — `input()` / `output()` component APIs (`/signal-inputs`)

## Tech stack

- Angular 20 (standalone components, signals, new control flow)
- TypeScript
- Karma/Jasmine for unit tests

## Quickstart

```bash
git clone git@github.com:mortogo321/angular-20.git
cd angular-20
pnpm install   # or: bun install
ng serve
```

Open http://localhost:4200.

## Other commands

```bash
ng build    # production build to dist/
ng test     # unit tests via Karma
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

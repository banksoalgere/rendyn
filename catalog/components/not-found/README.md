---
title: "404 / Not Found"
description: "Animated 404 pages in five styles: glitch scramble, magnetic digits, cursor spotlight, a fanning card stack and a typed terminal."
category: "Blocks"
publishedAt: "2026-06-21"
updatedAt: "2026-06-21"
documentation: "https://beui.dev/components/blocks/not-found"
markdown: "https://beui.dev/components/blocks/not-found.md"
license: "MIT"
---

# 404 / Not Found

> Animated 404 pages in five styles: glitch scramble, magnetic digits, cursor spotlight, a fanning card stack and a typed terminal.

## Install

### Glitch

Digits scramble through random glyphs before resolving, with a chromatic split on hover.

```bash
npx shadcn@latest add @beui/not-found-glitch
```

### Magnetic

Each digit is cursor-attracted via the Magnetic wrapper and springs back on leave.

```bash
npx shadcn@latest add @beui/not-found-magnetic
```

### Spotlight

A dark panel where a cursor-tracked spotlight reveals the bright code from a dim base.

```bash
npx shadcn@latest add @beui/not-found-spotlight
```

### Stacked

A code card over a hidden stack that fans out with a spring on hover.

```bash
npx shadcn@latest add @beui/not-found-stacked
```

### Terminal

A terminal window that types a failed cd command and a 404 status, with a blinking caret.

```bash
npx shadcn@latest add @beui/not-found-terminal
```

## Dependencies

- `clsx`
- `motion`
- `react`
- `tailwind-merge`

## Usage

### Glitch usage

Digits scramble through random glyphs before resolving, with a chromatic split on hover.

```tsx
"use client";

import { NotFoundGlitch } from "@/components/motion/not-found/glitch";

export function NotFoundGlitchPreview() {
  return (
    <div className="w-full">
      <NotFoundGlitch />
    </div>
  );
}
```

### Magnetic usage

Each digit is cursor-attracted via the Magnetic wrapper and springs back on leave.

```tsx
"use client";

import { NotFoundMagnetic } from "@/components/motion/not-found/magnetic";

export function NotFoundMagneticPreview() {
  return (
    <div className="w-full">
      <NotFoundMagnetic />
    </div>
  );
}
```

### Spotlight usage

A dark panel where a cursor-tracked spotlight reveals the bright code from a dim base.

```tsx
"use client";

import { NotFoundSpotlight } from "@/components/motion/not-found/spotlight";

export function NotFoundSpotlightPreview() {
  return (
    <div className="w-full">
      <NotFoundSpotlight />
    </div>
  );
}
```

### Stacked usage

A code card over a hidden stack that fans out with a spring on hover.

```tsx
"use client";

import { NotFoundStacked } from "@/components/motion/not-found/stacked";

export function NotFoundStackedPreview() {
  return (
    <div className="w-full">
      <NotFoundStacked />
    </div>
  );
}
```

### Terminal usage

A terminal window that types a failed cd command and a 404 status, with a blinking caret.

```tsx
"use client";

import { NotFoundTerminal } from "@/components/motion/not-found/terminal";

export function NotFoundTerminalPreview() {
  return (
    <div className="w-full">
      <NotFoundTerminal />
    </div>
  );
}
```

## API Reference

### NotFoundGlitch

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `className` | `string` | — | No | — |
| `code` | `string` | `404` | No | The big status code. |
| `title` | `string` | `Page not found` | No | — |
| `description` | `string` | `The page you are looking for moved, vanished, or never existed.` | No | — |
| `homeHref` | `string` | — | No | — |
| `homeLabel` | `string` | — | No | — |
| `browseHref` | `string` | — | No | — |
| `browseLabel` | `string` | — | No | — |

### NotFoundMagnetic

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `className` | `string` | — | No | — |
| `code` | `string` | `404` | No | The big status code. |
| `title` | `string` | `Page not found` | No | — |
| `description` | `string` | `The page you are looking for moved, vanished, or never existed.` | No | — |
| `homeHref` | `string` | — | No | — |
| `homeLabel` | `string` | — | No | — |
| `browseHref` | `string` | — | No | — |
| `browseLabel` | `string` | — | No | — |

### NotFoundSpotlight

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `className` | `string` | — | No | — |
| `code` | `string` | `404` | No | The big status code. |
| `title` | `string` | `Page not found` | No | — |
| `description` | `string` | `The page you are looking for moved, vanished, or never existed.` | No | — |
| `homeHref` | `string` | — | No | — |
| `homeLabel` | `string` | — | No | — |
| `browseHref` | `string` | — | No | — |
| `browseLabel` | `string` | — | No | — |

### NotFoundStacked

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `className` | `string` | — | No | — |
| `code` | `string` | `404` | No | The big status code. |
| `title` | `string` | `Page not found` | No | — |
| `description` | `string` | `The page you are looking for moved, vanished, or never existed.` | No | — |
| `homeHref` | `string` | — | No | — |
| `homeLabel` | `string` | — | No | — |
| `browseHref` | `string` | — | No | — |
| `browseLabel` | `string` | — | No | — |

### NotFoundTerminal

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `className` | `string` | — | No | — |
| `code` | `string` | `404` | No | The big status code. |
| `title` | `string` | `Page not found` | No | — |
| `description` | `string` | `The page you are looking for moved, vanished, or never existed.` | No | — |
| `homeHref` | `string` | — | No | — |
| `homeLabel` | `string` | — | No | — |
| `browseHref` | `string` | — | No | — |
| `browseLabel` | `string` | — | No | — |

## Source

- Registry detail: https://beui.dev/r/not-found
- Raw source: https://beui.dev/r/not-found/raw
- GitHub: https://github.com/starc007/ui-components

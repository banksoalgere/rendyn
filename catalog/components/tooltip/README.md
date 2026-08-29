---
title: "Tooltip"
description: "Hover or focus tooltip with blur enter/exit and spring spawn."
category: "Components"
publishedAt: "2026-05-17"
updatedAt: "2026-07-13"
documentation: "https://beui.dev/components/motion/tooltip"
markdown: "https://beui.dev/components/motion/tooltip.md"
license: "MIT"
---

# Tooltip

> Hover or focus tooltip with blur enter/exit and spring spawn.

## Install

```bash
npx shadcn@latest add @beui/tooltip
```

## Dependencies

- `clsx`
- `lucide-react`
- `motion`
- `react`
- `react-dom`
- `tailwind-merge`

## Usage

```tsx
"use client";

import { Heart, Settings, Share, Trash2 } from "lucide-react";
import { Tooltip } from "@/components/motion/tooltip";

export function TooltipPreview() {
  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Tooltip content="Like this post" side="top">
          <button type="button" aria-label="Like this post" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground press">
            <Heart className="h-4 w-4" />
          </button>
        </Tooltip>
        <Tooltip content="Share" side="bottom">
          <button type="button" aria-label="Share" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground press">
            <Share className="h-4 w-4" />
          </button>
        </Tooltip>
        <Tooltip content="Open settings" side="left">
          <button type="button" aria-label="Open settings" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground press">
            <Settings className="h-4 w-4" />
          </button>
        </Tooltip>
        <Tooltip content="Move to trash" side="right">
          <button type="button" aria-label="Move to trash" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground press">
            <Trash2 className="h-4 w-4" />
          </button>
        </Tooltip>
      </div>
      <p className="text-xs text-muted-foreground">Hover or focus each button. Content fades and un-blurs in.</p>
    </div>
  );
}
```

## API Reference

### Tooltip

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `content` | `ReactNode` | — | Yes | — |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `top` | No | — |
| `delay` | `number` | `120` | No | Delay before showing (ms). Default 120. |
| `className` | `string` | — | No | — |
| `wrapperClassName` | `string` | — | No | Classes for the outer wrapper span. Use to fix baseline / fill parent. |

## Source

- Registry detail: https://beui.dev/r/tooltip
- Raw source: https://beui.dev/r/tooltip/raw
- GitHub: https://github.com/starc007/ui-components

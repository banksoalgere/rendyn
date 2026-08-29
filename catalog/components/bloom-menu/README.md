---
title: "Bloom Menu"
description: "A button that morphs open into a menu and blooms iris-out from the center, the grid revealing in every direction with radially staggered items."
category: "Blocks"
publishedAt: "2026-06-26"
updatedAt: "2026-06-26"
documentation: "https://beui.dev/components/blocks/bloom-menu"
markdown: "https://beui.dev/components/blocks/bloom-menu.md"
license: "MIT"
---

# Bloom Menu

> A button that morphs open into a menu and blooms iris-out from the center, the grid revealing in every direction with radially staggered items.

## Install

```bash
npx shadcn@latest add @beui/bloom-menu
```

## Dependencies

- `clsx`
- `lucide-react`
- `motion`
- `react`
- `tailwind-merge`

## Usage

```tsx
"use client";

import { BloomMenu } from "@/components/motion/bloom-menu";

export function BloomMenuPreview() {
  return (
    <div className="flex min-h-[420px] w-full items-start justify-center pt-24">
      <BloomMenu />
    </div>
  );
}
```

## API Reference

### BloomMenu

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `items` | `MenuItem[]` | `[ { label: "Doc", icon: FileText }, { label: "Board", icon: LayoutGrid }, { label: "Table", icon: Table }, { label: "Folder", icon: FolderClosed }, { label: "Reminder", icon: Bell }, { label: "Link", icon: Link }, ]` | No | — |
| `onSelect` | `((label: string) => void)` | — | No | — |
| `className` | `string` | — | No | — |

## Source

- Registry detail: https://beui.dev/r/bloom-menu
- Raw source: https://beui.dev/r/bloom-menu/raw
- GitHub: https://github.com/starc007/ui-components

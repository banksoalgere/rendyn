---
title: "Expandable Control"
description: "Click-to-expand button and chip controls that reveal a label or trailing action through spring layout continuity."
category: "Components"
publishedAt: "2026-08-22"
updatedAt: "2026-08-22"
documentation: "https://beui.dev/components/motion/expandable-control"
markdown: "https://beui.dev/components/motion/expandable-control.md"
license: "MIT"
---

# Expandable Control

> Click-to-expand button and chip controls that reveal a label or trailing action through spring layout continuity.

## Install

```bash
npx shadcn@latest add @beui/expandable-control
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

import { Bell, X } from "lucide-react";
import {
  ExpandableButton,
  ExpandableChip,
} from "@/components/motion/expandable-control";

export function ExpandableControlPreview() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <ExpandableButton
          icon={<Bell className="size-4" />}
          label="Notifications"
        />
      </div>
      <div className="flex items-center gap-2">
        <ExpandableChip
          label="React"
          actionIcon={<X className="size-3.5" />}
          actionLabel="Remove React"
        />
      </div>
    </div>
  );
}
```

## API Reference

### ExpandableButton

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `icon` | `ReactNode` | — | Yes | — |
| `label` | `ReactNode` | — | Yes | — |
| `className` | `string` | — | No | — |

### ExpandableChip

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `label` | `ReactNode` | — | Yes | — |
| `actionIcon` | `ReactNode` | — | Yes | — |
| `actionLabel` | `string` | — | Yes | — |
| `onAction` | `(() => void)` | — | No | — |
| `collapseOnAction` | `boolean` | `true` | No | — |
| `disabled` | `boolean` | — | No | — |
| `className` | `string` | — | No | — |
| `labelClassName` | `string` | — | No | — |
| `actionClassName` | `string` | — | No | — |
| `expanded` | `boolean` | — | No | — |
| `defaultExpanded` | `boolean` | — | No | — |
| `onExpandedChange` | `((expanded: boolean) => void)` | — | No | — |

## Source

- Registry detail: https://beui.dev/r/expandable-control
- Raw source: https://beui.dev/r/expandable-control/raw
- GitHub: https://github.com/starc007/ui-components

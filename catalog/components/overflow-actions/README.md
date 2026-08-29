---
title: "Overflow Actions"
description: "Connected pill rail for primary actions that springs open to reveal extra controls."
category: "Blocks"
publishedAt: "2026-06-19"
updatedAt: "2026-06-28"
documentation: "https://beui.dev/components/blocks/overflow-actions"
markdown: "https://beui.dev/components/blocks/overflow-actions.md"
license: "MIT"
---

# Overflow Actions

> Connected pill rail for primary actions that springs open to reveal extra controls.

## Install

```bash
npx shadcn@latest add @beui/overflow-actions
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

import { CalendarClock, Eye, GitBranch, Pin } from "lucide-react";
import { useState } from "react";
import {
  type OverflowActionItem,
  OverflowActions,
} from "@/components/motion/overflow-actions";

const primaryActions: OverflowActionItem[] = [
  {
    id: "preview",
    label: "Preview",
    icon: <Eye className="h-4 w-4" />,
  },
  {
    id: "pin",
    label: "Pin",
    icon: <Pin className="h-4 w-4" />,
  },
];

const overflowActions: OverflowActionItem[] = [
  {
    id: "branch",
    label: "Branch",
    icon: <GitBranch className="h-4 w-4" />,
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: <CalendarClock className="h-4 w-4" />,
  },
];

export function OverflowActionsPreview() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex w-full items-center justify-center">
      <OverflowActions
        primaryActions={primaryActions}
        overflowActions={overflowActions}
        expanded={expanded}
        onExpandedChange={setExpanded}
        openLabel="Open action rail"
        closeLabel="Collapse action rail"
      />
    </div>
  );
}
```

## API Reference

### OverflowActions

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `primaryActions` | `OverflowActionItem[]` | — | Yes | — |
| `overflowActions` | `OverflowActionItem[]` | — | Yes | — |
| `expanded` | `boolean` | — | No | — |
| `defaultExpanded` | `boolean` | `false` | No | — |
| `onExpandedChange` | `((expanded: boolean) => void)` | — | No | — |
| `onAction` | `((item: OverflowActionItem) => void)` | — | No | — |
| `collapseOnAction` | `boolean` | `false` | No | — |
| `size` | `"sm" \| "md"` | `md` | No | — |
| `openLabel` | `string` | `Show extra actions` | No | — |
| `closeLabel` | `string` | `Hide extra actions` | No | — |
| `className` | `string` | — | No | — |
| `classNames` | `OverflowActionsClassNames` | — | No | — |

## Source

- Registry detail: https://beui.dev/r/overflow-actions
- Raw source: https://beui.dev/r/overflow-actions/raw
- GitHub: https://github.com/starc007/ui-components

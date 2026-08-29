---
title: "Radio Group"
description: "Single-select choice control with a gliding layoutId indicator dot and spring press feedback."
category: "Components"
publishedAt: "2026-06-23"
updatedAt: "2026-07-13"
documentation: "https://beui.dev/components/motion/radio"
markdown: "https://beui.dev/components/motion/radio.md"
license: "MIT"
---

# Radio Group

> Single-select choice control with a gliding layoutId indicator dot and spring press feedback.

## Install

```bash
npx shadcn@latest add @beui/radio
```

## Dependencies

- `clsx`
- `motion`
- `react`
- `tailwind-merge`

## Usage

```tsx
"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/motion/radio";

export function RadioPreview() {
  const [plan, setPlan] = useState("pro");

  return (
    <RadioGroup value={plan} onValueChange={setPlan} className="min-w-48">
      <RadioGroupItem value="starter" label="Starter — free" />
      <RadioGroupItem value="pro" label="Pro — $12/mo" />
      <RadioGroupItem value="team" label="Team — $29/mo" />
      <RadioGroupItem value="legacy" label="Legacy plan" disabled />
    </RadioGroup>
  );
}
```

## API Reference

### RadioGroup

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | No | — |
| `defaultValue` | `string` | — | No | — |
| `onValueChange` | `((value: string) => void)` | — | No | — |
| `className` | `string` | — | No | — |
| `orientation` | `"horizontal" \| "vertical"` | `vertical` | No | — |

### RadioGroupItem

| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | Yes | — |
| `label` | `string` | — | No | — |
| `disabled` | `boolean` | — | No | — |
| `className` | `string` | — | No | — |
| `id` | `string` | — | No | — |

## Source

- Registry detail: https://beui.dev/r/radio
- Raw source: https://beui.dev/r/radio/raw
- GitHub: https://github.com/starc007/ui-components

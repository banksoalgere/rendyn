"use client";

import { Italic } from "lucide-react"

import { Toggle } from "@/components/rendyn-libraries/shadcn/upstream/ui/toggle"

export default function ToggleSm() {
  return (
    <Toggle size="sm" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  )
}

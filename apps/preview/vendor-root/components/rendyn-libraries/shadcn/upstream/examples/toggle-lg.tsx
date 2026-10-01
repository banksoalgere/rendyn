"use client";

import { Italic } from "lucide-react"

import { Toggle } from "@/components/rendyn-libraries/shadcn/upstream/ui/toggle"

export default function ToggleLg() {
  return (
    <Toggle size="lg" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  )
}

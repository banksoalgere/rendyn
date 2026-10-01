"use client";

import { Italic } from "lucide-react"

import { Toggle } from "@/components/rendyn-libraries/shadcn/upstream/ui/toggle"

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <Italic />
      Italic
    </Toggle>
  )
}

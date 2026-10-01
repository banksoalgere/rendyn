"use client";

import { Italic } from "lucide-react"

import { Toggle } from "@/components/rendyn-libraries/shadcn/upstream/registry/new-york-v4/ui/toggle"

export default function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  )
}

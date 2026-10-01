"use client";

import { CircleFadingArrowUpIcon } from "lucide-react"

import { Button } from "@/components/rendyn-libraries/shadcn/ui/button"

export default function ButtonIcon() {
  return (
    <Button variant="outline" size="icon">
      <CircleFadingArrowUpIcon />
    </Button>
  )
}

"use client";

import { SearchIcon } from "lucide-react"

import { Button } from "@/components/rendyn-libraries/shadcn/ui/button"
import { ButtonGroup } from "@/components/rendyn-libraries/shadcn/upstream/ui/button-group"
import { Input } from "@/components/rendyn-libraries/shadcn/ui/input"

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}

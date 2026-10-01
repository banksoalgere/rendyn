"use client";

import { IconPlus } from "@tabler/icons-react"

import { Button } from "@/components/rendyn-libraries/shadcn/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/rendyn-libraries/shadcn/upstream/registry/new-york-v4/ui/button-group"

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="secondary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <IconPlus />
      </Button>
    </ButtonGroup>
  )
}

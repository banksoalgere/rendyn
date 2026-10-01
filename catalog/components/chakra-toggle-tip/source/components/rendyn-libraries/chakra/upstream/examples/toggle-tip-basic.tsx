"use client";

import { Button } from "@chakra-ui/react"
import { ToggleTip } from "@/components/rendyn-libraries/chakra/upstream/ui/toggle-tip"
import { LuInfo } from "react-icons/lu"

export const ToggleTipBasic = () => {
  return (
    <ToggleTip content="This is some additional information.">
      <Button size="xs" variant="ghost">
        <LuInfo />
      </Button>
    </ToggleTip>
  )
}

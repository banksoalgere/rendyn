"use client";

import { Button } from "@chakra-ui/react"
import { useColorMode } from "@/components/rendyn-libraries/chakra/upstream/ui/color-mode"

export const ColorModeBasic = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <Button variant="outline" onClick={toggleColorMode}>
      Toggle Mode
    </Button>
  )
}

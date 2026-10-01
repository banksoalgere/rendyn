"use client";

import { Stack } from "@chakra-ui/react"
import { DecorativeBox } from "@/components/rendyn-libraries/chakra/upstream/lib/decorative-box"

export const StackBasic = () => {
  return (
    <Stack>
      <DecorativeBox h="20" />
      <DecorativeBox h="20" />
      <DecorativeBox h="20" />
    </Stack>
  )
}

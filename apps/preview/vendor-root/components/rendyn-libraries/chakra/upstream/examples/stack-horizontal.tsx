"use client";

import { Stack } from "@chakra-ui/react"
import { DecorativeBox } from "@/components/rendyn-libraries/chakra/upstream/lib/decorative-box"

export const StackHorizontal = () => {
  return (
    <Stack direction="row" h="20">
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
    </Stack>
  )
}

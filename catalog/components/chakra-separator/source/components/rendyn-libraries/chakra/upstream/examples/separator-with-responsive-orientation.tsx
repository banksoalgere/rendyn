"use client";

import { Separator, Stack } from "@chakra-ui/react"
import { DecorativeBox } from "@/components/rendyn-libraries/chakra/upstream/lib/decorative-box"

export const SeparatorWithResponsiveOrientation = () => {
  return (
    <Stack direction={{ base: "row", md: "column" }} align="stretch">
      <DecorativeBox>First</DecorativeBox>
      <Separator orientation={{ base: "vertical", sm: "horizontal" }} />
      <DecorativeBox>Second</DecorativeBox>
    </Stack>
  )
}

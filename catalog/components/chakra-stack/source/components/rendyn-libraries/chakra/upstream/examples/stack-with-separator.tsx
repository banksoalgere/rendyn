"use client";

import { Stack, StackSeparator } from "@chakra-ui/react"
import { DecorativeBox } from "@/components/rendyn-libraries/chakra/upstream/lib/decorative-box"

export const StackWithSeparator = () => {
  return (
    <Stack separator={<StackSeparator />}>
      <DecorativeBox h="20" />
      <DecorativeBox h="20" />
      <DecorativeBox h="20" />
    </Stack>
  )
}

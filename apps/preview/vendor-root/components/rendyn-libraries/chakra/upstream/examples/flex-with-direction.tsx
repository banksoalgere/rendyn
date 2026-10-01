"use client";

import { Flex } from "@chakra-ui/react"
import { DecorativeBox } from "@/components/rendyn-libraries/chakra/upstream/lib/decorative-box"

export const FlexWithDirection = () => {
  return (
    <Flex gap="4" direction="column">
      <DecorativeBox height="10" />
      <DecorativeBox height="10" />
      <DecorativeBox height="10" />
    </Flex>
  )
}

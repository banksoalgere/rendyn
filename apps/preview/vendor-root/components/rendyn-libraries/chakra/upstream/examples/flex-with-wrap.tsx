"use client";

import { Flex } from "@chakra-ui/react"
import { DecorativeBox } from "@/components/rendyn-libraries/chakra/upstream/lib/decorative-box"

export const FlexWithWrap = () => {
  return (
    <Flex gap="4" wrap="wrap" maxW="500px">
      <DecorativeBox height="10" width="200px" />
      <DecorativeBox height="10" width="200px" />
      <DecorativeBox height="10" width="200px" />
    </Flex>
  )
}

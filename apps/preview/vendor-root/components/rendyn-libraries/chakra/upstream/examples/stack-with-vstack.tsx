"use client";

import { VStack } from "@chakra-ui/react"
import { DecorativeBox } from "@/components/rendyn-libraries/chakra/upstream/lib/decorative-box"

export const StackWithVstack = () => {
  return (
    <VStack>
      <DecorativeBox w="50%" h="20" />
      <DecorativeBox w="25%" h="20" />
      <DecorativeBox w="100%" h="20" />
    </VStack>
  )
}

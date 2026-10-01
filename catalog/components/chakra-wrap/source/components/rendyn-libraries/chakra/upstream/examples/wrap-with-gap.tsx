"use client";

import { Wrap } from "@chakra-ui/react"
import { DecorativeBox } from "@/components/rendyn-libraries/chakra/upstream/lib/decorative-box"

export const WrapWithGap = () => (
  <Wrap gap="5">
    {Array.from({ length: 10 }).map((_, index) => (
      <DecorativeBox key={index} h="12" w="12" />
    ))}
  </Wrap>
)

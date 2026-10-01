"use client";

import { Flex } from "@chakra-ui/react"
import { InfoTip } from "@/components/rendyn-libraries/chakra/upstream/ui/toggle-tip"

export const ToggleTipArrow = () => {
  return (
    <Flex justify="center">
      <InfoTip showArrow content="This is some additional information." />
    </Flex>
  )
}

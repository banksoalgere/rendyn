"use client";

import { Checkmark, For, HStack } from "@chakra-ui/react"
import { colorPalettes } from "@/components/rendyn-libraries/chakra/upstream/lib/color-palettes"

export const CheckmarkWithColors = () => {
  return (
    <HStack gap={4}>
      <For each={colorPalettes}>
        {(colorPalette) => (
          <Checkmark key={colorPalette} colorPalette={colorPalette} checked />
        )}
      </For>
    </HStack>
  )
}

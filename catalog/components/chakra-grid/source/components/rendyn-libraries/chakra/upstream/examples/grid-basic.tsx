"use client";

import { Grid } from "@chakra-ui/react"
import { DecorativeBox } from "@/components/rendyn-libraries/chakra/upstream/lib/decorative-box"

export const GridBasic = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="6">
      <DecorativeBox h="20" />
      <DecorativeBox h="20" />
      <DecorativeBox h="20" />
    </Grid>
  )
}

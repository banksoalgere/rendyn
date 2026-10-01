"use client";

import { Stack } from "@chakra-ui/react"
import { PasswordInput } from "@/components/rendyn-libraries/chakra/upstream/ui/password-input"

export const PasswordInputWithSizes = () => {
  return (
    <Stack maxW="300px">
      <PasswordInput placeholder="xs" size="xs" />
      <PasswordInput placeholder="sm" size="sm" />
      <PasswordInput placeholder="md" size="md" />
      <PasswordInput placeholder="lg" size="lg" />
    </Stack>
  )
}

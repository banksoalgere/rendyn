"use client";

import { Stack, Text } from "@chakra-ui/react"
import { PasswordInput } from "@/components/rendyn-libraries/chakra/upstream/ui/password-input"
import { useState } from "react"

export const PasswordInputControlledVisibility = () => {
  const [visible, setVisible] = useState(false)
  return (
    <Stack>
      <PasswordInput
        defaultValue="secret"
        visible={visible}
        onVisibleChange={setVisible}
      />
      <Text>Password is {visible ? "visible" : "hidden"}</Text>
    </Stack>
  )
}

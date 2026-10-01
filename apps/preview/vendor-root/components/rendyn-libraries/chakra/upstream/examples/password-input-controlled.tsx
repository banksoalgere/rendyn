"use client";

import { PasswordInput } from "@/components/rendyn-libraries/chakra/upstream/ui/password-input"
import { useState } from "react"

export const PasswordInputControlled = () => {
  const [value, setValue] = useState("")
  return (
    <PasswordInput value={value} onChange={(e) => setValue(e.target.value)} />
  )
}

"use client";

import { Button } from "@chakra-ui/react"
import { toaster } from "@/components/rendyn-libraries/chakra/upstream/ui/toaster"

export const ToasterBasic = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        toaster.create({
          description: "File saved successfully",
          type: "info",
        })
      }
    >
      Show Toast
    </Button>
  )
}

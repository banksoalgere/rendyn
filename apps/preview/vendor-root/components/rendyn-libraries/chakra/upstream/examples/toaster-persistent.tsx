"use client";

import { Button } from "@chakra-ui/react"
import { toaster } from "@/components/rendyn-libraries/chakra/upstream/ui/toaster"

export const ToasterPersistent = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        toaster.create({
          description: "File saved successfully",
          type: "loading",
        })
      }
    >
      Show Toast
    </Button>
  )
}

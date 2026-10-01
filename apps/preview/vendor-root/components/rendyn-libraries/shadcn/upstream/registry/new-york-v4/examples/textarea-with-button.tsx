"use client";

import { Button } from "@/components/rendyn-libraries/shadcn/ui/button"
import { Textarea } from "@/components/rendyn-libraries/shadcn/ui/textarea"

export default function TextareaWithButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}

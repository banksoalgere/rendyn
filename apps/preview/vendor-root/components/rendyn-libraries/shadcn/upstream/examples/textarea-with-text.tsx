"use client";

import { Label } from "@/components/rendyn-libraries/shadcn/upstream/ui/label"
import { Textarea } from "@/components/rendyn-libraries/shadcn/ui/textarea"

export default function TextareaWithText() {
  return (
    <div className="grid w-full gap-3">
      <Label htmlFor="message-2">Your Message</Label>
      <Textarea placeholder="Type your message here." id="message-2" />
      <p className="text-sm text-muted-foreground">
        Your message will be copied to the support team.
      </p>
    </div>
  )
}

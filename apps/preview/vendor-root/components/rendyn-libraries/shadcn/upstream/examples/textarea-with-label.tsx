"use client";

import { Label } from "@/components/rendyn-libraries/shadcn/upstream/ui/label"
import { Textarea } from "@/components/rendyn-libraries/shadcn/ui/textarea"

export default function TextareaWithLabel() {
  return (
    <div className="grid w-full gap-3">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  )
}

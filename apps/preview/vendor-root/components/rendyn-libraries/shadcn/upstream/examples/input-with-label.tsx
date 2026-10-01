"use client";

import { Input } from "@/components/rendyn-libraries/shadcn/ui/input"
import { Label } from "@/components/rendyn-libraries/shadcn/upstream/ui/label"

export default function InputWithLabel() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}

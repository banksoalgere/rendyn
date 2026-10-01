"use client";

import { Input } from "@/components/rendyn-libraries/shadcn/ui/input"
import { Label } from "@/components/rendyn-libraries/shadcn/upstream/ui/label"

export default function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  )
}

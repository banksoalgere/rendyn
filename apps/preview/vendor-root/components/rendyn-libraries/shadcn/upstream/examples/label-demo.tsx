"use client";

import { Checkbox } from "@/components/rendyn-libraries/shadcn/upstream/ui/checkbox"
import { Label } from "@/components/rendyn-libraries/shadcn/upstream/ui/label"

export default function LabelDemo() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}

"use client";

import { Label } from "@/components/rendyn-libraries/shadcn/upstream/ui/label"
import { Switch } from "@/components/rendyn-libraries/shadcn/upstream/ui/switch"

export default function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}

"use client";

import { Button } from "@/components/rendyn-libraries/shadcn/ui/button"
import { Input } from "@/components/rendyn-libraries/shadcn/ui/input"

export default function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit" variant="outline">
        Subscribe
      </Button>
    </div>
  )
}

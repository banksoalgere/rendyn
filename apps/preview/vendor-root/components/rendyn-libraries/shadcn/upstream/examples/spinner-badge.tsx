"use client";

import { Badge } from "@/components/rendyn-libraries/shadcn/ui/badge"
import { Spinner } from "@/components/rendyn-libraries/shadcn/upstream/ui/spinner"

export default function SpinnerBadge() {
  return (
    <div className="flex items-center gap-4 [--radius:1.2rem]">
      <Badge>
        <Spinner />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner />
        Processing
      </Badge>
    </div>
  )
}

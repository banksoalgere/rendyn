"use client";

import { Button } from "@/components/rendyn-libraries/shadcn/ui/button"
import { Spinner } from "@/components/rendyn-libraries/shadcn/upstream/ui/spinner"

export default function ButtonLoading() {
  return (
    <Button size="sm" variant="outline" disabled>
      <Spinner />
      Submit
    </Button>
  )
}

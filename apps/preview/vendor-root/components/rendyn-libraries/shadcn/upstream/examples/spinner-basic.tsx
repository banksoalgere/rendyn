"use client";

import { Spinner } from "@/components/rendyn-libraries/shadcn/upstream/ui/spinner"

export default function SpinnerBasic() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Spinner />
    </div>
  )
}

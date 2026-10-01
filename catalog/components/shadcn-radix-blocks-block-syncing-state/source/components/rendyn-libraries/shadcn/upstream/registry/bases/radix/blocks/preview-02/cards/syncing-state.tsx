"use client";

import { Button } from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/radix/ui/button"
import { Card, CardContent } from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/radix/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/radix/ui/empty"
import { Spinner } from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/radix/ui/spinner"

export function SyncingState() {
  return (
    <Card>
      <CardContent className="p-0">
        <Empty className="p-4">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>
            <EmptyTitle>Syncing your accounts</EmptyTitle>
            <EmptyDescription>
              We&apos;re pulling in your latest transactions. This usually takes
              a few seconds.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline">Cancel</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}

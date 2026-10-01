"use client";

import { Badge } from "@/components/rendyn-libraries/originui/upstream/registry/default/ui/badge";

export default function Component() {
  return (
    <Badge className="gap-1.5" variant="outline">
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full bg-emerald-500"
      />
      Badge
    </Badge>
  );
}

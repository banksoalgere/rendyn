"use client";

import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/rendyn-libraries/originui/upstream/registry/default/ui/button";

export default function Component() {
  return (
    <Button disabled>
      <LoaderCircleIcon
        aria-hidden="true"
        className="-ms-1 animate-spin"
        size={16}
      />
      Button
    </Button>
  );
}

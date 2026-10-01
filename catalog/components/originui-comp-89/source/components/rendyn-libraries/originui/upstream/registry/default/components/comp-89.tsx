"use client";

import { Button } from "@/components/rendyn-libraries/originui/upstream/registry/default/ui/button";

export default function Component() {
  return (
    <div className="inline-flex items-center gap-2">
      <Button variant="ghost">Cancel</Button>
      <Button>Save</Button>
    </div>
  );
}

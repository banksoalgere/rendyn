"use client";

import { useId } from "react";
import { Input } from "@/components/rendyn-libraries/originui/ui/input";
import { Label } from "@/components/rendyn-libraries/originui/ui/label";

export default function Component() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Input with end add-on</Label>
      <div className="flex rounded-md shadow-xs">
        <Input
          className="-me-px rounded-e-none shadow-none"
          id={id}
          placeholder="google"
          type="text"
        />
        <span className="-z-10 inline-flex items-center rounded-e-md border border-input bg-background px-3 text-muted-foreground text-sm">
          .com
        </span>
      </div>
    </div>
  );
}

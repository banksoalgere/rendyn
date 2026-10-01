"use client";

import { useId } from "react";
import { Input } from "@/components/rendyn-libraries/originui/ui/input";
import { Label } from "@/components/rendyn-libraries/originui/ui/label";

export default function Component() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Input with error</Label>
      <Input
        aria-invalid
        className="peer"
        defaultValue="invalid@email.com"
        id={id}
        placeholder="Email"
        type="email"
      />
      <p
        aria-live="polite"
        className="mt-2 text-xs peer-aria-invalid:text-destructive"
        role="alert"
      >
        Email is invalid
      </p>
    </div>
  );
}

"use client";

import { useId } from "react";
import { Input } from "@/components/rendyn-libraries/originui/ui/input";
import { Label } from "@/components/rendyn-libraries/originui/ui/label";
import { SelectNative } from "@/components/rendyn-libraries/originui/upstream/registry/default/ui/select-native";

export default function Component() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Input with end select</Label>
      <div className="flex rounded-md shadow-xs">
        <Input
          className="-me-px rounded-e-none shadow-none focus-visible:z-10"
          id={id}
          placeholder="google"
          type="text"
        />
        <SelectNative className="w-fit rounded-s-none text-muted-foreground shadow-none hover:text-foreground">
          <option>.com</option>
          <option>.org</option>
          <option>.net</option>
        </SelectNative>
      </div>
    </div>
  );
}

"use client";

import { useId } from "react";
import { Button } from "@/components/rendyn-libraries/originui/upstream/registry/default/ui/button";
import { Label } from "@/components/rendyn-libraries/originui/ui/label";
import { Textarea } from "@/components/rendyn-libraries/originui/upstream/registry/default/ui/textarea";

export default function Component() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Textarea with left button</Label>
      <Textarea id={id} placeholder="Leave a comment" />
      <Button variant="outline">Send</Button>
    </div>
  );
}

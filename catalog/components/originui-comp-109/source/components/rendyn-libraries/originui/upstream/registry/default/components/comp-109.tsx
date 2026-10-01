"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/rendyn-libraries/originui/upstream/registry/default/ui/toggle-group";

export default function Component() {
  return (
    <ToggleGroup className="inline-flex" type="single" variant="outline">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}

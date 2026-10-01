"use client";

import { Label } from "@/components/rendyn-libraries/originui/ui/label";
import { Slider } from "@/components/rendyn-libraries/originui/upstream/registry/default/ui/slider";

export default function Component() {
  return (
    <div className="*:not-first:mt-4">
      <Label>Dual range slider</Label>
      <Slider
        aria-label="Dual range slider"
        defaultValue={[25, 75]}
        step={10}
      />
    </div>
  );
}

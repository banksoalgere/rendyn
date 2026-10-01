"use client";

import { Button } from "@/components/rendyn-libraries/originui/upstream/registry/default/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/rendyn-libraries/originui/upstream/registry/default/ui/tooltip";

export default function Component() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="sm" variant="outline">
            Dark
          </Button>
        </TooltipTrigger>
        <TooltipContent className="dark px-2 py-1 text-xs">
          This tooltip will be always dark
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

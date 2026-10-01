"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/rendyn-libraries/originui/upstream/registry/default/ui/avatar";
import { Badge } from "@/components/rendyn-libraries/originui/upstream/registry/default/ui/badge";

export default function Component() {
  return (
    <div className="relative">
      <Avatar>
        <AvatarImage alt="Kelly King" src="/origin/avatar-80-07.jpg" />
        <AvatarFallback>KK</AvatarFallback>
      </Avatar>
      <Badge className="absolute -top-1.5 left-full min-w-5 -translate-x-3.5 border-background px-1">
        6
      </Badge>
    </div>
  );
}

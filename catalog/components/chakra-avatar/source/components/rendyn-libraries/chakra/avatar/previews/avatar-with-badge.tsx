"use client";

import { AvatarWithBadge as Example } from "@/components/rendyn-libraries/chakra/upstream/examples/avatar-with-badge";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><ChakraProvider value={defaultSystem}><Example /></ChakraProvider></div>;
}

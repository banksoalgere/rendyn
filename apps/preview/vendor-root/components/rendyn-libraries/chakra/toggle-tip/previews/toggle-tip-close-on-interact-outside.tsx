"use client";

import { ToggleTipCloseOnInteractOutside as Example } from "@/components/rendyn-libraries/chakra/upstream/examples/toggle-tip-close-on-interact-outside";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><ChakraProvider value={defaultSystem}><Example /></ChakraProvider></div>;
}

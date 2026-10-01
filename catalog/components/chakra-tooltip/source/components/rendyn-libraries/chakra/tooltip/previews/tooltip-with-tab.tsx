"use client";

import { TooltipWithTab as Example } from "@/components/rendyn-libraries/chakra/upstream/examples/tooltip-with-tab";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><ChakraProvider value={defaultSystem}><Example /></ChakraProvider></div>;
}

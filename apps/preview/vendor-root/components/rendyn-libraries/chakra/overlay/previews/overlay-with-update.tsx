"use client";

import { OverlayWithUpdate as Example } from "@/components/rendyn-libraries/chakra/upstream/examples/overlay-with-update";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><ChakraProvider value={defaultSystem}><Example /></ChakraProvider></div>;
}

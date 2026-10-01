"use client";

import { PortalWithContainer as Example } from "@/components/rendyn-libraries/chakra/upstream/examples/portal-with-container";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><ChakraProvider value={defaultSystem}><Example /></ChakraProvider></div>;
}

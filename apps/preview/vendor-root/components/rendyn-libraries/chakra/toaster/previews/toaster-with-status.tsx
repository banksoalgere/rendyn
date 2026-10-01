"use client";

import { ToasterWithStatus as Example } from "@/components/rendyn-libraries/chakra/upstream/examples/toaster-with-status";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><ChakraProvider value={defaultSystem}><Example /></ChakraProvider></div>;
}

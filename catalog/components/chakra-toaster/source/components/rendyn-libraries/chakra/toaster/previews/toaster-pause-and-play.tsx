"use client";

import { ToasterPauseAndPlay as Example } from "@/components/rendyn-libraries/chakra/upstream/examples/toaster-pause-and-play";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><ChakraProvider value={defaultSystem}><Example /></ChakraProvider></div>;
}

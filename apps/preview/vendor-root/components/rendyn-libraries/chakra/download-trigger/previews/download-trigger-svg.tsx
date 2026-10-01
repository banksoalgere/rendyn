"use client";

import { DownloadTriggerSvg as Example } from "@/components/rendyn-libraries/chakra/upstream/examples/download-trigger-svg";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><ChakraProvider value={defaultSystem}><Example /></ChakraProvider></div>;
}

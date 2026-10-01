"use client";

import { StepsWithLines as Example } from "@/components/rendyn-libraries/chakra/upstream/examples/steps-with-lines";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><ChakraProvider value={defaultSystem}><Example /></ChakraProvider></div>;
}

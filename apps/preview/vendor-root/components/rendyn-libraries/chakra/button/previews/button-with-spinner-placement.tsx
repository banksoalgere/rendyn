"use client";

import { ButtonWithSpinnerPlacement as Example } from "@/components/rendyn-libraries/chakra/upstream/examples/button-with-spinner-placement";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><ChakraProvider value={defaultSystem}><Example /></ChakraProvider></div>;
}

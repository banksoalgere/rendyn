"use client";

import { FieldWithHelperText as Example } from "@/components/rendyn-libraries/chakra/upstream/examples/field-with-helper-text";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><ChakraProvider value={defaultSystem}><Example /></ChakraProvider></div>;
}

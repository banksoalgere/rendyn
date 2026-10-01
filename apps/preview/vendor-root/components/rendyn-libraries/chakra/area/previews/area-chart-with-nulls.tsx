"use client";

import { AreaChartWithNulls as Example } from "@/components/rendyn-libraries/chakra/upstream/examples/charts/area-chart-with-nulls";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><ChakraProvider value={defaultSystem}><Example /></ChakraProvider></div>;
}

"use client";

import { RendynExample as Example } from "@/components/rendyn-libraries/mantine/upstream/src/demos/hooks/use-click-outside/use-click-outside.demo.events";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><MantineProvider><Example /></MantineProvider></div>;
}

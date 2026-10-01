"use client";

import { RendynExample7 as Example } from "@/components/rendyn-libraries/mantine/upstream/src/demos/dates/MonthPickerInput/index";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><MantineProvider><Example /></MantineProvider></div>;
}

"use client";

import { RendynExample26 as Example } from "@/components/rendyn-libraries/mantine/upstream/src/demos/form/Form.demo.allComponents";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import {Notifications} from "@mantine/notifications";

export default function Preview() {
  
  return <div style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><MantineProvider><><Notifications /><Example /></></MantineProvider></div>;
}

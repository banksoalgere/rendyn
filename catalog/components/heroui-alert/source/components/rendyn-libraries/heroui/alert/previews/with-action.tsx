"use client";

import Example from "@/components/rendyn-libraries/heroui/upstream/alert/with-action.raw";
import { HeroUIProvider } from "@heroui/react";
import "@/components/rendyn-libraries/heroui/theme.css";

export default function Preview() {
  
  return <div className="heroui-preview" style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><HeroUIProvider><Example /></HeroUIProvider></div>;
}

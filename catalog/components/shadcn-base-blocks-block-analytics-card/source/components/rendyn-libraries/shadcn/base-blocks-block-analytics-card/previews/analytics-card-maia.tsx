"use client";

import { AnalyticsCard as Example } from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/base/blocks/preview/cards/analytics-card";
import "@/components/rendyn-libraries/shadcn/upstream/registry/styles/style-maia.css";
import {NuqsAdapter} from "nuqs/adapters/react";
import {useEffect} from "react";

export default function Preview() {
  useEffect(() => { const root=document.documentElement;root.classList.add("rendyn-shadcn-base","style-maia");return()=>root.classList.remove("rendyn-shadcn-base","style-maia"); }, []);
  return <div className="rendyn-shadcn-base style-maia" style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><NuqsAdapter><Example /></NuqsAdapter></div>;
}

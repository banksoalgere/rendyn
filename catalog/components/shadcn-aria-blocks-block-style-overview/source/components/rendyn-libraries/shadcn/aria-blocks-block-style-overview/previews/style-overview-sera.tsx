"use client";

import { StyleOverview as Example } from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/aria/blocks/preview/cards/style-overview";
import "@/components/rendyn-libraries/shadcn/upstream/registry/styles/style-sera.css";
import {NuqsAdapter} from "nuqs/adapters/react";
import {useEffect} from "react";

export default function Preview() {
  useEffect(() => { const root=document.documentElement;root.classList.add("rendyn-shadcn-base","style-sera");return()=>root.classList.remove("rendyn-shadcn-base","style-sera"); }, []);
  return <div className="rendyn-shadcn-base style-sera" style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><NuqsAdapter><Example /></NuqsAdapter></div>;
}

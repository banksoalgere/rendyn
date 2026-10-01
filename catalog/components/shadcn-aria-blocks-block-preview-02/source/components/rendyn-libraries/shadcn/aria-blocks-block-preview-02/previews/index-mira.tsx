"use client";

import Example from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/aria/blocks/preview-02/index";
import "@/components/rendyn-libraries/shadcn/upstream/registry/styles/style-mira.css";
import {NuqsAdapter} from "nuqs/adapters/react";
import {useEffect} from "react";

export default function Preview() {
  useEffect(() => { const root=document.documentElement;root.classList.add("rendyn-shadcn-base","style-mira");return()=>root.classList.remove("rendyn-shadcn-base","style-mira"); }, []);
  return <div className="rendyn-shadcn-base style-mira" style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><NuqsAdapter><Example /></NuqsAdapter></div>;
}

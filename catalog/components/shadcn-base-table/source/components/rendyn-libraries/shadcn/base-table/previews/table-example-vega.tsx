"use client";

import Example from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/base/examples/table-example";
import "@/components/rendyn-libraries/shadcn/upstream/registry/styles/style-vega.css";
import {NuqsAdapter} from "nuqs/adapters/react";
import {useEffect} from "react";

export default function Preview() {
  useEffect(() => { const root=document.documentElement;root.classList.add("rendyn-shadcn-base","style-vega");return()=>root.classList.remove("rendyn-shadcn-base","style-vega"); }, []);
  return <div className="rendyn-shadcn-base style-vega" style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><NuqsAdapter><Example /></NuqsAdapter></div>;
}

"use client";

import Example from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/aria/blocks/login-04/page";
import "@/components/rendyn-libraries/shadcn/upstream/registry/styles/style-luma.css";
import {NuqsAdapter} from "nuqs/adapters/react";
import {useEffect} from "react";

export default function Preview() {
  useEffect(() => { const root=document.documentElement;root.classList.add("rendyn-shadcn-base","style-luma");return()=>root.classList.remove("rendyn-shadcn-base","style-luma"); }, []);
  return <div className="rendyn-shadcn-base style-luma" style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><NuqsAdapter><Example /></NuqsAdapter></div>;
}

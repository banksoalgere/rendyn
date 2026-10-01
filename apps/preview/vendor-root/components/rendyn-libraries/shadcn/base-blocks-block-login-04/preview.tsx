"use client";

import Example from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/base/blocks/login-04/page";
import "@/components/rendyn-libraries/shadcn/upstream/registry/styles/style-nova.css";
import {NuqsAdapter} from "nuqs/adapters/react";
import {useEffect} from "react";

export default function Preview() {
  useEffect(() => { const root=document.documentElement;root.classList.add("rendyn-shadcn-base","style-nova");return()=>root.classList.remove("rendyn-shadcn-base","style-nova"); }, []);
  return <div className="rendyn-shadcn-base style-nova" style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><NuqsAdapter><Example /></NuqsAdapter></div>;
}

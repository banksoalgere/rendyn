"use client";

import { GroupChat as Example } from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/radix/blocks/preview-03/cards/group-chat";
import "@/components/rendyn-libraries/shadcn/upstream/registry/styles/style-lyra.css";
import {NuqsAdapter} from "nuqs/adapters/react";
import {useEffect} from "react";

export default function Preview() {
  useEffect(() => { const root=document.documentElement;root.classList.add("rendyn-shadcn-base","style-lyra");return()=>root.classList.remove("rendyn-shadcn-base","style-lyra"); }, []);
  return <div className="rendyn-shadcn-base style-lyra" style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><NuqsAdapter><Example /></NuqsAdapter></div>;
}

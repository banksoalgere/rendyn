"use client";

import { NewMilestone as Example } from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/aria/blocks/preview-02/cards/new-milestone";
import "@/components/rendyn-libraries/shadcn/upstream/registry/styles/style-rhea.css";
import {NuqsAdapter} from "nuqs/adapters/react";
import {useEffect} from "react";

export default function Preview() {
  useEffect(() => { const root=document.documentElement;root.classList.add("rendyn-shadcn-base","style-rhea");return()=>root.classList.remove("rendyn-shadcn-base","style-rhea"); }, []);
  return <div className="rendyn-shadcn-base style-rhea" style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><NuqsAdapter><Example /></NuqsAdapter></div>;
}

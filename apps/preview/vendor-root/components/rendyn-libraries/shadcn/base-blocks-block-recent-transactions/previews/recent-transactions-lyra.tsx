"use client";

import { RecentTransactions as Example } from "@/components/rendyn-libraries/shadcn/upstream/registry/bases/base/blocks/preview-02/cards/recent-transactions";
import "@/components/rendyn-libraries/shadcn/upstream/registry/styles/style-lyra.css";
import {NuqsAdapter} from "nuqs/adapters/react";
import {useEffect} from "react";

export default function Preview() {
  useEffect(() => { const root=document.documentElement;root.classList.add("rendyn-shadcn-base","style-lyra");return()=>root.classList.remove("rendyn-shadcn-base","style-lyra"); }, []);
  return <div className="rendyn-shadcn-base style-lyra" style={{ width: "100%", maxWidth: "48rem", padding: "1.5rem" }}><NuqsAdapter><Example /></NuqsAdapter></div>;
}

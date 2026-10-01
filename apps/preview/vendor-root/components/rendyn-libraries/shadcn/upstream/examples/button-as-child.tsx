"use client";

import Link from "next/link"

import { Button } from "@/components/rendyn-libraries/shadcn/ui/button"

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}

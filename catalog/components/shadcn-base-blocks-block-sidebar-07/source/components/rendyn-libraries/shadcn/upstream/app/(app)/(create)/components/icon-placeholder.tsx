"use client";

import { lazy, Suspense } from "react"
import { SquareIcon } from "lucide-react"
import type { IconLibraryName } from "shadcn/icons"

import { useDesignSystemSearchParams } from "@/components/rendyn-libraries/shadcn/upstream/app/(app)/(create)/lib/search-params"

const IconLucide = lazy(() =>
  import("@/components/rendyn-libraries/shadcn/upstream/registry/icons/icon-lucide").then((mod) => ({
    default: mod.IconLucide,
  }))
)

const IconTabler = lazy(() =>
  import("@/components/rendyn-libraries/shadcn/upstream/registry/icons/icon-tabler").then((mod) => ({
    default: mod.IconTabler,
  }))
)

const IconHugeicons = lazy(() =>
  import("@/components/rendyn-libraries/shadcn/upstream/registry/icons/icon-hugeicons").then((mod) => ({
    default: mod.IconHugeicons,
  }))
)

const IconPhosphor = lazy(() =>
  import("@/components/rendyn-libraries/shadcn/upstream/registry/icons/icon-phosphor").then((mod) => ({
    default: mod.IconPhosphor,
  }))
)

const IconRemixicon = lazy(() =>
  import("@/components/rendyn-libraries/shadcn/upstream/registry/icons/icon-remixicon").then((mod) => ({
    default: mod.IconRemixicon,
  }))
)

// Preload all icon renderer modules so switching libraries is instant.
// These warm the browser module cache; React.lazy resolves immediately
// for modules that are already loaded.
void import("@/components/rendyn-libraries/shadcn/upstream/registry/icons/icon-lucide")
void import("@/components/rendyn-libraries/shadcn/upstream/registry/icons/icon-tabler")
void import("@/components/rendyn-libraries/shadcn/upstream/registry/icons/icon-hugeicons")
void import("@/components/rendyn-libraries/shadcn/upstream/registry/icons/icon-phosphor")
void import("@/components/rendyn-libraries/shadcn/upstream/registry/icons/icon-remixicon")

export function IconPlaceholder({
  ...props
}: {
  [K in IconLibraryName]: string
} & React.ComponentProps<"svg">) {
  const [{ iconLibrary }] = useDesignSystemSearchParams()
  const iconName = props[iconLibrary]

  if (!iconName) {
    return null
  }

  return (
    <Suspense fallback={<SquareIcon {...props} />}>
      {iconLibrary === "lucide" && <IconLucide name={iconName} {...props} />}
      {iconLibrary === "tabler" && <IconTabler name={iconName} {...props} />}
      {iconLibrary === "hugeicons" && (
        <IconHugeicons name={iconName} {...props} />
      )}
      {iconLibrary === "phosphor" && (
        <IconPhosphor name={iconName} {...props} />
      )}
      {iconLibrary === "remixicon" && (
        <IconRemixicon name={iconName} {...props} />
      )}
    </Suspense>
  )
}

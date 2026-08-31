"use client";

import { previews } from "@/components/previews";
import { externalPreviews } from "@/components/external-previews";

interface PreviewRendererProps {
  previewKey: string;
  name: string;
  description: string;
}

export function PreviewRenderer({ previewKey, name, description }: PreviewRendererProps) {
  const Preview = previews[previewKey] ?? externalPreviews[previewKey];
  if (Preview) return <Preview />;
  return (
    <div style={{ maxWidth: "32rem", padding: "3rem", textAlign: "center" }}>
      <h1 style={{ margin: 0, fontSize: "1.5rem" }}>{name}</h1>
      <p style={{ color: "var(--muted-foreground)" }}>{description}</p>
    </div>
  );
}

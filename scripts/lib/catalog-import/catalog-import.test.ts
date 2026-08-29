import { describe, expect, it } from "vitest";
import { mapConcurrent } from "./concurrency.js";
import { addRegistrySignature, stripMarkdown, unique } from "./metadata.js";
import { sourceConfigSchema } from "./schemas.js";
import { assertAllowedUrl, safeOutputPath } from "./security.js";

describe("catalog importer utilities", () => {
  it("preserves input order while limiting concurrent work", async () => {
    const results = await mapConcurrent([3, 1, 2], 2, async (value) => value * 2);

    expect(results).toEqual([6, 2, 4]);
  });

  it("places provenance after a React directive", () => {
    expect(
      addRegistrySignature(
        '"use client";\nexport const value = 1;\n',
        "value.tsx",
        "https://beui.dev/value",
      ),
    ).toBe('"use client";\n// beui.dev/value\nexport const value = 1;\n');
  });

  it("normalizes metadata text deterministically", () => {
    expect(stripMarkdown("# Title\n[Link](https://example.com) `code`")).toBe("Title Link code");
    expect(unique([" button ", "button", "toast"])).toEqual(["button", "toast"]);
  });

  it("rejects unapproved origins and unsafe paths", () => {
    expect(() => assertAllowedUrl("http://beui.dev/r", "https://beui.dev"))
      .toThrow(/non-HTTPS/);
    expect(() => safeOutputPath("/tmp/catalog", "../secret")).toThrow(/unsafe path/i);
  });

  it("validates source configuration before any network access", () => {
    expect(() => sourceConfigSchema.parse({ repository: "https://example.com/project" }))
      .toThrow();
  });
});

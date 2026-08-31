import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { assertStandardMitLicense } from "./license.js";
import { sha256 } from "./security.js";

describe("catalogue licence boundary", () => {
  it("accepts the reviewed standard MIT grant", async () => {
    const license = await readFile(
      resolve(import.meta.dirname, "../../../catalog/source/beui/LICENSE"),
      "utf8",
    );

    expect(() => assertStandardMitLicense(license, {
      sha256: sha256(license),
      copyright: "Copyright (c) 2026 Saurabh Chauhan",
    })).not.toThrow();
  });

  it("rejects a Commons Clause added to otherwise standard MIT text", async () => {
    const mit = await readFile(
      resolve(import.meta.dirname, "../../../catalog/source/beui/LICENSE"),
      "utf8",
    );
    const restricted = `${mit}\nCommons Clause License Condition\n`;

    expect(() => assertStandardMitLicense(restricted, {
      sha256: sha256(restricted),
      copyright: "Copyright (c) 2026 Saurabh Chauhan",
    })).toThrow(/Commons Clause/);
  });
});

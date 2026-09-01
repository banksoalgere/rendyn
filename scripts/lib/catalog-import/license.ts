import { invariant, sha256 } from "./security.js";

interface MitLicenseExpectation {
  sha256: string;
  copyright: string;
}

export function assertStandardMitLicense(
  license: string,
  expectation: MitLicenseExpectation,
): void {
  const normalizedLicense = license.replace(/\s+/g, " ");
  invariant(sha256(license) === expectation.sha256, "Pinned MIT license hash changed");
  invariant(
    license.includes(expectation.copyright),
    "Expected copyright notice is missing",
  );
  invariant(
    normalizedLicense.includes("Permission is hereby granted, free of charge"),
    "License is missing the standard MIT permission grant",
  );
  invariant(
    normalizedLicense.includes("sublicense, and/or sell copies"),
    "License does not grant the standard MIT redistribution rights",
  );
  invariant(
    normalizedLicense.includes("The above copyright notice and this permission notice shall be included"),
    "License is missing the standard MIT notice condition",
  );
  invariant(
    !license.toLowerCase().includes("commons clause"),
    "Commons Clause sources cannot be redistributed by Rendyn",
  );
}

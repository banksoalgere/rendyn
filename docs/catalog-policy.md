# Catalogue import policy

## Allowed input

Copy-paste source may be added only when the project has explicit redistribution rights. For an open-source source, record:

- repository and immutable commit;
- SPDX licence and full notice text;
- exact imported files and transformations;
- registry/index and file integrity hashes;
- import timestamp and original component identity.

This first source is MIT. The importer fails closed if the expected notice, registry hash, component count, safe paths, or pinned source comparison changes.

## Paid or proprietary source

Purchasing access to a component does not normally grant the right to redistribute it as source. Having an AI read proprietary code and reproduce a closely derived implementation is not a reliable workaround: contract restrictions, copyright in expressive implementation details, and trade-secret obligations can still apply. Add paid material only under a licence or written agreement that explicitly permits this service to redistribute source to customers.

An independently designed component based on functional requirements is different, but it should be built from the requirements and general design constraints—not generated as a disguised translation of code the service is not allowed to redistribute. Keep the requirements, design record, and implementation provenance.

## Runtime output

Agents receive internal preview URLs and hosted contact sheets. Upstream page URLs are retained only in private provenance manifests. Source responses include the original licence notice and immutable source commit.

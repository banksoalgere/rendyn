import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import type { CatalogStore } from "@designmcp/catalog";

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  })[character]!);
}

export async function buildContactSheet(store: CatalogStore, slugs: string[]): Promise<Buffer | null> {
  const selected = slugs.slice(0, 5).flatMap((slug) => {
    const component = store.find(slug);
    return component ? [component] : [];
  });
  const cells: Array<{ image: Buffer; label: Buffer }> = [];
  for (const [index, component] of selected.entries()) {
    try {
      const screenshot = await readFile(resolve(store.root, "previews", `${component.slug}.png`));
      const image = await sharp(screenshot)
        .resize(600, 330, { fit: "contain", background: "#f5f5f5" })
        .png()
        .toBuffer();
      const label = Buffer.from(
        `<svg width="600" height="50" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="50" fill="#111"/><text x="18" y="33" fill="white" font-size="20" font-family="Arial, sans-serif">${index + 1}. ${escapeXml(component.name)}</text></svg>`,
      );
      cells.push({ image, label });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  if (!cells.length) return null;

  const columns = Math.min(2, cells.length);
  const rows = Math.ceil(cells.length / columns);
  const width = columns * 620 + 20;
  const height = rows * 400 + 20;
  const composite = cells.flatMap((cell, index) => {
    const left = 20 + (index % columns) * 620;
    const top = 20 + Math.floor(index / columns) * 400;
    return [
      { input: cell.image, left, top },
      { input: cell.label, left, top: top + 330 },
    ];
  });
  return sharp({ create: { width, height, channels: 3, background: "#e8e8e8" } })
    .composite(composite)
    .png()
    .toBuffer();
}

/* eslint-disable @next/next/no-html-link-for-pages -- Vinext shared server navigation uses native links. */

interface BrandProps {
  label?: string;
}

export function Brand({ label = 'DesignMCP home' }: BrandProps) {
  return (
    <a className="brand" href="/" aria-label={label}>
      <span className="brand-mark" aria-hidden="true">D</span>
      <span>DesignMCP</span>
    </a>
  );
}

/* eslint-disable @next/next/no-html-link-for-pages -- Vinext's next/link shim breaks client hydration. */
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

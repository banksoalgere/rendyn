interface BrandProps {
  label?: string;
}

export function Brand({ label = 'DesignMCP home' }: BrandProps) {
  return (
    <a className="brand" href="#top" aria-label={label}>
      <span className="brand-mark" aria-hidden="true">D</span>
      <span>DesignMCP</span>
    </a>
  );
}

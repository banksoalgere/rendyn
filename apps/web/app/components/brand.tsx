interface BrandProps {
  href?: string;
  label?: string;
}

export function Brand({ href = '/', label = 'Rendyn home' }: BrandProps) {
  return (
    <a className="brand" href={href} aria-label={label}>
      <span className="brand-mark" aria-hidden="true">R</span>
      <span>Rendyn</span>
    </a>
  );
}

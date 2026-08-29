import Link from 'next/link';

interface BrandProps {
  href?: string;
  label?: string;
}

export function Brand({ href = '#top', label = 'DesignMCP home' }: BrandProps) {
  return (
    <Link className="brand" href={href} aria-label={label}>
      <span className="brand-mark" aria-hidden="true">D</span>
      <span>DesignMCP</span>
    </Link>
  );
}

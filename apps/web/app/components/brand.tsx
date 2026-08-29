import Link from 'next/link';

interface BrandProps {
  label?: string;
}

export function Brand({ label = 'DesignMCP home' }: BrandProps) {
  return (
    <Link className="brand" href="/" aria-label={label}>
      <span className="brand-mark" aria-hidden="true">D</span>
      <span>DesignMCP</span>
    </Link>
  );
}

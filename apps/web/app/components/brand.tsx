import { BrandMark } from './brand-mark';

interface BrandProps {
  href?: string;
  label?: string;
}

export function Brand({ href = '/', label = 'Rendyn home' }: BrandProps) {
  return (
    <a className="brand" href={href} aria-label={label}>
      <BrandMark />
      <span>Rendyn</span>
    </a>
  );
}

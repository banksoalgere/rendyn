/** A modular R, drawn as four pieces so it stays clear at small sizes. */
export function BrandMark({ className = 'brand-mark' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M3 3h12v12H3zM18 3h5a6 6 0 0 1 0 12h-5V3ZM3 18h12v12H9a6 6 0 0 1-6-6v-6ZM18 18h5l7 12H18V18Z" />
    </svg>
  );
}

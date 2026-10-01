"use client";

import { RingProgress, RingProgressProps } from '@mantine/core';

function Wrapper(props: RingProgressProps) {
  return (
    <RingProgress
      {...props}
      sections={[
        { value: 40, color: 'cyan' },
        { value: 15, color: 'orange' },
        { value: 15, color: 'grape' },
      ]}
    />
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent size={120} thickness={12} roundCaps={true} />; }

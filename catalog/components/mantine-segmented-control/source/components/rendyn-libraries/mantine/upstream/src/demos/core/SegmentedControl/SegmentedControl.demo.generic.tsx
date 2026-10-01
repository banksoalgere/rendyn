"use client";

import { SegmentedControl } from '@mantine/core';

function Demo() {
  return (
    <SegmentedControl<string | number>
      data={[
        { value: 16, label: '16' },
        { value: 17, label: '17' },
        { value: '18+', label: '18 or older' },
      ]}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

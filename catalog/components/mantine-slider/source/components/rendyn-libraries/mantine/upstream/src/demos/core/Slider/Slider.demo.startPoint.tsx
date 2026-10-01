"use client";

import { Slider } from '@mantine/core';

function Demo() {
  return (
    <Slider
      startPointValue={-50}
      min={-100}
      max={100}
      defaultValue={40}
      mb={40}
      marks={[
        { value: -100, label: '-100' },
        { value: -50, label: '-50' },
        { value: 0, label: '0' },
        { value: 50, label: '50' },
        { value: 100, label: '100' },
      ]}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

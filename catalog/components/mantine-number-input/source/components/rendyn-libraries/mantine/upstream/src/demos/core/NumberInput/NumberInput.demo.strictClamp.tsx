"use client";

import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <NumberInput
      label="Strict clamping between 0 and 100"
      placeholder="Enter a number"
      clampBehavior="strict"
      min={0}
      max={100}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

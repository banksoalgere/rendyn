"use client";

import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <NumberInput
        label="Step on hold"
        description="Step value when clicking and holding increment/decrement buttons"
        placeholder="Hold mouse down on control button"
        stepHoldDelay={500}
        stepHoldInterval={100}
      />
      <NumberInput
        mt="md"
        label="Step the value with interval function"
        description="Steps get faster over time when holding the control button"
        placeholder="Hold mouse down on control button"
        stepHoldDelay={500}
        stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
      />
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { Pill, PillsInput } from '@mantine/core';

function Demo() {
  return (
    <PillsInput label="Enter items" loading>
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <PillsInput.Field placeholder="Enter value" />
      </Pill.Group>
    </PillsInput>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <NumberInput
        label="Leading zeros removed on blur"
        placeholder="Type 00100 and click outside"
        trimLeadingZeroesOnBlur
        defaultValue="00100"
      />

      <NumberInput
        label="Leading zeros preserved"
        placeholder="Type 00100 and click outside"
        trimLeadingZeroesOnBlur={false}
        defaultValue="00100"
        mt="md"
      />
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

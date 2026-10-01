"use client";

import { Checkbox, Stack } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Checkbox checked label="regular checkbox" size="lg" color="lime.4" onChange={() => {}} />
      <Checkbox
        autoContrast
        checked
        label="autoContrast checkbox"
        size="lg"
        color="lime.4"
        onChange={() => {}}
      />
    </Stack>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

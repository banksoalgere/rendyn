"use client";

import { Checkbox, Stack } from '@mantine/core';

function Demo() {
  return (
    <Checkbox.Group
      disabled
      label="Select your favorite frameworks/libraries"
      description="This is anonymous"
    >
      <Stack mt="xs">
        <Checkbox value="react" label="React" />
        <Checkbox value="svelte" label="Svelte" />
        <Checkbox value="angular" label="Angular" />
        <Checkbox value="vue" label="Vue" />
      </Stack>
    </Checkbox.Group>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

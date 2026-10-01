"use client";

import { Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Button color="ocean-blue">Ocean blue button</Button>
      <Button color="bright-pink" variant="filled">
        Bright pink button
      </Button>
    </Group>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

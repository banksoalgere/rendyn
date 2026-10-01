"use client";

import { Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Button color="oklch-blue">Filled</Button>
      <Button color="oklch-blue" variant="outline">
        Outline
      </Button>
      <Button color="oklch-blue" variant="light">
        Light
      </Button>
    </Group>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

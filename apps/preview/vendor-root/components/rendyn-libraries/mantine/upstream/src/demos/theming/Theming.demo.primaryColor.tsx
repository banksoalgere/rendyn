"use client";

import { Button, Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <Button color="bright-pink">Primary button</Button>
      <Button color="blue">Blue button</Button>
    </Group>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

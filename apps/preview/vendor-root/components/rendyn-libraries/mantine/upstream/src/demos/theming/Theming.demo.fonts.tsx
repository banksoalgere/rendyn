"use client";

import { Button, Code, Group, Title } from '@mantine/core';

function Demo() {
  return (
    <>
      <Title order={3} ff="Outfit, sans-serif" ta="center">
        Outfit or sans-serif title
      </Title>
      <Group mt="md">
        <Button ff="Verdana, sans-serif">Verdana button</Button>
        <Code ff="Monaco, Courier, monospace">Monaco, Courier Code</Code>
      </Group>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

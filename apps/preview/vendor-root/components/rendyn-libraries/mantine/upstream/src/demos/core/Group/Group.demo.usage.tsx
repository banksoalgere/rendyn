"use client";

import { Button, Group } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Group {...props}>
      <Button variant="default">First</Button>
      <Button variant="default">Second</Button>
      <Button variant="default">Third</Button>
    </Group>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent justify={"flex-start"} gap={"md"} grow={false} />; }

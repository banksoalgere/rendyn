"use client";

import { Button } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Button.Group {...props}>
      <Button variant="default">First</Button>
      <Button variant="default">Second</Button>
      <Button variant="default">Third</Button>
    </Button.Group>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent orientation={"horizontal"} />; }

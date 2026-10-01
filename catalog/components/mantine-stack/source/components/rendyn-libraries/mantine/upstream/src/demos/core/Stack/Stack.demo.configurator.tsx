"use client";

import { Button, Stack, StackProps } from '@mantine/core';

function Wrapper(props: StackProps) {
  return (
    <Stack h={300} bg="var(--mantine-color-body)" {...props}>
      <Button variant="default">1</Button>
      <Button variant="default">2</Button>
      <Button variant="default">3</Button>
    </Stack>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent align={"stretch"} justify={"center"} gap={"md"} />; }

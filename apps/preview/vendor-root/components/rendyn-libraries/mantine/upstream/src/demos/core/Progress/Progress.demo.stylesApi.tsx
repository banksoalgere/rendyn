"use client";

import { Progress } from '@mantine/core';

function Demo(props: any) {
  return (
    <Progress.Root size="xl" {...props}>
      <Progress.Section value={35}>
        <Progress.Label>Documents</Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { Switch } from '@mantine/core';

function Demo(props: any) {
  return (
    <Switch
      {...props}
      label="Switch component"
      description="Switch description"
      error="Switch error"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { Input } from '@mantine/core';

function Demo(props: any) {
  return (
    <Input.Wrapper
      label="Input label"
      description="Input description"
      error="Input error"
      withAsterisk
      {...props}
    >
      <Input placeholder="Input" />
    </Input.Wrapper>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

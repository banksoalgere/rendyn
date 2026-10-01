"use client";

import { AtIcon } from '@phosphor-icons/react';

import { TextInput } from '@mantine/core';

function Demo(props: any) {
  return (
    <TextInput
      label="Label"
      placeholder="TextInput"
      description="Description"
      error="Error"
      withAsterisk
      leftSection={<AtIcon size={18} />}
      {...props}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

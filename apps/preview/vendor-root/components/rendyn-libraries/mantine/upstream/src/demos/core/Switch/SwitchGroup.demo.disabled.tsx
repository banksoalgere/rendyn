"use client";

import { Group, Switch } from '@mantine/core';

function Demo() {
  return (
    <Switch.Group
      disabled
      label="Select your favorite framework/library"
      description="This is anonymous"
    >
      <Group mt="xs">
        <Switch value="react" label="React" />
        <Switch value="svelte" label="Svelte" />
        <Switch value="ng" label="Angular" />
        <Switch value="vue" label="Vue" />
      </Group>
    </Switch.Group>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

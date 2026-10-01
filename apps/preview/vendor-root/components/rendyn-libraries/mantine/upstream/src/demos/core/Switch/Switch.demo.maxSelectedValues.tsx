"use client";

import { Group, Switch } from '@mantine/core';

function Demo() {
  return (
    <Switch.Group defaultValue={['react']} maxSelectedValues={2}>
      <Group>
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

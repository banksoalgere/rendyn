"use client";

import { Group, Switch, SwitchGroupProps } from '@mantine/core';

function Wrapper(props: SwitchGroupProps) {
  return (
    <Switch.Group defaultValue={['react']} {...props}>
      <Group mt="xs">
        <Switch value="react" label="React" />
        <Switch value="svelte" label="Svelte" />
        <Switch value="ng" label="Angular" />
        <Switch value="vue" label="Vue" />
      </Group>
    </Switch.Group>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent label={"Select your favorite framework/library"} description={"This is anonymous"} error={""} withAsterisk={true} />; }

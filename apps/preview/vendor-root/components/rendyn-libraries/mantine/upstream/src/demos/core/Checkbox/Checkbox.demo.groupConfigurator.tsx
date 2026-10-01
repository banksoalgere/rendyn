"use client";

import { Checkbox, CheckboxGroupProps, Group } from '@mantine/core';

function Wrapper(props: Partial<CheckboxGroupProps>) {
  return (
    <Checkbox.Group defaultValue={['react']} {...props}>
      <Group mt="xs">
        <Checkbox value="react" label="React" />
        <Checkbox value="svelte" label="Svelte" />
        <Checkbox value="ng" label="Angular" />
        <Checkbox value="vue" label="Vue" />
      </Group>
    </Checkbox.Group>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent label={"Select your favorite frameworks/libraries"} description={"This is anonymous"} error={""} withAsterisk={true} />; }

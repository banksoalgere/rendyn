"use client";

import { Group, Radio, RadioGroupProps } from '@mantine/core';

function Wrapper(props: Partial<RadioGroupProps>) {
  return (
    <Radio.Group defaultValue="react" name="favoriteFramework" {...props}>
      <Group mt="xs">
        <Radio value="react" label="React" />
        <Radio value="svelte" label="Svelte" />
        <Radio value="ng" label="Angular" />
        <Radio value="vue" label="Vue" />
      </Group>
    </Radio.Group>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent label={"Select your favorite framework/library"} description={"This is anonymous"} error={""} withAsterisk={true} />; }

"use client";

import { TagsInput } from '@mantine/core';

function Demo() {
  return (
    <TagsInput
      label="Tags Input"
      placeholder="Tags Input"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      success="Looks good!"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

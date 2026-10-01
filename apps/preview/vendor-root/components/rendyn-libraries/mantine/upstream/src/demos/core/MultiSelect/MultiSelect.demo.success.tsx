"use client";

import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect
      label="Multi Select"
      placeholder="Multi Select"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      success="Looks good!"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { Select } from '@mantine/core';

function Demo() {
  return (
    <Select
      label="Select"
      placeholder="Select"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      success="Looks good!"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete
      label="Autocomplete"
      placeholder="Autocomplete"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      success="Looks good!"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

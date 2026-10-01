"use client";

import { Select } from '@mantine/core';

function Demo() {
  return (
    <>
      <Select
        label="Opens on focus"
        placeholder="Pick value"
        searchable
        openOnFocus
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
      <Select
        label="Does not open on focus"
        placeholder="Pick value"
        searchable
        openOnFocus={false}
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

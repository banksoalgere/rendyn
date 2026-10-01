"use client";

import { MultiSelect } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <MultiSelect
      {...props}
      placeholder="MultiSelect placeholder"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

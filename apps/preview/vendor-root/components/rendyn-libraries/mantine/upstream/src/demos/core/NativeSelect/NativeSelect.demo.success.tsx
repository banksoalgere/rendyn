"use client";

import { NativeSelect } from '@mantine/core';

function Demo() {
  return (
    <NativeSelect
      label="Native Select"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      success="Looks good!"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { NativeSelect } from '@mantine/core';

function Demo() {
  return (
    <NativeSelect
      label="Your favorite framework"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      loading
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

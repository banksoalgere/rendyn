"use client";

import { MultiSelect } from '@mantine/core';

function Demo() {
  return (
    <MultiSelect placeholder="Pick values" data={['React', 'Angular', 'Vue', 'Svelte']} loading />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { Autocomplete } from '@mantine/core';

function Demo() {
  return (
    <Autocomplete placeholder="Pick value" data={['React', 'Angular', 'Vue', 'Svelte']} loading />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

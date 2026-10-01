"use client";

import { Select } from '@mantine/core';

function Demo() {
  return <Select placeholder="Pick value" data={['React', 'Angular', 'Vue', 'Svelte']} loading />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

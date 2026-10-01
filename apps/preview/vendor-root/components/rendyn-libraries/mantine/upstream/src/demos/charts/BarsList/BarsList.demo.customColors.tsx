"use client";

import { BarsList } from '@mantine/charts';

const data = [
  { name: 'React', value: 850000, color: 'blue.6' },
  { name: 'Vue', value: 620000, color: 'green.6' },
  { name: 'Angular', value: 540000, color: 'yellow.6' },
  { name: 'Svelte', value: 380000, color: 'red.6' },
  { name: 'Next.js', value: 920000, color: 'teal.6' },
  { name: 'Nuxt', value: 410000, color: 'gray.8' },
  { name: 'Remix', value: 295000, color: 'orange.6' },
];

function Demo() {
  return (
    <BarsList
      data={data}
      barsLabel="Traffic Source"
      valueLabel="Visits"
      variant="filled"
      valueFormatter={(value) => value.toLocaleString('en-US')}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

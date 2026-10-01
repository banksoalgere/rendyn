"use client";

import { BarsList } from '@mantine/charts';

const data = [
  { name: 'Yellow', value: 1200000, color: 'yellow.4' },
  { name: 'Cyan', value: 800000, color: 'cyan.2' },
  { name: 'Lime', value: 600000, color: 'lime.3' },
  { name: 'Dark Blue', value: 400000, color: 'blue.9' },
  { name: 'Dark Red', value: 200000, color: 'red.9' },
];

function Demo() {
  return (
    <BarsList
      data={data}
      variant="filled"
      autoContrast
      valueFormatter={(value) => value.toLocaleString('en-US')}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

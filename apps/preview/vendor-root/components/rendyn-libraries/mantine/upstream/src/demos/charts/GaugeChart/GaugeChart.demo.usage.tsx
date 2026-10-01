"use client";

import { GaugeChart } from '@mantine/charts';

function Demo() {
  return <GaugeChart value={72} size={200} thickness={12} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { GaugeChart } from '@mantine/charts';

function Demo() {
  return <GaugeChart value={72} startAngle={-90} endAngle={90} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

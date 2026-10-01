"use client";

import { SankeyChart } from '@mantine/charts';

import { colorData, colorDataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/SankeyChart/_data';

function Demo() {
  return <SankeyChart data={colorData} linkOpacity={0.2} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

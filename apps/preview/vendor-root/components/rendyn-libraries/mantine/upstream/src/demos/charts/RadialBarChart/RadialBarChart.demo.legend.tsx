"use client";

import { RadialBarChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/RadialBarChart/_data';

function Demo() {
  return <RadialBarChart data={data} dataKey="value" h={260} withLegend />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

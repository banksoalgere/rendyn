"use client";

import { SankeyChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/SankeyChart/_data';

function Demo() {
  return <SankeyChart data={data} withTooltip={false} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

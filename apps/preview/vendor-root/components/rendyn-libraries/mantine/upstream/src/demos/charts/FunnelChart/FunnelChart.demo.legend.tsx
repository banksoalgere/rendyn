"use client";

import { FunnelChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/FunnelChart/_data';

function Demo() {
  return <FunnelChart data={data} withLegend />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

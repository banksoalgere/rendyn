"use client";

import { Treemap } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/Treemap/_data';

function Demo() {
  return <Treemap data={data} withTooltip={false} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

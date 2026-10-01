"use client";

import { Treemap } from '@mantine/charts';

import { nestedData, nestedDataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/Treemap/_data';

function Demo() {
  return <Treemap data={nestedData} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

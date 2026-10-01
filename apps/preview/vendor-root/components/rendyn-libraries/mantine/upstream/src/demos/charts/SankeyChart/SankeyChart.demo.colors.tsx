"use client";

import { SankeyChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/SankeyChart/_data';

function Demo() {
  return <SankeyChart data={data} colors={['indigo.6', 'cyan.6', 'teal.6', 'orange.6', 'red.6']} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

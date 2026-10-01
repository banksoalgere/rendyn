"use client";

import { SunburstChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/SunburstChart/_data';

function Demo() {
  return <SunburstChart data={data} strokeColor="gray.3" />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

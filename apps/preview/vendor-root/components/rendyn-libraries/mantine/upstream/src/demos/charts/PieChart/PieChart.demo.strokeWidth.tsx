"use client";

import { PieChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/PieChart/_data';

function Wrapper(props: any) {
  return <PieChart {...props} data={data} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent strokeWidth={1} />; }

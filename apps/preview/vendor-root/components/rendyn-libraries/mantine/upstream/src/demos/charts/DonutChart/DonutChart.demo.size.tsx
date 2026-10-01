"use client";

import { DonutChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/DonutChart/_data';

function Wrapper(props: any) {
  return <DonutChart {...props} data={data} mih={300} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent size={160} thickness={20} />; }

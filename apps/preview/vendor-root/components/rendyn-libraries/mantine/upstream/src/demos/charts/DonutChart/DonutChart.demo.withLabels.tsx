"use client";

import { DonutChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/DonutChart/_data';

function Wrapper(props: any) {
  return <DonutChart {...props} withLabels data={data} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent withLabelsLine={true} labelsType={"value"} />; }

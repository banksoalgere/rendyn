"use client";

import { PieChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/PieChart/_data';

function Wrapper(props: any) {
  return <PieChart {...props} withLabels data={data} miw={300} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent withLabelsLine={true} labelsPosition={"outside"} labelsType={"value"} />; }

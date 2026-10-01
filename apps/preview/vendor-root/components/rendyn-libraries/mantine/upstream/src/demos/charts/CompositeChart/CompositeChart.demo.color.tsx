"use client";

import { CompositeChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/CompositeChart/_data';

function Wrapper(props: any) {
  return (
    <CompositeChart
      h={300}
      data={data}
      dataKey="date"
      series={[{ name: 'Apples', type: 'line', color: props.color }]}
      {...props}
    />
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} />; }

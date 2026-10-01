"use client";

import { AreaChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/AreaChart/_data';

function Wrapper(props: any) {
  return (
    <AreaChart
      h={300}
      data={data}
      dataKey="date"
      series={[{ name: 'Apples', color: props.color }]}
      {...props}
    />
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} withGradient={true} />; }

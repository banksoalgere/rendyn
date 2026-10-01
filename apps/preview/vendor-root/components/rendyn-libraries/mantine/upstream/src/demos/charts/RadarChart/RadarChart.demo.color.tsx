"use client";

import { RadarChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/RadarChart/_data';

function Wrapper(props: any) {
  return (
    <RadarChart
      h={300}
      data={data}
      dataKey="product"
      series={[{ name: 'sales', color: props.color, strokeColor: props.strokeColor }]}
      {...props}
    />
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} strokeColor={"blue"} />; }

"use client";

import { AreaChart } from '@mantine/charts';

import { connectNullsData, connectNullsDataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/AreaChart/_data';

function Wrapper(props: any) {
  return (
    <AreaChart
      h={300}
      data={connectNullsData}
      dataKey="date"
      series={[{ name: 'Apples', color: 'indigo.6' }]}
      {...props}
    />
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent curveType={"linear"} connectNulls={true} />; }

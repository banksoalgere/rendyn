"use client";

import { CandlestickChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/CandlestickChart/_data';

function Wrapper(props: any) {
  return <CandlestickChart h={300} data={data} dataKey="date" {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent tickLine={"y"} gridAxis={"x"} withXAxis={true} withYAxis={true} withTooltip={true} />; }

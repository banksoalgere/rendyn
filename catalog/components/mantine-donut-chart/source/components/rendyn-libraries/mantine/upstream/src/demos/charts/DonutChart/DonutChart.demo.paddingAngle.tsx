"use client";

import { DonutChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/DonutChart/_data';

function Wrapper(props: any) {
  return <DonutChart {...props} data={data} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent paddingAngle={10} />; }

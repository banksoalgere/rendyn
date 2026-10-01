"use client";

import { FunnelChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/FunnelChart/_data';

function Wrapper(props: any) {
  return <FunnelChart {...props} data={data} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent strokeWidth={1} />; }

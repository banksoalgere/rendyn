"use client";

import { SunburstChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/SunburstChart/_data';

function Wrapper(props: any) {
  return <SunburstChart data={data} {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent gap={1} />; }

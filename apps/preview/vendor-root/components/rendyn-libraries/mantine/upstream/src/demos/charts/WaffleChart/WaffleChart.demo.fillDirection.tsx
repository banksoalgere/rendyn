"use client";

import { WaffleChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/WaffleChart/_data';

function Wrapper(props: any) {
  return <WaffleChart data={data} {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent fillDirection={"left-to-right"} />; }

"use client";

import { Sparkline } from '@mantine/charts';

function Wrapper(props: any) {
  return <Sparkline w={200} h={60} data={[10, 20, 40, 20, 40, 10, 50]} {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent curveType={"linear"} color={"blue"} fillOpacity={0.6} withGradient={true} strokeWidth={2} />; }

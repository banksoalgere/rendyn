"use client";

import { SemiCircleProgress } from '@mantine/core';

function Wrapper(props: any) {
  return <SemiCircleProgress label="Label" {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent fillDirection={"left-to-right"} orientation={"up"} filledSegmentColor={"blue"} size={200} thickness={12} value={40} />; }

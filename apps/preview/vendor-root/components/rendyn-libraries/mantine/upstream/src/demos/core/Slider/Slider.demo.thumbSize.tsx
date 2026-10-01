"use client";

import { Slider } from '@mantine/core';

function Wrapper(props: any) {
  return <Slider {...props} defaultValue={20} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent thumbSize={14} />; }

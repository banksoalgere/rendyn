"use client";

import { SegmentedControl } from '@mantine/core';

function Wrapper(props: any) {
  return <SegmentedControl data={['React', 'Angular', 'Vue', 'Svelte']} {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} />; }

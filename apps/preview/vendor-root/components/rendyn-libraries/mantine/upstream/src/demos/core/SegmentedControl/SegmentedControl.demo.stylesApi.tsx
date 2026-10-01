"use client";

import { SegmentedControl } from '@mantine/core';

function Demo(props: any) {
  return <SegmentedControl data={['React', 'Angular', 'Vue']} {...props} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

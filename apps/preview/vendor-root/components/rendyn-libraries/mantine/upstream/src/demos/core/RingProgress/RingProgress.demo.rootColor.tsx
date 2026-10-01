"use client";

import { RingProgress } from '@mantine/core';

function Demo() {
  return <RingProgress sections={[{ value: 40, color: 'yellow' }]} rootColor="red" />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

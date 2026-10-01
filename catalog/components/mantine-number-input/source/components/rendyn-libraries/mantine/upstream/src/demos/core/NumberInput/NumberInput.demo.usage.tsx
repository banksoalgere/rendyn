"use client";

import { NumberInput } from '@mantine/core';

function Wrapper(props: any) {
  return <NumberInput {...props} placeholder="Input placeholder" />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

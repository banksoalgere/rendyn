"use client";

import { ColorInput } from '@mantine/core';

function Wrapper(props: any) {
  return <ColorInput {...props} placeholder="Input placeholder" />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

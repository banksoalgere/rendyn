"use client";

import { JsonInput } from '@mantine/core';

function Wrapper(props: any) {
  return <JsonInput {...props} placeholder="Input placeholder" />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

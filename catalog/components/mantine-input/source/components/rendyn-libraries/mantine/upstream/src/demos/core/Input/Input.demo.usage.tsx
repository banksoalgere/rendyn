"use client";

import { Input } from '@mantine/core';

function Wrapper(props: any) {
  return <Input placeholder="Input component" {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

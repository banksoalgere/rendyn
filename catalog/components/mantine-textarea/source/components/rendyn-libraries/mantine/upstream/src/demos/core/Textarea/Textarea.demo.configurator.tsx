"use client";

import { Textarea } from '@mantine/core';

function Wrapper(props: any) {
  return <Textarea {...props} placeholder="Input placeholder" />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

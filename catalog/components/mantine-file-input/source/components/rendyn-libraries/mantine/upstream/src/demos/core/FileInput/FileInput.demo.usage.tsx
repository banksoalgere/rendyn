"use client";

import { FileInput } from '@mantine/core';

function Wrapper(props: any) {
  return <FileInput {...props} placeholder="Input placeholder" />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { TextInput } from '@mantine/core';

function Wrapper(props: any) {
  return <TextInput {...props} placeholder="Input placeholder" />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

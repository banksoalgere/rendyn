"use client";

import { PasswordInput } from '@mantine/core';

function Wrapper(props: any) {
  return <PasswordInput {...props} placeholder="Input placeholder" />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

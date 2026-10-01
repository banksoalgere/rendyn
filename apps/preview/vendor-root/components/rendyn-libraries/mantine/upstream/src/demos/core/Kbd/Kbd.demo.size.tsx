"use client";

import { Kbd } from '@mantine/core';

function Wrapper(props: any) {
  return <Kbd {...props}>Shift</Kbd>;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent size={"sm"} />; }

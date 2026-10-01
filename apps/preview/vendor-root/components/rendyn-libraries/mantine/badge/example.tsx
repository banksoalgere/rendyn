"use client";

import { Badge } from '@mantine/core';

function Wrapper(props: any) {
  return <Badge {...props}>Badge</Badge>;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent variant={"filled"} color={"blue"} size={"md"} radius={"xl"} />; }

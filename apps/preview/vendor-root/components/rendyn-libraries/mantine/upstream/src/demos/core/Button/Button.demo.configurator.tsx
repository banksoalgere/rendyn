"use client";

import { Button } from '@mantine/core';

function Wrapper(props: any) {
  return <Button {...props}>Button</Button>;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} size={"sm"} radius={"md"} />; }

"use client";

import { Progress } from '@mantine/core';

function Demo(props: any) {
  return <Progress {...props} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent color={"blue"} radius={"md"} size={"md"} value={50} striped={false} animated={false} />; }

"use client";

import { Avatar } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Avatar
      size="xl"
      variant="gradient"
      gradient={{ from: props.gradientFrom, to: props.gradientTo, deg: props.gradientDegree }}
    >
      GR
    </Avatar>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

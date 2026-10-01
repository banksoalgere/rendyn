"use client";

import { Button } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Button
      variant="gradient"
      gradient={{ from: props.gradientFrom, to: props.gradientTo, deg: props.gradientDegree }}
    >
      Gradient button
    </Button>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

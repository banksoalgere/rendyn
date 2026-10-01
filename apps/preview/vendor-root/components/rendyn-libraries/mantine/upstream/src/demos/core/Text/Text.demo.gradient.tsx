"use client";

import { Text } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Text
      size="xl"
      fw={900}
      variant="gradient"
      gradient={{ from: props.gradientFrom, to: props.gradientTo, deg: props.gradientDegree }}
    >
      Gradient Text
    </Text>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

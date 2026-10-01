"use client";

import { HeartIcon } from '@phosphor-icons/react';

import { ThemeIcon } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <ThemeIcon
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: props.gradientFrom, to: props.gradientTo, deg: props.gradientDegree }}
    >
      <HeartIcon />
    </ThemeIcon>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

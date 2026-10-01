"use client";

import { Chip, ChipProps } from '@mantine/core';

function Wrapper(props: ChipProps) {
  return (
    <Chip defaultChecked {...props}>
      Awesome chip
    </Chip>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} variant={"filled"} size={"sm"} radius={"xl"} />; }

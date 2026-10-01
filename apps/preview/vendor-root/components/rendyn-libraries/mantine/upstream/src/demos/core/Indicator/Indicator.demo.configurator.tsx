"use client";

import { Avatar, Indicator, IndicatorProps } from '@mantine/core';

function Demo(props: IndicatorProps) {
  return (
    <Indicator {...props}>
      <Avatar
        size="lg"
        radius="sm"
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
      />
    </Indicator>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent color={"blue"} position={"top-end"} radius={"xl"} size={10} disabled={false} withBorder={false} processing={false} />; }

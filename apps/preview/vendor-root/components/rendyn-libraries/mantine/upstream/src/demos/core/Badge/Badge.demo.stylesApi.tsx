"use client";

import { AtIcon } from '@phosphor-icons/react';

import { Badge } from '@mantine/core';

function Demo(props: any) {
  const icon = <AtIcon size={12} />;

  return (
    <Badge leftSection={icon} rightSection={icon} {...props}>
      Badge component
    </Badge>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

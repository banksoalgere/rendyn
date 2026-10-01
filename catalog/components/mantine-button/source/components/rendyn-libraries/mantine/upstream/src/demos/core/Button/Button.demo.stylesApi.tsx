"use client";

import { AtIcon } from '@phosphor-icons/react';

import { Button } from '@mantine/core';

function Demo(props: any) {
  return (
    <Button leftSection={<AtIcon size={16} />} {...props}>
      Your email
    </Button>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

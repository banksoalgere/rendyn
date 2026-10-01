"use client";

import { XIcon } from '@phosphor-icons/react';

import { Chip } from '@mantine/core';

function Demo() {
  return (
    <Chip icon={<XIcon size={16} />} color="red" variant="filled" defaultChecked>
      Forbidden
    </Chip>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

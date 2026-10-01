"use client";

import { Divider } from '@mantine/core';

function Demo() {
  return (
    <>
      <Divider my="xs" size="xs" />
      <Divider my="xs" size="sm" />
      <Divider my="xs" size="md" />
      <Divider my="xs" size="lg" />
      <Divider my="xs" size="xl" />
      <Divider my="xs" size={10} />
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

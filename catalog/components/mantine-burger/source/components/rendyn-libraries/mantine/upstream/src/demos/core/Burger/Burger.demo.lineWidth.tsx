"use client";

import { Burger } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

function Wrapper(props: any) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <Burger {...props} size="xl" opened={opened} onClick={toggle} aria-label="Toggle navigation" />
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent lineSize={2} />; }

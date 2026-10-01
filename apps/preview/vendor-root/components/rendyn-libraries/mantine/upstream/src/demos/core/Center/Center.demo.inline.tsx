"use client";

import { ArrowLeftIcon } from '@phosphor-icons/react';

import { Anchor, Box, Center } from '@mantine/core';

function Demo() {
  return (
    <Anchor href="https://mantine.dev" target="_blank">
      <Center inline>
        <ArrowLeftIcon size={12} className="mantine-rotate-rtl" />
        <Box ml={5}>Back to Mantine website</Box>
      </Center>
    </Anchor>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

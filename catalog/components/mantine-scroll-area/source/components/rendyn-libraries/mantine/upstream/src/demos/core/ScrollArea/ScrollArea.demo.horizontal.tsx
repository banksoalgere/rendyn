"use client";

import { Box, ScrollArea } from '@mantine/core';

import { Content } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/ScrollArea/_content';

function Demo() {
  return (
    <ScrollArea w={300} h={200}>
      <Box w={600}>
        <Content />
      </Box>
    </ScrollArea>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

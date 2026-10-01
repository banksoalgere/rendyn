"use client";

import { Box } from '@mantine/core';

import { TimelineBase } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Timeline/_base';

function Demo() {
  return (
    <Box maw={320} mx="auto">
      <TimelineBase />
    </Box>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

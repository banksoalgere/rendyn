"use client";

import { Box } from '@mantine/core';

import { Schedule } from '@mantine/schedule';

import { events } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/Schedule/_data';

function Demo() {
  return (
    <Box style={{ resize: 'horizontal', overflow: 'auto', minWidth: 300, maxWidth: '100%' }}>
      <Schedule events={events} layout="responsive" />
    </Box>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

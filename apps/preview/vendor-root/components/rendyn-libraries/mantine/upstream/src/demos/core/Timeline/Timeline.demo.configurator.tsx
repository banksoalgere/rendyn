"use client";

import { Box, TimelineProps } from '@mantine/core';

import { TimelineBase } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Timeline/_base';

function Wrapper(props: TimelineProps) {
  return (
    <Box maw={320} mx="auto">
      <TimelineBase noIcon {...props} />
    </Box>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent color={"blue"} radius={"xl"} active={1} reverseActive={false} lineWidth={4} bulletSize={25} align={"left"} />; }

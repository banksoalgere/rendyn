"use client";

import { Box, ScrollArea, ScrollAreaProps } from '@mantine/core';

import { Content } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/ScrollArea/_content';

function Wrapper(props: ScrollAreaProps) {
  return (
    <Box maw={400} mx="auto">
      <ScrollArea h={250} {...props}>
        <Content />
      </ScrollArea>
    </Box>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent type={"hover"} offsetScrollbars={false} overscrollBehavior={"auto"} scrollbarSize={10} scrollHideDelay={1000} />; }

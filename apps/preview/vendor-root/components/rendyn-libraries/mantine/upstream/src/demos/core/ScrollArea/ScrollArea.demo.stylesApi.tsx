"use client";

import { Box, ScrollArea } from '@mantine/core';

import { Content } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/ScrollArea/_content';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/ScrollArea/ScrollArea.demo.stylesApi.module.css';

function Demo() {
  return (
    <ScrollArea w={300} h={200} type="always" offsetScrollbars classNames={classes}>
      <Box w={600}>
        <Content />
      </Box>
    </ScrollArea>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

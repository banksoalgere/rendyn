"use client";

import { ScrollArea } from '@mantine/core';

import { Content } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/ScrollArea/_content';

function Demo() {
  return (
    <ScrollArea h={200} startScrollPosition={{ y: 250 }}>
      <Content />
    </ScrollArea>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

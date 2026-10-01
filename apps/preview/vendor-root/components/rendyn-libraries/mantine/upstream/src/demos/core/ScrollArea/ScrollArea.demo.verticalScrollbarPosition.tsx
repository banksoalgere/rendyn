"use client";

import { ScrollArea, ScrollAreaProps } from '@mantine/core';

import { Content } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/ScrollArea/_content';

function Wrapper(props: ScrollAreaProps) {
  return (
    <ScrollArea w={300} h={200} type="always" scrollbars="y" {...props}>
      <Content />
    </ScrollArea>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent verticalScrollbarPosition={"right"} offsetScrollbars={true} />; }

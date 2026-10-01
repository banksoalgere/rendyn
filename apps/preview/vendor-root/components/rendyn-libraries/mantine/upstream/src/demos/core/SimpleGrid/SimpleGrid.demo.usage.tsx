"use client";

import { SimpleGrid, SimpleGridProps } from '@mantine/core';

import { defaultItems } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/SimpleGrid/_demo-item';

function Demo(props: SimpleGridProps) {
  return (
    <SimpleGrid {...props} id="grid-configurator">
      {defaultItems}
    </SimpleGrid>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent cols={3} spacing={"md"} verticalSpacing={"md"} />; }

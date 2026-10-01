"use client";

import { SimpleGrid } from '@mantine/core';

import { defaultItems } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/SimpleGrid/_demo-item';

function Demo() {
  return (
    <SimpleGrid cols={3} autoRows="minmax(100px, auto)">
      {defaultItems}
    </SimpleGrid>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

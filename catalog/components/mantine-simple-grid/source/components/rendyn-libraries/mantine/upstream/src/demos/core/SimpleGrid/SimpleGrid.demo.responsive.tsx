"use client";

import { SimpleGrid } from '@mantine/core';

import { defaultItems } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/SimpleGrid/_demo-item';

function Demo() {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 5 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      {defaultItems}
    </SimpleGrid>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { SimpleGrid } from '@mantine/core';

import { defaultItems } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/SimpleGrid/_demo-item';

function Demo() {
  return (
    // Wrapper div is added for demonstration purposes only,
    // It is not required in real projects
    <div style={{ resize: 'horizontal', overflow: 'hidden', maxWidth: '100%' }}>
      <SimpleGrid
        type="container"
        cols={{ base: 1, '300px': 2, '500px': 5 }}
        spacing={{ base: 10, '300px': 'xl' }}
      >
        {defaultItems}
      </SimpleGrid>
    </div>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { SimpleGrid, Stack, Text } from '@mantine/core';

import { GridItem } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/SimpleGrid/_demo-item';

const items = Array(3)
  .fill(0)
  .map((_, index) => <GridItem key={index}>{index + 1}</GridItem>);

function Demo() {
  return (
    <Stack>
      <div>
        <Text mb="xs" fw={500}>
          auto-fill
        </Text>
        <SimpleGrid minColWidth="200px" autoFlow="auto-fill">
          {items}
        </SimpleGrid>
      </div>
      <div>
        <Text mb="xs" fw={500}>
          auto-fit
        </Text>
        <SimpleGrid minColWidth="200px" autoFlow="auto-fit">
          {items}
        </SimpleGrid>
      </div>
    </Stack>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

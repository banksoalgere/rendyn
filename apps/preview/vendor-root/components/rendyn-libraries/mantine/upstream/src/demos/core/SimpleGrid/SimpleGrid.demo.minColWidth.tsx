"use client";

import { SimpleGrid } from '@mantine/core';

import { defaultItems } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/SimpleGrid/_demo-item';

function Demo() {
  return <SimpleGrid minColWidth="200px">{defaultItems}</SimpleGrid>;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

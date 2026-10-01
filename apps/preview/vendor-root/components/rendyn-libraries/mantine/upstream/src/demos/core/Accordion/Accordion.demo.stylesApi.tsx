"use client";

import { Accordion, AccordionProps } from '@mantine/core';

import { data } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Accordion/_base';

function Demo(props: AccordionProps) {
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion value="Apples" order={3} {...props}>
      {items}
    </Accordion>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

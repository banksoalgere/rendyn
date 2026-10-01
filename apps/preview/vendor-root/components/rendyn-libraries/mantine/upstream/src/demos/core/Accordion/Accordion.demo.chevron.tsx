"use client";

import { PlusIcon } from '@phosphor-icons/react';

import { Accordion } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Accordion/_base';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Accordion/Accordion.demo.chevron.module.css';

function Demo() {
  const items = data.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion
      defaultValue="Apples"
      classNames={{ chevron: classes.chevron }}
      chevron={<PlusIcon className={classes.icon} />}
      order={3}
      mih={270}
    >
      {items}
    </Accordion>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

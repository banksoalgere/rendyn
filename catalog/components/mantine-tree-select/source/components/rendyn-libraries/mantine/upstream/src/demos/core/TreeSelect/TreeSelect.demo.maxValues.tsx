"use client";

import { TreeSelect } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/TreeSelect/data';

function Demo() {
  return (
    <TreeSelect
      label="Pick up to 3 items"
      placeholder="Pick values"
      data={data}
      mode="multiple"
      maxValues={3}
      defaultExpandAll
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

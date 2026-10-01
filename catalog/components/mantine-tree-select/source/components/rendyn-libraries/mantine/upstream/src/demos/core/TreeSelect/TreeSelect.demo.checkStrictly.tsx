"use client";

import { TreeSelect } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/TreeSelect/data';

function Demo() {
  return (
    <TreeSelect
      label="Select items"
      placeholder="Pick values"
      data={data}
      mode="checkbox"
      checkStrictly
      defaultExpandAll
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

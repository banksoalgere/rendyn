"use client";

import { TreeSelect } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/TreeSelect/data';

function Demo() {
  return (
    <>
      <TreeSelect label="Boolean error" placeholder="Boolean error" error data={data} />
      <TreeSelect
        mt="md"
        label="With error message"
        placeholder="With error message"
        error="Invalid value"
        data={data}
      />
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

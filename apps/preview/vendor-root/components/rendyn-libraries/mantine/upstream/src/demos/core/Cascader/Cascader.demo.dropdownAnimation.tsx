"use client";

import { Cascader } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Cascader/data';

function Demo() {
  return (
    <Cascader
      label="Location"
      placeholder="Pick location"
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
      data={data}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

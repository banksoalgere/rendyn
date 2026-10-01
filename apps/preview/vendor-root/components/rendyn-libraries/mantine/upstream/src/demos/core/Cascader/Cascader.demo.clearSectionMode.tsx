"use client";

import { Cascader } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Cascader/data';

function Demo() {
  return (
    <Cascader
      label="Location"
      placeholder="Pick location"
      clearable
      clearSectionMode="clear"
      defaultValue={['asia', 'jp', 'tokyo']}
      data={data}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

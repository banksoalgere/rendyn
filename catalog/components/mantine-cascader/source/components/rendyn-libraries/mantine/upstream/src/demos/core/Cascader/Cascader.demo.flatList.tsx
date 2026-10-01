"use client";

import { Cascader } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Cascader/data';

function Demo() {
  return (
    <Cascader
      withColumns={false}
      searchable
      label="Location"
      placeholder="Pick location"
      nothingFoundMessage="Nothing found..."
      data={data}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

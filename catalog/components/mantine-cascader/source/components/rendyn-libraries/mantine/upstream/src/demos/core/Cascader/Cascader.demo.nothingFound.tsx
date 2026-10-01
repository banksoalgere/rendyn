"use client";

import { Cascader } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Cascader/data';

function Demo() {
  return (
    <Cascader
      searchable
      label="Location"
      placeholder="Search location"
      nothingFoundMessage="Nothing found..."
      data={data}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

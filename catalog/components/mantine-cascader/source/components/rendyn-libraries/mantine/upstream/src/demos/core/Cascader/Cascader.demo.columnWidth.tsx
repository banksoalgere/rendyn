"use client";

import { Cascader, useMatches } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Cascader/data';

function Demo() {
  const withColumns = useMatches({ base: false, sm: true });
  return (
    <Cascader
      withColumns={withColumns}
      columnWidth={140}
      maxDropdownHeight={200}
      label="Location"
      placeholder="Pick location"
      data={data}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { Cascader, useMatches } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Cascader/data';

function Demo() {
  const withColumns = useMatches({ base: false, sm: true });
  return (
    <Cascader
      withColumns={withColumns}
      label="Location"
      placeholder="Pick location"
      separator="›"
      defaultValue={['asia', 'jp', 'tokyo']}
      formatValue={({ options }) => options.map((option) => option.label).join(' › ')}
      data={data}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

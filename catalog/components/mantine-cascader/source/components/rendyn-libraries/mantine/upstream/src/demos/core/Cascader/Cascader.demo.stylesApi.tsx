"use client";

import { Cascader } from '@mantine/core';

import { data } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Cascader/data';

function Demo(props: any) {
  return (
    <Cascader
      {...props}
      defaultValue={['asia', 'jp']}
      defaultDropdownOpened
      label="Location"
      placeholder="Pick location"
      comboboxProps={{ withinPortal: false }}
      data={data}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

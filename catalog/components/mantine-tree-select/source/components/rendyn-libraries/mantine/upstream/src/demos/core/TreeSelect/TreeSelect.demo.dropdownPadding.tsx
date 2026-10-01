"use client";

import { TreeSelect } from '@mantine/core';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/TreeSelect/data';

function Demo() {
  return (
    <>
      <TreeSelect
        label="Zero padding"
        placeholder="Pick value"
        data={data}
        comboboxProps={{ dropdownPadding: 0 }}
      />
      <TreeSelect
        mt="md"
        label="10px padding"
        placeholder="Pick value"
        data={data}
        comboboxProps={{ dropdownPadding: 10 }}
      />
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

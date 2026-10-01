"use client";

import { AtIcon } from '@phosphor-icons/react';

import { Select } from '@mantine/core';

function Demo(props: any) {
  return (
    <Select
      {...props}
      dropdownOpened
      leftSection={<AtIcon size={18} />}
      withAsterisk
      label="Select"
      description="Description"
      placeholder="Select"
      comboboxProps={{ hideDetached: false }}
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Node', 'Django'] },
      ]}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

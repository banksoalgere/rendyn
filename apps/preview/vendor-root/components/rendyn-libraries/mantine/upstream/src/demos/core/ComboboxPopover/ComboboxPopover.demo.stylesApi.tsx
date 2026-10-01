"use client";

import { Button, ComboboxPopover } from '@mantine/core';

function Demo(props: any) {
  return (
    <ComboboxPopover
      {...props}
      searchable
      dropdownOpened
      nothingFoundMessage="Nothing found..."
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Node.js', 'Django'] },
      ]}
      comboboxProps={{ middlewares: { flip: false, shift: false } }}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          Select technology
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { useState } from 'react';

import { Button, ComboboxPopover } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <ComboboxPopover
      data={[
        { group: 'Frontend', items: ['React', 'Angular', 'Vue'] },
        { group: 'Backend', items: ['Node.js', 'Django', 'Rails'] },
      ]}
      value={value}
      onChange={setValue}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          {value || 'Select technology'}
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

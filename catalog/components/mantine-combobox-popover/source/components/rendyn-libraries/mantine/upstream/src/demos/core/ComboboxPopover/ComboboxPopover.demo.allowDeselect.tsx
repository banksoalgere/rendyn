"use client";

import { useState } from 'react';

import { Button, ComboboxPopover, Stack } from '@mantine/core';

function Demo() {
  const [value1, setValue1] = useState<string | null>('React');
  const [value2, setValue2] = useState<string | null>('React');

  return (
    <Stack>
      <ComboboxPopover
        data={['React', 'Angular', 'Vue', 'Svelte']}
        value={value1}
        onChange={setValue1}
        allowDeselect={false}
      >
        <ComboboxPopover.Target>
          <Button variant="default" miw={200}>
            {value1 || 'Cannot deselect'}
          </Button>
        </ComboboxPopover.Target>
      </ComboboxPopover>

      <ComboboxPopover
        data={['React', 'Angular', 'Vue', 'Svelte']}
        value={value2}
        onChange={setValue2}
        allowDeselect
      >
        <ComboboxPopover.Target>
          <Button variant="default" miw={200}>
            {value2 || 'Can deselect (default)'}
          </Button>
        </ComboboxPopover.Target>
      </ComboboxPopover>
    </Stack>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

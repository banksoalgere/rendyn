"use client";

import { Button, ComboboxPopover } from '@mantine/core';

function Demo() {
  return (
    <ComboboxPopover
      data={['React', 'Angular', 'Vue', 'Svelte']}
      comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          With animation
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

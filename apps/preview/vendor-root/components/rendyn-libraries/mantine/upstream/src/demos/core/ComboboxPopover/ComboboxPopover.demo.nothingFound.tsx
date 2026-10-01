"use client";

import { Button, ComboboxPopover } from '@mantine/core';

function Demo() {
  return (
    <ComboboxPopover data={[]} nothingFoundMessage="No options available">
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          Open dropdown
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

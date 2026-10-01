"use client";

import { Button, ComboboxPopover } from '@mantine/core';

const data = Array(50)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <ComboboxPopover data={data} maxDropdownHeight={200}>
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          Select option
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

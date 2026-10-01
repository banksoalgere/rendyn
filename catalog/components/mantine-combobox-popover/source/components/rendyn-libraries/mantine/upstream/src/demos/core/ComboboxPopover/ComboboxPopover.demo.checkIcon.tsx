"use client";

import { Button, ComboboxPopover } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <ComboboxPopover
      {...props}
      data={['React', 'Angular', 'Svelte', 'Vue']}
      dropdownOpened
      defaultValue="React"
      comboboxProps={{ hideDetached: false }}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200} mb={150}>
          Select framework
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent withCheckIcon={true} withAlignedLabels={false} checkIconPosition={"left"} />; }

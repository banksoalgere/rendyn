"use client";

import { Select } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <Select
      {...props}
      data={['React', 'Angular', 'Svelte', 'Vue']}
      dropdownOpened
      pb={150}
      label="Control check icon"
      placeholder="Pick value"
      defaultValue="React"
      comboboxProps={{ hideDetached: false }}
    />
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent withCheckIcon={true} withAlignedLabels={false} checkIconPosition={"left"} />; }

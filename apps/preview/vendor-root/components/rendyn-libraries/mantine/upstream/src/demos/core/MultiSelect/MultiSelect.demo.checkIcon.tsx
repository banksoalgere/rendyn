"use client";

import { MultiSelect } from '@mantine/core';

function Wrapper(props: any) {
  return (
    <MultiSelect
      {...props}
      data={['React', 'Angular', 'Svelte', 'Vue']}
      dropdownOpened
      pb={150}
      label="Control check icon"
      placeholder="Pick value"
      defaultValue={['React']}
    />
  );
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent withCheckIcon={true} withAlignedLabels={false} checkIconPosition={"left"} />; }

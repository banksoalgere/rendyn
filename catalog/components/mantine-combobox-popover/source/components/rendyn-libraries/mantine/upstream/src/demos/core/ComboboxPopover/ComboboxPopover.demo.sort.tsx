"use client";

import { useState } from 'react';

import { Button, ComboboxItem, ComboboxPopover, OptionsFilter } from '@mantine/core';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const filtered = (options as ComboboxItem[]).filter((option) =>
    option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  filtered.sort((a, b) => a.label.localeCompare(b.label));
  return filtered;
};

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <ComboboxPopover
      data={['4 – React', '1 – Angular', '3 – Vue', '2 – Svelte']}
      value={value}
      onChange={setValue}
      searchable
      filter={optionsFilter}
      nothingFoundMessage="Nothing found..."
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          {value || 'Select framework'}
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

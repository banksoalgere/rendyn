"use client";

import { CaretDownIcon } from '@phosphor-icons/react';

import { Stack, TagsInput } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <TagsInput
        label="clearSectionMode='both' (default)"
        placeholder="Enter tags"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue={['React']}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <TagsInput
        label="clearSectionMode='rightSection'"
        placeholder="Enter tags"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue={['React']}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <TagsInput
        label="clearSectionMode='clear'"
        placeholder="Enter tags"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue={['React']}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

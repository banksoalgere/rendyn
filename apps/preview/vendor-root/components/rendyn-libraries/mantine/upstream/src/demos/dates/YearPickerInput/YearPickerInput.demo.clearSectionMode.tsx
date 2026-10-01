"use client";

import { CaretDownIcon } from '@phosphor-icons/react';

import { Stack } from '@mantine/core';

import { YearPickerInput } from '@mantine/dates';

function Demo() {
  return (
    <Stack>
      <YearPickerInput
        label="clearSectionMode='both' (default)"
        placeholder="Pick year"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <YearPickerInput
        label="clearSectionMode='rightSection'"
        placeholder="Pick year"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <YearPickerInput
        label="clearSectionMode='clear'"
        placeholder="Pick year"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

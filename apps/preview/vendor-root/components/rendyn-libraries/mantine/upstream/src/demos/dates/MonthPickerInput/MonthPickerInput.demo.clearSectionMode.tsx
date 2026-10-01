"use client";

import { CaretDownIcon } from '@phosphor-icons/react';

import { Stack } from '@mantine/core';

import { MonthPickerInput } from '@mantine/dates';

function Demo() {
  return (
    <Stack>
      <MonthPickerInput
        label="clearSectionMode='both' (default)"
        placeholder="Pick month"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <MonthPickerInput
        label="clearSectionMode='rightSection'"
        placeholder="Pick month"
        defaultValue={new Date()}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <MonthPickerInput
        label="clearSectionMode='clear'"
        placeholder="Pick month"
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

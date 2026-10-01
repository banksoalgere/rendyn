"use client";

import { CaretDownIcon, HashIcon } from '@phosphor-icons/react';

import { NativeSelect } from '@mantine/core';

function Demo() {
  return (
    <>
      <NativeSelect
        leftSection={<HashIcon size={16} />}
        leftSectionPointerEvents="none"
        label="Left section"
        data={['React', 'Angular']}
      />

      <NativeSelect
        rightSection={<CaretDownIcon size={16} />}
        label="Right section"
        data={['React', 'Angular']}
        mt="md"
      />
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

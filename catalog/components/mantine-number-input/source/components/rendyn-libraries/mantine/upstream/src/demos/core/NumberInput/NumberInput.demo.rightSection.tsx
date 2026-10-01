"use client";

import { ChartScatterIcon } from '@phosphor-icons/react';

import { NumberInput } from '@mantine/core';

function Demo() {
  return (
    <>
      <NumberInput label="Hide controls" placeholder="Hide controls" hideControls />
      <NumberInput
        label="Custom right section"
        placeholder="Custom right section"
        mt="md"
        rightSection={<ChartScatterIcon />}
        rightSectionPointerEvents="none"
      />
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

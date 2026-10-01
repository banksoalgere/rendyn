"use client";

import { CurrencyEthIcon } from '@phosphor-icons/react';

import { NumberInput } from '@mantine/core';

function Demo() {
  const icon = <CurrencyEthIcon size={20} />;
  return (
    <>
      <NumberInput leftSection={icon} label="With left section" placeholder="With left section" />
      <NumberInput
        rightSection={icon}
        label="With right section"
        placeholder="With right section"
        mt="md"
      />
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

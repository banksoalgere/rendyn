"use client";

import { AtIcon, CaretDownIcon } from '@phosphor-icons/react';

import { Input } from '@mantine/core';

function Demo(props: any) {
  const at = <AtIcon size={16} />;
  const chevron = <CaretDownIcon size={16} />;
  return <Input placeholder="Input component" leftSection={at} rightSection={chevron} {...props} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { CaretDownIcon } from '@phosphor-icons/react';

import { Input } from '@mantine/core';

function Demo() {
  return (
    <>
      <Input component="button" pointer>
        Button input
      </Input>

      <Input component="select" rightSection={<CaretDownIcon size={14} />} pointer mt="md">
        <option value="1">1</option>
        <option value="2">2</option>
      </Input>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

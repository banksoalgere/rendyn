"use client";

import { useState } from 'react';

import { AtIcon } from '@phosphor-icons/react';

import { Input } from '@mantine/core';

function Demo() {
  const [value, setValue] = useState('Clear me');
  return (
    <>
      <Input placeholder="Your email" leftSection={<AtIcon size={16} />} />
      <Input
        placeholder="Clearable input"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        mt="md"
        rightSection={
          value ? <Input.ClearButton aria-label="Clear input" onClick={() => setValue('')} /> : null
        }
      />
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

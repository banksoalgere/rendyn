"use client";

import { useState } from 'react';

import { CheckIcon, XIcon } from '@phosphor-icons/react';

import { Switch } from '@mantine/core';

function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      color="teal"
      size="md"
      label="Switch with thumb icon"
      thumbIcon={
        checked ? (
          <CheckIcon size={12} color="var(--mantine-color-teal-6)" />
        ) : (
          <XIcon size={12} color="var(--mantine-color-red-6)" />
        )
      }
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

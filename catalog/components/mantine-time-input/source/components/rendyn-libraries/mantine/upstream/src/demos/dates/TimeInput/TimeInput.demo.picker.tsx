"use client";

import { useRef } from 'react';

import { ClockIcon } from '@phosphor-icons/react';

import { ActionIcon } from '@mantine/core';

import { TimeInput } from '@mantine/dates';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <ClockIcon size={16} />
    </ActionIcon>
  );

  return (
    <TimeInput label="Click icon to show browser picker" ref={ref} rightSection={pickerControl} />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

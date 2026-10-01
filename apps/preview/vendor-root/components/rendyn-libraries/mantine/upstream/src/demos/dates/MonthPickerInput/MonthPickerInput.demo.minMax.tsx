"use client";

import { useState } from 'react';

import { MonthPickerInput } from '@mantine/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPickerInput
      label="Pick month"
      placeholder="Pick month"
      value={value}
      onChange={setValue}
      minDate={new Date(2022, 1)}
      maxDate={new Date(2022, 8)}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

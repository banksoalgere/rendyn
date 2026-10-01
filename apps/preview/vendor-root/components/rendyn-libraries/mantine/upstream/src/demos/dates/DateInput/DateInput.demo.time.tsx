"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { DateInput, DateInputProps, DateStringValue } from '@mantine/dates';

const dateParser: DateInputProps['dateParser'] = (input) => {
  if (!input) {
    return null;
  }
  const parsed = dayjs(input, 'YYYY-MM-DD HH:mm', true);
  return parsed.isValid() ? parsed.format('YYYY-MM-DD HH:mm:ss') : null;
};

function Demo() {
  const [value, setValue] = useState<DateStringValue | null>(null);
  return (
    <DateInput
      withTime
      valueFormat="YYYY-MM-DD HH:mm"
      dateParser={dateParser}
      value={value}
      onChange={setValue}
      label="Date and time input"
      placeholder="Date and time input"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

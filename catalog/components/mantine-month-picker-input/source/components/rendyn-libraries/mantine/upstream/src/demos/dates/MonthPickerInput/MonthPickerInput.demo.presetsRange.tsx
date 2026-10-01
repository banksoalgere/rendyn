"use client";

import dayjs from 'dayjs';

import { MonthPickerInput } from '@mantine/dates';

function Demo() {
  const today = dayjs();

  return (
    <MonthPickerInput
      type="range"
      label="With presets"
      placeholder="Select months range"
      presets={[
        {
          value: [
            today.subtract(3, 'month').startOf('month').format('YYYY-MM-DD'),
            today.startOf('month').format('YYYY-MM-DD'),
          ],
          label: 'Last 3 months',
        },
        {
          value: [
            today.subtract(6, 'month').startOf('month').format('YYYY-MM-DD'),
            today.startOf('month').format('YYYY-MM-DD'),
          ],
          label: 'Last 6 months',
        },
        {
          value: [
            today.startOf('year').format('YYYY-MM-DD'),
            today.startOf('month').format('YYYY-MM-DD'),
          ],
          label: 'This year',
        },
        {
          value: [
            today.subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
            today.subtract(1, 'year').endOf('year').startOf('month').format('YYYY-MM-DD'),
          ],
          label: 'Last year',
        },
      ]}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

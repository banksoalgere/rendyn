"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { Badge } from '@mantine/core';

import { MobileMonthView } from '@mantine/schedule';

import { dataCode, regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/MobileMonthView/_data';

function Demo() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedDate, setSelectedDate] = useState<string | null>(dayjs().format('YYYY-MM-DD'));

  return (
    <MobileMonthView
      date={date}
      onDateChange={setDate}
      selectedDate={selectedDate}
      onSelectedDateChange={setSelectedDate}
      events={regularEvents}
      renderHeader={({ defaultHeader }) => (
        <>
          {defaultHeader}
          <Badge variant="light" size="sm">
            3 events today
          </Badge>
        </>
      )}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

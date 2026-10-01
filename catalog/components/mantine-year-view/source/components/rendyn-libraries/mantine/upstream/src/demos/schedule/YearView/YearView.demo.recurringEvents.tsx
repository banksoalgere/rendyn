"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { YearView } from '@mantine/schedule';

const year = dayjs().year();

const recurringEventsData = [
  {
    id: 'yearly-series',
    title: 'Monthly architecture review (series)',
    start: `${year}-01-10 09:00:00`,
    end: `${year}-01-10 10:00:00`,
    color: 'blue',
    recurrence: {
      rrule: 'FREQ=MONTHLY;COUNT=12',
      exdate: [`${year}-11-10 09:00:00`],
    },
  },
  {
    id: 'yearly-series-override',
    title: 'Monthly architecture review (moved in Nov)',
    start: `${year}-11-10 13:00:00`,
    end: `${year}-11-10 14:00:00`,
    color: 'grape',
    recurringEventId: 'yearly-series',
    recurrenceId: `${year}-11-10 09:00:00`,
  },
  {
    id: 'year-one-off',
    title: 'One-off summit',
    start: `${year}-12-01 00:00:00`,
    end: `${year}-12-02 00:00:00`,
    color: 'green',
  },
];

function Demo() {
  const [date, setDate] = useState(`${year}-01-01`);
  return (
    <YearView date={date} onDateChange={setDate} events={recurringEventsData} withWeekNumbers />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

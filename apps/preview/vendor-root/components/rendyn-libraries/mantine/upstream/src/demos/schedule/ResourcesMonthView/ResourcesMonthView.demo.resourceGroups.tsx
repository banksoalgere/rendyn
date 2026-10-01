"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { ResourcesMonthView, ScheduleResourceGroup } from '@mantine/schedule';

import { resourceEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/ResourcesMonthView/_data';

const resources = [
  { id: 'tokyo', label: 'Meeting room: Tokyo' },
  { id: 'paris', label: 'Meeting room: Paris' },
  { id: 'new-york', label: 'Meeting room: New York' },
  { id: 'overflow', label: 'Overflow room' },
];

const groups: ScheduleResourceGroup[] = [
  { label: 'Floor 1', resourceIds: ['tokyo', 'paris'] },
  { label: 'Floor 2', resourceIds: ['new-york'] },
];

function Demo() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  return (
    <ResourcesMonthView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={resourceEvents}
      groups={groups}
      startScrollDate={dayjs().format('YYYY-MM-DD')}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

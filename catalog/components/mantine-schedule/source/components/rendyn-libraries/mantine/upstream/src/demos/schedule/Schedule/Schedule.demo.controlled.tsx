"use client";

import { useState } from 'react';

import { Text } from '@mantine/core';

import { Schedule, ScheduleViewLevel } from '@mantine/schedule';

import { events } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/Schedule/_data';

function Demo() {
  const [view, setView] = useState<ScheduleViewLevel>('week');
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <Text size="sm" mb="md">
        Current view: <b>{view}</b>
      </Text>

      <Schedule
        view={view}
        onViewChange={setView}
        date={date}
        onDateChange={(newDate) => setDate(new Date(newDate))}
        events={events}
      />
    </div>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

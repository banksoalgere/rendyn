"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { ResourcesWeekView } from '@mantine/schedule';

import { dataCode, resourceEvents, resources } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/ResourcesWeekView/_data';

function Demo() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  return (
    <ResourcesWeekView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={resourceEvents}
      startTime="09:00:00"
      endTime="17:00:00"
      intervalMinutes={30}
      startScrollDateTime={`${dayjs().format('YYYY-MM-DD')} 09:00:00`}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { ResourcesDayView } from '@mantine/schedule';

import { dataCode, resourceEvents, resources } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/ResourcesDayView/_data';

function Demo() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  return (
    <ResourcesDayView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={resourceEvents}
      startTime="00:00:00"
      endTime="23:59:00"
      scrollAreaProps={{
        scrollbarSize: 10,
        offsetScrollbars: true,
        type: 'always',
        scrollbars: 'x',
      }}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

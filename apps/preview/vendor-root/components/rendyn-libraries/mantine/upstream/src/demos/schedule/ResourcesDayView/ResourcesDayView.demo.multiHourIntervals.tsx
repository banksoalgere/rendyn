"use client";

import dayjs from 'dayjs';

import { useState } from 'react';

import { SegmentedControl, Stack } from '@mantine/core';

import { ResourcesDayView } from '@mantine/schedule';

import { dataCode, resourceEvents, resources } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/ResourcesDayView/_data';

function Demo() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [intervalMinutes, setIntervalMinutes] = useState('120');

  return (
    <Stack>
      <SegmentedControl
        value={intervalMinutes}
        onChange={setIntervalMinutes}
        data={[
          { label: '1 hour', value: '60' },
          { label: '2 hours', value: '120' },
          { label: '4 hours', value: '240' },
        ]}
      />
      <ResourcesDayView
        date={date}
        onDateChange={setDate}
        resources={resources}
        events={resourceEvents}
        intervalMinutes={Number(intervalMinutes)}
        startScrollTime="08:00:00"
      />
    </Stack>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

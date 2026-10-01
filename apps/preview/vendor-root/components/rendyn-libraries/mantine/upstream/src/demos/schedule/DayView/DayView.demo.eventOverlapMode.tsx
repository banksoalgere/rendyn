"use client";

import { useState } from 'react';

import { SegmentedControl, Stack } from '@mantine/core';

import { DayView, ScheduleEventOverlapMode } from '@mantine/schedule';

import { denseOverlappingEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/DayView/_data';

function Demo() {
  const [mode, setMode] = useState<ScheduleEventOverlapMode>('cascade');

  return (
    <Stack>
      <SegmentedControl
        value={mode}
        onChange={(value) => setMode(value as ScheduleEventOverlapMode)}
        data={[
          { value: 'columns', label: 'columns' },
          { value: 'cascade', label: 'cascade' },
        ]}
      />

      <DayView
        date={new Date()}
        events={denseOverlappingEvents}
        startTime="08:00:00"
        endTime="14:00:00"
        eventOverlapMode={mode}
      />
    </Stack>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

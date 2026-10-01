"use client";

import { useState } from 'react';

import { Text } from '@mantine/core';

import { DayView, ScheduleViewLevel } from '@mantine/schedule';

import { dataCode, regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/DayView/_data';

function Demo() {
  const [view, setView] = useState<ScheduleViewLevel>('day');

  return (
    <div>
      <Text mb="md">Selected view: {view}</Text>

      <DayView
        date={new Date()}
        events={regularEvents}
        startTime="08:00:00"
        endTime="18:00:00"
        onViewChange={setView}
      />
    </div>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

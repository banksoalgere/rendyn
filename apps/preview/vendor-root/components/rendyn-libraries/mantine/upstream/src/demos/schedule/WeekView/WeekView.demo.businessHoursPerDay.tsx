"use client";

import { WeekView } from '@mantine/schedule';

import { businessEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/WeekView/_data';

function Demo() {
  return (
    <WeekView
      date={new Date()}
      events={businessEvents}
      highlightBusinessHours
      businessHours={{
        1: ['09:00:00', '17:00:00'],
        2: ['09:00:00', '17:00:00'],
        3: ['09:00:00', '17:00:00'],
        4: ['09:00:00', '17:00:00'],
        5: ['09:00:00', '13:00:00'],
      }}
      startTime="07:00:00"
      endTime="20:00:00"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

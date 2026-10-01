"use client";

import { WeekView } from '@mantine/schedule';

import { regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/WeekView/_data';

function Demo() {
  return (
    <WeekView
      date={new Date()}
      events={regularEvents}
      startTime="08:00:00"
      endTime="18:00:00"
      slotLabelFormat="h A"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

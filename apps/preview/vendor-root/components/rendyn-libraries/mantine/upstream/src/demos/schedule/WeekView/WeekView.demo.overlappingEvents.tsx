"use client";

import { WeekView } from '@mantine/schedule';

import { overlappingEvents as overlappingEventsData } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/WeekView/_data';

function Demo() {
  return (
    <WeekView
      date={new Date()}
      events={overlappingEventsData}
      startTime="08:00:00"
      endTime="18:00:00"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

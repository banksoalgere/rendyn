"use client";

import { DayView } from '@mantine/schedule';

import { overlappingEventsCode, overlappingEvents as overlappingEventsData } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/DayView/_data';

function Demo() {
  return (
    <DayView
      date={new Date()}
      events={overlappingEventsData}
      startTime="08:00:00"
      endTime="18:00:00"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

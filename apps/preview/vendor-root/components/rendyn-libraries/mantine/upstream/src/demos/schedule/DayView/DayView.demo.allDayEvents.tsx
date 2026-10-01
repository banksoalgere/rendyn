"use client";

import { DayView } from '@mantine/schedule';

import { allDayEventsCode, allDayEvents as allDayEventsData } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/DayView/_data';

function Demo() {
  return (
    <DayView date={new Date()} events={allDayEventsData} startTime="08:00:00" endTime="18:00:00" />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

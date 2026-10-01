"use client";

import { DayView } from '@mantine/schedule';

import { dataCode, regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/DayView/_data';

function Demo() {
  return (
    <DayView date={new Date()} events={regularEvents} startTime="09:00:00" endTime="17:00:00" />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

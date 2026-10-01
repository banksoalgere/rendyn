"use client";

import { WeekView } from '@mantine/schedule';

import { regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/WeekView/_data';

function Demo() {
  return (
    <WeekView date={new Date()} events={regularEvents} startTime="09:00:00" endTime="17:00:00" />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

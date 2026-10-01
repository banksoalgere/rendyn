"use client";

import { WeekView } from '@mantine/schedule';

import { regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/WeekView/_data';

function Demo() {
  return (
    <WeekView
      date="2030-06-10"
      events={regularEvents}
      withCurrentTimeIndicator
      forceCurrentTimeIndicator
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

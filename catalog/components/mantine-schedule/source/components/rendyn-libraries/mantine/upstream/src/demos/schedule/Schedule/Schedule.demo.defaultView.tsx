"use client";

import { Schedule } from '@mantine/schedule';

import { events } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/Schedule/_data';

function Demo() {
  return <Schedule events={events} defaultView="month" />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

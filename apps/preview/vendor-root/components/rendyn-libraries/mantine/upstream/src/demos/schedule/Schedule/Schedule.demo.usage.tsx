"use client";

import { Schedule } from '@mantine/schedule';

import { dataCode, events } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/Schedule/_data';

function Demo() {
  return <Schedule events={events} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

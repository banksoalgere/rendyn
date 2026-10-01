"use client";

import { MonthView } from '@mantine/schedule';

import { manyEventsCode, manyEvents as manyEventsData } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/MonthView/_data';

function Demo() {
  return <MonthView date={new Date()} events={manyEventsData} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

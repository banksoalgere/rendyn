"use client";

import { MonthView } from '@mantine/schedule';

import { dataCode, regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/MonthView/_data';

function Demo() {
  return <MonthView date={new Date()} events={regularEvents} withOutsideDays={false} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

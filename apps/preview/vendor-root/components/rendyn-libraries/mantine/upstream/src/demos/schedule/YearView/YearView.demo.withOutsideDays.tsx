"use client";

import { YearView } from '@mantine/schedule';

import { regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/YearView/_data';

function Demo() {
  return <YearView date={new Date()} events={regularEvents} withOutsideDays={false} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { YearView } from '@mantine/schedule';

import { regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/YearView/_data';

function Demo() {
  return <YearView date={new Date()} events={regularEvents} firstDayOfWeek={0} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { DayView } from '@mantine/schedule';

import { businessEvents, businessEventsCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/DayView/_data';

function Demo() {
  return (
    <DayView
      date={new Date()}
      events={businessEvents}
      highlightBusinessHours
      businessHours={['09:00:00', '17:00:00']}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

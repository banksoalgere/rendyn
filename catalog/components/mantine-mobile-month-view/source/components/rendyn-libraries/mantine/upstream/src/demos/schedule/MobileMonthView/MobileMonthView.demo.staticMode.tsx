"use client";

import dayjs from 'dayjs';

import { MobileMonthView } from '@mantine/schedule';

import { regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/MobileMonthView/_data';

function Demo() {
  return (
    <MobileMonthView
      date={dayjs().format('YYYY-MM-DD')}
      selectedDate={dayjs().format('YYYY-MM-DD')}
      events={regularEvents}
      mode="static"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { DayView } from '@mantine/schedule';

import { dataCode, regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/DayView/_data';

function Demo() {
  return (
    <DayView
      date={new Date()}
      events={regularEvents}
      startTime="08:00:00"
      endTime="18:00:00"
      labels={{
        allDay: 'Todo el día',
        timeSlot: 'Franja horaria',
        today: 'Hoy',
        previous: 'Anterior',
        next: 'Siguiente',
      }}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

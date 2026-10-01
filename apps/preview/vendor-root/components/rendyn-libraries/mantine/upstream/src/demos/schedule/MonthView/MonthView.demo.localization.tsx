"use client";

import 'dayjs/locale/es';

import { MonthView } from '@mantine/schedule';

import { dataCode, regularEvents } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/MonthView/_data';

function Demo() {
  return (
    <MonthView
      date={new Date()}
      events={regularEvents}
      locale="es"
      labels={{
        day: 'Día',
        week: 'Semana',
        month: 'Mes',
        year: 'Año',
        today: 'Hoy',
        previous: 'Anterior',
        next: 'Siguiente',
        more: 'Más',
        moreLabel: (hiddenEventsCount) => `+${hiddenEventsCount} más`,
      }}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

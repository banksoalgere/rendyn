"use client";

import dayjs from 'dayjs';

import 'dayjs/locale/es';

import { useState } from 'react';

import { ResourcesMonthView } from '@mantine/schedule';

import { dataCode, resourceEvents, resources } from '@/components/rendyn-libraries/mantine/upstream/src/demos/schedule/ResourcesMonthView/_data';

function Demo() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  return (
    <ResourcesMonthView
      date={date}
      onDateChange={setDate}
      resources={resources}
      events={resourceEvents}
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
        resources: 'Recursos',
        moreLabel: (hiddenEventsCount) => `+${hiddenEventsCount} más`,
      }}
      startScrollDate={dayjs().format('YYYY-MM-DD')}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

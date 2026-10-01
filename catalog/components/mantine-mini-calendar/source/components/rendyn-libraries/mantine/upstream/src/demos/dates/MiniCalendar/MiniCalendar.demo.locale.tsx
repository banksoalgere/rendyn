"use client";

import 'dayjs/locale/ru';

import { MiniCalendar } from '@mantine/dates';

function Demo() {
  return <MiniCalendar numberOfDays={6} defaultDate="2025-04-15" locale="ru" />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

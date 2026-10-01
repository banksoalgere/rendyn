"use client";

import { DatePicker } from '@mantine/dates';

function Demo() {
  return <DatePicker withNativeLevelSelect yearsSelectRange={[2020, 2035]} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

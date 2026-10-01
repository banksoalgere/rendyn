"use client";

import { TimePicker } from '@mantine/dates';

function Demo() {
  return <TimePicker label="Enter duration" type="duration" withSeconds />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }

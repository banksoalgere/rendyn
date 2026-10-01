"use client";

import { DateTimePicker } from '@mantine/dates';

function Wrapper(props: any) {
  return <DateTimePicker {...props} placeholder="Input placeholder" />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

"use client";

import { TimePicker } from '@mantine/dates';

function Wrapper(props: any) {
  return <TimePicker withDropdown {...props} />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }

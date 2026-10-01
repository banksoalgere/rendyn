"use client";

import { DateInput } from '@mantine/dates';

function Wrapper(props: any) {
  return <DateInput {...props} placeholder="Input placeholder" />;
}
const RendynExampleComponent = Wrapper;
export function RendynExample() { return <RendynExampleComponent  />; }
